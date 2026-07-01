"use client";

import Image from "next/image";
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
      className={`${animationClass} mx-auto max-w-6xl px-4 md:px-6 lg:px-12 py-20 md:py-24`}
      aria-labelledby="about-title"
    >
      <SectionTitle title={t("title")} />

      <div className="flex flex-col gap-10 md:flex-row md:gap-16">
        {/* Left: decorative monogram */}
        <div className="flex-shrink-0" aria-hidden="true">
          <div className="relative mx-auto flex h-64 w-64 items-center justify-center md:h-72 md:w-72">
            {/* Glowing blue circle */}
            <div className="absolute inset-0 rounded-full bg-[var(--color-blue)]/10 shadow-[0_0_60px_var(--color-blue-glow)]" />
            {/* Outer ring */}
            <div className="absolute inset-2 rounded-full border border-[var(--color-blue)]/30" />
            {/* Solid red ring */}
            <div className="absolute inset-3 rounded-full border border-[var(--color-red)]/50" />
            {/* Inner red accent */}
            <div className="absolute inset-4 rounded-full border border-dashed border-[var(--color-red)]/20" />
            {/* Profile photo */}
            <span className="relative flex h-56 w-56 items-center justify-center overflow-hidden rounded-full md:h-64 md:w-64">
              <Image
                src="/about-profile.png"
                alt="Alisson Davi"
                fill
                sizes="(max-width: 768px) 224px, 256px"
                className="object-cover object-[center_20%]"
              />
            </span>
          </div>
        </div>

        {/* Right: bio text */}
        <div className="flex flex-col gap-4 text-base leading-relaxed text-[var(--color-gray-light)] md:text-lg">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          {t("p3") && <p>{t("p3")}</p>}
        </div>
      </div>
    </section>
  );
}
