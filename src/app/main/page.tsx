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
  // Steps: 1=1ST.png, 2=2ND.png, 3=3RD.png (final)
  useEffect(() => {
    if (showLeaderboardWidget) {
      const timer1 = setTimeout(() => setAnimationStep(1), 0);     // 1st name banner (1ST.png)
      const timer2 = setTimeout(() => setAnimationStep(2), 1000);  // 2nd name banner (2ND.png)
      const timer3 = setTimeout(() => setAnimationStep(3), 2000);  // 3rd name banner (3RD.png)

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
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

  // Determine which image to show based on animation step
  const getLeaderboardImage = () => {
    if (animationStep >= 3) return "/3RD.png";
    if (animationStep >= 2) return "/2ND.png";
    if (animationStep >= 1) return "/1ST.png";
    return null;
  };

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
          className="absolute top-1 right-52 z-50"
        >
          <Image className="Animated-Logo"
            src="/insta.svg"
            alt="Instagram Logo"
            width={72}
            height={78}
            style={{ width: "90vw", maxWidth: 72, height: "auto", display: "block" }}
            priority
          />
        </a>
        <a
          href="https://www.linkedin.com/company/microsoft-innovations-club-vitc/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-1 right-28 z-50"
        >
          <Image className="Animated-Logo"
            src="/linkedin.svg"
            alt="LinkedIn Logo"
            width={72}
            height={78}
            style={{ width: "90vw", maxWidth: 72, height: "auto", display: "block" }}
            priority
          />
        </a>
        <a
          href="mailto:mic.vit.chennai@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-1 right-5 z-50"
        >
          <Image className="Animated-Logo"
            src="/mail.svg"
            alt="Mail Logo"
            width={72}
            height={78}
            style={{ width: "90vw", maxWidth: 72, height: "auto", display: "block" }}
            priority
          />
        </a>
        {/* Trophy Icon - Static bottom-left position */}
        {!showLeaderboardWidget && (
          <button
            id="trophy-icon"
            type="button"
            aria-label="Show leaderboard preview"
            className="absolute bottom-8 left-8 z-50 hover:scale-110 transition-transform duration-200"
            onClick={() => {
              setShowLeaderboardWidget(true);
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
        )}

        {/* Leaderboard Podium Animation */}
        <AnimatePresence>
          {showLeaderboardWidget && (
            <motion.div
              className="absolute z-50"
              style={{
                left: 24,
                bottom: 24,
                cursor: "pointer",
              }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => {
                setShowLeaderboardWidget(false);
                setAnimationStep(0);
              }}
            >
              {/* Progressive banner images: 1ST.png -> 2ND.png -> 3RD.png */}
              {animationStep >= 1 && (
                <motion.div
                  style={{ position: "relative" }}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={getLeaderboardImage()}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <Image
                        src={getLeaderboardImage()!}
                        alt="Leaderboard"
                        width={200}
                        height={280}
                        style={{ imageRendering: "pixelated", display: "block" }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <Clouds clouds={cloudPositions} />
        <ClubLogo />
        <Cube />
      </div>
    </div>
  );
};

export default LandingPage;