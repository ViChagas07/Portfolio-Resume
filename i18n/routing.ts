import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "pt-BR", "es", "fr", "de", "ja", "zh", "ru", "ar"],
  defaultLocale: "en",
  localePrefix: "always",
});
