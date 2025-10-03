"use client";

import { useState } from 'react';

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
    backgroundColor?: string;
  };
}

export default function FAQSection({
  title,
  description,
  questions,
  themeData = { primaryColor: '#ff9f2e', secondaryColor: '#000000' }
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const backgroundColor = themeData?.backgroundColor ?? '#ededed';
  const textColor = backgroundColor === '#ededed' ? '#000000' : '#f1e6e6';
  const mutedTextColor = backgroundColor === '#ededed' ? '#666666' : '#A1A1A6';
  const primaryColor = themeData?.primaryColor ?? '#ff9f2e';
  const secondaryColor = themeData?.secondaryColor ?? '#000000';

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <style jsx>{`
        .outline-title {
          color: transparent;
          -webkit-text-stroke: 1px ${primaryColor};
          text-stroke: 1px ${primaryColor};
          paint-order: stroke fill;
        }
        @media (min-width: 768px) {
          .outline-title { -webkit-text-stroke: 1.2px ${primaryColor}; }
        }
        @media (min-width: 1024px) {
          .outline-title { -webkit-text-stroke: 1.4px ${primaryColor}; }
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
          
          {/* Header Section */}
          <div className="mb-8 md:mb-12">
            {/* Header layout (number removed) */}
            <div className="flex items-start gap-6 md:gap-8 mb-6">
              {/* Big outlined title */}
              <div className="flex-1">
                <h2
                  className="outline-title text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase leading-[0.85] tracking-[-0.02em]"
                  style={{ ['--stroke' as any]: primaryColor }}
                >
                  {title}
                </h2>
              </div>
            </div>

            {/* Top separator */}
            <div 
              className="border-t"
              style={{ borderColor: `${primaryColor}66` }}
            />
            
            {/* Section caption */}
            <div className="mt-2">
              <div 
                className="text-[11px] tracking-wide"
                style={{ color: mutedTextColor }}
              >
                {description}
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="space-y-4">
            
            {/* FAQ Items - Each with self-contained question and answer */}
            <div className="space-y-3">
              {questions.map((faq, index) => (
                <div key={index} className="border transition-all" style={{ borderColor: `${primaryColor}40` }}>
                  {/* Question Button */}
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full text-left px-4 py-3 transition-all hover:scale-[1.01]"
                    style={{
                      backgroundColor: index === openIndex ? `${primaryColor}10` : 'transparent',
                      color: textColor
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold leading-[1.05] tracking-[-0.01em] text-base md:text-lg">
                        {index + 1}. {faq.question.toUpperCase()}
                      </span>
                      <span 
                        className="text-xl transition-transform duration-300"
                        style={{
                          transform: index === openIndex ? 'rotate(45deg)' : 'rotate(0deg)',
                          color: primaryColor
                        }}
                      >
                        +
                      </span>
                    </div>
                  </button>
                  
                  {/* Answer - Directly beneath the question */}
                  <div 
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: index === openIndex ? '500px' : '0px',
                      opacity: index === openIndex ? 1 : 0
                    }}
                  >
                    <div className="px-4 pb-4 pt-2 border-t" style={{ borderColor: `${primaryColor}20` }}>
                      <p className="font-extrabold leading-[1.05] tracking-[-0.01em] text-sm md:text-base" style={{ color: mutedTextColor }}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No questions state */}
            {(!questions || questions.length === 0) && (
              <div className="text-center py-12">
                <div 
                  className="text-sm"
                  style={{ color: mutedTextColor }}
                >
                  No frequently asked questions available
                </div>
              </div>
            )}

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
                Frequently Asked Questions
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}