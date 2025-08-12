'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkle } from 'lucide-react';
import ScrollingDivider from './ScrollingDivider';

const About = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.7", "end 0.3"]
  });

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

  // Full text content
  const fullText = [
    "I'm a full-stack engineer who enjoys turning ideas into useful, intuitive experiences. I like working across the stack, thinking through how things connect, and building systems that make sense.",
    "I've been growing my skills in DevOps, backend systems, and exploring how AI can power tools that make life easier. I care about building things that scale well and genuinely help people, especially in places where tech is often overlooked.",
    "I'm always learning, always building, and always curious about how technology can make a real difference."
  ];

  // Convert text to word array with paragraph info
  const words = fullText.flatMap((paragraph, pIndex) => 
    paragraph.split(' ').map((word, wIndex) => ({
      word,
      paragraphIndex: pIndex,
      wordIndex: wIndex,
      globalIndex: fullText.slice(0, pIndex).join(' ').split(' ').length + wIndex
    }))
  );

  const totalWords = words.length;

  // Component to render each word with scroll-based animation
  const AnimatedWord = ({ word, index, paragraphIndex }: { word: string, index: number, paragraphIndex: number }) => {
    const progress = useTransform(
      scrollYProgress,
      [0, 1],
      [0, totalWords]
    );

    const opacity = useTransform(
      progress,
      [index - 2, index, index + 2],
      [0.2, 1, 1]
    );

    const color = useTransform(
      progress,
      [index - 5, index, index + 5],
      [
        isDarkMode ? 'hsl(var(--muted-foreground))' : 'hsl(var(--muted-foreground))',
        isDarkMode ? 'hsl(var(--foreground))' : 'hsl(var(--foreground))',
        isDarkMode ? 'hsl(var(--foreground))' : 'hsl(var(--foreground))'
      ]
    );

    return (
      <motion.span
        style={{
          opacity,
          color
        }}
        className="inline-block mr-[0.25em]"
      >
        {word}
      </motion.span>
    );
  };

  // Color constants - now using shadcn/ui CSS variables
  const colors = {
    primary: 'hsl(var(--primary))', // Your lime accent color
    text: {
      light: 'hsl(var(--muted-foreground))', // Light text
      main: 'hsl(var(--foreground))', // Main text
    },
    background: {
      light: 'hsl(var(--background))',
    }
  };

  return (
    <>
      {/* Scrolling Divider */}
      <ScrollingDivider />
      
      {/* About Section - Centered */}
      <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-8 max-w-7xl mx-auto">
        <div className="text-center">
          {/* Sparkle Icon + Title with Simple Wave Effect */}
          <div className="flex items-center justify-center mb-8">
            {/* Sparkle Icon */}
            <Sparkle 
              className="text-lime-400 mr-3" 
              size={18}
            />
            
            {/* Title with simple character-by-character shine */}
            <div className="flex">
              {['A', 'B', 'O', 'U', 'T', ' ', 'M', 'E'].map((char, index) => (
                <motion.span
                  key={index}
                  className="text-[10px] md:text-xs lg:text-sm font-normal tracking-wider uppercase"
                  animate={{
                    color: ['#a3e635', '#ffffff', '#a3e635']
                  }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.1,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut"
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>
          </div>
          
          {/* Content with Word-by-Word Scroll Animation */}
          <div className="w-full mx-auto px-1 md:px-2">
            <div className="text-xl md:text-2xl lg:text-3xl leading-relaxed space-y-6">
              {fullText.map((paragraph, pIndex) => (
                <p key={pIndex} className="break-words">
                  {paragraph.split(' ').map((word, wIndex) => {
                    const globalIndex = fullText.slice(0, pIndex).join(' ').split(' ').length + wIndex;
                    return (
                      <AnimatedWord
                        key={`${pIndex}-${wIndex}`}
                        word={word}
                        index={globalIndex}
                        paragraphIndex={pIndex}
                      />
                    );
                  })}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
