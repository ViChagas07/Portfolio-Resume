"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMouseOrbs } from "@/hooks/useMouseOrbs";
import { useShakeOrbs } from "@/hooks/useShakeOrbs";

/* ── Orb definition ── */
interface OrbDef {
  id: number;
  color: "blue" | "red" | "white";
  floatAnim: 1 | 2 | 3;
  reverse: boolean;
  duration: number;
  parallaxFactor: number; // px multiplier
}

const ORBS: OrbDef[] = [
  { id: 1, color: "blue",  floatAnim: 1, reverse: false, duration: 14, parallaxFactor: 28 },
  { id: 2, color: "red",   floatAnim: 2, reverse: false, duration: 18, parallaxFactor: 18 },
  { id: 3, color: "blue",  floatAnim: 3, reverse: false, duration: 12, parallaxFactor: 35 },
  { id: 4, color: "red",   floatAnim: 1, reverse: true,  duration: 20, parallaxFactor: 22 },
  { id: 5, color: "white", floatAnim: 2, reverse: false, duration: 16, parallaxFactor: 12 },
  { id: 6, color: "blue",  floatAnim: 3, reverse: true,  duration: 22, parallaxFactor: 30 },
];

/* ── Single orb ── */
function Orb({
  def,
  mouseX,
  mouseY,
  isShaking,
}: {
  def: OrbDef;
  mouseX: number;
  mouseY: number;
  isShaking: boolean;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isBursting, setIsBursting] = useState(false);

  const posClass = `orb-pos-${def.id}`;
  const colorClass = `orb-${def.color}`;

  // Mouse parallax
  const tx = mouseX * def.parallaxFactor;
  const ty = mouseY * def.parallaxFactor;

  // Idle float animation (inline — guaranteed to run)
  const dirSuffix = def.reverse ? " reverse" : "";
  const floatAnim = `orb-float-${def.floatAnim} ${def.duration}s ease-in-out infinite${dirSuffix}`;

  // Shake burst trigger
  useEffect(() => {
    if (!isShaking) return;
    const el = wrapperRef.current;
    if (!el) return;

    const sx = (Math.random() - 0.5) * 80;
    const sy = (Math.random() - 0.5) * 80;
    el.style.setProperty("--sx", `${sx}px`);
    el.style.setProperty("--sy", `${sy}px`);
    setIsBursting(true);

    const timer = setTimeout(() => setIsBursting(false), 800);
    return () => clearTimeout(timer);
  }, [isShaking]);

  return (
    <div
      ref={wrapperRef}
      data-orb=""
      className={`absolute ${posClass}`}
      style={{
        animation: isBursting
          ? "orb-burst 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards"
          : floatAnim,
        willChange: "transform",
        transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
      aria-hidden="true"
    >
      <div
        data-orb=""
        className={`orb h-full w-full ${colorClass}`}
        style={{
          transform: `translate(${tx}px, ${ty}px)`,
          willChange: "transform",
          transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      />
    </div>
  );
}

/* ── Main component ── */
export function GlobalOrbBackground() {
  const mouse = useMouseOrbs();
  const { isShaking, showBanner, requestPermission, dismissBanner } = useShakeOrbs();
  const [bannerClosing, setBannerClosing] = useState(false);

  const handleDismiss = useCallback(() => {
    setBannerClosing(true);
    setTimeout(() => {
      dismissBanner();
      setBannerClosing(false);
    }, 300);
  }, [dismissBanner]);

  return (
    <>
      {/* ── Orb layer ── */}
      <div id="global-orbs-bg" aria-hidden="true">
        {ORBS.map((def) => (
          <Orb
            key={def.id}
            def={def}
            mouseX={mouse.x}
            mouseY={mouse.y}
            isShaking={isShaking}
          />
        ))}
      </div>

      {/* ── iOS Shake permission banner ── */}
      {showBanner && (
        <div
          className={`shake-permission-banner${bannerClosing ? " dismissing" : ""}`}
          role="alert"
          aria-live="polite"
        >
          <span>Shake your device to interact with the background ✦</span>
          <button
            onClick={requestPermission}
            className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold transition-colors hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            Allow
          </button>
          <button
            onClick={handleDismiss}
            className="ml-1 text-white/60 transition-colors hover:text-white"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
