"use client";

import { useTranslations } from "next-intl";
import { useInView } from "@/hooks/useInView";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Contact() {
  const t = useTranslations("contact");
  const { ref, state } = useInView({ threshold: 0.1 });

  const animationClass =
    state === "visible"
      ? "animate-on-scroll visible"
      : state === "exit"
        ? "animate-on-scroll exit"
        : "animate-on-scroll below";

  return (
    <section
      id="contact"
      ref={ref}
      className={`${animationClass} border-t-2 border-[var(--color-blue)] bg-[var(--color-navy-light)]`}
      aria-labelledby="contact-title"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-12 py-20 md:py-24">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        {/* Link cards — 1 col mobile, 2x2 grid tablet+ */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* GitHub */}
          <a
            href="https://github.com/ViChagas07"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-[var(--color-navy-lighter)] bg-[var(--color-navy)] p-6 transition-all duration-300 hover:border-[var(--color-blue)]/50 hover:shadow-[0_0_20px_var(--color-blue-glow)]"
          >
            {/* GitHub icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-10 w-10 text-[var(--color-gray)]"
              aria-hidden="true"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0Z" />
            </svg>
            <div>
              <p className="font-heading text-lg font-semibold text-white">
                {t("github")}
              </p>
              <p className="text-sm text-[var(--color-gray-dark)]">
                github.com/ViChagas07
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="ml-auto h-5 w-5 shrink-0 text-[var(--color-gray-dark)]"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clipRule="evenodd" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/alisson-davi-0819242a7/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-[var(--color-navy-lighter)] bg-[var(--color-navy)] p-6 transition-all duration-300 hover:border-[var(--color-blue)]/50 hover:shadow-[0_0_20px_var(--color-blue-glow)]"
          >
            {/* LinkedIn icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-10 w-10 text-[var(--color-gray)]"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
            </svg>
            <div>
              <p className="font-heading text-lg font-semibold text-white">
                {t("linkedin")}
              </p>
              <p className="text-sm text-[var(--color-gray-dark)]">
                linkedin.com/in/alisson-davi
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="ml-auto h-5 w-5 shrink-0 text-[var(--color-gray-dark)]"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clipRule="evenodd" />
            </svg>
          </a>

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
                {t("instagram")}
              </p>
              <p className="text-sm text-[var(--color-gray-dark)]">
                instagram.com/vi_chagas7
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="ml-auto h-5 w-5 shrink-0 text-[var(--color-gray-dark)]"
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
              className="h-10 w-10 scale-110 text-[var(--color-gray)]"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            <div>
              <p className="font-heading text-lg font-semibold text-white">
                {t("whatsapp")}
              </p>
              <p className="text-sm text-[var(--color-gray-dark)]">
                wa.me/5571985387387
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="ml-auto h-5 w-5 shrink-0 text-[var(--color-gray-dark)]"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clipRule="evenodd" />
            </svg>
          </a>
        </div>

        {/* Email & Location */}
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="font-mono text-sm text-[var(--color-gray)]">
            {t("email")}
          </p>
          <div className="flex items-center gap-2 rounded-full border border-[var(--color-navy-lighter)] bg-[var(--color-navy)] px-4 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4 text-[var(--color-blue)]"
              aria-hidden="true"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-sm text-[var(--color-gray-light)]">
              {t("location")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
