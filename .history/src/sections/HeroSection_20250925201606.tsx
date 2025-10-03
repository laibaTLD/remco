'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useEffect, useState, useMemo } from 'react';

// Assuming ImageType is defined elsewhere, typically:
// type ImageType = { imageUrl: string; altText?: string; category?: string; slotName?: string }; 
// For this example, we'll ensure the component handles the object structure.
declare type ImageType = { imageUrl: string; altText?: string; category?: string; slotName?: string };

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  ctaButton: {
    href: string;
    label: string;
  };
  // Images from database
  images?: ImageType[];
  themeData?: {
    primaryColor: string;
    secondaryColor: string;
  };
}

// ----------------------------------------------------------------------
// Hero Section Component
// ----------------------------------------------------------------------
export default function HeroSection({
  title = "EXCELLENCE IN BUSINESS SOLUTIONS", // Updated default to match the example image
  subtitle = "YOUR TRUSTED PARTNER FOR GROWTH AND SUCCESS SINCE 2016", 
  description = "We transform visions into reality with precision, quality, and unmatched craftsmanship.", // Description is now subtle/removed per video style
  ctaButton = { href: "#contact", label: "Start Your Project" },
  // Using images from database with fallback
  images = [],
  themeData = {
    primaryColor: "#FF6B35",
    secondaryColor: "#2D3748"
  }
}: HeroSectionProps) {
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Filter hero images from database
  const heroImages = useMemo(() => {
    // Filter for images marked specifically for the hero section
    return images.filter(img => img.category === 'hero' || img.slotName === 'hero');
  }, [images]);

  // Fallback images if no database images are available
  const fallbackImages = [
    { imageUrl: '/images/hero/building-1.jpg', altText: 'Modern skyscraper' }, 
    { imageUrl: '/images/hero/crane-2.jpg', altText: 'Construction crane at sunset' }, 
    { imageUrl: '/images/hero/blueprint-3.jpg', altText: 'Architectural blueprint' },
  ];

  // Use database images if available, otherwise use fallbacks
  const displayImages = heroImages.length > 0 
    ? heroImages.map(img => ({ imageUrl: img.imageUrl, altText: img.altText || 'Hero background image' }))
    : fallbackImages;

  // Animation hooks for text elements
  const titleAnimation = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const subtitleAnimation = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const ctaAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  // ----------------------------------------------------------------------
  // EFFECTS: Image Cycling, Scroll Tracking, Initial Load
  // ----------------------------------------------------------------------
  useEffect(() => {
    setIsLoaded(true);

    // Image Cycling Effect (for video-like background)
    if (displayImages.length > 1) {
      const cycleInterval = setInterval(() => {
        setCurrentImageIndex(prevIndex => 
          (prevIndex + 1) % displayImages.length
        );
      }, 7000); // Change image every 7 seconds

      return () => clearInterval(cycleInterval);
    }

    // Scroll tracking
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [displayImages.length]);

  // Helper function for CSS Rgb values
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ?
      `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` :
      '255, 107, 53';
  };

  const primaryRgb = useMemo(() => hexToRgb(themeData.primaryColor), [themeData.primaryColor]);
  const secondaryRgb = useMemo(() => hexToRgb(themeData.secondaryColor), [themeData.secondaryColor]);

  // ----------------------------------------------------------------------
  // STYLES: Custom animations and theme-based styles (Optimized)
  // ----------------------------------------------------------------------
  const styles = `
    /* Existing Keyframes */
    @keyframes slideInRight { from { opacity: 0; transform: translateX(100px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes slideInLeft { from { opacity: 0; transform: translateX(-100px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes slideInUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes scaleIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
    @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-10px) rotate(2deg); } }
    
    /* New Keyframe for Background Transition */
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    /* Styles for the full-screen title */
    .hero-title {
      font-size: clamp(3.5rem, 10vw, 8rem);
      font-weight: 900;
      line-height: 0.85;
      letter-spacing: -0.02em;
      color: white;
      font-family: 'Arial Black', sans-serif;
      text-transform: uppercase;
      position: relative;
      text-shadow: 0 0 15px rgba(0,0,0,0.8);
    }

    /* Styles for the subtitle */
    .hero-subtitle {
      font-size: clamp(1.2rem, 3vw, 1.8rem);
      font-weight: 500;
      letter-spacing: 0.15em;
      color: #D1D5DB; /* Light gray for readability */
      text-transform: uppercase;
      margin-bottom: 2rem;
      text-shadow: 0 0 10px rgba(0,0,0,0.8);
    }
    
    /* Styles for the Call-to-Action button */
    .construction-button {
      display: inline-flex;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem 3rem;
      font-size: 1.1rem;
      font-weight: 700;
      text-decoration: none;
      text-transform: uppercase;
      color: white;
      background: ${themeData.primaryColor};
      border: none;
      border-radius: 4px;
      transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      box-shadow: 0 10px 30px rgba(${primaryRgb}, 0.4);
    }
    
    .construction-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 35px rgba(${primaryRgb}, 0.6);
    }
    
    /* Full screen image container style - UPDATED TRANSITION */
    .full-screen-image {
      /* The opacity change is quick (1s) for the fade, but the transform (scale) is slow (7s) for the Ken Burns effect */
      transition: opacity 1s ease-in-out, transform 7s linear; 
      position: absolute; /* Ensure images stack */
      inset: 0;
    }
  `;

  // ----------------------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------------------
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <section className="relative overflow-hidden min-h-screen bg-gray-900 flex items-center justify-center">

        {/* 1. DYNAMIC FULL-SCREEN BACKGROUND CONTAINER */}
        <div className="absolute inset-0 z-0">
          {displayImages.map((imageObj, index) => (
            <Image
              key={index}
              src={imageObj.imageUrl}
              alt={imageObj.altText}
              fill
              priority={index === 0}
              className={`full-screen-image object-cover ${
                // If this is the current image, set to 100% opacity and start the Ken Burns zoom.
                index === currentImageIndex 
                  ? 'opacity-100 scale-100' 
                // Otherwise, hide it and scale it out slightly to prepare for the next transition.
                  : 'opacity-0 scale-110'
              }`}
              sizes="(max-width: 768px) 100vw, 100vw"
            />
          ))}
          
          {/* Dark, Translucent Overlay for Readability (Z-Index 10) */}
          <div 
            className="absolute inset-0 z-10" 
            style={{ 
              // Using the secondary color for the overlay base, with a strong black gradient
              background: `linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, ${themeData.secondaryColor}D0 100%)`
            }} 
          />
        </div>

        {/* 2. CENTRALIZED CONTENT OVERLAY (Z-Index 20) */}
        <div className="relative z-20 min-h-screen flex items-center justify-center text-center w-full">
          <div className="container mx-auto px-6 max-w-4xl space-y-8 py-20">
            
            {/* Subtitle with animation */}
            <div className={`overflow-hidden ${subtitleAnimation.isVisible ? 'slide-in-left' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <h2 ref={subtitleAnimation.ref} className="hero-subtitle">
                {subtitle}
              </h2>
            </div>

            {/* Main Title */}
            <div className="overflow-hidden">
              <h1 
                ref={titleAnimation.ref}
                className={`hero-title ${titleAnimation.isVisible ? 'slide-in-up' : 'opacity-0'}`}
                style={{ animationDelay: '0.4s' }}
              >
                {title}
              </h1>
            </div>

            {/* CTA Button */}
            <div 
              ref={ctaAnimation.ref}
              className={`pt-8 ${ctaAnimation.isVisible ? 'scale-in' : 'opacity-0'}`}
              style={{ animationDelay: '1.2s' }}
            >
              <a href={ctaButton.href} className="construction-button group pulse-glow">
                <span>{ctaButton.label}</span>
                <svg 
                  className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}