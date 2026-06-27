"use client";

import { useTranslations } from "next-intl";
import { useInView } from "@/hooks/useInView";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TIMELINE_ITEMS, CERTIFICATIONS } from "@/lib/constants";

/* ── Timeline dot marker ── */
function Dot({ color, className = "" }: { color: "blue" | "red"; className?: string }) {
  return (
    <div
      className={`absolute z-10 h-3 w-3 rounded-full border-2 border-[var(--color-navy)] ${
        color === "blue" ? "bg-[var(--color-blue)]" : "bg-[var(--color-red)]"
      } ${className}`}
      aria-hidden="true"
    />
  );
}

/* ── Reusable card ── */
function Card({
  title,
  subtitle,
  period,
}: {
  title: string;
  subtitle: string;
  period: string;
}) {
  return (
    <div className="card-mobile-pulse w-full rounded-xl border border-[var(--color-navy-lighter)] bg-[var(--color-navy-light)] p-5 transition-all duration-300 hover:border-[var(--color-blue)]/30">
      <h3 className="font-heading text-lg font-bold text-white">{title}</h3>
      <p className="mt-1 text-sm text-[var(--color-blue)]">{subtitle}</p>
      <p className="mt-2 text-xs text-[var(--color-gray-dark)]">{period}</p>
    </div>
  );
}

/* ── Certification card ── */
function CertCard({
  name,
  issuer,
  hours,
  year,
}: {
  name: string;
  issuer: string;
  hours: string;
  year: string;
}) {
  return (
    <article className="card-mobile-pulse rounded-xl border border-[var(--color-navy-lighter)] bg-[var(--color-navy-light)] p-5 transition-all duration-300 hover:border-[var(--color-blue)]/30">
      <h4 className="font-heading text-base font-semibold text-white">{name}</h4>
      <p className="mt-1 text-sm text-[var(--color-gray)]">{issuer}</p>
      <div className="mt-2 flex gap-3 text-xs text-[var(--color-gray-dark)]">
        <span>{hours}</span>
        <span aria-hidden="true">·</span>
        <span>{year}</span>
      </div>
    </article>
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

  const leftItems = TIMELINE_ITEMS.filter((i) => i.side === "left");
  const rightItems = TIMELINE_ITEMS.filter((i) => i.side === "right");

  return (
    <section
      id="experience"
      ref={ref}
      className={`${animationClass} mx-auto max-w-6xl px-4 md:px-6 lg:px-12 py-20 md:py-24`}
      aria-labelledby="experience-title"
    >
      <SectionTitle title={t("experience.title")} />

      {/* ═══════ MOBILE: single column, centered timeline ═══════ */}
      <div className="relative lg:hidden">
        <div
          className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-[var(--color-blue)] via-[var(--color-navy-lighter)] to-[var(--color-red)]"
          aria-hidden="true"
        />
        <div className="flex flex-col gap-8">
          {TIMELINE_ITEMS.map((item, idx) => (
            <div key={item.key} className="relative">
              <Dot
                color={idx % 2 === 0 ? "blue" : "red"}
                className="left-1/2 top-6 -translate-x-1/2"
              />
              <Card
                title={t(`${item.titleKey}`)}
                subtitle={t(`${item.subtitleKey}`)}
                period={t(`${item.periodKey}`)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ═══════ DESKTOP: two-column mirrored grid ═══════ */}
      <div className="relative hidden lg:grid lg:grid-cols-[1fr_2px_1fr] lg:gap-x-12">
        {/* Center timeline spine — gradient blue → red */}
        <div className="relative col-start-2 row-start-1" aria-hidden="true">
          <div className="absolute inset-0 w-0.5 left-1/2 -translate-x-1/2 bg-gradient-to-b from-[var(--color-blue)] to-[var(--color-red)]" />
        </div>

        {/* Left column: Experience */}
        <div className="col-start-1 row-start-1 flex flex-col gap-8">
          {leftItems.map((item, idx) => (
            <div key={item.key} className="relative flex justify-end">
              {/* Dot on center line (extends past right edge of card) */}
              <Dot
                color={idx % 2 === 0 ? "blue" : "red"}
                className="-right-[49px] top-6"
              />
              <div className="w-[calc(100%-2rem)]">
                <Card
                  title={t(`${item.titleKey}`)}
                  subtitle={t(`${item.subtitleKey}`)}
                  period={t(`${item.periodKey}`)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right column: Education */}
        <div className="col-start-3 row-start-1 flex flex-col gap-8 pt-8">
          {rightItems.map((item, idx) => (
            <div key={item.key} className="relative flex justify-start">
              {/* Dot on center line (extends past left edge of card) */}
              <Dot
                color={(leftItems.length + idx) % 2 === 0 ? "blue" : "red"}
                className="-left-[49px] top-6"
              />
              <div className="w-[calc(100%-2rem)]">
                <Card
                  title={t(`${item.titleKey}`)}
                  subtitle={t(`${item.subtitleKey}`)}
                  period={t(`${item.periodKey}`)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════ Certifications ═══════ */}
      <div className="mt-20 md:mt-24">
        <SectionTitle title={t("experience.education_title")} />
      </div>

      <div className="mt-6">
        <h3 className="mb-6 font-heading text-xl font-bold text-white text-center lg:text-left">
          {t("certifications.title")}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {CERTIFICATIONS.map((cert) => (
            <CertCard
              key={cert.key}
              name={t(`${cert.nameKey}`)}
              issuer={t(`${cert.issuerKey}`)}
              hours={t(`${cert.hoursKey}`)}
              year={t(`${cert.yearKey}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
