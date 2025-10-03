"use client";

interface ServiceArea {
  city: string;
  region: string;
  description: string;
}

interface ThemeData {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor?: string;
}

interface ServiceAreasSectionProps {
  serviceAreas?: ServiceArea[];
  themeData?: ThemeData;
}

export default function ServiceAreasSection({
  serviceAreas,
  themeData,
}: ServiceAreasSectionProps) {
  if (!serviceAreas || serviceAreas.length === 0) {
    return null;
  }

  const backgroundColor = themeData?.backgroundColor ?? '#ededed';
  const textColor = backgroundColor === '#ededed' ? '#000000' : '#f1e6e6';
  const mutedTextColor = backgroundColor === '#ededed' ? '#666666' : '#A1A1A6';
  const primaryColor = themeData?.primaryColor ?? '#ff9f2e';
  const secondaryColor = themeData?.secondaryColor ?? '#000000';

  return (
    <>
      <section 
        className="py-12 md:py-16"
        style={{ 
          backgroundColor,
          color: textColor 
        }}
      >
        <div className="max-w-[92vw] md:max-w-[88vw] mx-auto">
          
          {/* Header Section */}
          <div className="mb-8 md:mb-12">
            {/* Header layout (number removed) */}
            <div className="flex items-start gap-6 md:gap-8 mb-6">
              {/* Big solid bold title */}
              <div className="flex-1">
                <h2
                  className="text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase leading-[0.85] tracking-[-0.02em]"
                >
                  SERVICE AREAS
                </h2>
              </div>
            </div>

            {/* Top separator */}
            <div 
              className="border-t"
              style={{ borderColor: `${primaryColor}66` }}
            />
            
            {/* Section caption */}
            <div className="mt-2">
              <div 
                className="text-[11px] tracking-wide"
                style={{ color: mutedTextColor }}
              >
                Coverage Areas
              </div>
            </div>
          </div>

          {/* Service Areas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {serviceAreas.map((area, index) => (
              <div key={index} className="space-y-4">
                
                {/* City in big typography */}
                <div>
                  <h3 className="font-extrabold leading-[0.9] tracking-[-0.02em] text-[clamp(24px,5vw,40px)]">
                    {area.city.toUpperCase()}
                  </h3>
                  
                  {/* Region */}
                  <div 
                    className="text-sm font-medium mt-1"
                    style={{ color: primaryColor }}
                  >
                    {area.region}
                  </div>
                </div>

                {/* Description */}
                <p className="text-base leading-relaxed">
                  {area.description}
                </p>

                {/* Bottom accent line */}
                <div 
                  className="w-full h-px"
                  style={{ backgroundColor: `${primaryColor}40` }}
                />

              </div>
            ))}
          </div>

          {/* Bottom separator */}
          <div className="mt-12">
            <div 
              className="border-t"
              style={{ borderColor: `${primaryColor}66` }}
            />
            
            {/* Bottom caption */}
            <div className="mt-2">
              <div 
                className="text-[11px] tracking-wide"
                style={{ color: mutedTextColor }}
              >
                Service Coverage
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}