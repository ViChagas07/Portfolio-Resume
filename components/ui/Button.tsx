import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-blue)] text-white hover:bg-[var(--color-blue-light)] hover:shadow-[0_0_30px_var(--color-blue-glow)]",
  secondary:
    "border border-[var(--color-blue)] text-[var(--color-blue)] hover:bg-[var(--color-blue)] hover:text-white hover:shadow-[0_0_30px_var(--color-blue-glow)]",
  ghost:
    "text-[var(--color-gray)] hover:text-white hover:bg-[var(--color-navy-lighter)]",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-heading font-semibold text-sm transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[var(--color-blue)] cursor-pointer";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className = "", ...rest } = props;

  const sizeClasses: Record<string, string> = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if ("href" in rest && rest.href) {
    const { href, ...anchorProps } = rest;
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...anchorProps}
      />
    );
  }

  return <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} />;
}
