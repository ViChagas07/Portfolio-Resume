"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/lib/navigation";
import { SUPPORTED_LOCALES, type LocaleMeta } from "@/lib/constants";

export function LanguageSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const currentLocale = SUPPORTED_LOCALES.find((l) => l.code === locale) ?? SUPPORTED_LOCALES[0];
  const isRtl = currentLocale.dir === "rtl";

  const close = useCallback(() => {
    setOpen(false);
    setFocusedIndex(-1);
    triggerRef.current?.focus();
  }, []);

  const selectLocale = useCallback(
    (meta: LocaleMeta) => {
      // Persist preference
      if (typeof window !== "undefined") {
        localStorage.setItem("preferred_locale", meta.code);
      }
      router.replace(pathname, { locale: meta.code });
      close();
    },
    [router, pathname, close]
  );

  // Keyboard handling
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          close();
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev < SUPPORTED_LOCALES.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev > 0 ? prev - 1 : SUPPORTED_LOCALES.length - 1
          );
          break;
        case "Enter":
          if (focusedIndex >= 0) {
            e.preventDefault();
            selectLocale(SUPPORTED_LOCALES[focusedIndex]);
          }
          break;
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, close, focusedIndex, selectLocale]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        listRef.current?.contains(target)
      )
        return;
      close();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, close]);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "Enter") {
            e.preventDefault();
            setOpen(true);
            setFocusedIndex(0);
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("languageLabel")}
        className="flex items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.05] px-3.5 py-1.5 text-[13px] text-white transition-all duration-200 hover:border-[var(--color-blue)]/60 hover:bg-[var(--color-blue)]/10 focus-visible:outline-2 focus-visible:outline-[var(--color-blue)]"
      >
        {/* Globe icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="font-medium">{currentLocale.nativeLabel}</span>
        {/* Chevron */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""} ${isRtl ? "rtl-flip" : ""}`}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          aria-label={t("languageLabel")}
          className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-[var(--color-blue)]/40 bg-[var(--color-navy-light)] py-2 shadow-[0_0_30px_var(--color-blue-glow)] animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {SUPPORTED_LOCALES.map((meta, idx) => (
            <li
              key={meta.code}
              role="option"
              aria-selected={meta.code === locale}
              onClick={() => selectLocale(meta)}
              onMouseEnter={() => setFocusedIndex(idx)}
              className={`flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                meta.code === locale
                  ? "bg-[var(--color-blue)]/15 text-white"
                  : "text-[var(--color-gray)] hover:bg-[var(--color-blue)]/10 hover:text-white"
              } ${focusedIndex === idx ? "bg-[var(--color-blue)]/10 text-white" : ""}`}
            >
              <span>{meta.nativeLabel}</span>
              {meta.code === locale && (
                <span className="h-2 w-2 rounded-full bg-[var(--color-blue)]" aria-hidden="true" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
