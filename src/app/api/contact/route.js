import { NextResponse } from "next/server";

import * as z from "zod";
import nodemailer from "nodemailer";

const rateLimitStore = new Map();

const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

// same schema you used (you can tighten phone later if you want)
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(20),
  message: z.string().min(10).max(1000),
});

function getClientIP(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfConnectingIP = request.headers.get("cf-connecting-ip");

  if (forwarded) return forwarded.split(",")[0].trim();
  if (realIP) return realIP;
  if (cfConnectingIP) return cfConnectingIP;
  return "unknown";
}

function checkRateLimit(clientIP) {
  const now = Date.now();
  const clientData = rateLimitStore.get(clientIP);

  if (!clientData || now > clientData.resetTime) {
    rateLimitStore.set(clientIP, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }

  if (clientData.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  clientData.count++;
  rateLimitStore.set(clientIP, clientData);

  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - clientData.count,
  };
}

// ---------- TELEGRAM ----------
async function sendToTelegram(data) {
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  if (!telegramToken) {
    console.error("Telegram_bot_token not configured");
    return false;
  }

  if (!telegramChatId) {
    console.error("Telegram_chat_id not configured");
    return false;
  }

  const message = `
  🔔 *New Contact Form Submission*

👤 *Name:* ${data.name.trim()}
📧 *Email:* ${data.email.trim()}
📱 *Phone:* ${data.phone.trim()}

💬 *Message:*
${data.message.trim()}

⏰ *Submitted:* ${new Date().toISOString()}
📍 *Timezone:* ${Intl.DateTimeFormat().resolvedOptions().timeZone}
  `.trim();

  try {
    const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (response.ok) {
      return true;
    } else {
      const errorText = await response.text();
      console.error("Failed to send to Telegram:", errorText);
      return false;
    }
  } catch (err) {
    console.error("Error sending to Telegram:", err);
    return false;
  }
}

// ---------- EMAIL (GMAIL, LIKE YOUR WORKING CODE) ----------
async function sendEmail(data) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // exactly like your working snippet
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: data.email, // user email
      to: process.env.EMAIL_USER, // your inbox
      subject: `New contact message from ${data.name}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Message:
${data.message}
      `.trim(),
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.error("Error sending email:", err);
    return false;
  }
}

export async function POST(request) {
  try {
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(clientIP);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter: RATE_LIMIT_WINDOW / 1000,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": RATE_LIMIT_MAX_REQUESTS.toString(),
            "X-RateLimit-Remaining": rateLimit.remaining.toString(),
            "X-RateLimit-Reset": (Date.now() + RATE_LIMIT_WINDOW).toString(),
          },
        }
      );
    }

    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // send to telegram
    const telegramSent = await sendToTelegram(validatedData);

    // send to gmail using same style as your working code
    const emailSent = await sendEmail(validatedData);

    if (!telegramSent && !emailSent) {
      return NextResponse.json(
        {
          error: "Failed to send message. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Message sent successfully!",
        success: true,
        telegram: telegramSent,
        email: emailSent,
      },
      {
        headers: {
          "X-RateLimit-Limit": RATE_LIMIT_MAX_REQUESTS.toString(),
          "X-RateLimit-Remaining": rateLimit.remaining.toString(),
        },
      }
    );
  } catch (err) {
    console.error("API Error:", err);

    if (err instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid form data",
          details: err.errors,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
