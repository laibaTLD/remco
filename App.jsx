"use client";
 
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

// Sample gallery data (mock). In production, replace with data from your database.
const galleryImages = [
  {
    url: "https://placehold.co/1200x600/1E293B/E2E8F0?text=Image+1",
    legend: "Captivating Night Sky",
  },
  {
    url: "https://placehold.co/1200x600/111827/E5E7EB?text=Image+2",
    legend: "Serene Mountain Range",
  },
  {
    url: "https://placehold.co/1200x600/0F172A/E2E8F0?text=Image+3",
    legend: "Coastal Sunrise",
  },
  {
    url: "https://placehold.co/1200x600/111827/E5E7EB?text=Image+4",
    legend: "Forest Trail",
  },
  {
    url: "https://placehold.co/1200x600/1F2937/E5E7EB?text=Image+5",
    legend: "City Lights",
  },
];

export default function App() {
  return (
    <main className="bg-gray-900 text-gray-100 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section aria-label="Image Gallery Carousel" className="w-full">
          <Carousel
            autoPlay
            infiniteLoop
            interval={5000}
            stopOnHover
            showArrows
            showIndicators
            showThumbs={false}
            showStatus={false}
            swipeable
            emulateTouch
            className="rounded-xl overflow-hidden shadow-2xl"
          >
            {galleryImages.map((img, idx) => (
              <div key={idx} className="relative w-full">
                {/* Image container with responsive aspect ratio */}
                <div className="w-full aspect-[2/1] sm:aspect-[16/7] bg-gray-800">
                  <img
                    src={img.url}
                    alt={img.legend}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Gradient overlay for caption readability */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60" />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <div className="inline-block bg-black/50 backdrop-blur-sm rounded-md px-3 py-2">
                    <p className="text-sm sm:text-base md:text-lg font-medium" style={{ color: "#f1e6e6" }}>
                      {img.legend}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </section>
      </div>
    </main>
  );
}
