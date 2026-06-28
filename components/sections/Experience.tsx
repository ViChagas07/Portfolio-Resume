"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useInView } from "@/hooks/useInView";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TIMELINE_ITEMS, CERTIFICATIONS } from "@/lib/constants";

/* ── Timeline dot (desktop >= 1024px only) ── */
function TimelineDot({ color }: { color: "blue" | "red" }) {
  return (
    <div
      className={`timeline-dot ${color === "blue" ? "timeline-dot-blue" : "timeline-dot-red"}`}
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
      <p className="mt-1 text-sm font-medium text-black lg:text-white">{subtitle}</p>
      <p className="mt-2 text-xs text-white lg:text-[var(--color-gray-dark)]">{period}</p>
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
      <p className="mt-1 text-sm font-medium text-black lg:text-white">{issuer}</p>
      <div className="mt-2 flex gap-3 text-xs text-white lg:text-[var(--color-gray-dark)]">
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

  // Paired rows for desktop dots
  const maxExpRows = Math.max(leftItems.length, rightItems.length);
  const expRows = Array.from({ length: maxExpRows }, (_, i) => ({
    left: leftItems[i] ?? null,
    right: rightItems[i] ?? null,
    dotColor: (i % 2 === 0 ? "blue" : "red") as "blue" | "red",
  }));

  // Certifications paired rows (even=left, odd=right)
  const leftCerts = CERTIFICATIONS.filter((_, i) => i % 2 === 0);
  const rightCerts = CERTIFICATIONS.filter((_, i) => i % 2 === 1);
  const certRows = Array.from(
    { length: Math.max(leftCerts.length, rightCerts.length) },
    (_, i) => ({
      left: leftCerts[i] ?? null,
      right: rightCerts[i] ?? null,
      dotColor: (i % 2 === 0 ? "blue" : "red") as "blue" | "red",
    })
  );

  return (
    <section
      id="experience"
      ref={ref}
      className={`${animationClass} mx-auto max-w-6xl px-4 md:px-6 lg:px-12 py-20 md:py-24`}
      aria-labelledby="experience-title"
    >
      <SectionTitle title={t("experience.title")} />

      {/* ═══════ MOBILE: single column, centered timeline — UNCHANGED ═══════ */}
      <div className="relative lg:hidden">
        <div
          className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-[var(--color-blue)] via-[var(--color-navy-lighter)] to-[var(--color-red)]"
          aria-hidden="true"
        />
        <div className="flex flex-col gap-8">
          {TIMELINE_ITEMS.map((item, idx) => (
            <div key={item.key} className="relative">
              <Card
                title={t(`${item.titleKey}`)}
                subtitle={t(`${item.subtitleKey}`)}
                period={t(`${item.periodKey}`)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ═══════ DESKTOP: two-column mirrored grid WITH DOTS ═══════ */}
      <div className="relative hidden lg:grid lg:grid-cols-[1fr_12px_1fr] lg:gap-y-8">
        {/* Center timeline spine — gradient blue → red */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[var(--color-blue)] to-[var(--color-red)] z-0" aria-hidden="true" />

        {expRows.map((row, i) => (
          <React.Fragment key={i}>
            {/* Left cell */}
            <div className="flex justify-end pr-3 z-10">
              {row.left && (
                <div className="w-[calc(100%-2rem)]">
                  <Card
                    title={t(`${row.left.titleKey}`)}
                    subtitle={t(`${row.left.subtitleKey}`)}
                    period={t(`${row.left.periodKey}`)}
                  />
                </div>
              )}
            </div>

            {/* Dot cell — centered on the line */}
            <div className="flex items-center justify-center z-10">
              <TimelineDot color={row.dotColor} />
            </div>

            {/* Right cell */}
            <div className="flex justify-start pl-3 z-10">
              {row.right && (
                <div className="w-[calc(100%-2rem)]">
                  <Card
                    title={t(`${row.right.titleKey}`)}
                    subtitle={t(`${row.right.subtitleKey}`)}
                    period={t(`${row.right.periodKey}`)}
                  />
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* ═══════ Certifications ═══════ */}
      <div className="mt-20 md:mt-24">
        <SectionTitle title={t("experience.education_title")} />
      </div>

      <h3 className="mt-6 mb-6 font-heading text-xl font-bold text-white text-center lg:text-left">
        {t("certifications.title")}
      </h3>

      {/* ═══════ MOBILE: single column, centered timeline — UNCHANGED ═══════ */}
      <div className="relative lg:hidden">
        <div
          className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-[var(--color-blue)] via-[var(--color-navy-lighter)] to-[var(--color-red)]"
          aria-hidden="true"
        />
        <div className="flex flex-col gap-4">
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.key} className="relative">
              <CertCard
                name={t(`${cert.nameKey}`)}
                issuer={t(`${cert.issuerKey}`)}
                hours={t(`${cert.hoursKey}`)}
                year={t(`${cert.yearKey}`)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ═══════ DESKTOP: two-column mirrored grid WITH DOTS ═══════ */}
      <div className="relative hidden lg:grid lg:grid-cols-[1fr_12px_1fr] lg:gap-y-6">
        {/* Center timeline spine — gradient blue → red */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[var(--color-blue)] to-[var(--color-red)] z-0" aria-hidden="true" />

        {certRows.map((row, i) => (
          <React.Fragment key={i}>
            {/* Left cell */}
            <div className="flex justify-end pr-3 z-10">
              {row.left && (
                <div className="w-[calc(100%-2rem)]">
                  <CertCard
                    name={t(`${row.left.nameKey}`)}
                    issuer={t(`${row.left.issuerKey}`)}
                    hours={t(`${row.left.hoursKey}`)}
                    year={t(`${row.left.yearKey}`)}
                  />
                </div>
              )}
            </div>

            {/* Dot cell — centered on the line */}
            <div className="flex items-center justify-center z-10">
              <TimelineDot color={row.dotColor} />
            </div>

            {/* Right cell */}
            <div className="flex justify-start pl-3 z-10">
              {row.right && (
                <div className="w-[calc(100%-2rem)]">
                  <CertCard
                    name={t(`${row.right.nameKey}`)}
                    issuer={t(`${row.right.issuerKey}`)}
                    hours={t(`${row.right.hoursKey}`)}
                    year={t(`${row.right.yearKey}`)}
                  />
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
