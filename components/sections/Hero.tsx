"use client";

import { useTranslations } from "next-intl";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { useInView } from "@/hooks/useInView";

export function Hero() {
  const t = useTranslations("hero");
  const { ref, state } = useInView({ threshold: 0.1 });

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
      className={`relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[var(--color-navy)] px-6 py-24 ${animationClass}`}
      aria-labelledby="hero-heading"
    >
      {/* Aurora borealis background — drifting blue & red auras */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {/* Blue aura — positioned container, inner div drifts */}
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2">
          <div className="animate-aurora-blue h-full w-full rounded-full bg-[var(--color-blue)] blur-[120px]" />
        </div>
        {/* Red aura — positioned container, inner div drifts */}
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px]">
          <div className="animate-aurora-red h-full w-full rounded-full bg-[var(--color-red)] blur-[100px]" />
        </div>
      </div>

      {/* AD Monogram Crest */}
      <div
        className="relative mb-10 flex h-28 w-28 items-center justify-center"
        aria-label="Alisson Davi logo"
      >
        {/* Radar ring — outer blue pulsing */}
        <div
          className="absolute inset-[-6px] animate-radar rounded-full border-2 border-[var(--color-blue)]/70 shadow-[0_0_30px_var(--color-blue-glow)]"
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
        <span className="font-heading text-4xl font-bold text-white">
          AD
        </span>
      </div>

      {/* Name */}
      <h1
        id="hero-heading"
        className="font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
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

      {/* CTA Buttons */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <a
          href="#projects"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-blue)] px-6 py-3 font-heading text-sm font-semibold text-white transition-all duration-300 hover:bg-[var(--color-blue-light)] hover:shadow-[0_0_30px_var(--color-blue-glow)]"
        >
          {t("cta_projects")}
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--color-blue)] px-6 py-3 font-heading text-sm font-semibold text-[var(--color-blue)] transition-all duration-300 hover:bg-[var(--color-blue)] hover:text-white hover:shadow-[0_0_30px_var(--color-blue-glow)]"
        >
          {t("cta_resume")}
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2" aria-hidden="true">
        <span className="text-xs text-[var(--color-gray-dark)]">
          {t("scroll_down")}
        </span>
        <div className="h-8 w-5 rounded-full border border-[var(--color-blue)]/50">
          <div className="mx-auto mt-1.5 h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-blue)]" />
        </div>
      </div>
    </section>
  );
}
