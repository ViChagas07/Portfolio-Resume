"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useInView } from "@/hooks/useInView";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { PROJECTS } from "@/lib/constants";

export function Projects() {
  const t = useTranslations("projects");
  const locale = useLocale();
  const { ref, state } = useInView({ threshold: 0.05 });

  const animationClass =
    state === "visible"
      ? "animate-on-scroll visible"
      : state === "exit"
        ? "animate-on-scroll exit"
        : "animate-on-scroll below";

  // Use translation highlights if available; fallback to constants
  const getHighlights = (projectKey: string): string[] => {
    try {
      const translated = t.raw(`highlights.${projectKey}`);
      if (Array.isArray(translated) && translated.length > 0) return translated;
    } catch {
      // fallback
    }
    return PROJECTS.find((p) => p.key === projectKey)?.highlights ?? [];
  };

  return (
    <section
      id="projects"
      ref={ref}
      className={`${animationClass} mx-auto max-w-6xl px-4 md:px-6 lg:px-12 py-20 md:py-24`}
      aria-labelledby="projects-title"
    >
      <SectionTitle title={t("title")} />

      <div className="flex flex-col gap-12">
        {PROJECTS.map((project) => {
          const highlights = getHighlights(project.key);

          return (
            <article
              key={project.key}
              className="flex flex-col-reverse gap-0 overflow-hidden rounded-2xl border border-[var(--color-navy-lighter)] bg-[var(--color-navy-light)] transition-all duration-300 hover:border-[var(--color-blue)]/30 lg:flex-row"
            >
              {/* Left: info */}
              <div className="flex flex-1 flex-col justify-between p-6 lg:p-8">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                    {project.key === "psi" && locale === "pt-BR"
                      ? "SentinelaPay"
                      : project.name}
                  </h3>
                  <p className="mt-2 text-base font-medium text-[var(--color-blue)]">
                    {project.tagline}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {highlights.map((h, i) => (
                      <li key={i} className="flex gap-3 text-sm text-[var(--color-gray)]">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-blue)]" aria-hidden="true" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech stack pills */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>

                {/* Buttons */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-blue)] px-5 py-2.5 font-heading text-sm font-semibold text-white transition-all duration-300 hover:bg-[var(--color-blue-light)] hover:shadow-[0_0_20px_var(--color-blue-glow)]"
                    >
                      {t("live_demo")}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-navy-lighter)] px-5 py-2.5 font-heading text-sm font-semibold text-[var(--color-gray-light)] transition-all duration-300 hover:border-[var(--color-blue)]/50 hover:text-white"
                  >
                    {t("view_code")}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Top (mobile) / Right (desktop): project logo */}
              <div
                className="relative flex min-h-[160px] items-center justify-center bg-gradient-to-br from-[var(--color-blue)]/20 via-[var(--color-navy)]/50 to-[var(--color-red)]/10 lg:min-h-[300px] lg:w-[40%]"
              >
                <Image
                  src={project.imagePath}
                  alt={`${project.name} logo`}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
