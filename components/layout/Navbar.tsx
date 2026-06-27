"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

const NAV_ITEMS = [
  { key: "about", href: "#about" },
  { key: "skills", href: "#skills" },
  { key: "projects", href: "#projects" },
  { key: "experience", href: "#experience" },
  { key: "contact", href: "#contact" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // ── Active section detection via IntersectionObserver ──
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.slice(1));
    const observers: IntersectionObserver[] = [];

    // Track the most recently entered section
    const visibleSections = new Map<string, IntersectionObserverEntry>();

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.set(id, entry);
            } else {
              visibleSections.delete(id);
            }
          });

          // Pick the section with the highest intersection ratio
          if (visibleSections.size > 0) {
            let best = "";
            let bestRatio = 0;
            visibleSections.forEach((entry, sectionId) => {
              if (entry.intersectionRatio > bestRatio) {
                bestRatio = entry.intersectionRatio;
                best = sectionId;
              }
            });
            setActiveSection(best);
          }
        },
        {
          rootMargin: "-80px 0px -60% 0px",
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // Close mobile menu on route change (hash links)
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const linkClass = (section: string) => {
    const isActive = activeSection === section;
    return [
      "nav-link",
      "relative text-[14px] font-medium transition-colors duration-200",
      isActive
        ? "text-white"
        : "text-white/[0.75] hover:text-white",
      // Underline pseudo-element
      isActive
        ? "after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-[var(--color-blue)] after:content-['']"
        : "after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-[var(--color-blue)] after:transition-[width] after:duration-200 after:content-[''] hover:after:w-full",
    ].join(" ");
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[rgba(5,13,26,0.85)] backdrop-blur-[12px]"
    >
      <nav
        className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-12"
        aria-label="Main navigation"
      >
        {/* ── LEFT: Logo + Brand ── */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-85"
          aria-label="Alisson Davi — Home"
        >
          {/* AD Monogram Circle (mirrors hero crest style) */}
          <div
            className="relative flex h-10 w-10 shrink-0 items-center justify-center"
            aria-hidden="true"
          >
            {/* Outer blue ring */}
            <div
              className="absolute inset-[-2px] rounded-full border border-[var(--color-blue)]/70"
              aria-hidden="true"
            />
            {/* Inner red ring */}
            <div
              className="absolute inset-[3px] rounded-full border border-[var(--color-red)]/50"
              aria-hidden="true"
            />
            <span className="font-heading text-lg font-bold text-white">
              AD
            </span>
          </div>
          <span className="text-[15px] font-semibold text-white">
            Alisson Davi
          </span>
        </Link>

        {/* ── CENTER: Nav links (absolutely centered) ── */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0 md:flex">
          {NAV_ITEMS.map((item, idx) => (
            <li key={item.key} className="flex items-center">
              {/* Interpunct separator before every item except the first */}
              {idx > 0 && (
                <span
                  className="mx-4 text-[14px] text-white/[0.2] select-none"
                  aria-hidden="true"
                >
                  ·
                </span>
              )}
              <a
                href={item.href}
                className={linkClass(item.key)}
              >
                {t(item.key)}
              </a>
            </li>
          ))}
        </ul>

        {/* ── RIGHT: Language switcher (desktop) + mobile hamburger ── */}
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded-lg p-2 text-[var(--color-gray)] transition-colors hover:text-white hover:bg-[var(--color-navy-lighter)] md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
              aria-hidden="true"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="border-t border-white/[0.06] bg-[rgba(5,13,26,0.95)] backdrop-blur-[12px] md:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.key;
                return (
                  <li key={item.key}>
                    <a
                      href={item.href}
                      onClick={closeMobile}
                      className={`block rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors ${
                        isActive
                          ? "bg-[var(--color-blue)]/15 text-white"
                          : "text-white/[0.75] hover:text-white hover:bg-[var(--color-navy-lighter)]"
                      }`}
                    >
                      {t(item.key)}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Language switcher inside mobile menu */}
            <div className="mt-3 border-t border-white/[0.06] pt-3">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
