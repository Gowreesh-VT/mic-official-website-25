'use client';

import React, { useState, useEffect, useRef, memo, useMemo } from 'react';
import Image from 'next/image';
import PresidentCard from './components/PresidentCard';
import VicePresidentCard from './components/VicePresidentCard';
import ManagementSecCard from './components/ManagementSecCard';
import TechSecCard from './components/TechSecCard';
import NonTechSecCard from './components/NonTechSecCard';
import RedCard from './components/RedCard';
import BlueCard from './components/BlueCard';
import GreenCard from './components/GreenCard';
import YellowCard from './components/YellowCard';


interface CloudFloatOptions {
  baseTop: string | number;
  baseLeft: string | number;
  amplitude?: number;
  speed?: number;
  phase?: number;
}

interface LeadData {
  name: string;
  title: string;
  imageSrc: string;
  tenure: string;
}

const leadsData: LeadData[] = [
  { name: 'Sanjay Dinesh', title: 'AIML', imageSrc: '/images/mic_departments/aiml_sanjay.jpg', tenure: '2025-2026' },
  { name: 'Abhinav Kumar V', title: 'AIML', imageSrc: '/images/mic_departments/aiml_abhinav.jpg', tenure: '2025-2026' },
  { name: 'Aman', title: 'CP', imageSrc: '/images/mic_departments/cp_aman.jpg', tenure: '2025-2026' },
  { name: 'Anmol Singh', title: 'CP', imageSrc: '/images/mic_departments/cp_anmol.jpg', tenure: '2025-2026' },
  { name: 'Aagney', title: 'Content', imageSrc: '/images/mic_departments/content_aagney.jpg', tenure: '2025-2026' },
  { name: 'Shambhavi', title: 'Content', imageSrc: '/images/mic_departments/content_shambhavi.jpg', tenure: '2025-2026' },
  { name: 'Pranjal Mitra', title: 'Cyber Security', imageSrc: '/images/mic_departments/cs_pranjal.jpg', tenure: '2025-2026' },
  { name: 'Mohammed Tahir', title: 'Cyber Security', imageSrc: '/images/mic_departments/cs_mohammed.jpg', tenure: '2025-2026' },
  { name: 'Gladwin Daniel', title: 'Design', imageSrc: '/images/mic_departments/design_Gladwin.jpg', tenure: '2025-2026' },
  { name: 'Jahnavi Nair', title: 'Design', imageSrc: '/images/mic_departments/design_Jahnavi.jpg', tenure: '2025-2026' },
  { name: 'Rakshana V', title: 'Development', imageSrc: '/images/mic_departments/dev_rakshana.jpg', tenure: '2025-2026' },
  { name: 'Mithil Girish', title: 'Development', imageSrc: '/images/mic_departments/dev_mithil.jpg', tenure: '2025-2026' },
  { name: 'Samyak Srijan', title: 'Entrepreneurship', imageSrc: '/images/mic_departments/entre_samyak.jpg', tenure: '2025-2026' },
  { name: 'Abishek B S', title: 'Entrepreneurship', imageSrc: '/images/mic_departments/entre_abhishek.jpg', tenure: '2025-2026' },
  { name: 'Jefrey Jose D', title: 'Management', imageSrc: '/images/mic_departments/man_jefrey.jpg', tenure: '2025-2026' },
  { name: 'Namita Sathish', title: 'Management', imageSrc: '/images/mic_departments/man_namitha.jpg', tenure: '2025-2026' },
  { name: 'Bhargavi Deshmukh', title: 'Management', imageSrc: '/images/mic_departments/man_bhargavi.jpg', tenure: '2025-2026' },
  { name: 'Anjum Sana', title: 'Social Media', imageSrc: '/images/mic_departments/so_sana.jpg', tenure: '2025-2026' },
  { name: 'Mithun Miras', title: 'Social Media', imageSrc: '/images/mic_departments/so_mithun.jpg', tenure: '2025-2026' },
  { name: 'Sravan Kowsik G', title: 'UI/UX', imageSrc: '/images/mic_departments/uiux_shravan.jpg', tenure: '2025-2026' },
  { name: 'Richika Rani', title: 'UI/UX', imageSrc: '/images/mic_departments/uiux_richika.jpg', tenure: '2025-2026' },
];

const cardOrder = [RedCard, BlueCard, GreenCard, YellowCard];

function useCloudFloat({ baseTop, baseLeft, amplitude = 30, speed = 1, phase = 0 }: CloudFloatOptions) {
  const [top, setTop] = useState(baseTop);
  const frame = useRef(0);

  useEffect(() => {
    let running = true;
    function animate() {
      frame.current += 1;
      const t = frame.current / 60;
      setTop(Number(baseTop) + Math.sin(t * speed + phase) * amplitude);
      if (running) requestAnimationFrame(animate);
    }
    animate();
    return () => {
      running = false;
    };
  }, [baseTop, amplitude, speed, phase]);

  return { top, left: baseLeft };
}

const Cloud = memo(({
  position,
  src,
  index,
  view
}: {
  position: { top: string | number; left: string | number };
  src: string;
  index: number;
  view: 'board' | 'departments';
}) => (
  <Image
    src={src}
    alt={`Cloud ${index + 1}`}
    width={355}
    height={228}
    style={{
      position: view === 'board' ? 'absolute' : 'fixed',
      top: position.top,
      left: position.left,
      zIndex: 2,
      pointerEvents: 'none'
    }}
  />
));

Cloud.displayName = 'Cloud';

const MeetTheBoardPage: React.FC = () => {
  const [view, setView] = useState<'board' | 'departments'>('board');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440);
  const selectedTenure = '2025-2026';

  // Define cloud positions using hooks at the top level
  const cloudPositions = [
    useCloudFloat({ baseTop: 154, baseLeft: -12, amplitude: 25, speed: 0.8, phase: 0 }),
    useCloudFloat({ baseTop: 466, baseLeft: 22, amplitude: 35, speed: 1.1, phase: 1 }),
    useCloudFloat({ baseTop: 700, baseLeft: 232, amplitude: 30, speed: 0.9, phase: 2 }),
    useCloudFloat({ baseTop: 790, baseLeft: 1003, amplitude: 28, speed: 1.2, phase: 3 }),
    useCloudFloat({ baseTop: 604.98, baseLeft: 1331, amplitude: 32, speed: 1.0, phase: 4 }),
    useCloudFloat({ baseTop: 127.98, baseLeft: 1142, amplitude: 27, speed: 1.3, phase: 5 }),
    useCloudFloat({ baseTop: -23, baseLeft: 1500, amplitude: 22, speed: 1.05, phase: 6 }),
    useCloudFloat({ baseTop: 604.98, baseLeft: 1400, amplitude: 32, speed: 1.0, phase: 4 }),
    useCloudFloat({ baseTop: 127.98, baseLeft: 1600, amplitude: 27, speed: 1.3, phase: 5 }),
    useCloudFloat({ baseTop: 600, baseLeft: 1600, amplitude: 22, speed: 1.05, phase: 6 }),
  ];

  const cloudImages = useMemo(() => [
    '/images/cloud1.png', '/images/cloud2.png', '/images/cloud1.png',
    '/images/cloud3.png', '/images/cloud3.png', '/images/cloud2.png',
    '/images/cloud1.png', '/images/cloud3.png', '/images/cloud2.png',
    '/images/cloud1.png'
  ], []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Track window width for responsive grid
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    setWindowWidth(window.innerWidth);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Add transparent scrollbar styles
    const style = document.createElement('style');
    style.textContent = `
      /* Transparent scrollbar for webkit browsers */
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.3);
      }
      
      /* For Firefox */
      * {
        scrollbar-width: thin;
        scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
      }
    `;
    document.head.appendChild(style);

    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';

    // Set scroll behavior based on view
    if (view === 'board') {
      document.body.style.overflowY = 'hidden';
      document.documentElement.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
      document.documentElement.style.overflowY = 'auto';
    }

    const preventZoom = (e: WheelEvent) => {
      if (e.ctrlKey) e.preventDefault();
    };
    const preventKeyboardZoom = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0')) {
        e.preventDefault();
      }
    };

    document.addEventListener('wheel', preventZoom, { passive: false });
    document.addEventListener('keydown', preventKeyboardZoom);

    return () => {
      document.removeEventListener('wheel', preventZoom);
      document.removeEventListener('keydown', preventKeyboardZoom);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.head.removeChild(style);
    };
  }, [view]); // Add view as dependency to re-run when view changes

  const getThemeColors = () => {
    return isDarkMode
      ? {
        background: "linear-gradient(to bottom, #00040d 0%, #002855 100%)",
        lineColor: "#0B3A79",
        borderColor: "#1e40af",
        textColor: "text-white",
        gridOpacity: "rgba(255, 255, 255, 0.1)"
      }
      : {
        background: "linear-gradient(to bottom, #e0f2fe 0%, #87ceeb 100%)",
        lineColor: "#1e88e5",
        borderColor: "#3b82f6",
        textColor: "text-gray-900",
        gridOpacity: "rgba(255, 255, 255, 0.3)"
      };
  };

  const themeColors = getThemeColors();

  // Filter leads data by selected tenure
  const filteredLeadsData = leadsData.filter(lead => lead.tenure === selectedTenure);

  // Responsive cards per row & scale
  const cardsPerRow = windowWidth < 640 ? 1 : windowWidth < 1100 ? 2 : 4;
  // Scale the row so 4 cards always fit; minimum scale 0.5
  const CARD_W = 327;
  const CARD_GAP = 32; // space-x-8 = 2rem = 32px
  const rowTotalW = cardsPerRow * CARD_W + (cardsPerRow - 1) * CARD_GAP;
  const availableW = windowWidth - 32; // subtract page padding
  const rowScale = rowTotalW > availableW ? Math.max(0.5, availableW / rowTotalW) : 1;

  // Prepare rows for departments view
  const rows: typeof filteredLeadsData[] = [];
  for (let i = 0; i < filteredLeadsData.length; i += cardsPerRow) {
    rows.push(filteredLeadsData.slice(i, i + cardsPerRow));
  }

  return (
    <div className="full-screen-container">
      <div className="content-wrapper">
        <div
          className={`${view === 'board' ? 'h-screen' : 'min-h-screen'} w-full flex flex-col items-center px-4 py-8 relative overflow-x-hidden`}
          style={{
            backgroundImage: `
              linear-gradient(to right, ${themeColors.gridOpacity} 1px, transparent 1px),
              linear-gradient(to bottom, ${themeColors.gridOpacity} 1px, transparent 1px),
              ${themeColors.background}
            `,
            backgroundSize: "30px 30px, 30px 30px, 100% 100%",
            backgroundRepeat: "repeat, repeat, no-repeat",
            backgroundPosition: "top left, top left, center",
            userSelect: "none",
          }}
        >
          {cloudPositions.map((pos, i) => (
            <Cloud
              key={i}
              position={pos}
              src={cloudImages[i]}
              index={i}
              view={view}
            />
          ))}

          {/* Stars / Dots - only show in departments view
          {view === 'departments' && (
            <div style={{ position: 'absolute', top: 0, left: 0, width: 1154, height: 364, zIndex: 2 }}>
              <svg width="1154" height="364" viewBox="0 0 1154 364" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="1150.02" cy="55" rx="3.98" ry="4" fill="white" />
                <ellipse cx="949.88" cy="19" rx="3.98" ry="4" fill="white" />
                <ellipse cx="203.12" cy="4" rx="3.98" ry="4" fill="white" />
                <ellipse cx="134.42" cy="211" rx="3.98" ry="4" fill="white" />
                <ellipse cx="3.98" cy="360" rx="3.98" ry="4" fill="white" />
                <ellipse cx="486.89" cy="95" rx="3.98" ry="4" fill="white" />
                <ellipse cx="677.07" cy="47" rx="3.98" ry="4" fill="white" />
                <ellipse cx="1084.3" cy="299" rx="3.98" ry="4" fill="white" />
              </svg>
            </div>
          )} */}

          {/* Stars / Dots - show in both views */}
          <div style={{ position: view === 'board' ? 'absolute' : 'fixed', top: 0, left: 0, width: 1154, height: 364, zIndex: 2 }}>
            <svg width="1154" height="364" viewBox="0 0 1154 364" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="1150.02" cy="55" rx="3.98" ry="4" fill="white" />
              <ellipse cx="949.88" cy="19" rx="3.98" ry="4" fill="white" />
              <ellipse cx="203.12" cy="4" rx="3.98" ry="4" fill="white" />
              <ellipse cx="134.42" cy="211" rx="3.98" ry="4" fill="white" />
              <ellipse cx="3.98" cy="360" rx="3.98" ry="4" fill="white" />
              <ellipse cx="486.89" cy="95" rx="3.98" ry="4" fill="white" />
              <ellipse cx="677.07" cy="47" rx="3.98" ry="4" fill="white" />
              <ellipse cx="1084.3" cy="299" rx="3.98" ry="4" fill="white" />
            </svg>
          </div>

          {/* Heading */}
          <h1 className={`${themeColors.textColor} font-press-start z-10 text-center mb-6`}
            style={{ fontSize: "clamp(1.5rem, 6vw, 4rem)" }}>
            Meet the Team
          </h1>



          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 relative z-10 w-full max-w-[720px] px-4">
            {/* Board Button */}
            <button
              className={`relative w-full sm:w-[345px] h-[60px] sm:h-[81px] flex items-center justify-center border-none bg-transparent p-0 outline-none focus:outline-none focus-visible:outline-none transition-all duration-1000`}
              onClick={() => setView('board')}
              aria-pressed={view === 'board'}
              style={{ outline: 'none' }}
            >
              <img src="/images/button-gold.svg" className={`absolute inset-0 w-full h-full ${view === 'board' ? 'opacity-100' : 'opacity-0'}`} alt="" />
              <img src="/images/button-peach.svg" className={`absolute inset-0 w-full h-full ${view === 'board' ? 'opacity-0' : 'opacity-100'}`} alt="" />
              <span
                className="font-press-start text-[16px] sm:text-[24px] text-black z-10 leading-none flex items-center justify-center"
                style={{ lineHeight: "1", marginTop: "-16px" }}
              >
                BOARD
              </span>
            </button>

            {/* Departments Button */}
            <button
              className={`relative w-full sm:w-[345px] h-[60px] sm:h-[81px] flex items-center justify-center border-none bg-transparent p-0 outline-none focus:outline-none focus-visible:outline-none transition-all duration-1000`}
              onClick={() => setView('departments')}
              aria-pressed={view === 'departments'}
              style={{ outline: 'none' }}
            >
              <img src="/images/button-gold.svg" className={`absolute inset-0 w-full h-full ${view === 'departments' ? 'opacity-100' : 'opacity-0'}`} alt="" />
              <img src="/images/button-peach.svg" className={`absolute inset-0 w-full h-full ${view === 'departments' ? 'opacity-0' : 'opacity-100'}`} alt="" />
              <span
                className="font-press-start text-[16px] sm:text-[24px] text-black z-10 leading-none flex items-center justify-center"
                style={{ lineHeight: "1", marginTop: "-16px" }}
              >
                DEPARTMENTS
              </span>
            </button>
          </div>

          {/* Board View */}
          {view === 'board' && (
            <div className="flex flex-col items-center space-y-8 relative z-10" style={{ transform: windowWidth < 900 ? `scale(${Math.max(0.55, (windowWidth - 32) / 900)})` : 'none', transformOrigin: 'top center' }}>
              <div className="flex justify-center space-x-8">
                <PresidentCard name="NAME" />
                <VicePresidentCard name="NAME" />
                <ManagementSecCard name="NAME" />
              </div>
              <div className="flex justify-center space-x-8">
                <TechSecCard name="NAME" />
                <NonTechSecCard name="NAME" />
              </div>
            </div>
          )}

          {/* Departments View */}
          {view === 'departments' && (
            <div className="flex flex-col items-center space-y-8 relative z-10 w-full">
              {/* Team Members Grid */}
              {rows.map((rowData, rowIndex) => (
                <div key={rowIndex} className="flex justify-center space-x-8" style={{ transform: `scale(${rowScale})`, transformOrigin: 'top center', marginBottom: `${(rowScale - 1) * 279}px` }}>
                  {rowData.map((data, index) => {
                    const CardComponent = cardOrder[index % cardOrder.length];
                    return (
                      <CardComponent
                        key={index}
                        name={data.name}
                        title={data.title}
                        imageSrc={data.imageSrc}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetTheBoardPage;