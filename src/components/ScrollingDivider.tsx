'use client';

import React, { useEffect, useState } from 'react';
import { Sparkle } from 'lucide-react';

const ScrollingDivider = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  // Fields of interest
  const fields = ['DevOps', 'Engineering', 'AI/ML', 'Development', 'Writing', 'Cloud'];

  // Create the scrolling content - duplicate for seamless loop
  const scrollingContent = [...fields, ...fields].map((field, index) => (
    <React.Fragment key={index}>
      <span className="whitespace-nowrap font-normal text-3xl tracking-wide">
        {field}
      </span>
      <span className="mx-8" style={{ color: isDarkMode ? 'rgba(163, 163, 163, 0.35)' : 'rgba(64, 64, 64, 0.35)' }}>
        <Sparkle size={16} />
      </span>
    </React.Fragment>
  ));

  return (
    <div className="w-full relative overflow-hidden -mt-32 sm:-mt-24 md:-mt-8">
      {/* Top border */}
      <div 
        className="w-full"
        style={{ 
          height: '0.5px',
          background: isDarkMode 
            ? 'linear-gradient(90deg, transparent 0%, rgba(163, 163, 163, 0.08) 50%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(64, 64, 64, 0.06) 50%, transparent 100%)'
        }}
      />
      
      {/* Scrolling container */}
      <div 
        className="relative py-8 overflow-hidden"
        style={{
          background: isDarkMode 
            ? 'linear-gradient(90deg, rgba(15, 15, 15, 0.005) 0%, rgba(15, 15, 15, 0.03) 50%, rgba(15, 15, 15, 0.005) 100%)'
            : 'linear-gradient(90deg, rgba(255, 255, 255, 0.005) 0%, rgba(255, 255, 255, 0.03) 50%, rgba(255, 255, 255, 0.005) 100%)',
          backdropFilter: 'blur(0.5px)',
          WebkitBackdropFilter: 'blur(0.5px)',
        }}
      >
        {/* Left edge shadow overlay */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-20 md:w-48 z-10 pointer-events-none"
          style={{
            background: isDarkMode 
              ? 'linear-gradient(to right, rgba(15, 15, 15, 0.98) 0%, rgba(15, 15, 15, 0.9) 30%, rgba(15, 15, 15, 0.7) 60%, rgba(15, 15, 15, 0.4) 80%, transparent 100%)'
              : 'linear-gradient(to right, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.9) 30%, rgba(255, 255, 255, 0.7) 60%, rgba(255, 255, 255, 0.4) 80%, transparent 100%)'
          }}
        />
        
        {/* Right edge shadow overlay */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-20 md:w-48 z-10 pointer-events-none"
          style={{
            background: isDarkMode 
              ? 'linear-gradient(to left, rgba(15, 15, 15, 0.98) 0%, rgba(15, 15, 15, 0.9) 30%, rgba(15, 15, 15, 0.7) 60%, rgba(15, 15, 15, 0.4) 80%, transparent 100%)'
              : 'linear-gradient(to left, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.9) 30%, rgba(255, 255, 255, 0.7) 60%, rgba(255, 255, 255, 0.4) 80%, transparent 100%)'
          }}
        />

        {/* Scrolling text */}
        <div 
          className="flex items-center animate-scroll-horizontal relative"
          style={{ 
            color: isDarkMode ? 'rgba(163, 163, 163, 0.35)' : 'rgba(64, 64, 64, 0.35)',
            willChange: 'transform'
          }}
        >
          {scrollingContent}
        </div>
      </div>

      {/* Bottom border */}
      <div 
        className="w-full"
        style={{ 
          height: '0.5px',
          background: isDarkMode 
            ? 'linear-gradient(90deg, transparent 0%, rgba(163, 163, 163, 0.08) 50%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(64, 64, 64, 0.06) 50%, transparent 100%)'
        }}
      />

      <style jsx>{`
        @keyframes scroll-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-horizontal {
          animation: scroll-horizontal 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ScrollingDivider;
