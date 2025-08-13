'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Brain, Server, PenTool, ChevronDown } from 'lucide-react';

const Specialty = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSpecialty, setActiveSpecialty] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

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

  // Specialties data
  const specialties = [
    {
      id: 'development',
      icon: Code,
      title: 'Development',
      description: 'Full-stack web development with modern frameworks like React, Next.js, and Node.js. Building scalable applications with clean, maintainable code.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80'
    },
    {
      id: 'ai-ml',
      icon: Brain,
      title: 'AI/ML',
      description: 'Integrating artificial intelligence and machine learning solutions into applications. Experience with Python, TensorFlow, and various AI APIs.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80'
    },
    {
      id: 'devops',
      icon: Server,
      title: 'DevOps',
      description: 'Streamlining development workflows with CI/CD pipelines, containerization using Docker, and cloud infrastructure management.',
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80'
    },
    {
      id: 'writing',
      icon: PenTool,
      title: 'Writing',
      description: 'Technical writing and documentation, creating clear guides and tutorials that help developers and teams understand complex concepts.',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop&crop=entropy&auto=format&q=80'
    }
  ];

  // Handle specialty click
  const toggleSpecialty = (specialtyId: string) => {
    setActiveSpecialty(activeSpecialty === specialtyId ? null : specialtyId);
    const specialtyIndex = specialties.findIndex(s => s.id === specialtyId);
    if (specialtyIndex !== -1) {
      setCurrentImage(specialtyIndex);
    }
  };

  return (
    <section className="flex items-center justify-center px-8 max-w-5xl mx-auto py-12">
      <div className="w-full">
        {/* Heading with same style as About Me but left-aligned */}
        <div className="flex items-center mb-4">
          {/* Sparkle Icon equivalent - using a different icon for specialty */}
          <motion.div
            className="mr-3"
            animate={{
              color: ['#a3e635', '#ffffff', '#a3e635']
            }}
            transition={{
              duration: 0.2,
              delay: 0,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut"
            }}
          >
            <Code size={18} />
          </motion.div>
          
          {/* Title with character-by-character shine */}
          <div className="flex">
            {['S', 'P', 'E', 'C', 'I', 'A', 'L', 'T', 'Y'].map((char, index) => (
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
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Subheading */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-8">
          Areas of Expertise
        </h2>

        {/* Main Content - Two Containers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Container - Specialties */}
          <div className="space-y-3">
            {specialties.map((specialty) => {
              const IconComponent = specialty.icon;
              const isActive = activeSpecialty === specialty.id;
              
              return (
                <div key={specialty.id} className="border border-border rounded-lg overflow-hidden">
                  {/* Specialty Header */}
                  <button
                    onClick={() => toggleSpecialty(specialty.id)}
                    className="w-full flex items-center justify-between p-3 hover:bg-muted/30 transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <IconComponent 
                        size={18} 
                        className="text-foreground mr-3" 
                      />
                      <span className="text-base font-medium text-foreground">
                        {specialty.title}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={20} className="text-muted-foreground" />
                    </motion.div>
                  </button>

                  {/* Dropdown Content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 pb-3 pt-2">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {specialty.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Container - Image Placeholder */}
          <div className="sticky top-24">
            <div className="relative w-full h-64 lg:h-72 rounded-lg overflow-hidden bg-muted">
              <motion.img
                key={currentImage}
                src={specialties[currentImage].image}
                alt={specialties[currentImage].title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
              />
              
              {/* Image Overlay with Title */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <h3 className="text-white text-xl font-semibold">
                  {specialties[currentImage].title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specialty;
