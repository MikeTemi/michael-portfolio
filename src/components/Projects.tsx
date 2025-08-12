'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Code2, ExternalLink, Github } from 'lucide-react';

const Projects = () => {
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

  // Sample projects data
  const projects = [
    {
      id: 1,
      title: "Project One",
      description: "A full-stack web application built with modern technologies",
      tech: ["React", "Node.js", "TypeScript", "PostgreSQL"],
      githubUrl: "#",
      liveUrl: "#",
      status: "Completed",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop&crop=entropy&auto=format&q=80"
    },
    {
      id: 2,
      title: "Project Two", 
      description: "AI-powered tool that helps developers streamline their workflow",
      tech: ["Next.js", "Python", "OpenAI API", "Tailwind CSS"],
      githubUrl: "#",
      liveUrl: "#",
      status: "In Progress",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop&crop=entropy&auto=format&q=80"
    },
    {
      id: 3,
      title: "Project Three",
      description: "DevOps automation platform for seamless deployment pipelines",
      tech: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      githubUrl: "#",
      liveUrl: null,
      status: "Completed",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=400&fit=crop&crop=entropy&auto=format&q=80"
    }
  ];

  // 3D Tilt Card Component with Edge-Sensitive Effects
  const TiltCard = ({ children, index }: { children: React.ReactNode, index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    
    // Motion values for mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    // Spring configurations for natural, alive feeling - even more subtle
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), {
      stiffness: 300,
      damping: 30,
      restDelta: 0.001
    });
    
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), {
      stiffness: 300,
      damping: 30,
      restDelta: 0.001
    });

    // Enhanced edge-sensitive scaling and shadow - even more subtle
    const scale = useSpring(1, {
      stiffness: 300,
      damping: 40
    });

    const shadowBlur = useSpring(useTransform(mouseX, [-0.5, 0.5], [8, 15]), {
      stiffness: 200,
      damping: 25
    });

    const shadowOpacity = useSpring(0.03, {
      stiffness: 200,
      damping: 25
    });

    // Handle mouse move with edge-sensitive calculations
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Normalize mouse position relative to card center (-1 to 1)
      let normalizedX = (e.clientX - centerX) / (rect.width / 2);
      let normalizedY = (e.clientY - centerY) / (rect.height / 2);
      
      // Apply edge amplification for more dramatic effect at edges - even more subtle
      const edgeMultiplier = 1.1;
      normalizedX = Math.sign(normalizedX) * Math.pow(Math.abs(normalizedX), 0.95) * edgeMultiplier;
      normalizedY = Math.sign(normalizedY) * Math.pow(Math.abs(normalizedY), 0.95) * edgeMultiplier;
      
      // Clamp values to reasonable range
      normalizedX = Math.max(-1, Math.min(1, normalizedX));
      normalizedY = Math.max(-1, Math.min(1, normalizedY));

      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
      scale.set(1.01);
      shadowOpacity.set(0.08);
    };

    // Reset on mouse leave
    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
      scale.set(1);
      shadowOpacity.set(0.03);
    };

    return (
      <motion.div
        ref={cardRef}
        className="bg-card border border-border rounded-lg p-6 hover:border-lime-400/50 transition-colors duration-300 cursor-pointer"
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          transformPerspective: 1000,
          boxShadow: useTransform(
            [shadowBlur, shadowOpacity],
            ([blur, opacity]) => `0 ${blur as number}px ${(blur as number) * 2}px rgba(0, 0, 0, ${opacity as number})`
          )
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.15,
          ease: [0.25, 0.4, 0.25, 1]
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div style={{ transform: "translateZ(10px)" }}>
          {children}
        </div>
      </motion.div>
    );
  };

  // Animated Button Component (similar to Hero)
  const ViewAllProjectsButton = ({ className = "" }: { className?: string }) => (
    <button 
      className={`relative overflow-hidden px-6 py-3 border border-border bg-transparent text-muted-foreground hover:bg-foreground hover:text-background rounded-full transition-all duration-700 ease-[cubic-bezier(0.25,0.4,0.25,1)] group text-sm ${className}`}
    >
      <div className="relative">
        <span className="block transition-all duration-700 ease-[cubic-bezier(0.25,0.4,0.25,1)] group-hover:-translate-y-full group-hover:opacity-0">
          View All Projects
        </span>
        <span className="absolute inset-0 flex items-center justify-center translate-y-full opacity-0 transition-all duration-700 ease-[cubic-bezier(0.25,0.4,0.25,1)] group-hover:translate-y-0 group-hover:opacity-100">
          View All Projects
        </span>
      </div>
    </button>
  );

  return (
    <>
      {/* Projects Section */}
      <section className="min-h-screen flex items-center justify-center px-8 max-w-7xl mx-auto">
        <div className="text-center w-full">
          {/* Code Icon + Title with Wave Effect */}
          <div className="flex items-center justify-center mb-12">
            {/* Code Icon */}
            <Code2 
              className="text-lime-400 mr-3" 
              size={18}
            />
            
            {/* Title with character-by-character shine */}
            <div className="flex">
              {['P', 'R', 'O', 'J', 'E', 'C', 'T', 'S'].map((char, index) => (
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
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <TiltCard key={project.id} index={index}>
                {/* Project Image */}
                <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                  {/* Status Badge Overlay */}
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs px-2 py-1 rounded-full backdrop-blur-sm ${
                      project.status === 'Completed' 
                        ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Project Header */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    {project.title}
                  </h3>
                </div>

                {/* Project Description */}
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="text-xs px-2 py-1 bg-lime-400/10 text-lime-400 rounded-md border border-lime-400/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex gap-4">
                  <a
                    href={project.githubUrl}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-lime-400 transition-colors"
                  >
                    <Github size={16} />
                    Code
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-lime-400 transition-colors"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                </div>
              </TiltCard>
            ))}
          </div>

          {/* View All Projects Button */}
          <div className="flex justify-center mt-12">
            <ViewAllProjectsButton />
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
