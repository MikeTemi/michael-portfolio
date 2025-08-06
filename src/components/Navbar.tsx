'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

// Constants
const SCROLL_CONFIG = {
  MAX_SCROLL: 200,
  SCROLL_THRESHOLD: 0.1,
  SHADOW_THRESHOLD: 0.3,
} as const;

const COLORS = {
  DARK: {
    ACTIVE: 'hsl(0,0%,90%)',
    DEFAULT: 'hsl(0,0%,70%)',
    LOGO: 'hsl(0,0%,85%)',
  },
  LIGHT: {
    ACTIVE: 'hsl(0,0%,3.9%)',
    DEFAULT: 'hsl(0,0%,25.1%)',
    LOGO: 'hsl(0,0%,25.1%)',
    // Darker colors for mobile light mode
    MOBILE_LOGO: 'hsl(0,0%,10%)',
    MOBILE_DEFAULT: 'hsl(0,0%,10%)',
    MOBILE_INACTIVE: 'hsl(0,0%,45%)', // Lighter color for non-active mobile items
  },
} as const;

const SIZES = {
  NAVBAR_HEIGHT: 64,
  PILL_PADDING: 24,
  LOGO_SIZE: { NORMAL: 24, COMPACT: 18 },
  BUTTON_SIZE: { NORMAL: 40, COMPACT: 32 },
  ICON_SIZE: { NORMAL: 20, COMPACT: 16 },
  MOBILE_ICON_SIZE: { NORMAL: 24, COMPACT: 20 },
} as const;

// Types
interface NavItem {
  name: string;
  href: string;
}

interface ScrollStyles {
  width: string;
  backgroundColor: string;
  backdropFilter: string;
  borderRadius: string;
  border: string;
  boxShadow: string;
}

interface ComponentSizes {
  logoSize: number;
  buttonSize: number;
  iconSize: number;
  mobileIconSize: number;
  padding: number;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme, toggleTheme } = useTheme();

  // Helper function to get text color
  const getTextColor = useCallback((isActive: boolean, isMobile: boolean = false): string => {
    const colors = theme === 'dark' ? COLORS.DARK : COLORS.LIGHT;
    if (isMobile && theme === 'light') {
      return isActive ? COLORS.LIGHT.MOBILE_DEFAULT : COLORS.LIGHT.MOBILE_INACTIVE;
    }
    return isActive ? colors.ACTIVE : colors.DEFAULT;
  }, [theme]);

  // Helper function to calculate dynamic styles based on scroll
  const getScrollStyles = useMemo((): ScrollStyles => {
    const isCompact = scrollProgress > SCROLL_CONFIG.SCROLL_THRESHOLD;
    
    // Use a single smooth progress curve for all transitions to eliminate jerky movement
    const transitionProgress = Math.max(0, Math.min((scrollProgress - 0.02) / 0.8, 1)); // Start at 2%, complete at 82%
    
    // All transitions use the same easing curve
    const easedProgress = transitionProgress * transitionProgress * (3 - 2 * transitionProgress); // Smooth S-curve
    
    // Width transition
    const width = 100 - (easedProgress * 40); // 100% to 60%
    
    // Border radius transition
    const borderRadius = easedProgress * 9999;
    
    // Background and blur transitions
    const backgroundOpacity = Math.min(easedProgress * 0.4, 0.2); // Slightly stronger background
    const blurAmount = easedProgress * 12;
    
    return {
      width: `${width}%`,
      backgroundColor: isCompact 
        ? (theme === 'dark' 
            ? `rgba(0, 0, 0, ${backgroundOpacity + 0.1})` 
            : `rgba(255, 255, 255, ${backgroundOpacity + 0.1})`)
        : 'transparent',
      backdropFilter: isCompact ? `blur(${blurAmount}px)` : 'none',
      borderRadius: `${borderRadius}px`,
      border: 'none', // No border needed at any point
      boxShadow: easedProgress > 0.7 // Shadow appears near the end for depth
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
        : 'none'
    };
  }, [scrollProgress, theme]);

  // Helper function to get component sizes
  const getComponentSizes = useMemo((): ComponentSizes => {
    // Use the same smooth transition curve as the main styles
    const transitionProgress = Math.max(0, Math.min((scrollProgress - 0.02) / 0.8, 1));
    const easedProgress = transitionProgress * transitionProgress * (3 - 2 * transitionProgress);
    
    return {
      logoSize: SIZES.LOGO_SIZE.NORMAL - (easedProgress * (SIZES.LOGO_SIZE.NORMAL - SIZES.LOGO_SIZE.COMPACT)),
      buttonSize: SIZES.BUTTON_SIZE.NORMAL - (easedProgress * (SIZES.BUTTON_SIZE.NORMAL - SIZES.BUTTON_SIZE.COMPACT)),
      iconSize: SIZES.ICON_SIZE.NORMAL - (easedProgress * (SIZES.ICON_SIZE.NORMAL - SIZES.ICON_SIZE.COMPACT)),
      mobileIconSize: SIZES.MOBILE_ICON_SIZE.NORMAL - (easedProgress * (SIZES.MOBILE_ICON_SIZE.NORMAL - SIZES.MOBILE_ICON_SIZE.COMPACT)),
      padding: easedProgress * SIZES.PILL_PADDING,
    };
  }, [scrollProgress]);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const progress = Math.min(scrollY / SCROLL_CONFIG.MAX_SCROLL, 1);
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const throttledScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 16); // ~60fps
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  // Navigation items
  const navItems: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  // Current page (in real app, you'd get this from router)
  const [currentPage, setCurrentPage] = useState('Home');

  // Reusable Rolling Text Component
  const RollingText: React.FC<{ 
    children: string; 
    isActive: boolean; 
    className?: string;
    isMobile?: boolean;
  }> = ({ children, isActive, className = '', isMobile = false }) => (
    <span 
      className={`relative overflow-hidden transition-colors duration-200 group ${className}`}
      style={{ color: getTextColor(isActive, isMobile) }}
      data-current={isActive}
    >
      <span className="block transition-transform duration-700 ease-out group-hover:-translate-y-full group-hover:opacity-0">
        {children}
      </span>
      <span className="absolute top-full left-0 w-full block transition-transform duration-700 ease-out group-hover:-translate-y-full">
        {children}
      </span>
    </span>
  );

  const scrollStyles = getScrollStyles;
  const sizes = getComponentSizes;

  return (
    <>
      <nav 
        className="fixed top-4 left-1/2 z-50 rounded-full bg-transparent transition-all duration-500 ease-out"
        style={{
          width: scrollStyles.width,
          transform: 'translate(-50%, 0px)',
          backgroundColor: scrollStyles.backgroundColor,
          backdropFilter: scrollStyles.backdropFilter,
          borderRadius: scrollStyles.borderRadius,
          border: scrollStyles.border,
          boxShadow: scrollStyles.boxShadow
        }}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="flex items-center justify-between relative transition-all duration-500 ease-out"
          style={{
            height: SIZES.NAVBAR_HEIGHT,
            paddingLeft: sizes.padding,
            paddingRight: sizes.padding
          }}
        >
          
          {/* Logo - Left */}
          <div className="flex-shrink-0 z-10">
            <a 
              href="/" 
              className="font-bold hover:text-lime-400 transition-all duration-500 ease-out"
              style={{ 
                color: theme === 'dark' ? COLORS.DARK.LOGO : COLORS.LIGHT.LOGO,
                fontSize: `${sizes.logoSize}px`
              }}
            >
              MS
            </a>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative flex items-center px-3 py-2 text-sm font-medium transition-all duration-200"
                  onClick={() => setCurrentPage(item.name)}
                >
                  {/* Active page indicator */}
                  {currentPage === item.name && (
                    <div className="absolute -left-1 w-2 h-2 bg-lime-400 rounded-full"></div>
                  )}
                  
                  {/* Text with rolling pin hover effect */}
                  <RollingText 
                    isActive={currentPage === item.name}
                    className="ml-1"
                  >
                    {item.name}
                  </RollingText>
                </a>
              ))}
            </div>
          </div>

          {/* Theme Toggle & Mobile Menu - Right */}
          <div className="flex items-center space-x-4 z-10">
            {/* Theme Toggle - Desktop Only */}
            <button
              onClick={toggleTheme}
              className="hidden md:flex rounded-full bg-transparent border border-transparent hover:bg-neutral-500/10 hover:border-neutral-200/20 hover:backdrop-blur-md transition-all duration-500 items-center justify-center"
              style={{ 
                color: theme === 'dark' ? COLORS.DARK.LOGO : COLORS.LIGHT.LOGO,
                width: `${sizes.buttonSize}px`,
                height: `${sizes.buttonSize}px`
              }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? 
                <Sun style={{ width: `${sizes.iconSize}px`, height: `${sizes.iconSize}px` }} /> : 
                <Moon style={{ width: `${sizes.iconSize}px`, height: `${sizes.iconSize}px` }} />
              }
            </button>

            {/* Mobile menu button - Always visible on mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center transition-all duration-500"
                style={{ 
                  color: theme === 'dark' ? COLORS.DARK.LOGO : COLORS.LIGHT.MOBILE_LOGO,
                  width: `${sizes.buttonSize}px`,
                  height: `${sizes.buttonSize}px`,
                  padding: scrollProgress > SCROLL_CONFIG.SCROLL_THRESHOLD ? '6px' : '8px'
                }}
                aria-label="Toggle menu"
              >
                {isOpen ? 
                  <X style={{ width: `${sizes.mobileIconSize}px`, height: `${sizes.mobileIconSize}px` }} /> : 
                  <Menu style={{ width: `${sizes.mobileIconSize}px`, height: `${sizes.mobileIconSize}px` }} />
                }
              </button>
            </div>
          </div>
        </div>
      </div>
      </nav>

      {/* Mobile Navigation Menu - Outside main nav to avoid scroll effects */}
      <div className={`md:hidden fixed top-20 left-1/2 transform -translate-x-1/2 z-40 w-[90%] max-w-sm transition-all duration-300 ease-in-out ${
        isOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 backdrop-blur-md shadow-lg rounded-2xl"
          style={{
            backgroundColor: theme === 'dark' 
              ? 'rgba(10, 10, 10, 0.3)' 
              : 'rgba(255, 255, 255, 0.25)'
          }}
        >
          {/* Theme Toggle in Mobile Menu */}
          <button
            onClick={toggleTheme}
            className="flex items-center w-full px-3 py-3 text-base font-medium transition-colors duration-200 rounded-lg hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
            style={{ 
              color: theme === 'dark' ? COLORS.DARK.LOGO : COLORS.LIGHT.MOBILE_LOGO
            }}
          >
            <div className="flex items-center justify-center w-6 h-6 mr-3">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </div>
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          
          {/* Divider */}
          <div className="h-px bg-neutral-300/50 dark:bg-neutral-600/50 my-2"></div>
          
          {/* Navigation Items */}
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center block px-3 py-2 text-base font-medium transition-colors duration-200 group rounded-lg hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
              data-current={currentPage === item.name}
              onClick={() => {
                setIsOpen(false);
                setCurrentPage(item.name);
              }}
            >
              {/* Active page indicator for mobile */}
              {currentPage === item.name && (
                <div className="w-2 h-2 bg-lime-400 rounded-full mr-3"></div>
              )}
              
              {/* Text with rolling pin effect for mobile */}
              <RollingText isActive={currentPage === item.name} isMobile={true}>
                {item.name}
              </RollingText>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;