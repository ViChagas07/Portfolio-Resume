"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("contact");
  const currentYear = new Date().getFullYear();
  // Replace any hardcoded 4-digit year (20xx) with the live year
  const footerText = t("footer").replace(/\b20\d{2}\b/, String(currentYear));

  return (
    <footer className="border-t border-[var(--color-navy-lighter)] bg-[var(--color-navy)]">
      <div className="mx-auto max-w-6xl px-6 py-8 text-center">
        <p className="text-sm text-[var(--color-gray-dark)]">
          {footerText}
        </p>
      </div>
    </footer>
  );
}
