"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { useInView } from "@/hooks/useInView";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { SKILL_CATEGORIES, SKILL_CATEGORY_ICONS } from "@/lib/constants";

/* ── Simple inline SVG icons per category ── */
const IconPaths: Record<string, ReactNode> = {
  code: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  window: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  server: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  brain: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 12 19.5a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 12 4.5Z" /><path d="M12 8v8" /><path d="M8 12h8" />
    </svg>
  ),
  database: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v6a9 3 0 0 0 18 0V5" /><path d="M3 12v6a9 3 0 0 0 18 0v-6" />
    </svg>
  ),
  cloud: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  ),
  chart: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
    </svg>
  ),
  wrench: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
};

export function Skills() {
  const t = useTranslations("skills");
  const { ref, state } = useInView({ threshold: 0.05 });

  const animationClass =
    state === "visible"
      ? "animate-on-scroll visible"
      : state === "exit"
        ? "animate-on-scroll exit"
        : "animate-on-scroll below";

  return (
    <section
      id="skills"
      ref={ref}
      className={`${animationClass} mx-auto max-w-6xl px-6 py-24`}
      aria-labelledby="skills-title"
    >
      <SectionTitle title={t("title")} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SKILL_CATEGORIES.map((cat) => (
          <article
            key={cat.key}
            className="rounded-2xl border border-[var(--color-navy-lighter)] bg-[var(--color-navy-light)] p-5 transition-all duration-300 hover:border-[var(--color-blue)]/30"
            style={{ borderTopColor: "var(--color-blue)", borderTopWidth: "2px" }}
          >
            {/* Icon + Name */}
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[var(--color-blue)]" aria-hidden="true">
                {IconPaths[SKILL_CATEGORY_ICONS[cat.key]] ?? null}
              </span>
              <h3 className="font-heading text-sm font-semibold text-white">
                {t(`categories.${cat.key}`)}
              </h3>
            </div>

            {/* Skill badges */}
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
