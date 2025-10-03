"use client";

import { ServiceHighlightsContent } from "@/types/template";

interface ServiceHighlightsSectionProps {
  data: ServiceHighlightsContent;
  theme?: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor?: string;
  };
}

export default function ServiceHighlightsSection({
  data,
  theme,
}: ServiceHighlightsSectionProps) {
  const backgroundColor = theme?.backgroundColor ?? '#ededed';
  const textColor = backgroundColor === '#ededed' ? '#000000' : '#f1e6e6';
  const mutedTextColor = backgroundColor === '#ededed' ? '#666666' : '#A1A1A6';
  const primaryColor = theme?.primaryColor ?? '#ff9f2e';
  const secondaryColor = theme?.secondaryColor ?? '#000000';

  // Helper function to format the display value
  const formatDisplayValue = (description: string) => {
    if (description.includes("+")) {
      return { value: description.replace("+", ""), suffix: "+" };
    }
    if (description.includes("%")) {
      return { value: description.replace("%", ""), suffix: "%" };
    }
    if (description.includes("/")) {
      return { value: description, suffix: "" };
    }
    return { value: description, suffix: "" };
  };

  return (
    <>
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

      <section 
        id="service-highlights" 
        className="py-12 md:py-16"
        style={{ 
          backgroundColor,
          color: textColor 
        }}
      >
        <div className="max-w-[92vw] md:max-w-[88vw] mx-auto">
          
          {/* Header Section */}
          <div className="mb-8 md:mb-12">
            {/* Big outlined title only (no section number) */}
            <div className="mb-6">
              <h2
                className="text-3xl md:text-7xl lg:text-8xl font-extrabold uppercase leading-[0.9] tracking-[-0.01em]"
                style={{ color: textColor }}
              >
                {data.title}
              </h2>
            </div>

            {/* Top separator */}
            <div 
              className="border-t"
              style={{ borderColor: `${primaryColor}66` }}
            />
            
            {/* Description */}
            <div className="mt-4">
              <div 
                className="text-[11px] tracking-wide"
                style={{ color: mutedTextColor }}
              >
                {data.description}
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch gap-8 md:gap-10 mb-8">
            {data.services && data.services.length > 0 ? data.services.map((service, index) => {
              const { value, suffix } = formatDisplayValue(service.description);
              
              return (
                <div key={`service-${index}`} className="flex flex-col h-full">
                  {/* Service name in big typography */}
                  <div className="space-y-2 min-h-[64px] md:min-h-[84px] flex items-end">
                    <h3 className="font-extrabold leading-[1.05] tracking-[-0.01em] text-[clamp(18px,4vw,28px)]">
                      {service.name.toUpperCase()}
                    </h3>
                  </div>

                  {/* Metric row */}
                  <div className="flex items-baseline gap-1 min-h-[48px] md:min-h-[60px]">
                    <span 
                      className="font-extrabold leading-none tracking-[-0.01em] text-[clamp(22px,5.5vw,40px)] tabular-nums"
                      style={{ color: primaryColor }}
                    >
                        {value}
                    </span>
                    {suffix && (
                      <span 
                        className="font-extrabold leading-none tracking-[-0.01em] text-[clamp(14px,3.5vw,20px)] tabular-nums"
                        style={{ color: primaryColor }}
                      >
                        {suffix}
                      </span>
                    )}
                  </div>

                  {/* Bottom line accent */}
                  <div 
                    className="w-full h-px mt-auto"
                    style={{ backgroundColor: `${primaryColor}40` }}
                  />
                </div>
              );
            }) : (
              <div className="col-span-full">
                <div className="text-center py-12">
                  <div 
                    className="text-sm"
                    style={{ color: mutedTextColor }}
                  >
                    No service highlights available
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom separator */}
          <div 
            className="border-t mt-8"
            style={{ borderColor: `${primaryColor}66` }}
          />
          
          {/* Bottom caption */}
          <div className="mt-2">
            <div 
              className="text-[11px] tracking-wide"
              style={{ color: mutedTextColor }}
            >
              Service Highlights
            </div>
          </div>

        </div>
      </section>
    </>
  );
}