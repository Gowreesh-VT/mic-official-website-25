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
  status: 'Completed' | 'In Progress' | 'Pending';
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
    title: 'AI Academic Assistant',
    status: 'Pending',
    description: 'AI Academic Assistant is a personalized exam-preparation platform that transforms a student\'s syllabus, notes, and past papers into a clear study strategy. It predicts topic weightage, highlights high-risk areas, explains concepts in exam-writing format, solves numericals step-by-step, and simulates mock tests, labs, and viva — helping students know what to study, how to write, and how to revise.',
    techStack: ['Python', 'FastAPI', 'OpenAI', 'Next.js', 'TypeScript', 'Supabase', 'Docker', 'Tailwind CSS'],
    codeUrl: 'https://github.com/micvitc/acad-assistant',
    demoUrl: 'https://drive.google.com/file/d/1p9uNLFISlp8mbNnNjeEWquToglu_Vn-A/view?usp=sharing',
    cardImage: '/images/imageno1.png',
    previewImage: '/project/AI_Academic_Assistant_Combined.png',
  },
  {
    id: 2,
    title: 'Autonomous Vision Warehouse Rover',
    status: 'Pending',
    description: 'Vision-Based Autonomous Warehouse Robot is a low-cost, physical AI platform that transforms raw camera feeds, depth sensor readings, and target coordinates into intelligent indoor navigation. It detects dynamic obstacles using Tiny-YOLO, fuses multi-sensor data, and executes real-time pathfinding using a pre-trained Reinforcement Learning agent fully on-board.',
    techStack: ['Python', 'C++', 'PyTorch', 'Tiny-YOLO', 'OpenCV', 'ROS 2', 'Raspberry Pi', 'ESP32-CAM'],
    codeUrl: 'https://github.com/Vision-based-Rover/Autonomous-Rover',
    cardImage: '/images/imageno2.png',
    previewImage: '/images/imageno2.png',
  },
  {
    id: 3,
    title: 'TASA CodeCraft',
    status: 'Pending',
    description: 'TASA CodeCraft is built to guide students step by step toward their dream job. Instead of random preparation, it provides a clear path covering DSA, System Design, Aptitude, and Core CS along with company-specific practice and daily challenges. A smart dashboard tracks strengths, weaknesses, and progress — turning placement prep into a focused, goal-driven journey.',
    techStack: ['Java', 'Spring Boot', 'React', 'MySQL', 'Redis', 'Docker', 'JWT'],
    codeUrl: 'https://github.com/TASA-Code-Craft/frontend',
    demoUrl: 'https://drive.google.com/file/d/1G1erMBSeZ0qpF-bgSSPyXWx0wLnjMlpq/view?usp=sharing',
    cardImage: '/images/imageno3.png',
    previewImage: '/project/TASA_CodeCraft.png',
  },
];

const ProjectsPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

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
      className="w-screen relative overflow-hidden flex flex-col"
      style={{
        height: '100dvh',
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
          {/* Clouds */}
          <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
            {cloudConfig.map((config, index) => (
              <Cloud key={index} config={config} />
            ))}
          </div>

          {/* ── Header ── */}
          <div className="w-full px-6 pt-5 pb-3 z-30 pointer-events-none text-center flex-shrink-0">
            <h1
              className={`${themeColors.textColor} font-press-start`}
              style={{ fontSize: 'clamp(1.2rem, 4vw, 3rem)' }}
            >
              Projects
            </h1>
          </div>

          {/* ── Body row: content | sidebar right ── */}
          <div className="flex-1 min-h-0 flex flex-row z-20" style={{ paddingLeft: 'clamp(8px, 2vw, 24px)', paddingBottom: 'clamp(8px, 2vh, 24px)' }}>

            {/* MAIN CONTENT: vertically centered */}
            <div className="flex-1 min-w-0 flex items-center justify-center p-4 lg:px-8 xl:px-12">
              <div
                className="relative w-full max-w-4xl flex flex-col md:flex-row gap-6 lg:gap-10 items-center"
                style={{ padding: 'clamp(16px, 3vw, 40px)', background: 'rgba(0,0,0,0.15)', borderRadius: 4 }}
              >
                {/* Corner borders */}
                <div className="absolute -inset-2 pointer-events-none z-0 opacity-60 hidden lg:block">
                  <Image src={'/images/borders/tt.png'} alt='' width={32} height={32} className='absolute top-0 left-0' />
                  <Image src={'/images/borders/tr.png'} alt='' width={32} height={32} className='absolute top-0 right-0' />
                  <Image src={'/images/borders/bl.png'} alt='' width={32} height={32} className='absolute bottom-0 left-0' />
                  <Image src={'/images/borders/rb.png'} alt='' width={32} height={32} className='absolute bottom-0 right-0' />
                </div>

                {/* Project Preview Image — click to expand */}
                <div
                  className="relative z-10 hidden sm:flex items-center justify-center flex-shrink-0 transition-all duration-300 cursor-zoom-in group"
                  style={{ width: 'clamp(200px, 28vw, 420px)', aspectRatio: '4/3' }}
                  onClick={() => setLightboxOpen(true)}
                  title="Click to expand"
                >
                  <div className="relative w-full h-full border-[6px] border-black overflow-hidden shadow-xl">
                    <Image
                      src={activeProject.previewImage}
                      alt={activeProject.title}
                      fill
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                    {/* Expand hint overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center pointer-events-none">
                      <svg className="w-10 h-10 text-white opacity-0 group-hover:opacity-90 transition-opacity duration-200 drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </div>
                  </div>
                </div>



                {/* Text Info */}
                <div className="flex-1 flex flex-col justify-center gap-4 lg:gap-5 z-10 min-w-0">
                  {/* Title + Status */}
                  <div>
                    <h2 className="font-press-start text-white leading-tight mb-3"
                      style={{ fontSize: 'clamp(14px, 2vw, 28px)' }}>
                      {activeProject.title}
                    </h2>
                    <span className="px-3 py-1 text-[10px] font-press-start bg-pink-200 text-black border-2 border-black whitespace-nowrap">
                      {activeProject.status}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="leading-relaxed text-slate-100 font-mono"
                    style={{ fontSize: 'clamp(11px, 1.1vw, 15px)' }}>
                    {activeProject.description}
                  </p>

                  {/* Tech Stack */}
                  <div>
                    <p className="font-press-start tracking-wide text-white mb-2"
                      style={{ fontSize: 'clamp(9px, 0.9vw, 12px)' }}>
                      Tech Stack:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.techStack.map((tech) => (
                        <span key={tech}
                          className="px-2 py-1 font-mono bg-black text-white border border-white/40 uppercase"
                          style={{ fontSize: 'clamp(9px, 0.85vw, 12px)' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-3 mt-1">
                    {activeProject.codeUrl && (
                      <Link href={activeProject.codeUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 font-press-start bg-black text-white border-2 border-white hover:translate-y-[-2px] active:translate-y-[0px] transition-transform shadow-lg"
                        style={{ fontSize: 'clamp(9px, 0.9vw, 12px)' }}>
                        <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                        <span>CODE</span>
                      </Link>
                    )}
                    {activeProject.demoUrl && (
                      <Link href={activeProject.demoUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 font-press-start bg-pink-200 text-black border-2 border-black hover:translate-y-[-2px] active:translate-y-[0px] transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        style={{ fontSize: 'clamp(9px, 0.9vw, 12px)' }}>
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        <span>DEMO</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR: project selector cards — no right padding, flush to edge */}
            <div
              className="flex-shrink-0 z-20 flex flex-col"
              style={{ width: 'clamp(155px, 19vw, 320px)', pointerEvents: 'none' }}
            >
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => setActiveIndex(index)}
                  style={{ pointerEvents: 'auto' }}
                  className={`relative flex-1 w-full group outline-none transition-transform duration-300 ease-out ${activeIndex === index ? 'translate-x-[-12px]' : 'translate-x-[0px] hover:translate-x-[-8px]'}`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={project.cardImage}
                      alt={`Select ${project.title}`}
                      fill
                      className="object-contain object-right"
                      sizes="240px"
                      priority
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
          {/* Lightbox - Moved outside constrained containers for higher z-index stacking context */}
          {lightboxOpen && (
            <div
              className="fixed inset-0 z-40 flex items-center justify-center bg-black/80"
              style={{ backdropFilter: 'blur(4px)' }}
              onClick={() => setLightboxOpen(false)}
            >
              <div
                className="relative max-w-[90vw] max-h-[90vh] shadow-2xl border-4 border-white/30"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={activeProject.previewImage}
                  alt={activeProject.title}
                  width={1280}
                  height={800}
                  className="object-contain max-h-[88vh] w-auto"
                  style={{ display: 'block' }}
                  priority
                />
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="absolute top-3 right-3 w-9 h-9 bg-black/70 text-white rounded-full flex items-center justify-center text-lg font-bold hover:bg-red-500 transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default memo(ProjectsPage);
