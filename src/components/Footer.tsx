'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { MessageSquareText } from 'lucide-react'; // For Medium alternative

const Footer = () => {
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

  // Animated Button Component (similar to other buttons)
  const ContactButton = ({ className = "" }: { className?: string }) => (
    <button 
      className={`relative overflow-hidden px-6 py-3 border border-border bg-transparent text-muted-foreground hover:bg-foreground hover:text-background rounded-full transition-all duration-700 ease-[cubic-bezier(0.25,0.4,0.25,1)] group text-sm ${className}`}
    >
      <div className="relative">
        <span className="block transition-all duration-700 ease-[cubic-bezier(0.25,0.4,0.25,1)] group-hover:-translate-y-full group-hover:opacity-0">
          Contact me
        </span>
        <span className="absolute inset-0 flex items-center justify-center translate-y-full opacity-0 transition-all duration-700 ease-[cubic-bezier(0.25,0.4,0.25,1)] group-hover:translate-y-0 group-hover:opacity-100">
          Contact me
        </span>
      </div>
    </button>
  );

  return (
    <footer className="w-full py-16 px-4 md:px-8 bg-background">
      {/* Main Footer Container with Glassmorphism */}
      <div 
        className="max-w-6xl mx-auto rounded-2xl p-8 md:p-12 backdrop-blur-md border border-border/50"
        style={{
          backgroundColor: isDarkMode 
            ? 'rgba(32, 32, 32, 0.6)' 
            : 'rgba(107, 114, 128, 0.5)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="text-center space-y-8">
          {/* Text 1: Available for Work Pill */}
          <div className="flex items-center justify-center">
            <div className="flex items-center px-4 py-2 rounded-full border border-lime-400/30 bg-lime-400/10">
              {/* Pulsing Indicator with Lighthouse Effect */}
              <motion.div
                className="w-1.5 h-1.5 bg-lime-400 rounded-full mr-3 relative"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{
                  duration: 0.75,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  boxShadow: '0 0 8px rgba(163, 230, 53, 0.6), 0 0 16px rgba(163, 230, 53, 0.4), 0 0 24px rgba(163, 230, 53, 0.2)'
                }}
              />
              <span className="text-sm font-medium text-foreground">
                Available for work
              </span>
            </div>
          </div>

          {/* Text 2: Main Focus Text */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground leading-tight">
              Let's build your <br />next idea.
            </h2>
          </div>

          {/* Text 3: Contact Button */}
          <div className="flex justify-center">
            <ContactButton />
          </div>
        </div>
      </div>

      {/* Bottom Section: Copyright and Social Links */}
      <div className="max-w-6xl mx-auto mt-8 px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2025 Michael Siwoku. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/MikeTemi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-lime-400 transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/michael-siwoku"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-lime-400 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:michael.siwoku@gmail.com"
              className="text-muted-foreground hover:text-lime-400 transition-colors duration-200"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://medium.com/@michael-siwoku"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-lime-400 transition-colors duration-200"
              aria-label="Medium"
            >
              <MessageSquareText size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
