"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SHAKE_THRESHOLD = 15; // m/s²
const SHAKE_RESET_MS = 800;
const PERMISSION_KEY = "motion_permission";

/**
 * Detects device shake via DeviceMotionEvent.
 * - Returns shake state + iOS permission banner info.
 * - Only activates on touch devices (mobile).
 */
export function useShakeOrbs() {
  const [isShaking, setIsShaking] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const lastAccel = useRef({ x: 0, y: 0, z: 0 });
  const shakeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const listening = useRef(false);

  /* ── Trigger shake burst ── */
  const triggerShake = useCallback(() => {
    setIsShaking(true);
    if (shakeTimer.current) clearTimeout(shakeTimer.current);
    shakeTimer.current = setTimeout(() => setIsShaking(false), SHAKE_RESET_MS);
  }, []);

  /* ── Request iOS permission ── */
  const requestPermission = useCallback(async () => {
    try {
      if (
        typeof DeviceMotionEvent !== "undefined" &&
        typeof (DeviceMotionEvent as unknown as { requestPermission: () => Promise<"granted" | "denied"> }).requestPermission === "function"
      ) {
        const status = await (
          DeviceMotionEvent as unknown as { requestPermission: () => Promise<"granted" | "denied"> }
        ).requestPermission();
        if (status === "granted") {
          setPermissionGranted(true);
          setShowBanner(false);
          localStorage.setItem(PERMISSION_KEY, "granted");
        }
      } else {
        // Non-iOS or older — just mark as granted
        setPermissionGranted(true);
        setShowBanner(false);
        localStorage.setItem(PERMISSION_KEY, "granted");
      }
    } catch {
      // Permission denied or error — hide banner
      setShowBanner(false);
      localStorage.setItem(PERMISSION_KEY, "denied");
    }
  }, []);

  const dismissBanner = useCallback(() => {
    setShowBanner(false);
    localStorage.setItem(PERMISSION_KEY, "dismissed");
  }, []);

  /* ── Init: check permission state ── */
  useEffect(() => {
    // Only on touch-capable devices
    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    if (!isTouchDevice) return;

    const stored = localStorage.getItem(PERMISSION_KEY);

    if (stored === "granted") {
      setPermissionGranted(true);
    } else if (stored === "denied" || stored === "dismissed") {
      // Already handled
    } else {
      // First visit — show banner with auto-dismiss
      setShowBanner(true);
      const timer = setTimeout(() => {
        setShowBanner(false);
        localStorage.setItem(PERMISSION_KEY, "dismissed");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  /* ── Listen to device motion ── */
  useEffect(() => {
    if (!permissionGranted || listening.current) return;
    listening.current = true;

    const handleMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc || acc.x === null || acc.y === null || acc.z === null) return;

      const prev = lastAccel.current;
      const delta =
        Math.abs(acc.x - prev.x) +
        Math.abs(acc.y - prev.y) +
        Math.abs(acc.z - prev.z);

      if (delta > SHAKE_THRESHOLD) {
        triggerShake();
      }

      lastAccel.current = {
        x: acc.x ?? 0,
        y: acc.y ?? 0,
        z: acc.z ?? 0,
      };
    };

    window.addEventListener("devicemotion", handleMotion, { passive: true });
    return () => {
      window.removeEventListener("devicemotion", handleMotion);
      listening.current = false;
    };
  }, [permissionGranted, triggerShake]);

  return { isShaking, showBanner, requestPermission, dismissBanner };
}
