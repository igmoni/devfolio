"use client";

import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

// OnekoCat: React component that replaces the previous public oneko script.
// Features:
// - Mouse-chase movement when not dragged
// - Dragging with visual feedback
// - Double-click toggles sleep/wake
// - Right-click opens a centered modal with 6 GIF options
// - Modal blurs/dims the rest of the page and shows shadcn-style tooltips for GIF names
// - Selected GIF persists to localStorage

export default function Oneko() {
  const elRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number | null>(null);

  // position (center is width/height 32)
  const [pos, setPos] = useState({ x: 32, y: 32 });
  const mouseRef = useRef({ x: 0, y: 0 });

  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const [frameCount, setFrameCount] = useState(0);
  const [idleTime, setIdleTime] = useState(0);
  const idleAnimationRef = useRef<string | null>(null);
  const idleFrameRef = useRef(0);

  const speed = 10;
  const frameRate = 100; // ms between frames

  const [isSleeping, setIsSleeping] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const gifOptions = [
    { src: "/oneko/oneko-vaporwave.gif", name: "Vaporwave" },
    // { src: "/oneko/oneko-purple.gif", name: "Purple" },
    // { src: "/oneko/oneko-classic.gif", name: "Classic" },
    // { src: "/oneko/oneko-black.gif", name: "Black" },
    // { src: "/oneko/oneko-white.gif", name: "White" },
    // { src: "/oneko/oneko-rainbow.gif", name: "Rainbow" },
  ];

  const [currentGif, setCurrentGif] = useState<string>(() => {
    try {
      return localStorage.getItem("oneko-gif") || "/oneko/oneko-vaporwave.gif";
    } catch (e) {
      return "/oneko/oneko-vaporwave.gif";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("oneko-gif", currentGif);
    } catch (e) {}
  }, [currentGif]);

  // sprite sheet map (same as user's)
  const spriteSets= {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
    scratchWallN: [[0, 0], [0, -1]],
    scratchWallS: [[-7, -1], [-6, -2]],
    scratchWallE: [[-2, -2], [-2, -3]],
    scratchWallW: [[-4, 0], [-4, -1]],
    tired: [[-3, -2]],
    sleeping: [[-2, 0], [-2, -1]],
    N: [[-1, -2], [-1, -3]],
    NE: [[0, -2], [0, -3]],
    E: [[-3, 0], [-3, -1]],
    SE: [[-5, -1], [-5, -2]],
    S: [[-6, -3], [-7, -2]],
    SW: [[-5, -3], [-6, -1]],
    W: [[-4, -2], [-4, -3]],
    NW: [[-1, 0], [-1, -1]],
  };

  function setSprite(name, f) {
    const el = elRef.current;
    if (!el) return;
    const set = spriteSets[name] || spriteSets.idle;
    const sprite = set[f % set.length];
    el.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }

  // Mouse handlers
  useEffect(() => {
    function onMove(e) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (isDragging) {
        const nx = e.clientX - dragOffset.current.x;
        const ny = e.clientY - dragOffset.current.y;
        setPos((p) => ({ x: Math.min(Math.max(16, nx), window.innerWidth - 16), y: Math.min(Math.max(16, ny), window.innerHeight - 16) }));
      }
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isDragging]);

  // mousedown on element -> start drag
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    function down(e) {
      // left click
      if (e.button === 0) {
        e.preventDefault();
        setIsDragging(true);
        dragOffset.current.x = e.clientX - pos.x;
        dragOffset.current.y = e.clientY - pos.y;
      }
    }

    function up() {
      setIsDragging(false);
    }

    function dbl(e) {
      e.preventDefault();
      // double click toggles sleep/wake
      setIsSleeping((s) => {
        const ns = !s;
        if (ns) {
          idleAnimationRef.current = "sleeping";
          idleFrameRef.current = 0;
        } else {
          idleAnimationRef.current = null;
          idleFrameRef.current = 0;
        }
        return ns;
      });
    }

    function ctx(e) {
      e.preventDefault();
      // open modal in center
      setModalOpen(true);
    }

    el.addEventListener("mousedown", down);
    document.addEventListener("mouseup", up);
    el.addEventListener("dblclick", dbl);
    el.addEventListener("contextmenu", ctx);

    return () => {
      el.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup", up);
      el.removeEventListener("dblclick", dbl);
      el.removeEventListener("contextmenu", ctx);
    };
  }, [pos.x, pos.y]);

  // animation loop (chase mouse when not dragging / sleeping)
  useEffect(() => {
    function loop(ts) {
      if (!lastFrameRef.current) lastFrameRef.current = ts;
      const delta = ts - lastFrameRef.current;
      if (!isDragging && !isSleeping) {
        if (delta > frameRate) {
          lastFrameRef.current = ts;
          // run frame
          setFrameCount((c) => c + 1);
          const diffX = pos.x - mouseRef.current.x;
          const diffY = pos.y - mouseRef.current.y;
          const distance = Math.hypot(diffX, diffY);

          if (distance < speed || distance < 48) {
            // idle logic
            setIdleTime((t) => t + 1);
            // possible idle animations (kept simple)
            if (idleAnimationRef.current === "sleeping") {
              setSprite("sleeping", Math.floor(idleFrameRef.current / 4));
            } else {
              setSprite("idle", 0);
            }
            idleFrameRef.current += 1;
          } else {
            idleAnimationRef.current = null;
            idleFrameRef.current = 0;
            if (idleTime > 1) {
              setSprite("alert", 0);
              setIdleTime((t) => Math.min(t, 7) - 1);
            } else {
              let direction = "";
              direction = diffY / distance > 0.5 ? "N" : direction;
              direction = diffY / distance < -0.5 ? "S" : direction;
              direction += diffX / distance > 0.5 ? "W" : "";
              direction += diffX / distance < -0.5 ? "E" : "";
              setSprite(direction || "idle", frameCount);

              const nx = pos.x - (diffX / distance) * speed;
              const ny = pos.y - (diffY / distance) * speed;
              setPos({ x: Math.min(Math.max(16, nx), window.innerWidth - 16), y: Math.min(Math.max(16, ny), window.innerHeight - 16) });
            }
          }
        }
      } else if (isSleeping) {
        // while sleeping show sleeping animation
        setSprite("sleeping", Math.floor(idleFrameRef.current / 4));
        idleFrameRef.current += 1;
      } else {
        // dragging -> show picked-up feedback sprite (use alert)
        setSprite("alert", 0);
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isDragging, isSleeping, pos, frameCount, idleTime]);

  // update element styles when pos or dragging change
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    el.style.left = `${pos.x - 16}px`;
    el.style.top = `${pos.y - 16}px`;
    el.style.backgroundImage = `url(${currentGif})`;
    el.style.transform = isDragging ? "scale(1.12)" : "scale(1)";
    el.style.boxShadow = isDragging ? "0 8px 24px rgba(0,0,0,0.5)" : "none";
    el.style.pointerEvents = "auto";
  }, [pos.x, pos.y, isDragging, currentGif]);

  return (
    <>
      {/* overlay for modal blur/dim when modalOpen true */}
      {modalOpen && (
        <div className="fixed inset-0 z-[2147483640] bg-black/50 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
      )}

      <div
        ref={elRef}
        id="oneko"
        aria-hidden
        className={`w-8 h-8 fixed z-[2147483647] select-none`}
        style={{
          left: pos.x - 16,
          top: pos.y - 16,
          width: 32,
          height: 32,
          position: "fixed",
          pointerEvents: "auto",
          imageRendering: "pixelated",
          backgroundImage: `url(${currentGif})`,
          backgroundSize: "auto",
        }}
      />

      {/* centered modal using shadcn Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md w-[min(90vw,560px)]">
          <DialogHeader>
            <DialogTitle>Choose a cat skin</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-4 mt-4">
            {gifOptions.map((g) => (
              <Tooltip key={g.src}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      setCurrentGif(g.src);
                      setModalOpen(false);
                    }}
                    className="rounded-md overflow-hidden ring-1 ring-slate-200/10 hover:scale-105 transition-transform"
                  >
                    <img src={g.src} alt={g.name} className="w-20 h-20 object-cover" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <span>{g.name}</span>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
