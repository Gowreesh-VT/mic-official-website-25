"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";


const ClubLogo = () => (
  <div
    style={{
      position: 'absolute',
      left: '50%',
      top: 80,
      transform: 'translateX(-50%)',
      zIndex: 12,
    }}
  >
    <Image
      src="/images/Group 204.png"
      alt="Microsoft Innovations Club Logo"
      width={700}
      height={180}
      style={{ width: '90vw', maxWidth: 800, height: 'auto', display: 'block' }}
      priority
    />
  </div>
);

const Cube = () => (
  <div
    style={{
      position: 'absolute',
      left: '50%',
      top: 240,
      transform: 'translateX(-50%)',
      zIndex: 11,
    }}
  >
    <Image
      src="/cube.svg"
      alt="Microsoft Innovations Club Logo"
      width={700}
      height={180}
      style={{ width: '70vw', maxWidth: 500, height: 'auto', display: 'block' }}
      priority
    />
  </div>
);

interface CloudFloatOptions {
  baseTop: number;
  baseLeft: number;
  amplitude?: number;
  speed?: number;
  phase?: number;
}

function useCloudFloat({ baseTop, baseLeft, amplitude = 30, speed = 1, phase = 0 }: CloudFloatOptions) {
  const [top, setTop] = useState(baseTop);
  const [left, setLeft] = useState(baseLeft);
  
  const frame = useRef(0);

  useEffect(() => {
    let running = true;
    
    function animate() {
      frame.current += 1;
      const t = frame.current / 60;
      setTop(baseTop + Math.sin(t * speed + phase) * amplitude);
      if (running) requestAnimationFrame(animate);
    }
    
    animate();
    
    function handleResize() {
      const vw = window.innerWidth;
      const scale = vw / 1920;
      setLeft(baseLeft * scale);
    }
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      running = false;
      window.removeEventListener('resize', handleResize);
    };
  }, [baseTop, baseLeft, amplitude, speed, phase]);

  return { top, left };
}

const Clouds = ({ clouds }: { clouds: { top: number; left: number }[] }) => (
  <>
    {clouds.map((cloud, idx) => (
      <Image
        key={idx}
        src={`/images/cloud${(idx % 3) + 1}.png`}
        alt={`Cloud ${idx + 1}`}
        width={idx % 3 === 2 ? 204 : idx % 3 === 1 ? 367 : 355}
        height={idx % 3 === 2 ? 125 : idx % 3 === 1 ? 219 : 228}
        style={{ 
          position: 'absolute', 
          top: `${cloud.top}px`, 
          left: `${cloud.left}px`, 
          zIndex: 2 
        }}
        priority
      />
    ))}
  </>
);


const LandingPage = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLeaderboardWidget, setShowLeaderboardWidget] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  const cloudPositions = [
    { baseTop: 154, baseLeft: -12, amplitude: 25, speed: 0.8, phase: 0 },
    { baseTop: 466, baseLeft: 22, amplitude: 35, speed: 1.1, phase: 1 },
    { baseTop: 700, baseLeft: 232, amplitude: 30, speed: 0.9, phase: 2 },
    { baseTop: 790, baseLeft: 1003, amplitude: 28, speed: 1.2, phase: 3 },
    { baseTop: 604.98, baseLeft: 1331, amplitude: 32, speed: 1.0, phase: 4 },
    { baseTop: 127.98, baseLeft: 1142, amplitude: 27, speed: 1.3, phase: 5 },
    { baseTop: -23, baseLeft: 1500, amplitude: 22, speed: 1.05, phase: 6 },
    { baseTop: 604.98, baseLeft: 1400, amplitude: 32, speed: 1.0, phase: 4 },
    { baseTop: 127.98, baseLeft: 1600, amplitude: 27, speed: 1.3, phase: 5 },
    { baseTop: 600, baseLeft: 1600, amplitude: 22, speed: 1.05, phase: 6 },
  ].map(useCloudFloat);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, []);

  // Manage animation sequence steps
  useEffect(() => {
    if (showLeaderboardWidget) {
      const timer3 = setTimeout(() => setAnimationStep(3), 1200); // Podium emerge
      const timer4 = setTimeout(() => setAnimationStep(4), 2000); // Ghosts appear
      const timer5 = setTimeout(() => setAnimationStep(5), 2500); // Red banner
      const timer6 = setTimeout(() => setAnimationStep(6), 3500); // Blue banner
      const timer7 = setTimeout(() => setAnimationStep(7), 4500); // Green banner

      return () => {
        clearTimeout(timer3);
        clearTimeout(timer4);
        clearTimeout(timer5);
        clearTimeout(timer6);
        clearTimeout(timer7);
      };
    } else {
      setAnimationStep(0);
    }
  }, [showLeaderboardWidget]);

   const getThemeColors = () => {
    return isDarkMode
      ? {
        background: "linear-gradient(to bottom, #00040d 0%, #002855 100%)",
        textColor: "text-white",
        gridOpacity: "rgba(255, 255, 255, 0.1)"
      }
      : {
        background: "linear-gradient(to bottom, #e0f2fe 0%, #87ceeb 100%)",
        textColor: "text-gray-900",
        gridOpacity: "rgba(255, 255, 255, 0.3)"
      };
  };
  const themeColors = getThemeColors();
  useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches);
        const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      }, []);

  return (
    <div className="w-full min-h-screen flex flex-col  relative overflow-hidden" style={{
              backgroundImage: `
                linear-gradient(to right, ${themeColors.gridOpacity} 1px, transparent 1px),
                linear-gradient(to bottom, ${themeColors.gridOpacity} 1px, transparent 1px),
                ${themeColors.background}
              `,
              backgroundSize: "30px 30px, 30px 30px, 100% 100%",
              backgroundRepeat: "repeat, repeat, no-repeat",
              backgroundPosition: "top left, top left, center",
              userSelect: "none",
            }}>
    <div className="w-full min-h-screen flex flex-col mt-5 relative overflow-hidden">
      
      <a
        href="https://www.instagram.com/microsoft.innovations.vitc/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-1 right-40 z-50"
      >
        {/* Inline SVG so only inner coloured square moves on hover */}
        <svg
          className="Animated-Logo"
          width="88"
          height="84"
          viewBox="0 0 82 78"
          aria-label="Instagram Logo"
        >
          {/* Outer black background (static) */}
          <rect x="12.5" y="12.5" width="66" height="62" fill="#000809" stroke="black" strokeWidth="7" />
          {/* Inner icon that slides on hover */}
          <g className="icon-inner">
            <rect x="3.5" y="3.5" width="66" height="62" fill="#B3F2FF" stroke="black" strokeWidth="7" />
            <rect x="17" y="23.9497" width="3.42757" height="20.375" fill="black" />
            <rect x="52.0371" y="23.9497" width="3.42757" height="20.7558" fill="black" />
            <rect
              x="46.3242"
              y="49.8469"
              width="3.42757"
              height="20.375"
              transform="rotate(90 46.3242 49.8469)"
              fill="black"
            />
            <rect
              x="25.9502"
              y="18.4277"
              width="3.42757"
              height="20.375"
              transform="rotate(-90 25.9502 18.4277)"
              fill="black"
            />
            <rect x="18.5234" y="20.7126" width="3.42757" height="3.23715" fill="black" />
            <rect
              width="3.42757"
              height="3.23715"
              transform="matrix(-1 0 0 1 53.752 20.9031)"
              fill="black"
            />
            <rect
              width="3.42757"
              height="3.23715"
              transform="matrix(1 0 0 -1 18.5234 47.5618)"
              fill="black"
            />
            <rect
              x="53.752"
              y="47.9429"
              width="3.42757"
              height="3.23715"
              transform="rotate(180 53.752 47.9429)"
              fill="black"
            />
            <rect x="20.2373" y="18.2373" width="3.42757" height="3.23715" fill="black" />
            <rect
              width="3.42757"
              height="3.23715"
              transform="matrix(-1 0 0 1 52.0371 18.4277)"
              fill="black"
            />
            <rect
              width="3.42757"
              height="3.23715"
              transform="matrix(1 0 0 -1 20.2373 50.0374)"
              fill="black"
            />
            <rect
              x="52.0371"
              y="50.4185"
              width="3.42757"
              height="3.23715"
              transform="rotate(180 52.0371 50.4185)"
              fill="black"
            />
            <rect x="22.5215" y="16.5232" width="3.42757" height="3.23715" fill="black" />
            <rect
              width="3.42757"
              height="3.23715"
              transform="matrix(-1 0 0 1 49.7529 16.7136)"
              fill="black"
            />
            <rect
              width="3.42757"
              height="3.23715"
              transform="matrix(1 0 0 -1 22.5215 51.7512)"
              fill="black"
            />
            <rect
              x="49.7529"
              y="52.1321"
              width="3.42757"
              height="3.23715"
              transform="rotate(180 49.7529 52.1321)"
              fill="black"
            />
            <rect x="25.9502" y="29.8528" width="3.61799" height="8.37851" fill="black" />
            <rect x="42.3252" y="29.8528" width="3.61799" height="8.37851" fill="black" />
            <rect
              x="40.4209"
              y="24.3308"
              width="3.42757"
              height="8.75935"
              transform="rotate(90 40.4209 24.3308)"
              fill="black"
            />
            <rect
              x="31.8535"
              y="43.9438"
              width="3.42757"
              height="8.37851"
              transform="rotate(-90 31.8535 43.9438)"
              fill="black"
            />
            <rect x="28.6162" y="38.2314" width="3.23715" height="3.42757" fill="black" />
            <rect x="40.2314" y="38.2314" width="3.23715" height="3.42757" fill="black" />
            <rect x="40.4209" y="26.425" width="3.23715" height="3.42757" fill="black" />
            <rect x="28.4248" y="26.425" width="3.23715" height="3.42757" fill="black" />
            <rect x="44.6113" y="22.2361" width="3.23715" height="3.42757" fill="black" />
          </g>
        </svg>
      </a>
      <a
        href="https://www.linkedin.com/company/microsoft-innovations-club-vitc/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-1 right-24 z-50"
      >
        <svg
          className="Animated-Logo"
          width="88"
          height="84"
          viewBox="0 0 82 78"
          aria-label="LinkedIn Logo"
        >
          <rect x="12.5" y="12.5" width="66" height="62" fill="#000809" stroke="black" strokeWidth="7" />
          <g className="icon-inner">
            <rect x="3.5" y="3.5" width="66" height="62" fill="#FFB3E6" stroke="black" strokeWidth="7" />
            <rect x="15" y="20.0713" width="2.84558" height="30.7254" fill="black" />
            <rect x="55.1543" y="20.3691" width="2.84558" height="30.4271" fill="black" />
            <rect
              x="52.625"
              y="15"
              width="2.68475"
              height="32.25"
              transform="rotate(90 52.625 15)"
              fill="black"
            />
            <rect
              x="20.375"
              y="55.8677"
              width="2.68475"
              height="32.25"
              transform="rotate(-90 20.375 55.8677)"
              fill="black"
            />
            <rect x="17.5293" y="17.6851" width="2.84558" height="2.68475" fill="black" />
            <rect x="52.625" y="17.6851" width="2.84558" height="2.68475" fill="black" />
            <rect x="52.625" y="50.7964" width="2.84558" height="2.68475" fill="black" />
            <rect x="17.5293" y="50.7964" width="2.84558" height="2.68475" fill="black" />
            <rect x="22.9043" y="30.2134" width="5.37499" height="17.8983" fill="black" />
            <rect x="22.9043" y="22.7559" width="5.37499" height="5.07119" fill="black" />
            <rect x="33.6543" y="30.2134" width="5.37499" height="17.8983" fill="black" />
            <rect x="44.7207" y="33.1968" width="5.37499" height="14.9153" fill="black" />
            <rect x="37.4482" y="32.8984" width="12.647" height="2.68475" fill="black" />
            <rect x="41.875" y="30.2134" width="5.37499" height="2.68475" fill="black" />
          </g>
        </svg>
      </a>
      <a
        href="mailto:mic.vit.chennai@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-1 right-8 z-50"
      >
        <svg
          className="Animated-Logo"
          width="88"
          height="84"
          viewBox="0 0 82 78"
          aria-label="Mail Logo"
        >
          <rect x="12.5" y="12.5" width="66" height="62" fill="#000809" stroke="black" strokeWidth="7" />
          <g className="icon-inner">
            <rect x="3.5" y="3.5" width="66" height="62" fill="#E6B3FF" stroke="black" strokeWidth="7" />
            <path
              d="M28.3549 21H18V49H25.4505V34.0411H27.8498V36.5982H32.901V39.1553H35.1741V41.5845H37.9522V39.1553H40.3515V36.4703H45.1502V33.9132H47.5495V49H55V21.3836H45.1502V23.9406H42.7509V26.3699H40.3515V28.9269H33.0273V26.3699H30.5017V24.0685H28.3549V21Z"
              fill="none"
              stroke="black"
              strokeWidth="3"
            />
          </g>
        </svg>
      </a>
      {/* Trophy Icon - Static bottom-left position */}
      <button
        id="trophy-icon"
        type="button"
        aria-label="Show leaderboard preview"
        className="absolute bottom-8 left-8 z-50 hover:scale-110 transition-transform duration-200"
        onClick={() => {
          if (!showLeaderboardWidget) {
            setShowLeaderboardWidget(true);
          } else {
            setShowLeaderboardWidget(false);
            setAnimationStep(0);
          }
        }}
        style={{
          opacity: showLeaderboardWidget ? 0 : 1,
          transition: "opacity 0.4s ease-out",
        }}
      >
        <Image
          src="/cup_home.svg"
          alt="Leaderboard Logo"
          width={48}
          height={52}
          style={{ display: "block" }}
          priority
        />
      </button>

      {/* Animation Container - Hidden by default */}
      <div
        style={{
          opacity: showLeaderboardWidget ? 1 : 0,
          pointerEvents: showLeaderboardWidget ? "auto" : "none",
          transition: "opacity 0.3s ease-out",
        }}
      >
        <AnimatePresence>
          {showLeaderboardWidget && (
            <>
              {/* Yellow Square Box - Moves slightly right */}
              {animationStep < 5 && (
                <motion.div
                  id="leaderboard-box"
                  initial={{ 
                    opacity: 0,
                    left: 32,
                    bottom: 32,
                    scale: 0.6
                  }}
                  animate={{ 
                    opacity: 1,
                    left: 150,
                    bottom: 32,
                    scale: 1,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                  style={{
                    position: "absolute",
                    width: 50,
                    height: 50,
                    background: "#FFEE99",
                    border: "3px solid #000000",
                    boxSizing: "border-box",
                    zIndex: 45,
                  }}
                />
              )}

              {/* Banners replace yellow box at exact same position */}
              {animationStep >= 5 && (
                <motion.div
                  className="absolute z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    left: 150,
                    bottom: 32,
                  }}
                >
                  <AnimatePresence mode="wait">
                    {animationStep === 5 && (
                      <motion.div
                        key="banner-1"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Image
                          src="/1ST.png"
                          alt="1st place banner"
                          width={300}
                          height={400}
                          style={{ imageRendering: "pixelated", display: "block" }}
                        />
                      </motion.div>
                    )}
                    {animationStep === 6 && (
                      <motion.div
                        key="banner-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Image
                          src="/2ND.png"
                          alt="2nd place banner"
                          width={300}
                          height={400}
                          style={{ imageRendering: "pixelated", display: "block" }}
                        />
                      </motion.div>
                    )}
                    {animationStep === 7 && (
                      <motion.div
                        key="banner-3"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Image
                          src="/3RD.png"
                          alt="3rd place banner"
                          width={300}
                          height={400}
                          style={{ imageRendering: "pixelated", display: "block" }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}


            </>
          )}
        </AnimatePresence>
      </div>

      <Clouds clouds={cloudPositions} />
      <ClubLogo />
      <Cube />
    </div>
    </div>
  );
};

export default LandingPage;