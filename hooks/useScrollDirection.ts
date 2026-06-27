"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks scroll direction: "up" | "down" | null.
 * Used by the moonwalk effect to determine whether elements
 * are entering or exiting the viewport.
 */
export function useScrollDirection(): "up" | "down" | null {
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const current = window.scrollY;
      if (current > lastScrollY.current + 5) {
        setDirection("down");
      } else if (current < lastScrollY.current - 5) {
        setDirection("up");
      }
      lastScrollY.current = current;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return direction;
}
