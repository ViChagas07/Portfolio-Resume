"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { useInView } from "@/hooks/useInView";

export function Hero() {
  const t = useTranslations("hero");
  const { ref, state } = useInView({ threshold: 0.1 });
  const [resumeOpen, setResumeOpen] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!resumeOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (resumeRef.current && !resumeRef.current.contains(e.target as Node)) {
        setResumeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [resumeOpen]);

  const typingWords: string[] = t.raw("typing_words");
  const typedText = useTypingEffect(typingWords);

  const animationClass =
    state === "visible"
      ? "animate-on-scroll visible"
      : state === "exit"
        ? "animate-on-scroll exit"
        : "animate-on-scroll below";

  return (
    <section
      id="hero"
      ref={ref}
      className={`relative flex min-h-[100dvh] flex-col items-center justify-center overflow-x-clip px-4 md:px-6 lg:px-12 pt-20 md:pt-24 pb-32 md:pb-36 ${animationClass}`}
      aria-labelledby="hero-heading"
    >
      {/* AD Monogram Crest */}
      <div
        className="relative mb-10 flex h-40 w-40 items-center justify-center"
        aria-label="Alisson Davi logo"
      >
        {/* Radar ring — outer blue pulsing */}
        <div
          className="absolute inset-[-8px] animate-radar rounded-full border-2 border-[var(--color-blue)]/70 shadow-[0_0_30px_var(--color-blue-glow)]"
          aria-hidden="true"
        />
        {/* Middle red ring */}
        <div
          className="absolute inset-0 rounded-full border-2 border-[var(--color-red)]/60"
          aria-hidden="true"
        />
        {/* Inner red ring */}
        <div
          className="absolute inset-[5px] rounded-full border border-[var(--color-red)]/40"
          aria-hidden="true"
        />
        <span className="relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-full">
          <Image
            src="/profile.jpg"
            alt="Alisson Davi"
            fill
            sizes="144px"
            className="object-cover"
            priority
          />
        </span>
      </div>

      {/* Name */}
      <h1
        id="hero-heading"
        className="font-heading text-[2.5rem] font-bold leading-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl"
      >
        {t("name")}
      </h1>

      {/* Subtitle */}
      <p className="mt-4 font-heading text-xl font-semibold text-[var(--color-blue)] sm:text-2xl">
        {t("subtitle")}
      </p>

      {/* Location */}
      <p className="mt-3 text-sm text-[var(--color-gray)]">
        {t("location")}
      </p>

      {/* Typing effect */}
      <div
        className="mt-8 flex items-center gap-2 font-mono text-sm text-[var(--color-gray-light)]"
        aria-live="polite"
      >
        <span className="text-[var(--color-red)]">&gt;</span>
        <span>{typedText}</span>
        <span className="inline-block h-4 w-0.5 animate-pulse bg-[var(--color-red)]" aria-hidden="true" />
      </div>

      <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
        <a
          href="#projects"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-blue)] px-6 py-3 font-heading text-sm font-semibold text-white transition-all duration-300 hover:bg-[var(--color-blue-light)] hover:shadow-[0_0_30px_var(--color-blue-glow)] sm:w-auto sm:min-w-[44px]"
        >
          {t("cta_projects")}
        </a>
        <div className="relative" ref={resumeRef}>
          <button
            onClick={() => setResumeOpen((o) => !o)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--color-blue)] px-6 py-3 font-heading text-sm font-semibold text-[var(--color-blue)] transition-all duration-300 hover:bg-[var(--color-blue)] hover:text-white hover:shadow-[0_0_30px_var(--color-blue-glow)] sm:w-auto sm:min-w-[44px]"
          >
            {t("cta_resume")}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 transition-transform duration-200" style={{ transform: resumeOpen ? "rotate(180deg)" : "rotate(0deg)" }} aria-hidden="true">
              <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </button>
          {resumeOpen && (
            <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-[var(--color-blue)]/40 bg-[var(--color-navy-light)] py-2 shadow-[0_0_30px_var(--color-blue-glow)] sm:left-auto">
              <a
                href="/resume-en.pdf"
                download
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-gray)] transition-colors hover:bg-[var(--color-blue)]/10 hover:text-white"
              >
                <span className="text-lg">🇺🇸</span>
                <span>EN — English</span>
              </a>
              <a
                href="/resume-pt.pdf"
                download
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-gray)] transition-colors hover:bg-[var(--color-blue)]/10 hover:text-white"
              >
                <span className="text-lg">🇧🇷</span>
                <span>PT-BR — Português</span>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 flex flex-col items-center gap-2" aria-hidden="true">
        <span className="text-xs text-[var(--color-gray-dark)]">
          {t("scroll_down")}
        </span>
        <div className="relative flex h-8 w-5 items-end justify-center rounded-full border border-[var(--color-blue)]/50 pb-1">
          <div className="h-1.5 w-1.5 animate-scroll-dot rounded-full bg-[var(--color-blue)]" />
        </div>
      </div>
    </section>
  );
}
