"use client";

import { useTranslations } from "next-intl";
import { useInView } from "@/hooks/useInView";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function About() {
  const t = useTranslations("about");
  const tc = useTranslations("contact");
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

        {/* Right: bio text + social links */}
        <div className="flex flex-col gap-8">
          {/* Bio paragraphs */}
          <div className="flex flex-col gap-4 text-base leading-relaxed text-[var(--color-gray-light)] md:text-lg">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
          </div>

          {/* Social link cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/vi_chagas7/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-[var(--color-navy-lighter)] bg-[var(--color-navy)] p-6 transition-all duration-300 hover:border-[var(--color-blue)]/50 hover:shadow-[0_0_20px_var(--color-blue-glow)]"
            >
              {/* Instagram icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-10 w-10 text-[var(--color-gray)]"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <div>
                <p className="font-heading text-lg font-semibold text-white">
                  {tc("instagram")}
                </p>
                <p className="text-sm text-[var(--color-gray-dark)]">
                  instagram.com/vi_chagas7
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="ml-auto h-5 w-5 text-[var(--color-gray-dark)]"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clipRule="evenodd" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/5571985387387"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-[var(--color-navy-lighter)] bg-[var(--color-navy)] p-6 transition-all duration-300 hover:border-[var(--color-blue)]/50 hover:shadow-[0_0_20px_var(--color-blue-glow)]"
            >
              {/* WhatsApp icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-10 w-10 text-[var(--color-gray)]"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              <div>
                <p className="font-heading text-lg font-semibold text-white">
                  {tc("whatsapp")}
                </p>
                <p className="text-sm text-[var(--color-gray-dark)]">
                  wa.me/5571985387387
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="ml-auto h-5 w-5 text-[var(--color-gray-dark)]"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
