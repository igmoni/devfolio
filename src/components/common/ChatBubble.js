"use client";
import ChatBubbleIcon from "@/svgs/ChatBubbleIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogOverlay,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatSuggestions } from "@/config/ChatPrompt";
import { heroConfig } from "@/config/Hero";
import { useHapticFeedback } from "@/hooks/use-haptic-feedback";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import SendIcon from "@/svgs/SendIcon";

const initialMessages = [
  {
    id: 1,
    text: "Hello! I'm Mohan's Portfolio Assistant. How can I help you?",
    sender: "bot",
    timestamp: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
];

const ChatBubble = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef(null);
  const { triggerHaptic, isMobile } = useHapticFeedback();

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );

      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isLoading) return;

    if (isMobile()) {
      triggerHaptic("light");
    }

    const messageText = newMessage.trim();
    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date().toLocaleDateString([], {
        houe: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsLoading(true);

    const botMessageId = Date.now() + 1;
    const botMessage = {
      id: botMessageId,
      text: "",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, botMessage]);

    await sendMessage(messageText, botMessageId);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    // Trigger haptic feedback on mobile devices
    if (isMobile()) {
      triggerHaptic('selection');
    }

    setNewMessage(suggestion);
    // Auto-send the suggestion
    const userMessage = {
      id: Date.now(),
      text: suggestion,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Create a temporary bot message for streaming
    const botMessageId = Date.now() + 1;
    const botMessage = {
      id: botMessageId,
      text: '',
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, botMessage]);

    // Send the message (reuse the same logic as handleSendMessage)
    sendMessage(suggestion, botMessageId);
  };

  const sendMessage = async (messageText, botMessageId) => {
    try {
      // Prepare conversation history for Gemini API format
      const history = messages.slice(-10).map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          history,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No reader available");
      }

      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));

              if (data.error) {
                throw new Error(data.error);
              }

              if (data.text) {
                accumulatedText += data.text;

                // Update the streaming message in real-time
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMessageId
                      ? { ...msg, text: accumulatedText, isStreaming: true }
                      : msg
                  )
                );
              }

              if (data.done) {
                // Finalize the message
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMessageId
                      ? { ...msg, text: accumulatedText, isStreaming: false }
                      : msg
                  )
                );
                break;
              }
            } catch {
              continue;
            }
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? {
                ...msg,
                text: "I'm sorry, I'm having trouble responding right now. Please try again later.",
                isStreaming: false,
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
      setNewMessage("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="default"
          className="fixed bottom-6 right-6 h-12 w-12 cursor-pointer rounded-full dark:bg-white"
        >
          <ChatBubbleIcon className="h-6 w-6" />
        </Button>
      </DialogTrigger>

      {/* 👇 TRANSPARENT OVERLAY (no blur, no dim) */}
      <DialogOverlay className="bg-transparent backdrop-blur-none" />

      <DialogContent className="flex h-[80vh] max-w-md flex-col p-0 shadow-xl">
        <div className="border-b px-4 py-3">
          <DialogTitle className="text-sm font-semibold">
            Portfolio Assisstant Tab
          </DialogTitle>
        </div>

        {/* HEADER */}
        <div className="border-b px-4 py-3">
          <div className="flex items-center space-x-3">
            <Avatar className="border-primary h-8 w-8 border-2 bg-blue-300 dark:bg-yellow-300">
              <AvatarImage src="/assets/mony.png" alt="Assistant" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-sm font-semibold">
                {heroConfig.name}&apos;s Portfolio Assistant
              </h3>
              <div className="text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  Online
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea ref={scrollAreaRef} className="h-full p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex w-max max-w-xs flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                    message.sender === "user"
                      ? "ml-auto bg-muted text-secondary"
                      : "bg-muted"
                  )}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === "bot" && (
                      <Avatar className="border-primary h-6 w-6 border-2 bg-blue-300 dark:bg-yellow-300">
                        <AvatarImage src="/assets/mony.png" alt="Assistant" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div className="max-w-xs flex-1 md:max-w-sm">
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        {message.text ? (
                          <ReactMarkdown>{message.text}</ReactMarkdown>
                        ) : (
                          message.isStreaming && (
                            <span className="text-muted-foreground">
                              Thinking...
                            </span>
                          )
                        )}
                      </div>
                      <p
                        className={cn(
                          "mt-1 text-xs",
                          message.sender === "user"
                            ? "text-secondary"
                            : "text-muted-foreground"
                        )}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {messages.length === 1 && !isLoading && (
                <div className="space-y-2">
                  <p className="px-3 text-xs text-muted-foreground">
                    Quick questions:
                  </p>
                  <div className="flex flex-wrap gap-2 px-3">
                    {chatSuggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="h-8 bg-background px-3 text-xs hover:bg-muted"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* FOOTER */}
        <div className="border-t p-3">
          <div className="flex space-x-2">
            <Input
              placeholder="Ask me about my work and experience..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={isLoading}
              onClick={handleKeyPress}
              
              className="flex-1"
            />
            <Button
              size="sm"
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || isLoading}
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <SendIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatBubble;
