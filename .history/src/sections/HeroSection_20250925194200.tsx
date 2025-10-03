'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useEffect, useState, useMemo } from 'react';

// ----------------------------------------------------------------------
// UPDATED INTERFACE TO HANDLE MULTIPLE IMAGES
// ----------------------------------------------------------------------
interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  ctaButton: {
    href: string;
    label: string;
  };
  // Accepts an array of image URLs for the dynamic background
  backgroundImages: string[]; 
  themeData?: {
    primaryColor: string;
    secondaryColor: string;
  };
}

// ----------------------------------------------------------------------
// Hero Section Component
// ----------------------------------------------------------------------
export default function HeroSection({
  title = "BUILD YOUR FUTURE",
  subtitle = "CONSTRUCTION EXCELLENCE",
  description = "We transform visions into reality with precision, quality, and unmatched craftsmanship. From residential homes to commercial complexes, we build structures that stand the test of time.",
  ctaButton = { href: "#contact", label: "Start Your Project" },
  // Placeholder array for the image cycle
  backgroundImages = [
    '/images/hero/building-1.jpg', 
    '/images/hero/crane-2.jpg', 
    '/images/hero/blueprint-3.jpg',
  ],
  themeData = {
    primaryColor: "#FF6B35",
    secondaryColor: "#2D3748"
  }
}: HeroSectionProps) {
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

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
    if (backgroundImages.length > 1) {
      const cycleInterval = setInterval(() => {
        setCurrentImageIndex(prevIndex => 
          (prevIndex + 1) % backgroundImages.length
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
  }, [backgroundImages.length]);

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
    /* Existing Keyframes from your code */
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
      color: white; /* Changed to white for better readability over dark overlay */
      font-family: 'Arial Black', sans-serif;
      text-transform: uppercase;
      position: relative;
      text-shadow: 0 0 15px rgba(0,0,0,0.8); /* Added shadow for contrast */
    }

    /* Styles for the subtitle */
    .hero-subtitle {
      font-size: clamp(1.2rem, 3vw, 2rem);
      font-weight: 600;
      letter-spacing: 0.15em;
      color: ${themeData.primaryColor}; /* Using primary accent color */
      text-transform: uppercase;
      margin-bottom: 1rem;
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
      background: linear-gradient(135deg, ${themeData.primaryColor}, #FF8F65);
      border: none;
      transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      box-shadow: 0 10px 30px rgba(${primaryRgb}, 0.4);
    }
    
    .construction-button:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(${primaryRgb}, 0.6);
    }
    
    /* Full screen image container style */
    .full-screen-image {
      transition: opacity 2s ease-in-out;
      animation: fadeIn 2s ease-in-out;
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
          {backgroundImages.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt="Construction background image"
              fill
              priority={index === 0}
              className={`full-screen-image object-cover ${
                index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
              } transition-all duration-1000 ease-in-out`}
              style={{ 
                // Ken Burns effect on non-active images
                transform: `scale(${index === currentImageIndex ? 1.05 : 1.1})` 
              }}
              sizes="(max-width: 768px) 100vw, 100vw"
            />
          ))}
          
          {/* Dark, Translucent Overlay for Readability (Crucial step from the prompt) */}
          <div 
            className="absolute inset-0 z-10" 
            style={{ 
              background: `linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.8) 100%)`
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