"use client";

interface Testimonial {
  name: string;
  role?: string;
  company?: string;
  text: string;
}

interface TestimonialsSectionProps {
  title: string;
  description?: string;
  testimonials: Testimonial[];
  theme?: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor?: string;
  };
}

export default function TestimonialsSection({
  title,
  description,
  testimonials = [],
  theme,
}: TestimonialsSectionProps) {
  const backgroundColor = theme?.backgroundColor ?? '#ededed';
  const textColor = backgroundColor === '#ededed' ? '#000000' : '#f1e6e6';
  const mutedTextColor = backgroundColor === '#ededed' ? '#666666' : '#A1A1A6';
  const primaryColor = theme?.primaryColor ?? '#ff9f2e';
  const secondaryColor = theme?.secondaryColor ?? '#000000';

  return (
    <section 
      id="testimonials" 
      className="py-12 md:py-16 lg:py-20 lg:min-h-screen flex items-center"
      style={{ 
        backgroundColor,
        color: textColor 
      }}
    >
      <div className="max-w-6xl w-full mx-auto px-4 md:px-6">
        <style jsx>{`
          .outline-title {
            color: transparent;
            -webkit-text-stroke: 1px ${primaryColor};
            text-stroke: 1px ${primaryColor};
            paint-order: stroke fill;
          }
          @media (min-width: 768px) {
            .outline-title { -webkit-text-stroke: 1.2px ${primaryColor}; }
          }
          @media (min-width: 1024px) {
            .outline-title { -webkit-text-stroke: 1.4px ${primaryColor}; }
          }
        `}</style>
        <div className="mb-8 md:mb-12">
          <div className="flex items-start gap-6 md:gap-8 mb-6">
            <div className="flex-1 text-center">
              <h2
                className="outline-title text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase leading-none tracking-tight"
                style={{ ['--stroke' as any]: primaryColor }}
              >
                {title}
              </h2>
            </div>
          </div>

          {description && (
            <p className="text-center text-base md:text-lg text-gray-600 dark:text-gray-300 mb-10" style={{ color: mutedTextColor }}>
              {description}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-xl border" style={{ borderColor: `${primaryColor}33` }}>
                <div className="p-6">
                  <div className="text-sm uppercase tracking-wide mb-3" style={{ color: primaryColor }}>Testimonial</div>
                  <blockquote className="text-sm md:text-base leading-relaxed">
                    “{t.text}”
                  </blockquote>
                  <div className="mt-5">
                    <div className="font-semibold text-sm">{t.name}</div>
                    {(t.role || t.company) && (
                      <div className="text-xs" style={{ color: mutedTextColor }}>
                        {[t.role, t.company].filter(Boolean).join(' • ')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}