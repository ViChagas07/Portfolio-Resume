import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SUPPORTED_LOCALES } from "@/lib/constants";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlobalOrbBackground } from "@/components/layout/GlobalOrbBackground";
import "../globals.css";

/* ── Fonts ── */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

/* ── Static params for SSG ── */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/* ── Dynamic metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../messages/${locale}.json`)).default;

  const title = `${messages.hero?.name || "Alisson Davi"} — ${messages.hero?.subtitle || "Fullstack Software Engineer"}`;
  const description =
    locale === "pt-BR"
      ? "Engenheiro Fullstack de Salvador, BA. Especialista em Next.js, FastAPI, Python, TypeScript e agentes de IA. Aberto a oportunidades remotas internacionais."
      : "Fullstack Engineer from Salvador, Brazil. Expert in Next.js, FastAPI, Python, TypeScript & AI agents. Open to international remote opportunities.";

  return {
    title,
    description,
    metadataBase: new URL("https://alissondavi.dev"),
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale.replace("-", "_"),
      siteName: "Alisson Davi — Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}`])
      ),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();
  const localeMeta = SUPPORTED_LOCALES.find((l) => l.code === locale);
  const dir = localeMeta?.dir ?? "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-[var(--color-navy)] text-[var(--color-white)] font-sans">
        {/* Skip to main content */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[var(--color-blue)] focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        >
          Skip to main content
        </a>

        <NextIntlClientProvider messages={messages}>
          <GlobalOrbBackground />
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
