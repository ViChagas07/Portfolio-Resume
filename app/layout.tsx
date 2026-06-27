import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alisson Davi — Portfolio",
  description: "Fullstack Software Engineer from Salvador, Brazil. Next.js, FastAPI, Python, TypeScript & AI agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[var(--color-navy)] text-[var(--color-white)]">
        {children}
      </body>
    </html>
  );
}
