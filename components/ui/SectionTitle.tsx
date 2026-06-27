interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionTitle({ title, subtitle, className = "" }: SectionTitleProps) {
  return (
    <div className={`mb-12 md:mb-16 ${className}`}>
      {/* EC Bahia stripe accent */}
      <div className="bg-stripe-bahia mb-6 w-16 mx-auto lg:mx-0" />
      <h2 className="font-heading text-2xl font-bold text-white text-center sm:text-3xl lg:text-4xl lg:text-left">
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
