"use client";
import Image from 'next/image';
import { CTAContent, Image as ImageType } from '@/types/template';

interface CTASectionProps {
  data: CTAContent;
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
    mutedTextColor?: string;
    buttonTextColor?: string;
    cardBackgroundColor?: string;
    borderColor?: string;
  };
  images?: ImageType[];
}

const CTASection: React.FC<CTASectionProps> = ({ data, theme, images }) => {
  const backgroundColor = theme?.backgroundColor ?? theme?.primaryColor ?? '#f7f5f0';
  const textColor = theme?.textColor ?? (backgroundColor === '#f7f5f0' ? '#000000' : '#f1e6e6');
  const mutedTextColor = theme?.mutedTextColor ?? (backgroundColor === '#f7f5f0' ? '#666666' : '#A1A1A6');
  const buttonBg = theme?.primaryColor ?? '#000000';
  const buttonText = '#ffffff';
  const cardBg = theme?.cardBackgroundColor ?? theme?.secondaryColor ?? '#ffffff';
  const borderColor = theme?.borderColor ?? mutedTextColor;

  // Background image from data images, with safe fallback
  const ctaImage = images?.find((img) => img.slotName === 'cta-image-1')?.imageUrl ||
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
  return (
    <section className="py-6 md:py-8" style={{ backgroundColor }}>
      <div className="max-w-[92vw] md:max-w-[88vw] mx-auto">
        <div className="rounded-xl md:rounded-2xl border shadow-sm overflow-hidden" style={{ backgroundColor: cardBg, borderColor }}>
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-12 md:col-span-7 p-5 md:p-7 lg:p-8">
              {data.subHeading && (
                <div className="text-[12px] md:text-[13px] uppercase tracking-wide font-extralight" style={{ color: mutedTextColor }}>
                  {data.subHeading}
                </div>
              )}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase leading-[0.85] tracking-[-0.02em] mb-5" style={{ color: textColor }}>
                {data.heading || "We'd love to hear from you!"}
              </h2>
              {data.ctaButton && (
                <a
                  href={data.ctaButton.href}
                  className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold shadow-sm transition-colors"
                  style={{ backgroundColor: buttonBg, color: buttonText }}>
                  {data.ctaButton.label || 'Get in touch'}
                </a>
              )}
            </div>
            <div className="col-span-12 md:col-span-5 relative min-h-[160px] md:min-h-[220px] lg:min-h-[260px]">
              <div className="absolute inset-3 md:inset-4 rounded-lg overflow-hidden">
                <Image
                  src={ctaImage}
                  alt="CTA visual"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 40vw, 30vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 

export default CTASection;