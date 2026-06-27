interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-[var(--color-blue)]/40 bg-[var(--color-navy-light)] px-3 py-1 text-xs font-medium text-[var(--color-gray-light)] transition-all duration-300 hover:border-[var(--color-red)]/60 hover:text-white hover:shadow-[0_0_12px_var(--color-red-glow)] ${className}`}
    >
      {children}
    </span>
  );
}
