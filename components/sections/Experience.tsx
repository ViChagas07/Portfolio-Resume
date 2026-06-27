"use client";

import { useTranslations } from "next-intl";
import { useInView } from "@/hooks/useInView";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TIMELINE_ITEMS, CERTIFICATIONS } from "@/lib/constants";

function TimelineDot({ color }: { color: "blue" | "red" }) {
  return (
    <div
      className={`absolute left-1/2 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[var(--color-navy)] ${
        color === "blue" ? "bg-[var(--color-blue)]" : "bg-[var(--color-red)]"
      }`}
      aria-hidden="true"
    />
  );
}

export function Experience() {
  const t = useTranslations();
  const { ref, state } = useInView({ threshold: 0.05 });

  const animationClass =
    state === "visible"
      ? "animate-on-scroll visible"
      : state === "exit"
        ? "animate-on-scroll exit"
        : "animate-on-scroll below";

  return (
    <section
      id="experience"
      ref={ref}
      className={`${animationClass} mx-auto max-w-6xl px-6 py-24`}
      aria-labelledby="experience-title"
    >
      <SectionTitle title={t("experience.title")} />

      <div className="relative">
        {/* Vertical timeline line */}
        <div
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-[var(--color-blue)] via-[var(--color-navy-lighter)] to-[var(--color-red)]"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-8">
          {TIMELINE_ITEMS.map((item, idx) => (
            <div
              key={item.key}
              className={`relative flex w-full ${
                item.side === "left"
                  ? "justify-start md:pr-[50%]"
                  : "justify-end md:pl-[50%]"
              }`}
            >
              <TimelineDot color={idx % 2 === 0 ? "blue" : "red"} />

              <div
                className={`w-full rounded-xl border border-[var(--color-navy-lighter)] bg-[var(--color-navy-light)] p-5 transition-all duration-300 hover:border-[var(--color-blue)]/30 ${
                  item.side === "left" ? "md:mr-8" : "md:ml-8"
                }`}
              >
                <h3 className="font-heading text-lg font-bold text-white">
                  {t(`${item.titleKey}`)}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-blue)]">
                  {t(`${item.subtitleKey}`)}
                </p>
                <p className="mt-2 text-xs text-[var(--color-gray-dark)]">
                  {t(`${item.periodKey}`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education section */}
      <div className="mt-24">
        <SectionTitle title={t("experience.education_title")} />
      </div>

      {/* Certifications */}
      <div className="mt-6">
        <h3 className="mb-6 font-heading text-xl font-bold text-white">
          {t("certifications.title")}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {CERTIFICATIONS.map((cert) => (
            <article
              key={cert.key}
              className="rounded-xl border border-[var(--color-navy-lighter)] bg-[var(--color-navy-light)] p-5 transition-all duration-300 hover:border-[var(--color-blue)]/30"
            >
              <h4 className="font-heading text-base font-semibold text-white">
                {t(`${cert.nameKey}`)}
              </h4>
              <p className="mt-1 text-sm text-[var(--color-gray)]">
                {t(`${cert.issuerKey}`)}
              </p>
              <div className="mt-2 flex gap-3 text-xs text-[var(--color-gray-dark)]">
                <span>{t(`${cert.hoursKey}`)}</span>
                <span aria-hidden="true">·</span>
                <span>{t(`${cert.yearKey}`)}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
