'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const TechStackDivider = () => {
  // Tech stack with names and their corresponding Iconify icons
  const techStack = [
    { name: 'HTML', icon: 'vscode-icons:file-type-html' },
    { name: 'CSS', icon: 'vscode-icons:file-type-css' },
    { name: 'TailwindCSS', icon: 'vscode-icons:file-type-tailwind' },
    { name: 'Javascript', icon: 'vscode-icons:file-type-js-official' },
    { name: 'Python', icon: 'vscode-icons:file-type-python' },
    { name: 'React', icon: 'vscode-icons:file-type-reactjs' },
    { name: 'Next.js', icon: 'vscode-icons:file-type-next' },
    { name: 'Motion', icon: 'simple-icons:framer' },
    { name: 'Vite', icon: 'vscode-icons:file-type-vite' },
    { name: 'Docker', icon: 'vscode-icons:file-type-docker2' },
    { name: 'Kubernetes', icon: 'devicon:kubernetes' },
    { name: 'AWS', icon: 'skill-icons:aws-light' },
    { name: 'Git', icon: 'vscode-icons:file-type-git' },
    { name: 'Figma', icon: 'devicon:figma' },
    { name: 'Bash', icon: 'codicon:terminal-bash' },
    { name: 'TypeScript', icon: 'vscode-icons:file-type-typescript-official' },
    { name: 'Node.js', icon: 'vscode-icons:file-type-node' },
    { name: 'MySQL', icon: 'vscode-icons:file-type-mysql' },
    { name: 'MongoDB', icon: 'vscode-icons:file-type-mongo' },
    { name: 'MS-SQL Server', icon: 'vscode-icons:file-type-sql' }
  ];

  // Duplicate the array to create seamless scrolling
  const duplicatedTechStack = [...techStack, ...techStack];

  return (
    <div className="w-full py-8 overflow-hidden">
      {/* Container with max-width matching specialty section */}
      <div className="max-w-5xl mx-auto relative">
        {/* Fade gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling container */}
        <div className="overflow-hidden">
          <motion.div
            className="flex space-x-4 w-max"
            animate={{
              x: [0, -50 * techStack.length]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {duplicatedTechStack.map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="flex-shrink-0 flex items-center px-3 py-2 bg-muted/50 rounded-full border border-border/30 backdrop-blur-sm"
              >
                <Icon 
                  icon={tech.icon} 
                  className="w-4 h-4 mr-2 flex-shrink-0" 
                />
                <span className="text-xs font-medium text-foreground whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TechStackDivider;
