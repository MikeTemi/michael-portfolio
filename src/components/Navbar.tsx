'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  // Navigation items
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  // Current page (in real app, you'd get this from router)
  const [currentPage, setCurrentPage] = useState('Home');

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-gray-900 dark:text-white hover:text-lime-400 dark:hover:text-lime-400 transition-colors duration-200">
              MS
            </a>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative flex items-center px-3 py-2 text-sm font-medium group"
                  onClick={() => setCurrentPage(item.name)}
                >
                  {/* Active page indicator */}
                  {currentPage === item.name && (
                    <div className="absolute -left-2 w-1.5 h-1.5 bg-lime-400 rounded-full"></div>
                  )}
                  
                  {/* Text with scroll animation */}
                  <div className="relative overflow-hidden h-5">
                    <span className="absolute inset-0 text-gray-700 dark:text-gray-300 transition-transform duration-300 ease-out group-hover:-translate-y-full">
                      {item.name}
                    </span>
                    <span className="absolute inset-0 text-gray-700 dark:text-gray-300 transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">
                      {item.name}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Theme Toggle & Mobile Menu - Right */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-lime-400 dark:hover:text-lime-400 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-lime-400 dark:hover:text-lime-400 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-lg">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center text-gray-700 dark:text-gray-300 block px-3 py-2 text-base font-medium transition-colors duration-200"
              onClick={() => {
                setIsOpen(false);
                setCurrentPage(item.name);
              }}
            >
              {/* Active page indicator for mobile */}
              {currentPage === item.name && (
                <div className="w-1.5 h-1.5 bg-lime-400 rounded-full mr-3"></div>
              )}
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;