'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// Constants
const SCROLL_CONFIG = {
  MAX_SCROLL: 400, // Increased from 200 for longer scroll effect
  SCROLL_THRESHOLD: 0.1,
  SHADOW_THRESHOLD: 0.3,
} as const;

const COLORS = {
  DARK: {
    ACTIVE: 'hsl(var(--foreground))',
    DEFAULT: 'hsl(var(--muted-foreground))',
    LOGO: 'hsl(var(--foreground))',
  },
  LIGHT: {
    ACTIVE: 'hsl(var(--foreground))',
    DEFAULT: 'hsl(var(--muted-foreground))',
    LOGO: 'hsl(var(--foreground))',
    // Darker colors for mobile light mode
    MOBILE_LOGO: 'hsl(var(--foreground))',
    MOBILE_DEFAULT: 'hsl(var(--foreground))',
    MOBILE_INACTIVE: 'hsl(var(--muted-foreground))', // Lighter color for non-active mobile items
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');
  const { theme, toggleTheme } = useTheme();

  // Framer Motion scroll handling
  const { scrollY } = useScroll();
  const scrollProgress = useTransform(scrollY, [0, SCROLL_CONFIG.MAX_SCROLL], [0, 1]);

  // Helper function to get text color
  const getTextColor = useCallback((isActive: boolean, isMobile: boolean = false): string => {
    const colors = theme === 'dark' ? COLORS.DARK : COLORS.LIGHT;
    if (isMobile && theme === 'light') {
      return isActive ? COLORS.LIGHT.MOBILE_DEFAULT : COLORS.LIGHT.MOBILE_INACTIVE;
    }
    return isActive ? colors.ACTIVE : colors.DEFAULT;
  }, [theme]);

  // Navigation items
  const navItems: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  // Reusable Rolling Text Component with Framer Motion
  const RollingText: React.FC<{ 
    children: string; 
    isActive: boolean; 
    className?: string;
    isMobile?: boolean;
  }> = ({ children, isActive, className = '', isMobile = false }) => (
    <motion.span 
      className={`relative overflow-hidden ${className}`}
      style={{ 
        color: getTextColor(isActive, isMobile),
        textShadow: isActive 
          ? (theme === 'dark' 
              ? '0 0 8px rgba(163, 230, 53, 0.5), 0 0 4px rgba(163, 230, 53, 0.3), 0 1px 2px rgba(0, 0, 0, 0.4)'
              : 'none')
          : 'none'
      }}
      data-current={isActive}
      initial={false}
      whileHover="hover"
      variants={{
        hover: {}
      }}
    >
      <motion.span 
        className="block"
        variants={{
          hover: { 
            y: '-100%', 
            opacity: 0,
            transition: { duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }
          }
        }}
        transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
      >
        {children}
      </motion.span>
      <motion.span 
        className="absolute top-full left-0 w-full block"
        variants={{
          hover: { 
            y: '-100%',
            transition: { duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }
          }
        }}
        transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
      >
        {children}
      </motion.span>
    </motion.span>
  );

  // Framer Motion transforms for smooth animations
  const navWidth = useTransform(
    scrollProgress,
    [0, SCROLL_CONFIG.SCROLL_THRESHOLD, 1],
    ['95%', '80%', '65%'] // Balanced for both mobile and desktop
  );
  
  const borderRadius = useTransform(
    scrollProgress,
    [0, SCROLL_CONFIG.SCROLL_THRESHOLD, 1],
    [50, 40, 32]
  );
  
  const backgroundOpacity = useTransform(
    scrollProgress,
    [SCROLL_CONFIG.SCROLL_THRESHOLD, SCROLL_CONFIG.SHADOW_THRESHOLD, 1],
    [0, 0.1, 0.15]
  );
  
  const blurAmount = useTransform(
    scrollProgress,
    [SCROLL_CONFIG.SCROLL_THRESHOLD, 1],
    [0, 20]
  );
  
  const padding = useTransform(
    scrollProgress,
    [0, 1],
    [0, SIZES.PILL_PADDING]
  );
  
  const logoSize = useTransform(
    scrollProgress,
    [0, 0.3, 0.7, 1],
    [SIZES.LOGO_SIZE.NORMAL, SIZES.LOGO_SIZE.COMPACT, SIZES.LOGO_SIZE.COMPACT - 3, SIZES.LOGO_SIZE.COMPACT - 5] // More gradual and significant reduction
  );

  const buttonSize = useTransform(
    scrollProgress,
    [0, 1],
    [SIZES.BUTTON_SIZE.NORMAL, SIZES.BUTTON_SIZE.COMPACT]
  );

  const iconSize = useTransform(
    scrollProgress,
    [0, 1],
    [SIZES.ICON_SIZE.NORMAL, SIZES.ICON_SIZE.COMPACT]
  );

  const mobileIconSize = useTransform(
    scrollProgress,
    [0, 1],
    [SIZES.MOBILE_ICON_SIZE.NORMAL, SIZES.MOBILE_ICON_SIZE.COMPACT]
  );

  const mobileButtonPadding = useTransform(
    scrollProgress,
    [0, SCROLL_CONFIG.SCROLL_THRESHOLD, 1],
    ['8px', '6px', '6px']
  );

  return (
    <>
      <motion.nav 
        className="fixed top-4 left-1/2 z-50 rounded-full bg-transparent"
        style={{
          width: navWidth,
          x: '-50%',
          backgroundColor: useTransform(
            backgroundOpacity,
            [0, 0.15],
            [
              'transparent',
              theme === 'dark' 
                ? 'rgba(0, 0, 0, 0.25)' 
                : 'rgba(255, 255, 255, 0.25)'
            ]
          ),
          backdropFilter: useTransform(blurAmount, (v) => `blur(${v}px)`),
          borderRadius: borderRadius,
          boxShadow: useTransform(
            scrollProgress,
            [0, 0.7, 1],
            [
              'none',
              'none', 
              '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            ]
          )
        }}
        transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex items-center justify-between relative"
          style={{
            height: SIZES.NAVBAR_HEIGHT,
            paddingLeft: padding,
            paddingRight: padding
          }}
          transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
        >
          
          {/* Logo - Left */}
          <div className="flex-shrink-0 z-10">
            <motion.a 
              href="/" 
              className="font-bold hover:text-lime-400 transition-all duration-500 ease-out"
              style={{ 
                color: theme === 'dark' ? COLORS.DARK.LOGO : COLORS.LIGHT.LOGO,
                fontSize: logoSize
              }}
            >
              MS
            </motion.a>
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
                  {/* Active page indicator with reduced size and glow */}
                  {currentPage === item.name && (
                    <div 
                      className="absolute -left-0.5 w-1.5 h-1.5 bg-lime-400 rounded-full"
                      style={{
                        boxShadow: theme === 'dark' 
                          ? '0 0 8px rgba(163, 230, 53, 0.8), 0 0 4px rgba(163, 230, 53, 0.6), 0 1px 2px rgba(0, 0, 0, 0.3)'
                          : 'none'
                      }}
                    ></div>
                  )}
                  
                  {/* Text with rolling pin hover effect and glow */}
                  <RollingText 
                    isActive={currentPage === item.name}
                    className="ml-0"
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
            <motion.button
              onClick={toggleTheme}
              className="hidden md:flex rounded-full bg-transparent border border-transparent hover:bg-neutral-500/10 hover:border-neutral-200/20 hover:backdrop-blur-md transition-all duration-500 items-center justify-center"
              style={{ 
                color: theme === 'dark' ? COLORS.DARK.LOGO : COLORS.LIGHT.LOGO,
                width: buttonSize,
                height: buttonSize
              }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? 
                <motion.div style={{ width: iconSize, height: iconSize }}>
                  <Sun style={{ width: '100%', height: '100%' }} />
                </motion.div> : 
                <motion.div style={{ width: iconSize, height: iconSize }}>
                  <Moon style={{ width: '100%', height: '100%' }} />
                </motion.div>
              }
            </motion.button>

            {/* Mobile menu button - Always visible on mobile */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center transition-all duration-500"
                style={{ 
                  color: theme === 'dark' ? COLORS.DARK.LOGO : COLORS.LIGHT.MOBILE_LOGO,
                  width: buttonSize,
                  height: buttonSize,
                  padding: mobileButtonPadding
                }}
                aria-label="Toggle menu"
              >
                {isOpen ? 
                  <motion.div style={{ width: mobileIconSize, height: mobileIconSize }}>
                    <X style={{ width: '100%', height: '100%' }} />
                  </motion.div> : 
                  <motion.div style={{ width: mobileIconSize, height: mobileIconSize }}>
                    <Menu style={{ width: '100%', height: '100%' }} />
                  </motion.div>
                }
              </motion.button>
            </div>
          </div>
        </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed top-20 left-1/2 z-40 w-[90%] max-w-sm"
            style={{ x: '-50%' }}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
          >
            <motion.div 
              className="px-2 pt-2 pb-3 space-y-1 backdrop-blur-md shadow-lg rounded-2xl"
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
              {/* Active page indicator for mobile with reduced size and glow */}
              {currentPage === item.name && (
                <div 
                  className="w-1.5 h-1.5 bg-lime-400 rounded-full mr-2"
                  style={{
                    boxShadow: theme === 'dark' 
                      ? '0 0 8px rgba(163, 230, 53, 0.8), 0 0 4px rgba(163, 230, 53, 0.6), 0 1px 2px rgba(0, 0, 0, 0.3)'
                      : 'none'
                  }}
                ></div>
              )}
              
              {/* Text with rolling pin effect for mobile */}
              <RollingText isActive={currentPage === item.name} isMobile={true}>
                {item.name}
              </RollingText>
            </a>
          ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;