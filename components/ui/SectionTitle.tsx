interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionTitle({ title, subtitle, className = "" }: SectionTitleProps) {
  return (
    <div className={`mb-16 ${className}`}>
      {/* EC Bahia stripe accent */}
      <div className="bg-stripe-bahia mb-6 w-16" />
      <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-gray)]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
