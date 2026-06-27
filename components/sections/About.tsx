"use client";

import { useTranslations } from "next-intl";
import { useInView } from "@/hooks/useInView";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function About() {
  const t = useTranslations("about");
  const { ref, state } = useInView({ threshold: 0.1 });

  const animationClass =
    state === "visible"
      ? "animate-on-scroll visible"
      : state === "exit"
        ? "animate-on-scroll exit"
        : "animate-on-scroll below";

  return (
    <section
      id="about"
      ref={ref}
      className={`${animationClass} mx-auto max-w-6xl px-6 py-24`}
      aria-labelledby="about-title"
    >
      <SectionTitle title={t("title")} />

      <div className="flex flex-col gap-10 md:flex-row md:gap-16">
        {/* Left: decorative monogram */}
        <div className="flex-shrink-0" aria-hidden="true">
          <div className="relative mx-auto flex h-48 w-48 items-center justify-center md:h-56 md:w-56">
            {/* Glowing blue circle */}
            <div className="absolute inset-0 rounded-full bg-[var(--color-blue)]/10 shadow-[0_0_60px_var(--color-blue-glow)]" />
            {/* Outer ring */}
            <div className="absolute inset-2 rounded-full border border-[var(--color-blue)]/30" />
            {/* Inner red accent */}
            <div className="absolute inset-4 rounded-full border border-dashed border-[var(--color-red)]/20" />
            {/* Monogram */}
            <span className="font-heading text-5xl font-bold text-white md:text-6xl">
              AD
            </span>
          </div>
        </div>

        {/* Right: bio text */}
        <div className="flex flex-col gap-4 text-base leading-relaxed text-[var(--color-gray-light)] md:text-lg">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          <p>{t("p3")}</p>
        </div>
      </div>
    </section>
  );
}
