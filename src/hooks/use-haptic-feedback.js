"use client";

import { useCallback } from "react";

export const useHapticFeedback = () => {
  const triggerHaptic = useCallback((type = "light") => {
    if (typeof window === "undefined") return;

    try {
      if ("vibrate" in navigator) {
        let pattern = 10;
        switch (type) {
          case "light":
            pattern = 10;
            break;
          case "medium":
            pattern = 20;
            break;
          case "heavy":
            pattern = 40;
            break;
          case "selection":
            pattern = [10];
            break;
          case "impact":
            pattern = [15, 10, 15];
            break;
        }

        navigator.vibrate(pattern);
      }
      // For iOS devices with haptic feedback support
      // @ts-expect-error - This is for iOS Safari haptic feedback
      if (
        window.DeviceMotionEvent &&
        typeof window.DeviceMotionEvent.requestPermission === "function"
      ) {
        // iOS haptic feedback through AudioContext (workaround)
        const AudioContextClass = window.AudioContext.webkitAudioContext;
        const audioContext = new AudioContextClass();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.01
        );
        gainNode.gain.linearRampToValueAtTime(
          0,
          audioContext.currentTime + 0.02
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.02);
      }
    } catch (error) {
      // Silently fail if haptic feedback is not supported
      console.debug("Haptic feedback not supported:", error);
    }
  }, []);

  const isMobile = useCallback(() => {
    if (typeof window === "undefined") return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }, []);

  return {
    triggerHaptic,
    isMobile,
    isSupported: typeof navigator !== "undefined" && "vibrate" in navigator,
  };
};
