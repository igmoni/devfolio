"use client";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

export default function ShootingStar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  return (
    <div
      key={pathname}
      className="pointer-events-none fixed inset-0 isolate -z-10"
    >
      <div className="absolute top-0 right-0 h-5 w-[300px] animate-[shooting-once-mobile_1s_ease-out_forwards] bg-linear-to-l opacity-60 blur-2xl md:w-[800px] md:animate-[shooting-once_1.6s_ease-out_forwards] dark:from-white/80 dark:via-white/50 dark:shadow-[0_0_40px_12px_rgba(255,255,255,0.6)]" />
    </div>
  );
}
