'use client';

import React, { useState, useEffect, useRef, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- Interfaces ---
interface CloudFloatOptions {
  baseTop: number;
  baseLeft: number;
  amplitude?: number;
  speed?: number;
  phase?: number;
  width: number;
  height: number;
  src: string;
  alt: string;
}

interface ThemeColors {
  background: string;
  lineColor: string;
  borderColor: string;
  textColor: string;
  gridOpacity: string;
}

interface Project {
  id: number;
  title: string;
  status: 'Completed' | 'In Progress';
  description: string;
  techStack: string[];
  codeUrl?: string;
  demoUrl?: string;
  cardImage: string;
  previewImage: string;
}

// --- Hooks & Components ---

function useCloudFloat({ baseTop, baseLeft, amplitude = 30, speed = 1, phase = 0 }: CloudFloatOptions) {
  const [top, setTop] = useState(baseTop);
  const frame = useRef(0);

  useEffect(() => {
    let running = true;
    const animate = () => {
      frame.current += 1;
      const t = frame.current / 60;
      setTop(baseTop + Math.sin(t * speed + phase) * amplitude);
      if (running) requestAnimationFrame(animate);
    };
    animate();
    return () => {
      running = false;
    };
  }, [baseTop, amplitude, speed, phase]);

  return { top, left: baseLeft };
}

const cloudConfig: CloudFloatOptions[] = [
  { baseTop: 150, baseLeft: 50, amplitude: 25, speed: 0.8, phase: 0, width: 355, height: 228, src: '/images/cloud1.png', alt: 'Cloud 1' },
  { baseTop: 460, baseLeft: 100, amplitude: 35, speed: 1.1, phase: 1, width: 367, height: 219, src: '/images/cloud2.png', alt: 'Cloud 2' },
  { baseTop: 700, baseLeft: 230, amplitude: 30, speed: 0.9, phase: 2, width: 355, height: 228, src: '/images/cloud1.png', alt: 'Cloud 3' },
  { baseTop: 100, baseLeft: 1200, amplitude: 28, speed: 1.2, phase: 3, width: 204, height: 125, src: '/images/cloud3.png', alt: 'Cloud 4' },
  { baseTop: 600, baseLeft: 1400, amplitude: 32, speed: 1.0, phase: 4, width: 204, height: 125, src: '/images/cloud3.png', alt: 'Cloud 5' },
];

const Cloud = memo(({ config }: { config: CloudFloatOptions }) => {
  const { top, left } = useCloudFloat(config);
  const [imageError, setImageError] = useState(false);

  return (
    <Image
      src={imageError ? '/images/fallback-cloud.png' : config.src}
      alt={config.alt}
      width={config.width}
      height={config.height}
      className="absolute z-10 opacity-80 pointer-events-none"
      style={{
        top: `${top}px`,
        left: `${left}px`,
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
      onError={() => setImageError(true)}
    />
  );
});

Cloud.displayName = 'Cloud';

const projects: Project[] = [
  {
    id: 1,
    title: 'Project Name',
    status: 'Completed',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    techStack: ['python', 'tensorflow', 'react'],
    codeUrl: '#',
    demoUrl: '#',
    cardImage: '/images/imageno1.png',
    previewImage: '/images/previews/preview1.png',
  },
  {
    id: 2,
    title: '2 Project',
    status: 'Completed',
    description: 'Another project description goes here. Responsive layouts require flexbox wizardry.',
    techStack: ['next.js', 'tailwind', 'typescript'],
    codeUrl: '#',
    demoUrl: '#',
    cardImage: '/images/imageno2.png',
    previewImage: '/images/previews/preview2.png',
  },
  {
    id: 3,
    title: '3 Project',
    status: 'Completed',
    description: 'Short line about what this project does and why it is cool.',
    techStack: ['flutter', 'firebase'],
    codeUrl: '#',
    demoUrl: '#',
    cardImage: '/images/imageno3.png',
    previewImage: '/images/previews/preview3.png',
  },
  {
    id: 4,
    title: '4 Project',
    status: 'Completed',
    description: 'Describe the problem this project solves in one or two sentences.',
    techStack: ['node', 'express', 'mongodb'],
    codeUrl: '#',
    demoUrl: '#',
    cardImage: '/images/imageno4.png',
    previewImage: '/images/previews/preview4.png',
  },
  {
    id: 5,
    title: '5 Project',
    status: 'Completed',
    description: 'Teaser description for the upcoming project in our club.',
    techStack: ['rust', 'wasm'],
    codeUrl: '#',
    demoUrl: '#',
    cardImage: '/images/imageno5.png',
    previewImage: '/images/previews/preview5.png',
  },
];

const ProjectsPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      clearTimeout(timer);
    };
  }, []);

  const getThemeColors = (): ThemeColors => ({
    background: isDarkMode
      ? 'linear-gradient(to bottom, #00040d 0%, #002855 100%)'
      : 'linear-gradient(to bottom, #e0f2fe 0%, #87ceeb 100%)',
    lineColor: isDarkMode ? '#0B3A79' : '#1e88e5',
    borderColor: isDarkMode ? '#1e40af' : '#3b82f6',
    textColor: isDarkMode ? 'text-white' : 'text-gray-900',
    gridOpacity: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)',
  });

  const themeColors = getThemeColors();
  const activeProject = projects[activeIndex];

  return (
    <div
      className="h-screen w-screen relative overflow-hidden flex flex-row"
      style={{
        backgroundImage: `
          linear-gradient(to right, ${themeColors.gridOpacity} 1px, transparent 1px),
          linear-gradient(to bottom, ${themeColors.gridOpacity} 1px, transparent 1px),
          ${themeColors.background}
        `,
        backgroundSize: '30px 30px, 30px 30px, 100% 100%',
        userSelect: 'none',
      }}
    >
      {isLoading ? (
        <div className="animate-pulse text-center z-20 absolute inset-0 flex flex-col items-center justify-center">
          <div className={`h-8 w-48 ${themeColors.textColor} bg-opacity-20 bg-current rounded mb-4`} />
          <div className={`h-6 w-64 ${themeColors.textColor} bg-opacity-20 bg-current rounded`} />
        </div>
      ) : (
        <>
          <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
            {cloudConfig.map((config, index) => (
              <Cloud key={index} config={config} />
            ))}
          </div>

          {/* Header - positioned across full screen width for true centering */}
          <div className="absolute top-0 left-0 w-full px-6 py-4 lg:pt-8 lg:pb-2 z-30 pointer-events-none">
            <h1 className={`${themeColors.textColor} font-press-start z-10 text-center`}
              style={{ fontSize: "clamp(1rem, 4.5vw, 3rem)" }}>
              Projects
            </h1>
          </div>

          {/* LEFT SIDE: Content Container */}
          <div className="flex-1 h-full flex flex-col relative z-20 min-w-0 pt-20 lg:pt-24">

            {/* Content Box */}
            {/* FIX: Reduced padding lg:pl-8. Reduced gap between image and text */}
            <div className="flex-1 flex items-center justify-center p-4 lg:pl-8 lg:pr-4 xl:pl-56 xl:pr-12 relative transition-all duration-300">
              <div className="relative w-full max-w-5xl flex gap-6 lg:gap-8 xl:gap-12 items-center justify-center lg:justify-start">

                {/* Borders */}
                <div className="absolute -inset-8 pointer-events-none z-0 opacity-50 hidden lg:block">
                  <Image src={'/images/borders/tt.png'} alt='' width={32} height={32} className='absolute top-0 left-0' />
                  <Image src={'/images/borders/tr.png'} alt='' width={32} height={32} className='absolute top-0 right-0' />
                  <Image src={'/images/borders/bl.png'} alt='' width={32} height={32} className='absolute bottom-0 left-0' />
                  <Image src={'/images/borders/rb.png'} alt='' width={32} height={32} className='absolute bottom-0 right-0' />
                </div>

                {/* Project Image */}
                {/* FIX: w-[280px] on laptop (lg), w-[460px] on monitor (xl). This prevents squishing. */}
                <div className="relative z-10 hidden md:flex items-center justify-center w-[200px] lg:w-[280px] xl:w-[460px] flex-shrink-0 transition-all duration-300">
                  <div className="relative w-full aspect-square bg-[#dde3eb] border-[6px] lg:border-[10px] border-black overflow-hidden shadow-xl">
                    <Image
                      src={activeProject.previewImage}
                      alt={activeProject.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-4 border-[4px] border-white/70 pointer-events-none" />
                  </div>
                </div>

                {/* Project Text Info */}
                <div className="flex-1 flex flex-col justify-center gap-4 lg:gap-6 z-10 min-w-0">
                  <div className="space-y-3 lg:space-y-4">
                    <div className="flex flex-wrap items-center gap-3 lg:gap-4">
                      {/* FIX: Text scales: text-xl (mobile) -> text-2xl (laptop) -> text-3xl (monitor) */}
                      <h2 className="font-press-start text-white text-xl lg:text-2xl xl:text-3xl leading-tight">
                        {activeProject.title}
                      </h2>
                      <span className="px-3 py-1 text-[10px] lg:text-xs font-press-start bg-pink-200 text-black border-2 border-black whitespace-nowrap">
                        {activeProject.status}
                      </span>
                    </div>

                    {/* FIX: Text scales: text-xs (laptop) -> text-lg (monitor). This ensures it fits. */}
                    <p className="text-sm lg:text-sm xl:text-lg leading-relaxed text-slate-100 max-w-2xl font-mono">
                      {activeProject.description}
                    </p>

                    <div className="space-y-2 lg:space-y-3">
                      <p className="font-press-start text-[10px] lg:text-xs tracking-wide text-white">
                        Tech Stack:
                      </p>
                      <div className="flex flex-wrap gap-2 lg:gap-3">
                        {activeProject.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-[10px] lg:text-xs font-mono bg-black text-white border border-white/40 uppercase"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 lg:gap-4 mt-2">
                    {activeProject.codeUrl && (
                      <Link
                        href={activeProject.codeUrl}
                        target="_blank" // Opens in new tab
                        rel="noopener noreferrer" // Security best practice
                        className="inline-flex items-center gap-2 lg:gap-3 px-4 lg:px-5 py-2 lg:py-3 text-[10px] lg:text-xs xl:text-sm font-press-start bg-black text-white border-2 border-white hover:translate-y-[-2px] active:translate-y-[0px] transition-transform shadow-lg"
                      >
                        {/* GitHub Icon SVG */}
                        <svg className="w-4 h-4 lg:w-5 lg:h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span>CODE</span>
                      </Link>
                    )}
                    {activeProject.demoUrl && (
                      <Link
                        href={activeProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 lg:gap-3 px-4 lg:px-5 py-2 lg:py-3 text-[10px] lg:text-xs xl:text-sm font-press-start bg-pink-200 text-black border-2 border-black hover:translate-y-[-2px] active:translate-y-[0px] transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      >
                        {/* External Link Icon SVG */}
                        <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                        <span>DEMO</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Navigation Sidebar */}
          {/* FIX: Width scales: w-[200px] (mobile) -> w-[260px] (laptop) -> w-[350px] (monitor) */}
          <div className="h-full w-[200px] lg:w-[260px] xl:w-[350px] flex-shrink-0 z-20 flex flex-col pointer-events-none">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => setActiveIndex(index)}
                className={`
                  relative flex-1 w-full group outline-none
                  transition-transform duration-300 ease-out
                  ${activeIndex === index ? 'translate-x-[-20px]' : 'translate-x-[0px] hover:translate-x-[-10px]'}
                `}
              >
                <div className="absolute inset-0 w-[85%] ml-auto h-full pointer-events-auto">
                  <Image
                    src={project.cardImage}
                    alt={`Select ${project.title}`}
                    fill
                    className="object-contain object-right"
                    sizes="(max-width: 1200px) 260px, 350px"
                    priority
                  />
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default memo(ProjectsPage);