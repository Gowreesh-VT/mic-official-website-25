"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const clouds = [
  { src: "/images/cloud1.png", alt: "Cloud", width: 310, height: 150, style: { top: "27vh", left: "0vw", zIndex: 0 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 250, height: 120, style: { top: "18vh", left: "46vw", zIndex: 0 } },
  { src: "/images/cloud3.png", alt: "Cloud", width: 320, height: 160, style: { top: "35vh", left: "26vw", zIndex: 0 } },
  { src: "/images/cloud1.png", alt: "Cloud", width: 220, height: 110, style: { top: "50vh", left: "62vw", zIndex: 0 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 200, height: 100, style: { top: "60vh", left: "13vw", zIndex: 0 } },
  { src: "/images/cloud1.png", alt: "Cloud", width: 260, height: 130, style: { top: "8vh", left: "33vw", zIndex: 0 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 260, height: 130, style: { top: "48vh", left: "3vw", zIndex: 0 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 210, height: 105, style: { top: "25vh", left: "66vw", zIndex: 0 } },
  { src: "/images/cloud3.png", alt: "Cloud", width: 280, height: 140, style: { top: "42vh", left: "46vw", zIndex: 0 } },
  { src: "/images/cloud1.png", alt: "Cloud", width: 240, height: 120, style: { top: "5vh", left: "8vw", zIndex: 0 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 230, height: 115, style: { top: "52vh", left: "34vw", zIndex: 0 } },
  { src: "/images/cloud3.png", alt: "Cloud", width: 250, height: 125, style: { top: "8vh", left: "60vw", zIndex: 0 } },
  { src: "/images/cloud1.png", alt: "Cloud", width: 300, height: 150, style: { top: "10vh", left: "73vw", zIndex: 0 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 250, height: 120, style: { top: "25vh", left: "86vw", zIndex: 0 } },
  { src: "/images/cloud3.png", alt: "Cloud", width: 320, height: 160, style: { top: "40vh", left: "73vw", zIndex: 0 } },
  { src: "/images/cloud1.png", alt: "Cloud", width: 220, height: 110, style: { top: "55vh", left: "93vw", zIndex: 0 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 200, height: 100, style: { top: "65vh", left: "80vw", zIndex: 0 } },
];

const pipes = [
  {
    pipeLeft: "8vw",
    topPipeHeight: "45vh",
    bottomPipeHeight: "35vh",
    gap: "20vh",
  },
  {
    pipeLeft: "35vw",
    topPipeHeight: "25vh",
    bottomPipeHeight: "55vh",
    gap: "20vh",
  },
  {
    pipeLeft: "62vw",
    topPipeHeight: "55vh",
    bottomPipeHeight: "25vh",
    gap: "20vh",
  },
  {
    pipeLeft: "85vw",
    topPipeHeight: "35vh",
    bottomPipeHeight: "45vh",
    gap: "20vh",
  },
];

const PIPE_BRANCH_HEIGHT = 80;
const PIPE_WIDTH = 120;
const PIPE_HEAD_WIDTH = 160;
const PIPE_HEAD_HEIGHT = 60;

const icons = [
  {
    href: "mailto:micvitcc@gmail.com",
    src: "/images/mail.png",
    alt: "Email",
    width: 80,
    height: 60,
    left: "9vw",
    top: "50vh",
    aria: "Send Email",
  },
  {
    href: "https://www.instagram.com/microsoft.innovations.vitc/?hl=en",
    src: "/images/instagram.png",
    alt: "Instagram",
    width: 80,
    height: 60,
    left: "36vw",
    top: "30vh",
    aria: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/microsoft-innovations-club-vitc/?originalSubdomain=in",
    src: "/images/linkedin.png",
    alt: "LinkedIn",
    width: 80,
    height: 60,
    left: "63vw",
    top: "60vh",
    aria: "LinkedIn",
  },
];

const bird = {
  src: "/images/bird.png",
  alt: "Flappy Bird",
  width: 60,
  height: 35,
  left: "20vw",
  top: "45vh",
};

const STAR_COUNT = 60;
const STAR_POSITIONS = Array.from({ length: STAR_COUNT }).map((_, i) => ({
  top: Math.floor((i * 123) % 70) + Math.floor(i * 17) % 4, // percentage values
  left: Math.floor((i * 337) % 100) + Math.floor(i * 31) % 4, // percentage values
  size: Math.random() * 2 + 1,
}));

export default function SocialPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [fade, setFade] = useState(false);
  const [pageHeight, setPageHeight] = useState<number | null>(null);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setPageHeight(window.innerHeight);
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const background = darkMode
    ? "linear-gradient(to bottom, #0a2540 60%, #1e3c72 100%)"
    : "linear-gradient(to bottom, #eaf1fb 60%, #b5d0f7 100%)";



  function getBranchCount(height: string) {
    if (pageHeight === null) return 0;
    const heightPx = (parseFloat(height) / 100) * pageHeight;
    return Math.ceil(heightPx / PIPE_BRANCH_HEIGHT);
  }

  // Calculate responsive sizes based on screen width
  const getResponsiveSize = (baseSize: number) => {
    if (screenSize.width < 640) return baseSize * 0.5; // Mobile devices
    if (screenSize.width < 1024) return baseSize * 0.7; // Smaller laptops
    if (screenSize.width < 1366) return baseSize * 0.8; // Medium laptops
    if (screenSize.width < 1920) return baseSize * 0.9; // Large laptops
    return baseSize; // Very large screens
  };

  // Check if mobile
  const isMobile = screenSize.width < 640;

  if (pageHeight === null) return null;

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background,
        overflow: "hidden",
        transition: "background 0.4s",
        filter: fade ? "brightness(0.7)" : "none",
        transitionProperty: "background, filter",
        transitionDuration: "0.4s",
        minHeight: "600px",
      }}
    >
      {/* star dots with percentage positioning */}
      {STAR_POSITIONS.map((star, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${star.top}vh`,
            left: `${star.left}vw`,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            background: "white",
            opacity: 0.85,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      ))}

      {/*  grid background - responsive for mobile */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: isMobile
            ? `${Math.max(20, screenSize.width * 0.04)}px ${Math.max(20, screenSize.width * 0.04)}px`
            : `${Math.max(30, screenSize.width * 0.03)}px ${Math.max(30, screenSize.width * 0.03)}px`,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/*  clouds - responsive for mobile */}
      {clouds.map((cloud, i) => {
        // Adjust cloud positions for mobile to ensure visibility
        const adjustedLeft = isMobile
          ? Math.max(parseFloat(cloud.style.left), 0) + '%' // Ensure clouds don't go off-screen
          : cloud.style.left;
        const adjustedTop = isMobile
          ? Math.max(parseFloat(cloud.style.top), 5) + 'vh' // Keep clouds visible
          : cloud.style.top;

        return (
          <Image
            key={i}
            src={cloud.src}
            alt={cloud.alt}
            width={getResponsiveSize(cloud.width)}
            height={getResponsiveSize(cloud.height)}
            style={{
              position: "absolute",
              top: adjustedTop,
              left: adjustedLeft,
              zIndex: cloud.style.zIndex ?? 1,
              pointerEvents: "none",
              filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.10))",
              opacity: fade ? 0.7 : 1,
              transition: "opacity 0.4s",
              maxWidth: isMobile ? "35vw" : "20vw", // Smaller max width on mobile
              height: "auto",
            }}
            priority
          />
        );
      })}



      {/* Flappy Bird style pipes */}
      {pipes.map((pipe, i) => {
        const topBranchCount = getBranchCount(pipe.topPipeHeight);
        const bottomBranchCount = getBranchCount(pipe.bottomPipeHeight);
        const responsivePipeWidth = getResponsiveSize(PIPE_WIDTH);
        const responsivePipeHeadWidth = getResponsiveSize(PIPE_HEAD_WIDTH);
        const responsivePipeHeadHeight = getResponsiveSize(PIPE_HEAD_HEIGHT);

        return (
          <div key={i}>
            {/* Top pipe */}
            <div
              style={{
                position: "absolute",
                left: pipe.pipeLeft,
                top: "0vh",
                width: responsivePipeWidth,
                height: pipe.topPipeHeight,
                zIndex: 1,
                display: "flex",
                flexDirection: "column-reverse",
                alignItems: "center",
                pointerEvents: "none",
                opacity: fade ? 0.7 : 1,
                transition: "opacity 0.4s",
              }}
            >
              {/* Top pipe head (inverted) */}
              <div
                style={{
                  width: responsivePipeHeadWidth,
                  height: responsivePipeHeadHeight,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transform: "scaleY(-1)",
                  pointerEvents: "auto",
                  marginTop: -5,
                }}
              >
                <Image
                  src="/images/pipehead.png"
                  alt="Pipe head"
                  width={responsivePipeHeadWidth}
                  height={responsivePipeHeadHeight}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              {/* Top pipe branches */}
              <div
                style={{
                  width: responsivePipeWidth,
                  height: `calc(${pipe.topPipeHeight} - ${responsivePipeHeadHeight}px)`,
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  pointerEvents: "auto",
                }}
              >
                {Array.from({ length: topBranchCount }).map((_, idx) => (
                  <Image
                    key={idx}
                    src="/images/pipebranch.png"
                    alt="Pipe body"
                    width={responsivePipeWidth}
                    height={PIPE_BRANCH_HEIGHT}
                    style={{
                      width: "100%",
                      height: PIPE_BRANCH_HEIGHT,
                      position: "absolute",
                      bottom: idx * PIPE_BRANCH_HEIGHT,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom pipe */}
            <div
              style={{
                position: "absolute",
                left: pipe.pipeLeft,
                bottom: "0vh",
                width: responsivePipeWidth,
                height: pipe.bottomPipeHeight,
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pointerEvents: "none",
                opacity: fade ? 0.7 : 1,
                transition: "opacity 0.4s",
              }}
            >
              {/* Bottom pipe head */}
              <div
                style={{
                  width: responsivePipeHeadWidth,
                  height: responsivePipeHeadHeight,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  pointerEvents: "auto",
                  marginBottom: -5,
                }}
              >
                <Image
                  src="/images/pipehead.png"
                  alt="Pipe head"
                  width={responsivePipeHeadWidth}
                  height={responsivePipeHeadHeight}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              {/* Bottom pipe branches */}
              <div
                style={{
                  width: responsivePipeWidth,
                  height: `calc(${pipe.bottomPipeHeight} - ${responsivePipeHeadHeight}px)`,
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  pointerEvents: "auto",
                }}
              >
                {Array.from({ length: bottomBranchCount }).map((_, idx) => (
                  <Image
                    key={idx}
                    src="/images/pipebranch.png"
                    alt="Pipe body"
                    width={responsivePipeWidth}
                    height={PIPE_BRANCH_HEIGHT}
                    style={{
                      width: "100%",
                      height: PIPE_BRANCH_HEIGHT,
                      position: "absolute",
                      top: idx * PIPE_BRANCH_HEIGHT,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* responsive social icons - mobile-friendly positioning */}
      {isMobile ? (
        // Mobile layout: Stack icons vertically on the right side
        <div
          style={{
            position: "fixed",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            opacity: fade ? 0.7 : 1,
            transition: "opacity 0.4s",
          }}
        >
          {icons.map((icon, i) => (
            <a
              key={i}
              href={icon.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={icon.aria}
              style={{
                display: "block",
                transition: "transform 0.2s",
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <Image
                src={icon.src}
                alt={icon.alt}
                width={getResponsiveSize(icon.width)}
                height={getResponsiveSize(icon.height)}
                style={{
                  width: "50px",
                  height: "auto",
                  display: "block",
                }}
              />
            </a>
          ))}
        </div>
      ) : (
        // Desktop layout: Original absolute positioning
        icons.map((icon, i) => (
          <a
            key={i}
            href={icon.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={icon.aria}
            style={{
              position: "absolute",
              left: icon.left,
              top: icon.top,
              zIndex: 2,
              opacity: fade ? 0.7 : 1,
              transition: "opacity 0.4s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <Image
              src={icon.src}
              alt={icon.alt}
              width={getResponsiveSize(icon.width)}
              height={getResponsiveSize(icon.height)}
              style={{
                maxWidth: "8vw",
                height: "auto",
              }}
            />
          </a>
        ))
      )}

      {/* responsive flappy*/}
      <div
        style={{
          position: "absolute",
          left: bird.left,
          top: bird.top,
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          src={bird.src}
          alt={bird.alt}
          width={getResponsiveSize(bird.width)}
          height={getResponsiveSize(bird.height)}
          style={{
            cursor: "pointer",
            filter: fade ? "brightness(0.7)" : "none",
            transition: "filter 0.4s, transform 0.2s",
            maxWidth: "10vw",
            height: "auto",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
          title="Toggle light/dark mode"
        />
      </div>

      {/* responsive pacman menu button */}
      <button
        aria-label="Open menu"
        style={{
          position: "fixed",
          bottom: "3vh",
          right: "3vw",
          zIndex: 10,
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
        tabIndex={0}
      >
      </button>
    </div>
  );
}