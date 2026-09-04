"use client";

import * as React from "react";
import { AlertTriangle, Check, Download } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import {
  CircularProgress,
  CircularProgressIndicator,
  CircularProgressRange,
  CircularProgressTrack,
} from "@/components/ui/CircularProgress";
import { cn } from "@/lib/utils";

type DownloadState = "idle" | "downloading" | "success" | "error";

/**
 * O currículo só existe em EN e PT-BR.
 * Locale "en"  → /AD_Resume_EN.pdf
 * Locale "pt-BR" → /AD_Curriculo_PT-BR.pdf
 * Demais locales (es, fr, de, ja, zh, ru, ar) caem no inglês,
 * que é o idioma padrão do site e o fallback internacional.
 */
const RESUME_FILES: Record<string, string> = {
  en: "/AD_Resume_EN.pdf",
  "pt-BR": "/AD_Curriculo_PT-BR.pdf",
};

const SUCCESS_RESET_MS = 1500;

export function ResumeDownloadButton({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("hero");
  const [state, setState] = React.useState<DownloadState>("idle");
  const [progress, setProgress] = React.useState<number | null>(null);
  const resetTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Limpa o timer de "sucesso" se o componente desmontar antes.
  React.useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const resumeUrl = RESUME_FILES[locale] ?? RESUME_FILES.en;
  const filename = resumeUrl.split("/").pop() ?? "resume.pdf";

  const handleDownload = React.useCallback(async () => {
    if (state === "downloading") return;
    setState("downloading");
    setProgress(null);

    try {
      const response = await fetch(resumeUrl);
      if (!response.ok || !response.body) throw new Error("download-failed");

      const contentLength = response.headers.get("Content-Length");
      const total = contentLength ? parseInt(contentLength, 10) : 0;

      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      let received = 0;

      // Sem Content-Length (alguns CDNs/edge), progress fica null → spinner indeterminado.
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        received += value.length;
        if (total > 0) {
          setProgress(Math.min(100, Math.round((received / total) * 100)));
        }
      }

      const blob = new Blob(chunks as BlobPart[], { type: "application/pdf" });
      const blobUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(blobUrl);

      setProgress(100);
      setState("success");
      resetTimerRef.current = setTimeout(() => {
        setState("idle");
        setProgress(null);
      }, SUCCESS_RESET_MS);
    } catch {
      setState("error");
    }
  }, [resumeUrl, filename, state]);

  const isBusy = state === "downloading";
  const isSuccess = state === "success";
  const isError = state === "error";

  const label = isError
    ? t("download_retry")
    : isSuccess
      ? t("download_done")
      : isBusy
        ? t("downloading")
        : t("cta_resume");

  return (
    <>
      <button
        type="button"
        onClick={handleDownload}
        disabled={isBusy}
        aria-busy={isBusy}
        aria-label={label}
        className={cn(
          "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[var(--color-blue)] px-6 py-3 font-heading text-sm font-semibold text-[var(--color-blue)] transition-all duration-300",
          "enabled:hover:bg-[var(--color-blue)] enabled:hover:text-white enabled:hover:shadow-[0_0_30px_var(--color-blue-glow)]",
          "disabled:cursor-wait disabled:opacity-90",
          "sm:w-auto sm:min-w-[44px]",
          className,
        )}
      >
        {isBusy || isSuccess || isError ? (
          <CircularProgress value={isBusy ? progress : isSuccess ? 100 : null} size={22} thickness={2.5}>
            <CircularProgressIndicator>
              <CircularProgressTrack />
              <CircularProgressRange
                className={
                  isSuccess
                    ? "animate-success-flash text-destructive"
                    : isError
                      ? "text-destructive"
                      : undefined
                }
              />
            </CircularProgressIndicator>
          </CircularProgress>
        ) : (
          <Download className="size-4" aria-hidden="true" />
        )}

        <span className="tabular-nums">
          {label}
          {isBusy && progress !== null ? ` ${progress}%` : ""}
        </span>

        {isSuccess && <Check className="size-4 text-destructive" aria-hidden="true" />}
        {isError && <AlertTriangle className="size-4 text-destructive" aria-hidden="true" />}
      </button>

      {/* Região ao vivo: anuncia apenas transições de estado (não cada %),
          evitando spam para leitores de tela. */}
      <span className="sr-only" role="status" aria-live="polite">
        {state === "idle" ? "" : label}
      </span>
    </>
  );
}
