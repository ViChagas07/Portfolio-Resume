interface CardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Card({ children, className = "", id }: CardProps) {
  return (
    <div
      id={id}
      className={`rounded-2xl border border-[var(--color-navy-lighter)] bg-[var(--color-navy-light)] p-6 transition-all duration-300 hover:border-[var(--color-blue)]/30 ${className}`}
    >
      {children}
    </div>
  );
}
