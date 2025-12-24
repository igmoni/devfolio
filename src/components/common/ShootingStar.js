"use client";

import { usePathname } from "next/navigation";

export default function ShootingStar() {
  const pathname = usePathname();

  return (
    <div
      key={pathname} // 👈 THIS is the magic
      className="fixed inset-0 -z-10 pointer-events-none isolate"
    >
      <div
        className="
          absolute top-0 right-0
          md:w-[800px] w-[300px] h-5
          bg-linear-to-l 
            dark:from-white/80 dark:via-white/50
          blur-2xl
          opacity-60

          dark:shadow-[0_0_40px_12px_rgba(255,255,255,0.6)]
          md:animate-[shooting-once_1.6s_ease-out_forwards]
          animate-[shooting-once-mobile_1s_ease-out_forwards]
        "
      />
    </div>
  );
}
