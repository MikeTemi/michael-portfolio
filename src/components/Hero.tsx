'use client';

import React, { useState, useEffect } from 'react';
import { Hand, MoveUpRight } from 'lucide-react';

const Hero = () => {
  const [isWaving, setIsWaving] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Constants for better maintainability
  const WAVE_DURATION = 1600;
  const WAVE_INTERVAL = 3000;
  const FADE_OVERLAY_HEIGHT = 80;
  
  // Color constants - now using shadcn/ui CSS variables
  const colors = {
    primary: 'hsl(var(--primary))', // Your lime accent color
    text: {
      light: 'hsl(var(--muted-foreground))', // Light text
      main: 'hsl(var(--foreground))', // Main text
      mainSecondary: isDarkMode ? 'hsl(0,0%,63.9%)' : 'hsl(var(--foreground))', // Custom secondary for Hero
    },
    background: {
      light: 'hsl(var(--background))',
      neutral: 'hsl(var(--muted))',
    },
    border: 'hsl(var(--border))',
    line: 'hsl(var(--border))',
  };

  // Auto-wave every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), WAVE_DURATION);
    }, WAVE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

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

  const handleWaveClick = () => {
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), WAVE_DURATION);
  };

  // Helper function for fade overlay gradient
  const getFadeOverlayGradient = () => {
    const bgColor = colors.background.light;
    return `linear-gradient(to bottom, ${bgColor} 0%, ${bgColor.replace('rgb', 'rgba').replace(')', ', 0.8)')} 50%, ${bgColor.replace('rgb', 'rgba').replace(')', ', 0)')} 100%)`;
  };

  // Reusable social link component
  const SocialLink = ({ href, label, isEmail = false }: { href: string; label: string; isEmail?: boolean }) => (
    <a 
      href={href}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noopener noreferrer"}
      className="flex items-center text-sm font-light transition-colors duration-200"
      style={{ color: colors.text.light }}
    >
      <span className="uppercase">{label}</span>
      <MoveUpRight size={14} className="ml-1" />
    </a>
  );

  // Reusable button component
  const AnimatedButton = ({ className = "" }: { className?: string }) => (
    <button 
      className={`relative overflow-hidden px-6 py-3 border border-border bg-transparent text-muted-foreground hover:bg-foreground hover:text-background rounded-full transition-all duration-500 ease-out group text-sm ${className}`}
    >
      <div className="relative">
        <span className="block transition-all duration-500 ease-out group-hover:-translate-y-full group-hover:opacity-0">
          Know me better
        </span>
        <span className="absolute inset-0 flex items-center justify-center translate-y-full opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          About me
        </span>
      </div>
    </button>
  );

  return (
    <section className="min-h-screen flex flex-col justify-center px-8 max-w-7xl mx-auto pt-32 pb-24">
      {/* Fixed fade overlay between top and navbar with gradient transition */}
      <div 
        className="fixed top-0 left-0 w-full z-10 pointer-events-none"
        style={{
          height: `${FADE_OVERLAY_HEIGHT}px`,
          background: getFadeOverlayGradient(),
        }}
      />
      
      {/* Personal Greeting - Top Left */}
      <div>
        <div 
          className="flex items-center text-base cursor-pointer group"
          style={{ color: colors.text.light }}
          onClick={handleWaveClick}
          onMouseEnter={() => setIsWaving(true)}
          onMouseLeave={() => setIsWaving(false)}
        >
          <Hand 
            className={`mr-2 transition-transform duration-300 ease-in-out text-lime-400 ${
              isWaving ? 'animate-wave' : ''
            } group-hover:animate-wave`}
            size={28}
          />
          <span className="font-medium">
            Hey! It's me Michael
          </span>
        </div>
      </div>

      {/* Placeholder for the other two major texts */}
      <div className="space-y-8">
        {/* Second major text - Main statement */}
        <div className="mr-0 md:mr-[30vw] mt-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span style={{ color: colors.text.mainSecondary }}>
              Learning out loud, <span className="text-lime-400">building boldly</span>, and solving for the real world.
            </span>
          </h1>
        </div>
        
        {/* Third major text - Call to action area */}
        <div className="relative">
          {/* Text positioned with left margin */}
          <div className="ml-0 md:ml-[50vw] relative">
            {/* Line positioned to align with center of this text - hidden on mobile */}
            <div className="hidden md:block absolute left-[-50vw] top-1/2 transform -translate-y-1/2 w-[45vw] bg-neutral-300 dark:bg-neutral-600" style={{ height: '0.5px' }}></div>
            <p className="text-base" style={{ color: colors.text.light }}>
              Blending systems thinking, software, and curiosity to build solutions that make a difference.
            </p>
          </div>
          
          {/* Social media links beneath the line - hidden on mobile */}
          <div className="mt-5 hidden md:flex flex-wrap gap-4 justify-between items-center">
            <div className="flex flex-wrap gap-4">
              <SocialLink href="https://github.com/MikeTemi" label="GitHub" />
              <SocialLink href="https://www.linkedin.com/in/michael-siwoku/" label="LinkedIn" />
              <SocialLink href="https://medium.com/@michaelsiwoku" label="Medium" />
              <SocialLink href="mailto:michaelsiwoku@gmail.com?subject=Interested%20in%20your%20work" label="Gmail" isEmail />
            </div>

            {/* Know me better button - positioned on the same level as links on desktop */}
            <AnimatedButton />
          </div>

          {/* Button for mobile - separate container */}
          <div className="mt-5 md:hidden">
            <AnimatedButton />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
