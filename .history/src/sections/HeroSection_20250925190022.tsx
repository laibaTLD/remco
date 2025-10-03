'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  ctaButton: {
    href: string;
    label: string;
  };
  backgroundImage?: string;
  secondaryImage?: string;
  themeData?: {
    primaryColor: string;
    secondaryColor: string;
  };
}

export default function HeroSection({ 
  title = "BUILD YOUR FUTURE", 
  subtitle = "CONSTRUCTION EXCELLENCE", 
  description = "We transform visions into reality with precision, quality, and unmatched craftsmanship. From residential homes to commercial complexes, we build structures that stand the test of time.",
  ctaButton = { href: "#contact", label: "Start Your Project" },
  backgroundImage,
  secondaryImage,
  themeData = {
    primaryColor: "#FF6B35",
    secondaryColor: "#2D3748"
  }
}: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  const titleAnimation = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const subtitleAnimation = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const ctaAnimation = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
      '255, 107, 53';
  };

  const primaryRgb = hexToRgb(themeData.primaryColor);
  const secondaryRgb = hexToRgb(themeData.secondaryColor);

  const styles = `
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(100px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-100px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(60px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(2deg); }
    }

    @keyframes pulse-glow {
      0%, 100% { 
        box-shadow: 0 0 20px rgba(${primaryRgb}, 0.3);
        transform: scale(1);
      }
      50% { 
        box-shadow: 0 0 40px rgba(${primaryRgb}, 0.6);
        transform: scale(1.02);
      }
    }

    @keyframes text-reveal {
      0% {
        opacity: 0;
        transform: translateY(100%);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .hero-title {
      font-size: clamp(3.5rem, 10vw, 8rem);
      font-weight: 900;
      line-height: 0.85;
      letter-spacing: -0.02em;
      color: ${themeData.primaryColor};
      font-family: 'Arial Black', sans-serif;
      text-transform: uppercase;
      position: relative;
      overflow: hidden;
    }

    .hero-title::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      transform: translateX(-100%);
      animation: shimmer 2s infinite;
      animation-delay: 1s;
    }

    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    .hero-subtitle {
      font-size: clamp(1.2rem, 3vw, 2rem);
      font-weight: 600;
      letter-spacing: 0.1em;
      color: ${themeData.secondaryColor};
      text-transform: uppercase;
      position: relative;
    }

    .hero-subtitle::before {
      content: '';
      position: absolute;
      left: -50px;
      top: 50%;
      width: 40px;
      height: 3px;
      background: ${themeData.primaryColor};
      transform: translateY(-50%);
    }

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
      border-radius: 0;
      position: relative;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      box-shadow: 0 10px 30px rgba(${primaryRgb}, 0.4);
    }

    .construction-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }

    .construction-button:hover::before {
      left: 100%;
    }

    .construction-button:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(${primaryRgb}, 0.6);
    }

    .construction-button:active {
      transform: translateY(-2px);
    }

    .image-container {
      position: relative;
      overflow: hidden;
      border-radius: 15px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }

    .image-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, 
        rgba(${primaryRgb}, 0.1) 0%, 
        rgba(${secondaryRgb}, 0.1) 100%);
      pointer-events: none;
    }

    .floating-element {
      animation: float 6s ease-in-out infinite;
    }

    .parallax-bg {
      will-change: transform;
    }

    .construction-accent {
      background: ${themeData.primaryColor};
      box-shadow: 0 0 30px rgba(${primaryRgb}, 0.5);
    }

    .text-glow {
      text-shadow: 0 0 20px rgba(${primaryRgb}, 0.3);
    }

    .slide-in-right {
      animation: slideInRight 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
    }

    .slide-in-left {
      animation: slideInLeft 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
    }

    .slide-in-up {
      animation: slideInUp 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
    }

    .scale-in {
      animation: scaleIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
    }

    .pulse-glow {
      animation: pulse-glow 3s ease-in-out infinite;
    }
  `;

  // Construction-themed placeholder images
  const constructionImages = [
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop&crop=center", // Construction site
    "https://images.unsplash.com/photo-1541976590-713941681591?w=600&h=800&fit=crop&crop=center", // Modern building
    "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=600&fit=crop&crop=center", // Construction worker
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=500&fit=crop&crop=center", // Construction equipment
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&crop=center"  // Blueprint/planning
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <section className="relative overflow-hidden min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0">
          {/* Animated grid pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(${themeData.primaryColor}40 1px, transparent 1px), linear-gradient(90deg, ${themeData.primaryColor}40 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              transform: `translateX(${mousePosition.x * 0.1}px) translateY(${mousePosition.y * 0.1}px)`
            }}
          />
          
          {/* Floating geometric shapes */}
          <div 
            className="absolute top-20 right-1/4 w-32 h-32 construction-accent rounded-lg opacity-20 floating-element"
            style={{
              transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px) translateY(${scrollY * 0.1}px)`,
              animationDelay: '0s'
            }}
          />
          
          <div 
            className="absolute bottom-1/3 left-1/5 w-24 h-24 border-4 opacity-30 floating-element"
            style={{
              borderColor: themeData.primaryColor,
              transform: `translate(${-mousePosition.x * 0.2}px, ${-mousePosition.y * 0.2}px) translateY(${scrollY * 0.05}px) rotate(45deg)`,
              animationDelay: '2s'
            }}
          />

          <div 
            className="absolute top-1/2 left-1/6 w-16 h-40 construction-accent opacity-25 floating-element"
            style={{
              transform: `translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.15}px) translateY(${scrollY * 0.08}px) rotate(15deg)`,
              animationDelay: '1s'
            }}
          />
        </div>

        {/* Main Content Layout */}
        <div className="relative z-10 min-h-screen">
          <div className="container mx-auto px-6 h-screen">
            <div className="grid lg:grid-cols-2 gap-12 h-full items-center">
              
              {/* Left Content */}
              <div className="space-y-8 lg:pr-12">
                
                {/* Subtitle with animation */}
                <div className={`${subtitleVisible ? 'slide-in-left' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                  <h2 ref={subtitleRef} className="hero-subtitle">
                    {subtitle}
                  </h2>
                </div>

                {/* Main Title */}
                <div className="overflow-hidden">
                  <h1 
                    ref={titleRef}
                    className={`hero-title text-glow ${titleVisible ? 'slide-in-up' : 'opacity-0'}`}
                    style={{ animationDelay: '0.4s' }}
                  >
                    {title}
                  </h1>
                </div>

                {/* Description */}
                <div className={`${titleVisible ? 'slide-in-left' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
                  <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
                    {description}
                  </p>
                </div>

                {/* CTA Button */}
                <div 
                  ref={ctaRef}
                  className={`${ctaVisible ? 'scale-in' : 'opacity-0'}`}
                  style={{ animationDelay: '1.2s' }}
                >
                  <a href={ctaButton.href} className="construction-button group">
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

                {/* Stats or Features */}
                <div className={`flex space-x-8 pt-8 ${ctaVisible ? 'slide-in-up' : 'opacity-0'}`} style={{ animationDelay: '1.4s' }}>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">500+</div>
                    <div className="text-sm text-gray-400 uppercase tracking-wide">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">25+</div>
                    <div className="text-sm text-gray-400 uppercase tracking-wide">Years</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">98%</div>
                    <div className="text-sm text-gray-400 uppercase tracking-wide">Satisfaction</div>
                  </div>
                </div>
              </div>

              {/* Right Images Grid - Inspired by the video */}
              <div className="relative h-full flex items-center">
                <div className="grid grid-cols-12 grid-rows-8 gap-4 w-full h-5/6 max-w-2xl">
                  
                  {/* Large main image */}
                  <div className={`col-span-7 row-span-5 image-container ${isLoaded ? 'slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
                    <img
                      src={constructionImages[0]}
                      alt="Construction site"
                      className="w-full h-full object-cover"
                    />
                    <div className="image-overlay" />
                  </div>

                  {/* Top right image */}
                  <div className={`col-span-5 row-span-3 image-container ${isLoaded ? 'slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
                    <img
                      src={constructionImages[1]}
                      alt="Modern building"
                      className="w-full h-full object-cover"
                    />
                    <div className="image-overlay" />
                  </div>

                  {/* Bottom left small */}
                  <div className={`col-span-3 row-span-3 image-container ${isLoaded ? 'slide-in-up' : 'opacity-0'}`} style={{ animationDelay: '1.0s' }}>
                    <img
                      src={constructionImages[2]}
                      alt="Construction worker"
                      className="w-full h-full object-cover"
                    />
                    <div className="image-overlay" />
                  </div>

                  {/* Bottom middle */}
                  <div className={`col-span-4 row-span-2 image-container ${isLoaded ? 'scale-in' : 'opacity-0'}`} style={{ animationDelay: '1.2s' }}>
                    <img
                      src={constructionImages[3]}
                      alt="Construction equipment"
                      className="w-full h-full object-cover"
                    />
                    <div className="image-overlay" />
                  </div>

                  {/* Bottom right */}
                  <div className={`col-span-5 row-span-2 image-container ${isLoaded ? 'slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '1.4s' }}>
                    <img
                      src={constructionImages[4]}
                      alt="Blueprint planning"
                      className="w-full h-full object-cover"
                    />
                    <div className="image-overlay" />
                  </div>

                  {/* Floating accent element */}
                  <div 
                    className="absolute -top-8 -right-8 w-20 h-20 construction-accent rounded-full pulse-glow opacity-80"
                    style={{ 
                      transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)` 
                    }}
                  />

                  {/* Another floating element */}
                  <div 
                    className="absolute -bottom-6 -left-6 w-16 h-16 border-4 rounded-lg opacity-60 floating-element"
                    style={{ 
                      borderColor: themeData.primaryColor,
                      transform: `translate(${-mousePosition.x * 0.05}px, ${-mousePosition.y * 0.05}px)`,
                      animationDelay: '3s'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}