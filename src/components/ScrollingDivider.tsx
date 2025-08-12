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
      <span className="mx-8 text-muted-foreground opacity-35">
        <Sparkle size={16} />
      </span>
    </React.Fragment>
  ));

  return (
    <div className="w-full relative overflow-hidden -mt-32 sm:-mt-24 md:-mt-8">
      {/* Top border */}
      <div 
        className="w-full bg-gradient-to-r from-transparent via-border/20 to-transparent"
        style={{ height: '0.5px' }}
      />
      
      {/* Scrolling container */}
      <div 
        className="relative py-8 overflow-hidden bg-gradient-to-r from-background/50 via-muted/30 to-background/50 backdrop-blur-sm"
      >
        {/* Left edge shadow overlay */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-40 md:w-80 lg:w-96 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, hsl(var(--background)) 0%, hsl(var(--background) / 0.88) 15%, hsl(var(--background) / 0.75) 25%, hsl(var(--background) / 0.55) 35%, hsl(var(--background) / 0.35) 50%, hsl(var(--background) / 0.18) 65%, hsl(var(--background) / 0.08) 75%, hsl(var(--background) / 0.03) 85%, hsl(var(--background) / 0.01) 95%, transparent 100%)'
          }}
        />
        
        {/* Right edge shadow overlay */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-40 md:w-80 lg:w-96 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, hsl(var(--background)) 0%, hsl(var(--background) / 0.88) 15%, hsl(var(--background) / 0.75) 25%, hsl(var(--background) / 0.55) 35%, hsl(var(--background) / 0.35) 50%, hsl(var(--background) / 0.18) 65%, hsl(var(--background) / 0.08) 75%, hsl(var(--background) / 0.03) 85%, hsl(var(--background) / 0.01) 95%, transparent 100%)'
          }}
        />

        {/* Scrolling text */}
        <div 
          className="flex items-center animate-scroll-horizontal relative text-muted-foreground opacity-35"
          style={{ willChange: 'transform' }}
        >
          {scrollingContent}
        </div>
      </div>

      {/* Bottom border */}
      <div 
        className="w-full bg-gradient-to-r from-transparent via-border/20 to-transparent"
        style={{ height: '0.5px' }}
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
