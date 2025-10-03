'use client';

import { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: Testimonial[];
  theme?: {
    primaryColor: string;
    secondaryColor: string;
  };
}

interface Testimonial {
  name: string;
  role: string;
  text: string;
  company: string;
}

interface CarouselState {
  currentSlide: number;
  totalSlides: number;
  slidesToShow: number;
}

// Utility function to convert hex to rgba
function hexToRgb(hex: string, alpha = 1) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`
    : null;
}

export default function TestimonialsSection({ title, description, testimonials, theme }: TestimonialsSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [carousel, setCarousel] = useState<CarouselState>({
    currentSlide: 0,
    totalSlides: 0,
    slidesToShow: 1
  });
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Set up scroll animations
  const headerVisible = useScrollAnimation(headerRef);
  
  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
    };
    
    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);
  
  // Handle responsive carousel
  useEffect(() => {
    const updateSlidesToShow = () => {
      let slidesToShow = 1;
      
      if (window.innerWidth >= 1536) { // xxl screens (tailwind 2xl)
        slidesToShow = 3;
      } else if (window.innerWidth >= 1280) { // xl screens
        slidesToShow = 2;
      }
      
      setCarousel(prev => ({
        ...prev,
        slidesToShow,
        totalSlides: Math.ceil(testimonials.length / slidesToShow)
      }));
    };
    
    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    
    return () => {
      window.removeEventListener('resize', updateSlidesToShow);
    };
  }, [testimonials.length]);
  
  // Navigation functions
  const nextSlide = () => {
    setCarousel(prev => ({
      ...prev,
      currentSlide: (prev.currentSlide + 1) % prev.totalSlides
    }));
  };
  
  const prevSlide = () => {
    setCarousel(prev => ({
      ...prev,
      currentSlide: (prev.currentSlide - 1 + prev.totalSlides) % prev.totalSlides
    }));
  };
  
  const goToSlide = (slideIndex: number) => {
    setCarousel(prev => ({
      ...prev,
      currentSlide: slideIndex
    }));
  };
  
  // Primary and secondary colors with fallbacks
  const primaryColor = theme?.primaryColor || '#000';
  const secondaryColor = theme?.secondaryColor || '#666';
  
  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
      }}
    >
      {/* Animated background elements */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        
        @keyframes pulse {
          0% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
          100% { opacity: 0.3; transform: scale(1); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .fade-in-up-animation {
          opacity: 0;
          transform: translateY(30px);
        }
        
        .fade-in-up-animation.visible {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .scale-in-animation {
          opacity: 0;
          transform: scale(0.9);
        }
        
        .scale-in-animation.visible {
          animation: scaleIn 0.8s ease-out forwards;
        }
        
        .floating-shape {
          animation: float 8s ease-in-out infinite;
        }
        
        .pulse-glow {
          animation: pulse 6s ease-in-out infinite;
        }
        
        .testimonial-card {
          transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
          position: relative;
          z-index: 1;
          background: rgba(255, 255, 255, 0.85) !important;
          backdrop-filter: blur(12px);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .testimonial-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg, 
            rgba(255, 255, 255, 0.4), 
            rgba(255, 255, 255, 0.1)
          );
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        
        .testimonial-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, ${primaryColor}, ${secondaryColor});
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        
        .testimonial-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .testimonial-card:hover::before {
          opacity: 0.5;
        }
        
        .testimonial-card:hover::after {
          transform: scaleX(1);
        }
        
        .avatar-glow {
          position: relative;
          border: 3px solid transparent;
          background-clip: padding-box;
          transition: all 0.3s ease;
        }
        
        .avatar-glow::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
          z-index: -1;
        }
        
        .testimonial-card:hover .avatar-glow {
          transform: scale(1.1) rotate(5deg);
        }
        
        .star-rating svg {
          filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.1));
          transition: all 0.3s ease;
        }
        
        .testimonial-card:hover .star-rating svg {
          transform: scale(1.2);
          filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.2));
        }
      `}</style>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl pulse-glow"></div>
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-white opacity-3 rounded-full blur-3xl pulse-glow"></div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-[20%] left-[10%] w-24 h-24 rounded-full bg-white opacity-10 blur-xl floating-shape" 
           style={{animationDelay: '0.5s', transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`}}></div>
      <div className="absolute bottom-[30%] right-[15%] w-32 h-32 rounded-full bg-white opacity-10 blur-xl floating-shape" 
           style={{animationDelay: '1.2s', transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`}}></div>
      <div className="absolute top-[40%] right-[25%] w-16 h-16 rounded-full bg-white opacity-15 blur-lg floating-shape" 
           style={{animationDelay: '0.8s', transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`}}></div>
      
      {/* Sparkle elements */}
      <div className="absolute top-[15%] right-[30%] w-1 h-1 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"></div>
      <div className="absolute bottom-[25%] left-[20%] w-1 h-1 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"></div>
      <div className="absolute top-[60%] left-[15%] w-1 h-1 bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.7)]"></div>
      <div className="absolute top-[30%] left-[40%] w-1 h-1 bg-white rounded-full shadow-[0_0_12px_3px_rgba(255,255,255,0.8)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header section with animations */}
        <div 
          ref={headerRef} 
          className={`text-center mb-12 sm:mb-16 md:mb-20 fade-in-up-animation ${headerVisible ? 'visible' : ''}`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-6 sm:mb-8">
            {title}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light">
            {description}
          </p>
          
          {/* Decorative divider */}
          <div className="flex justify-center mt-8">
            <div className="w-24 h-1 bg-white/30 rounded-full"></div>
          </div>
        </div>

        {/* Testimonials carousel */}
        <div className="relative">
          {/* Carousel container */}
          <div 
            ref={carouselRef}
            className="overflow-hidden"
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${carousel.currentSlide * (100 / carousel.slidesToShow)}%)`,
                width: `${100 * Math.ceil(testimonials.length / carousel.slidesToShow)}%`
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  ref={el => testimonialRefs.current[index] = el}
                  className={`testimonial-card bg-white/95 backdrop-blur-md p-8 rounded-xl shadow-lg scale-in-animation ${
                    useScrollAnimation(testimonialRefs.current[index]) ? 'visible' : ''
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.15}s`,
                    width: `${100 / (testimonials.length * carousel.slidesToShow)}%`,
                    flex: `0 0 ${100 / (carousel.slidesToShow * Math.ceil(testimonials.length / carousel.slidesToShow))}%`,
                    padding: '2rem',
                    margin: '0 10rem'
                  }}
                >
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0">
                  <div 
                    className="avatar-glow w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl text-white"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
                    }}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm font-medium" style={{
                    color: primaryColor
                  }}>
                    {testimonial.company}
                  </p>
                </div>
              </div>
              
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.5 8H4.5C3.4 8 2.5 8.9 2.5 10V15C2.5 16.1 3.4 17 4.5 17H8.5C9.6 17 10.5 16.1 10.5 15V12H6.5V10H10.5V8H9.5ZM19.5 8H14.5C13.4 8 12.5 8.9 12.5 10V15C12.5 16.1 13.4 17 14.5 17H18.5C19.6 17 20.5 16.1 20.5 15V12H16.5V10H20.5V8H19.5Z" 
                    fill="currentColor" />
                </svg>
              </div>
              
              <blockquote className="text-gray-700 italic leading-relaxed text-lg mt-2 mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>
              
              <div className="flex mt-6 star-rating">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current transition-transform"
                    style={{ 
                      color: primaryColor,
                      transitionDelay: `${i * 0.05}s`
                    }}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            ))}
            </div>
          </div>
          
          {/* Navigation arrows */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 md:-translate-x-0 w-12 h-12 rounded-full bg-white/80 backdrop-filter backdrop-blur-sm flex items-center justify-center shadow-lg z-10 transition-all hover:bg-white"
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 md:translate-x-0 w-12 h-12 rounded-full bg-white/80 backdrop-filter backdrop-blur-sm flex items-center justify-center shadow-lg z-10 transition-all hover:bg-white"
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {/* Carousel indicators */}
          <div className="flex justify-center mt-8">
            {Array.from({ length: carousel.totalSlides }, (_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-3 h-3 mx-1 rounded-full transition-all ${
                  i === carousel.currentSlide ? 'bg-white scale-125' : 'bg-white/40'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Call to action */}
        <div className={`mt-16 text-center fade-in-up-animation ${headerVisible ? 'visible' : ''}`} style={{ animationDelay: '0.5s' }}>
          <button 
            className="px-8 py-3 bg-white text-gray-900 rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            style={{
              boxShadow: `0 4px 20px ${hexToRgb(primaryColor, 0.3)}`
            }}
          >
            Share Your Experience
          </button>
        </div>
      </div>
    </section>
  );
}
