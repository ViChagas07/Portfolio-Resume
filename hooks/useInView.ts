"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollDirection } from "./useScrollDirection";

interface UseInViewOptions {
  /** IntersectionObserver threshold (0–1) */
  threshold?: number;
  /** IntersectionObserver rootMargin */
  rootMargin?: string;
  /** Whether to animate once only (default: false = moonwalk both ways) */
  once?: boolean;
}

type InViewState = "below" | "visible" | "exit";

/**
 * Tracks element visibility with scroll-direction awareness
 * for the moonwalk effect. Returns a ref to attach + the current state.
 *
 * States:
 * - "below": element hasn't entered viewport yet
 * - "visible": element is in viewport
 * - "exit": element has left the viewport (scrolled past)
 */
export function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0.15, rootMargin = "0px 0px -10% 0px", once = false } = options;
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<InViewState>("below");
  const scrollDirection = useScrollDirection();
  const hasBeenVisible = useRef(false);
  const prevInView = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nowInView = entry.isIntersecting;

        if (once && hasBeenVisible.current) return;

        if (nowInView && !prevInView.current) {
          // Entering
          setState("visible");
          hasBeenVisible.current = true;
        } else if (!nowInView && prevInView.current) {
          // Exiting
          if (scrollDirection === "down") {
            // Scrolled past → mark as exit (above viewport)
            setState("exit");
          } else if (scrollDirection === "up") {
            // Scrolling back up → element goes back to below
            setState("below");
          }
        }

        prevInView.current = nowInView;
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, scrollDirection]);

  // When scrolling up and element is above viewport, reset to "below"
  useEffect(() => {
    if (scrollDirection === "up" && prevInView.current === false && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      if (rect.bottom < 0) {
        setState("below");
        hasBeenVisible.current = false;
      }
    }
  }, [scrollDirection]);

  return { ref, state };
}
