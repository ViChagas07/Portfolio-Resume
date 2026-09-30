"use client";

import * as React from "react";
import { AlertTriangle, Check, Download, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  CircularProgress,
  CircularProgressIndicator,
  CircularProgressRange,
  CircularProgressTrack,
} from "@/components/ui/CircularProgress";
import { cn } from "@/lib/utils";

type DownloadState = "idle" | "downloading" | "success" | "error";
type ResumeLocale = "pt-BR" | "en";

const RESUME_FILES: Record<ResumeLocale, string> = {
  en: "/Alisson_Chagas_Resume_.pdf",
  "pt-BR": "/Alisson_Chagas_Curriculo_.pdf",
};

const RESUME_LABELS: Record<ResumeLocale, string> = {
  "pt-BR": "PT-BR",
  en: "EN",
};

const SUCCESS_RESET_MS = 1500;

export function ResumeDownloadButton({ className }: { className?: string }) {
  const t = useTranslations("hero");
  const [state, setState] = React.useState<DownloadState>("idle");
  const [progress, setProgress] = React.useState<number | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedLocale, setSelectedLocale] = React.useState<ResumeLocale>("pt-BR");
  const resetTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDownload = React.useCallback(async (locale: ResumeLocale) => {
    if (state === "downloading") return;

    const resumeUrl = RESUME_FILES[locale];
    const filename = resumeUrl.split("/").pop() ?? "resume.pdf";

    setState("downloading");
    setProgress(null);
    setIsOpen(false);

    try {
      const response = await fetch(resumeUrl);
      if (!response.ok || !response.body) throw new Error("download-failed");

      const contentLength = response.headers.get("Content-Length");
      const total = contentLength ? parseInt(contentLength, 10) : 0;

      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      let received = 0;

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
  }, [state]);

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

  const flags: Record<ResumeLocale, string> = {
    "pt-BR": "🇧🇷",
    en: "🇬🇧",
  };

  return (
    <div className={cn("relative inline-flex", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isBusy}
        aria-busy={isBusy}
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
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

        {!isBusy && !isSuccess && !isError && (
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
            aria-hidden="true"
          />
        )}

        {isSuccess && <Check className="size-4 text-destructive" aria-hidden="true" />}
        {isError && <AlertTriangle className="size-4 text-destructive" aria-hidden="true" />}
      </button>

      {isOpen && !isBusy && !isSuccess && !isError && (
        <ul
          role="listbox"
          aria-label={t("resume_select_locale") || "Select resume language"}
          className="absolute top-full left-0 mt-2 w-full sm:w-auto min-w-[160px] rounded-lg border border-[var(--color-navy-lighter)] bg-[var(--color-navy)] py-1 shadow-lg z-50 animate-fade-in"
        >
          {(["pt-BR", "en"] as ResumeLocale[]).map((locale) => (
            <li key={locale} role="option">
              <button
                type="button"
                onClick={() => handleDownload(locale)}
                disabled={isBusy}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 text-left font-medium text-sm text-[var(--color-gray-light)] transition-colors",
                  "hover:bg-[var(--color-blue)]/10 hover:text-white",
                  "focus:outline-none focus:bg-[var(--color-blue)]/10 focus:text-white",
                )}
              >
                <span aria-hidden="true">{flags[locale]}</span>
                <span>{RESUME_LABELS[locale]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <span className="sr-only" role="status" aria-live="polite">
        {state === "idle" ? "" : label}
      </span>
    </div>
  );
}