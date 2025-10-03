"use client";

import { Image } from "@/types/template";
import { useMemo } from "react";
import NextImage from "next/image";

// Import the Carousel component
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface GallerySectionProps {
  title: string;
  description: string;
  images?: Image[];
}

// **Inline CSS for react-responsive-carousel (RRC) and custom styling**
// Base RRC CSS is imported from the package above; custom overrides below.
const RRC_CUSTOM_STYLES = `
  /* Customizing the appearance for a dark theme and better visibility */
  .carousel .control-arrow, .carousel.carousel-slider .control-arrow {
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }
  
  .carousel .control-arrow:hover, .carousel.carousel-slider .control-arrow:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.4);
  }
  .carousel .control-dots .dot {
    background: #f1e6e6; /* Light dot color */
    box-shadow: none;
    opacity: 0.4;
    transition: opacity 0.3s ease;
  }
  .carousel .control-dots .dot.selected {
    background: #4F46E5; /* Primary accent color for active dot */
    opacity: 1;
    transform: scale(1.2);
  }
  /* Remove default legend background; we'll render our own centered caption */
  /* Animation styles from original component */
  @keyframes slideInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideInLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
  .g-slide-up { animation: slideInUp 0.7s ease-out forwards; }
  .g-slide-left { animation: slideInLeft 0.7s ease-out forwards; }
`;

export default function GallerySection({
  title: _title,
  description: _description,
  images,
}: GallerySectionProps) {
  // Filter provided images or provide fallbacks
  const galleryImages: Image[] = useMemo(() => {
    const provided = (images || []).filter(
      (img) => img.category === "gallery" || img.slotName?.includes("gallery")
    );
    if (provided.length > 0) return provided;
    // Fallback images (using the user's provided list)
    return [
      // ... (The user's original fallback images data is preserved here)
      {
        id: "1",
        slotName: "gallery",
        title: "Sunset Mountains",
        altText: "Beautiful mountain sunset",
        imageUrl:
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200",
        category: "gallery",
        landingPageId: "default",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        slotName: "gallery",
        title: "Starry Night",
        altText: "Starry night over mountains",
        imageUrl:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200",
        category: "gallery",
        landingPageId: "default",
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        slotName: "gallery",
        title: "Coastal View",
        altText: "Ocean and rocks",
        imageUrl:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
        category: "gallery",
        landingPageId: "default",
        createdAt: new Date().toISOString(),
      },
      {
        id: "4",
        slotName: "gallery",
        title: "Friends Hiking",
        altText: "Group of friends hiking",
        imageUrl:
          "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=1200",
        category: "gallery",
        landingPageId: "default",
        createdAt: new Date().toISOString(),
      },
      {
        id: "5",
        slotName: "gallery",
        title: "Work & Coffee",
        altText: "Laptop and coffee",
        imageUrl:
          "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=1200",
        category: "gallery",
        landingPageId: "default",
        createdAt: new Date().toISOString(),
      },
    ];
  }, [images]);

  // No header/description in full-screen variant

  return (
    <section id="gallery" className="p-0 bg-gray-900 text-[#f1e6e6] relative min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: RRC_CUSTOM_STYLES }} />
      <div className="w-full h-screen">
        {/* Full-screen Gallery Carousel */}
        <div className="w-full h-full">
          <Carousel
            // --- FUNCTIONAL REQUIREMENTS ---
            showArrows={true}
            showIndicators={true}
            infiniteLoop={true}
            autoPlay={true}               // Enable Autoplay
            interval={3000}               // 3000ms (3 seconds) interval
            stopOnHover={true}            // Pause on hover
            showThumbs={false}            // Disable small bottom thumbnails (common for galleries)
            showStatus={false}            // Disable the "1 of 5" status text
            dynamicHeight={false}         // Better for fixed aspect ratio images
            swipeable={true}
            emulateTouch={true}
            className="h-full"
          >
            {galleryImages.map((image) => (
              <div key={image.id} className="relative w-full h-screen">
                {/* Image using Next.js Image component */}
                <NextImage
                  src={image.imageUrl}
                  alt={image.altText || image.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={true}
                />

                {/* Centered caption without background */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white text-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                    {image.title}
                  </h3>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}