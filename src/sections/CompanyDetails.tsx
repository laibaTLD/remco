"use client";

import React from 'react';
import Image from "next/image";
import { CompanyDetailsContent, Image as ImageType } from '@/types/template';

// Helper function to get optimized image URL
const getOptimizedImageUrl = (url: string | undefined) => {
  if (!url) return undefined;
  // If it's already an absolute URL, return as is
  if (url.startsWith('http') || url.startsWith('blob:')) {
    return url;
  }
  // If it's a relative path, ensure it's properly formatted
  return url.startsWith('/') ? url : `/${url}`;
};

interface CompanyDetailsProps {
  data: CompanyDetailsContent;
  images?: ImageType[];
  theme?: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor?: string;
  };
}

export default function CompanyDetails({ data, images, theme }: CompanyDetailsProps) {
  const primaryColor = theme?.primaryColor ?? '#ff9f2e';
  const secondaryColor = theme?.secondaryColor ?? '#000000';
  // Per request: secondary as background, primary as text
  const backgroundColor = secondaryColor;
  const textColor = primaryColor;
  const mutedTextColor = '#f1e6e6';

  if (!data || !data.sections || data.sections.length === 0) {
    return null;
  }

  const getImageForSection = (sectionIndex: number) => {
    if (!images || images.length === 0) return null;
    
    // Try to find image with matching slot name first
    const preferredSlot = `company-details-${sectionIndex + 1}`;
    const matchedBySlot = images.find(img => img.slotName === preferredSlot);
    if (matchedBySlot) return matchedBySlot;
    
    // Then try to find images with matching category
    const companyImages = images.filter(img => 
      img.category?.toLowerCase() === 'companydetails' || 
      img.category?.toLowerCase() === 'company-details' ||
      img.category?.toLowerCase() === 'company'
    );
    
    // If we have enough category-matched images, use them in order
    if (companyImages.length > sectionIndex) {
      return companyImages[sectionIndex];
    }
    
    // Fall back to any available image, making sure we don't reuse the same image
    const usedIndices = new Set<number>();
    const getNextAvailableImage = () => {
      for (let i = 0; i < images.length; i++) {
        if (!usedIndices.has(i)) {
          usedIndices.add(i);
          return images[i];
        }
      }
      return images[0]; // Fallback to first image if all are used
    };
    
    return getNextAvailableImage();
  };

  return (
    <>
      <style jsx>{`
        /* Typography aligned with Hero/CTA */
        .section-title {
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }
      `}</style>

      <section 
        className="py-12 md:py-16"
        style={{ 
          backgroundColor,
          color: textColor 
        }}
      >
        <div className="max-w-[92vw] md:max-w-[88vw] mx-auto">
          
          {/* Header Section - main heading on top, description after */}
          <div className="mb-8 md:mb-12">
            <h2 className="section-title text-5xl md:text-7xl lg:text-8xl tracking-tight">
              {data.heading || 'Company Details'}
            </h2>
            {data.description && (
              <div
                className="mt-3 text-[19px] md:text-[23px] tracking-wide"
                style={{ color: mutedTextColor }}
              >
                {data.description}
              </div>
            )}
          </div>

          {/* Content List - one per row like CTA */}
          <div className="grid grid-cols-1 gap-8 md:gap-10">
            {data.sections.slice(0, 3).map((section, index) => {
              const img = getImageForSection(index);
              
              return (
                <div key={`section-${index}`} className="flex items-center justify-between gap-6">
                  {/* Left: Service Title/Description */}
                  <div className="flex-1">
                    <h3 className="section-title text-[clamp(22px,4vw,30px)]">
                      {section.heading}
                    </h3>
                    {section.description && (
                      <p className="mt-2 text-sm md:text-base leading-relaxed" style={{ color: mutedTextColor }}>
                        {section.description}
                      </p>
                    )}
                  </div>

                  {/* Right: Small Image Thumbnail (CTA-like) */}
                  <div className="relative md:ml-2 flex-shrink-0">
                    <div className="relative w-[180px] md:w-[200px] h-[90px] md:h-[110px] rounded-lg overflow-hidden">
                      {img?.imageUrl ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={getOptimizedImageUrl(img.imageUrl) || ''}
                            alt={section.heading || 'Company detail image'}
                            fill
                            sizes="(min-width: 1024px) 200px, (min-width: 768px) 180px, 100vw"
                            className="object-cover"
                            priority={index === 0}
                            unoptimized={img.imageUrl.startsWith('http')} // Disable optimization for external images
                            onError={(e) => {
                              // Fallback to a placeholder if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100'%3E%3Crect width='200' height='100' fill='%23${primaryColor.replace('#', '')}10'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='12' text-anchor='middle' dominant-baseline='middle' fill='%23${mutedTextColor.replace('#', '')}bf'%3ENo Image%3C/text%3E%3C/svg%3E`;
                            }}
                          />
                        </div>
                      ) : (
                        <div 
                          className="w-full h-full flex items-center justify-center text-xs"
                          style={{ 
                            backgroundColor: `${primaryColor}10`,
                            color: mutedTextColor,
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${primaryColor.replace('#', '')}20' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`
                          }}
                        >
                          <span className="text-center px-2">
                            {section.heading || 'Company Image'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
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
                Company Values
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}