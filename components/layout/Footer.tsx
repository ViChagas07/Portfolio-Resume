import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("contact");

  return (
    <footer className="border-t border-[var(--color-navy-lighter)] bg-[var(--color-navy)]">
      <div className="mx-auto max-w-6xl px-6 py-8 text-center">
        <p className="text-sm text-[var(--color-gray-dark)]">
          {t("footer")}
        </p>
      </div>
    </footer>
  );
}
