'use client';

import { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface FAQSectionProps {
  title: string;
  description: string;
  questions: Array<{
    question: string;
    answer: string;
  }>;
  themeData?: {
    primaryColor: string;
    secondaryColor: string;
  };
}

export default function FAQSection({
  title,
  description,
  questions,
  themeData = { primaryColor: '#6366f1', secondaryColor: '#8b5cf6' }
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const { ref: descriptionRef, isVisible: descriptionVisible } = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.3 });

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
      '0, 0, 0';
  };

  const primaryColor = themeData?.primaryColor || '#6366f1';
  const secondaryColor = themeData?.secondaryColor || '#8b5cf6';
  const primaryRgb = hexToRgb(primaryColor);

  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden bg-gray-50"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${primaryColor}, transparent 70%)`,
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${secondaryColor}, transparent 70%)`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div 
              className={`transition-all duration-1000 ease-out ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 
                ref={titleRef}
                className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
              >
                {title}
              </h2>
            </div>
            
            <p 
              ref={descriptionRef}
              className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
                descriptionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {description}
            </p>
          </div>

          {/* FAQ Questions */}
          <div className="space-y-4 mb-12">
            {questions.map((faq, index) => (
              <div
                key={index}
                className={`rounded-lg overflow-hidden transition-all duration-300 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                <button
                  className={`w-full px-6 py-4 text-left flex justify-between items-center transition-all duration-300 ${
                    openIndex === index 
                      ? 'bg-gray-800 text-white shadow-lg' 
                      : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  }`}
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  style={{
                    background: openIndex === index 
                      ? `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` 
                      : '#374151'
                  }}
                  onMouseEnter={(e) => {
                    if (openIndex !== index) {
                      e.currentTarget.style.background = '#4B5563';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (openIndex !== index) {
                      e.currentTarget.style.background = '#374151';
                    }
                  }}
                >
                  <span className="font-medium text-base pr-4">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-5 h-5 transform transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                </button>
                
                <div 
                  id={`faq-answer-${index}`}
                  className="overflow-hidden transition-all duration-500 ease-in-out bg-white"
                  style={{
                    maxHeight: openIndex === index ? '500px' : '0px',
                    opacity: openIndex === index ? 1 : 0,
                  }}
                >
                  <div className="px-6 py-5 border-l-4 border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={{ 
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
              transitionDelay: '0.8s'
            }}
          >
            <button 
              className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
            >
              Read all FAQ
            </button>
            <button 
              className="px-8 py-3 font-medium text-white rounded-lg transition-all duration-300 hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                boxShadow: `0 4px 15px rgba(${primaryRgb}, 0.2)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 25px rgba(${primaryRgb}, 0.3)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 15px rgba(${primaryRgb}, 0.2)`;
              }}>
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}