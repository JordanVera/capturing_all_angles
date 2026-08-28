"use client";

import { useEffect, useRef } from "react";
import { playHoverSound, unlockHoverSound } from "@/lib/hover-sound";

const SOUND_SELECTORS = "a, button, [data-hover-sound], label, select, summary";

export function HoverSound() {
  const unlocked = useRef(false);

  useEffect(() => {
    const unlock = () => {
      if (unlocked.current) return;
      unlocked.current = true;
      unlockHoverSound();
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest(SOUND_SELECTORS)) return;
      if (window.matchMedia("(hover: none)").matches) return;
      playHoverSound();
    };

    document.addEventListener("pointerdown", unlock, { capture: true });
    document.addEventListener("keydown", unlock, { capture: true });
    document.addEventListener("mouseover", onOver);

    return () => {
      document.removeEventListener("pointerdown", unlock, { capture: true });
      document.removeEventListener("keydown", unlock, { capture: true });
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  return null;
}