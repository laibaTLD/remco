"use client";

import Image from "next/image";

interface AboutSectionProps {
  title: string;
  description: string;
  features: string[];
  ctaButton: {
    href: string;
    label: string;
  };
  image?: string;
  images?: Array<{
    slotName: string;
    imageUrl: string;
    category?: string;
  }>;
  theme?: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor?: string;
  };
}

export default function AboutSection({
  title,
  description,
  features,
  ctaButton,
  image,
  images = [],
  theme,
}: AboutSectionProps) {
  const backgroundColor = theme?.backgroundColor ?? '#ededed';
  const textColor = backgroundColor === '#ededed' ? '#000000' : '#f1e6e6';
  const mutedTextColor = backgroundColor === '#ededed' ? '#666666' : '#A1A1A6';
  const primaryColor = theme?.primaryColor ?? '#ff9f2e';
  const secondaryColor = theme?.secondaryColor ?? '#000000';

  // Get about images from the images array
  const aboutImages = images.filter(
    (img) => img.slotName.includes("about") || img.category === "about"
  );

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
        id="about" 
        className="py-12 md:py-16 lg:py-0 lg:min-h-screen"
        style={{ 
          backgroundColor,
          color: textColor 
        }}
      >
        <div className="max-w-[92vw] md:max-w-[88vw] mx-auto">
          
          {/* Header Section */}
          <div className="mb-8 md:mb-12">
            {/* Section number + title layout */}
            <div className="flex items-start gap-6 md:gap-8 mb-6">
              {/* Big outlined title */}
              <div className="flex-1">
                <h2
                  className="outline-title text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase leading-none tracking-tight"
                  style={{ ['--stroke' as any]: primaryColor }}
                >
                  {title}
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
                About Us
              </div>
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch gap-12 lg:gap-16">
            
            {/* Left: Content */}
            <div className="space-y-8 flex flex-col justify-center">
              
              {/* Description in big typography style */}
              <div>
                <p className="font-extralight uppercase leading-relaxed tracking-[0.05em] text-[clamp(18px,3vw,26px)]">
                  {description}
                </p>
              </div>

              {/* Features list */}
              {features && features.length > 0 && (
                <div className="space-y-6">
                  {features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                      {/* Simple bullet point */}
                      <div 
                        className="w-2 h-2 rounded-full mt-3 shrink-0"
                        style={{ backgroundColor: primaryColor }}
                      />
                      <div>
                        <h3 className="font-medium text-base leading-relaxed">
                          {feature}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA Button */}
              {ctaButton && (
                <div className="pt-4">
                  <a
                    href={ctaButton.href}
                    className="inline-flex items-center gap-3 px-8 py-4 font-extralight text-sm tracking-wide uppercase border hover:scale-105"
                    style={{ 
                      borderColor: primaryColor,
                      color: textColor,
                      backgroundColor: 'transparent'
                    }}
                  >
                    {ctaButton.label}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              )}

            </div>

            {/* Right: Image */}
            <div className="relative h-full lg:h-screen">
              <div className="relative w-full h-full">
                {(aboutImages[0] || image) && (
                  <Image
                    src={(aboutImages[0]?.imageUrl) || (image as string)}
                    alt="About image"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                    priority
                  />
                )}
              </div>
              {/* Optional accent line on image */}
              <div 
                className="absolute bottom-0 left-0 w-full h-1"
                style={{ backgroundColor: `${primaryColor}80` }}
              />

          </div>
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
                Our Story
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}