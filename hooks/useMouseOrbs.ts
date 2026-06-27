"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks normalized mouse position (-1 to 1 range) with rAF throttling.
 * Disabled on mobile (<768px) — returns { x: 0, y: 0 }.
 */
export function useMouseOrbs() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const latest = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Skip on mobile — parallax effect is for desktop only
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    const handleMove = (e: MouseEvent) => {
      latest.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2, // -1 to 1
        y: (e.clientY / window.innerHeight - 0.5) * 2, // -1 to 1
      };

      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(() => {
          setMouse({ ...latest.current });
          rafId.current = null;
        });
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return mouse;
}
