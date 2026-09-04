import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge não conhece os tokens semânticos do tema por padrão.
 * Registrar as cores aqui garante que classes conflitantes sejam mescladas
 * corretamente — ex.: `text-destructive` substitui `text-primary` no flash
 * de sucesso do anel de progresso, em vez de depender da ordem do CSS.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: [
        "primary",
        "secondary",
        "destructive",
        "muted",
        "muted-foreground",
        "accent",
        "background",
        "foreground",
        "card",
        "border",
        "input",
        "ring",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
