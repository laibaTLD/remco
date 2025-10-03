"use client";
import { Image as ImageType } from "@/types/template";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface Service {
  name: string;
  description: string;
  price: string;
  features: string[];
  cta?: { href: string; label: string };
}

interface ServicesSectionProps {
  title: string;
  description: string;
  services: Service[];
  theme?: {
    primaryColor: string;
    secondaryColor: string;
  };
  images: ImageType[];
}

export default function ServicesSection({
  title,
  description,
  services,
  theme: _theme,
  images,
}: ServicesSectionProps) {
  const [viewportRef, embla] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => embla && embla.scrollTo(index),
    [embla]
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla]);

  const scrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
    
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla, onSelect]);

  return (
    <section id="services" className="pt-20 lg:pt-28 pb-8 lg:pb-12 bg-gray-950 text-[#f1e6e6] relative">
      <div className="w-full max-w-none mx-auto px-0">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]">
            {title}
          </h2>
          {description ? (
            <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-white/80">
              {description}
            </p>
          ) : null}
        </div>

        {/* Embla carousel with multi-card view and full-bleed slides */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white opacity-80 hover:opacity-100"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white opacity-80 hover:opacity-100"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div ref={viewportRef} className="overflow-hidden">
            <div className="flex gap-0">
              {services.map((service, index) => {
                const img = images.find((img) => img.slotName === `services-image-${index + 1}`);
                const altText = img?.altText || `${service.name} image`;
                return (
                  <article
                    key={index}
                    className="group shrink-0 w-full sm:w-1/2 lg:w-1/3 overflow-hidden"
                    aria-labelledby={`service-title-${index}`}
                  >
                    <div className="relative w-full aspect-[3/4]">
                      {img?.imageUrl ? (
                        <Image
                          src={img.imageUrl}
                          alt={altText}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          quality={90}
                          priority={index < 3}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl text-gray-500" aria-hidden="true">🖼️</div>
                      )}
                      {/* Title overlay at bottom to avoid any background area */}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent">
                        <div className="p-4">
                          <h3 id={`service-title-${index}`} className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-[-0.01em]">
                            {service.name}
                          </h3>
                          {service.description ? (
                            <p className="mt-1 text-sm text-white/85 line-clamp-2">
                              {service.description}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          
          {/* Dots */}
          {scrollSnaps.length > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    index === selectedIndex 
                      ? 'bg-white w-6 scale-110' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
