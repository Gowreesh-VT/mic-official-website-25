"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useDarkMode } from "@/hooks/useDarkMode";

// Larger cloud images & new variety
const cloudImages = [
  "/images/cloud1.png",
  "/images/cloud2.png",
  "/images/cloud1.png",
  "/images/cloud3.png",
  "/images/cloud3.png",
  "/images/cloud2.png",
  "/images/cloud1.png",
  "/images/cloud3.png",
  "/images/cloud2.png",
  "/images/cloud1.png",
];

interface CloudFloatOptions {
  baseTop: number;
  baseLeft: number;
  amplitude?: number;
  speed?: number;
  phase?: number;
}

// Floating cloud animation hook
function useCloudFloat({
  baseTop,
  baseLeft,
  amplitude = 35,
  speed = 1,
  phase = 0,
}: CloudFloatOptions) {
  const [top, setTop] = useState(baseTop);
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
    return () => {
      running = false;
    };
  }, [baseTop, amplitude, speed, phase]);
  return { top, left: baseLeft };
}

function getThemeColors(isDarkMode: boolean) {
  return isDarkMode
    ? {
      background: "linear-gradient(to bottom, #00040d 0%, #002855 100%)",
      gridOpacity1: "rgba(255,255,255,0.09)",
      gridOpacity2: "rgba(255,255,255,0.07)",
      headingColor: "#fff",
      headingTextShadow: "4px 4px 0 #000, 0 2px 8px #000",
      starOpacity: 0.85,
      cardTextColor: "#444",
    }
    : {
      background: "linear-gradient(to bottom, #e0f2fe 0%, #87ceeb 100%)",
      gridOpacity1: "rgba(255,255,255,0.3)",
      gridOpacity2: "rgba(255,255,255,0.3)",
      headingColor: "#1e293b",
      headingTextShadow: "2px 2px 0 rgba(255,255,255,0.7), 0 1px 4px rgba(0,0,0,0.15)",
      starOpacity: 0.4,
      cardTextColor: "#333",
    };
}

const MysteryCard = ({
  frameColor,
  innerColor,
  dotColor,
  title,
  desc,
  style,
  cardTextColor,
}: {
  frameColor: string;
  innerColor: string;
  dotColor: string;
  title: string;
  desc: string;
  style?: React.CSSProperties;
  cardTextColor?: string;
}) => (
  <div
    className="mystery-card group"
    style={{
      background: frameColor,
      borderColor: frameColor,
      boxShadow: `0 0 0 4px ${dotColor}50`,
      ...style,
    }}
  >
    <div className="inner-panel" style={{ background: innerColor }} />
    <div className="corner-dot top-left" style={{ background: dotColor }} />
    <div className="corner-dot top-right" style={{ background: dotColor }} />
    <div className="corner-dot bottom-left" style={{ background: dotColor }} />
    <div className="corner-dot bottom-right" style={{ background: dotColor }} />
    <div className="fixed-title" style={{ color: dotColor }}>
      <h3>{title}</h3>
    </div>
    <div className="scrollable-content" style={{ color: dotColor }}>
      <p style={{ color: cardTextColor || "#444" }}>{desc}</p>
    </div>
    <div className="hover-question">
      <span style={{ color: dotColor }}>?</span>
    </div>
    <div className="scroll-down-arrow" aria-hidden>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 5V19M12 19L5 12M12 19L19 12"
          stroke={dotColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>

    <style jsx>{`
      .mystery-card {
 issue-10-Improve-Scroll-Indication-and-Box-Sizing-on-About-Us-Page
        width: 314.1363220214844px;
        height: 292.04864501953125px;
        border: 8px solid;
        border-radius: 6.95px;

        width: 320px;
        height: 290px;
        border: 10px solid;
        border-radius: 7px;
        il: 0;

        position: relative;
        display: flex;
        flex-direction: column;
        opacity: 1;
        cursor: default;
        transition: all 0.3s ease;
        overflow: hidden;
        margin: 0;
        flex: 0 0 auto;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
      }
      .inner-panel {
        position: absolute;
        left: 8px;
        top: 8px;
        right: 8px;
        bottom: 8px;
        border-radius: 4px;
        left: 8px; top: 8px; right: 8px; bottom: 8px;
        border-radius: 4px;
        z-index: 8;
      }

      /* single, circular corner dot definition */
      .corner-dot {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        position: absolute;
        z-index: 12;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.35);
        border: 2px solid rgba(0, 0, 0, 0.12);
        background-clip: padding-box;
      }
      .top-left {
        top: 8px;
        left: 8px;
      }

      .top-right {
        top: 8px;
        right: 8px;
      }

      .bottom-left {
        bottom: 8px;
        left: 8px;
      }

      .bottom-right {
        bottom: 8px;
        right: 8px;
      }

      .fixed-title {
        position: absolute;
        top: 22px;
        left: 0;
        right: 0;
        text-align: center;
        z-index: 25;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .fixed-title h3 {
        font-family: "Press Start 2P", monospace;
        font-weight: 700;
        font-size: 1rem;
        text-transform: capitalize;
        text-shadow: 2px 2px 0 #fff, 4px 4px 0 #000;
        margin: 0;
        letter-spacing: 1px;
      }
      .scrollable-content {
        position: absolute;
        top: 60px;
        left: 24px;
        right: 24px;
        bottom: 40px;
        z-index: 25;
        overflow-y: auto;
        pointer-events: auto;
        opacity: 0;
        transition: opacity 0.3s ease;
        scrollbar-width: none;
        padding-right: 8px;
      }
      .scrollable-content::-webkit-scrollbar {
        display: none;
      }
      .scrollable-content p {
        font-family: "IBM Plex Mono", monospace;
        font-size: 1.07rem;
        color: #444;
        line-height: 1.62;
        margin: 0;
        text-align: center;
      }
      .hover-question {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 4.2rem;
        font-weight: 900;
        font-family: "Press Start 2P", monospace;
        letter-spacing: 2px;
        user-select: none;
        margin-top: 10px;
        transition: opacity 0.3s ease;
        z-index: 20;
        pointer-events: none;
        opacity: 1;
      }
      .scroll-down-arrow {
        position: absolute;
        bottom: 8px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 25;
        animation: bounceDown 2s infinite;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
      }
      @keyframes bounceDown {
        0%,
        20%,
        50%,
        80%,
        100% {
          transform: translateX(-50%) translateY(0);
        }
        40% {
          transform: translateX(-50%) translateY(-8px);
        }
        60% {
          transform: translateX(-50%) translateY(-4px);
        }
      }

      .group:hover .hover-question {
        opacity: 0;
      }
      .group:hover .scroll-down-arrow {
        opacity: 1;
      }
      .group:hover .fixed-title {
        opacity: 1;
      }
      .group:hover .scrollable-content {
        opacity: 1;
      }

      @media (max-width: 900px) {
        .mystery-card {
          width: 245px;
          height: 205px;
        }
        .corner-dot {
          width: 16px;
          height: 16px;
        }
        .top-left {
          top: 13px;
          left: 13px;
        }
        .top-right {
          top: 13px;
          right: 13px;
        }
        .bottom-left {
          bottom: 13px;
          left: 13px;
        }
        .bottom-right {
          bottom: 13px;
          right: 13px;
        }
        .fixed-title h3 {
          font-size: 1.07rem;
        }
        .fixed-title {
          top: 10px;
        }
        .scrollable-content {
          top: 42px;
          left: 12px;
          right: 12px;
          bottom: 12px;
        }
        .scrollable-content p {
          font-size: 0.92rem;
          line-height: 1.24;
        }
      }
      @media (max-width: 600px) {
        .cards-container {
          flex-direction: column;
          align-items: center;
          gap: 18px;
        }
        .mystery-card {
          width: 100% !important;
          max-width: 320px !important;
          height: auto !important;
        }
        .fixed-title h3 {
          font-size: 1rem;
        }
        .scrollable-content {
          top: 56px;
        }
        .scrollable-content p {
          font-size: 0.86rem;
        }
      }
    `}</style>
  </div>
);

// Star positions - scattered across the background
const STAR_COUNT = 7;
const STAR_POSITIONS = [
  { top: 12, left: 8 },
  { top: 10, left: 25 },
  { top: 18, left: 42 },
  { top: 14, left: 58 },
  { top: 20, left: 72 },
  { top: 8, left: 85 },
  { top: 16, left: 95 },
].map((pos) => ({ ...pos, size: Math.random() * 2 + 3 }));

const AboutUsPage: React.FC = () => {
  const isDarkMode = useDarkMode();
  const cloudPositions = [
    useCloudFloat({ baseTop: 130, baseLeft: -12, amplitude: 25, speed: 0.8, phase: 0 }),
    useCloudFloat({ baseTop: 440, baseLeft: 22, amplitude: 35, speed: 1.1, phase: 1 }),
    useCloudFloat({ baseTop: 655, baseLeft: 232, amplitude: 30, speed: 0.9, phase: 2 }),
    useCloudFloat({ baseTop: 730, baseLeft: 1003, amplitude: 28, speed: 1.2, phase: 3 }),
    useCloudFloat({ baseTop: 560, baseLeft: 1331, amplitude: 32, speed: 1.0, phase: 4 }),
    useCloudFloat({ baseTop: 100, baseLeft: 1142, amplitude: 27, speed: 1.3, phase: 5 }),
    useCloudFloat({ baseTop: -10, baseLeft: 1500, amplitude: 22, speed: 1.05, phase: 6 }),
    useCloudFloat({ baseTop: 560, baseLeft: 1400, amplitude: 32, speed: 1.0, phase: 4 }),
    useCloudFloat({ baseTop: 100, baseLeft: 1600, amplitude: 27, speed: 1.3, phase: 5 }),
    useCloudFloat({ baseTop: 560, baseLeft: 1600, amplitude: 22, speed: 1.05, phase: 6 }),
  ];

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.minHeight = "100vh";
    document.documentElement.style.minHeight = "100vh";
  }, []);

  const lift = 80;
  const themeColors = getThemeColors(isDarkMode);

  return (
    <>
      <div
        className="page-container"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${themeColors.gridOpacity1} 1px, transparent 1px),
            linear-gradient(to bottom, ${themeColors.gridOpacity2} 1px, transparent 1px),
            ${themeColors.background}
          `,
          backgroundSize: "30px 30px, 30px 30px, 100% 100%",
          backgroundRepeat: "repeat, repeat, no-repeat",
          backgroundPosition: "top left, top left, center",
          userSelect: "none",
          touchAction: "none",
          overflow: "hidden",
          minHeight: "100vh",
          paddingBottom: "172px",
          position: "relative",
          transition: "background 0.5s ease",
        }}
      >
        {/* Stars scattered across the background */}
        {STAR_POSITIONS.map((star, i) => (
          <Image
            key={`star-${i}`}
            src="/images/dot.png"
            alt=""
            width={star.size}
            height={star.size}
            style={{
              position: "absolute",
              top: `${star.top}vh`,
              left: `${star.left}vw`,
              zIndex: 1,
              pointerEvents: "none",
              userSelect: "none",
              opacity: themeColors.starOpacity,
              transition: "opacity 0.5s ease",
            }}
          />
        ))}

        {/* Animated Clouds */}
        {cloudPositions.map((pos, i) => (
          <Image
            key={i}
            src={cloudImages[i % cloudImages.length]}
            alt={`Cloud ${i + 1}`}
            width={240}
            height={156}
            style={{
              position: "absolute",
              top: pos.top,
              left: pos.left,
              zIndex: 0,
              pointerEvents: "none",
              userSelect: "none",
              opacity: 0.98,
              transition: "top 0.18s linear",
            }}
            priority
          />
        ))}

        <div className="about-heading">
          <h1
            style={{
              color: themeColors.headingColor, // Use theme color
              textShadow: themeColors.headingTextShadow, // Use theme shadow
              transition: "color 0.5s ease, text-shadow 0.5s ease", // Add transition
            }}
          >
            About us
          </h1>
        </div>

        <div className="cards-container">
          <MysteryCard
            frameColor="#ffdd67"
            innerColor="#fff6de"
            dotColor="#8f6200"
            title="About MIC"
            desc="The MIC at VIT Chennai is a student-led tech community under the (MLSA) program. It's a space where students explore and innovate with technologies like AI, Azure, and GitHub. Whether you're a beginner or a builder, we offer an inclusive platform for collaboration, curiosity, and hands-on learning through real-world experiences."
            style={{ marginTop: 0 }}
            cardTextColor={themeColors.cardTextColor}
          />
          <MysteryCard
            frameColor="#f7a8a8"
            innerColor="#ffe5ed"
            dotColor="#a13b48"
            title="What we do!"
            desc="We host hands-on workshops, speaker sessions, and hackathons focused on Microsoft technologies like Azure, Power Platform, and Copilot. These events help students build skills, explore emerging tech, and grow into confident, well-rounded tech leaders."
            style={{ marginTop: lift }}
            cardTextColor={themeColors.cardTextColor}
          />
          <MysteryCard
            frameColor="#7faee3"
            innerColor="#d1f1ff"
            dotColor="#294771"
            title="What you get!"
            desc="We focus on leadership, teamwork, and communication alongside coding. Our club supports personal and professional growth, helping members build confidence and strong networks. No matter your background, you'll find a welcoming community that learns, creates, and grows together."
            style={{ marginTop: 0 }}
            cardTextColor={themeColors.cardTextColor}
          />
        </div>
      </div>

      {/* Mario Footer */}
      <div className="mario-footer">
        <Image
          src="/images/Mario.png"
          alt="Mario Footer"
          width={1512}
          height={172}
          className="mario-footer-image"
          priority
        />
      </div>

      <style jsx>{`
        .page-container {
          position: relative;
          width: 100vw;
          max-width: 100vw;
          overflow: hidden;
        }
        .about-heading {
          position: relative;
          width: 90%;
          max-width: 650px;
          margin: 110px auto 36px auto;
          text-align: center;
          user-select: none;
          pointer-events: none;
        }
        .about-heading h1 {
          font-family: "Press Start 2P", monospace;
          font-size: clamp(2.1rem, 6vw, 3.3rem);
          letter-spacing: 2px;
          text-transform: capitalize;
          margin: 0;
          line-height: 1;
        }
        .cards-container {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: center;
          align-items: flex-start;
          gap: clamp(16px, 4vw, 32px);
          width: 100%;
          margin: 0 auto;
          padding: 0 clamp(8px, 3vw, 10px);
          overflow: visible;
        }
        .mario-footer {
          position: fixed;
          left: 0;
          bottom: 0;
          width: 100vw;
          height: clamp(120px, 15vh, 172px);
          pointer-events: none;
          user-select: none;
          z-index: 10;
          overflow: hidden;
        }
        :global(.mario-footer-image) {
          width: 100vw !important;
          height: clamp(120px, 15vh, 172px) !important;
          display: block !important;
          object-fit: cover !important;
          object-position: center !important;
          pointer-events: none !important;
          user-select: none !important;
        }

        @media (min-width: 601px) and (max-width: 900px) and (orientation: portrait) {
          .mario-footer {
            height: clamp(80px, 8vh, 120px) !important;
          }
          :global(.mario-footer-image) {
            height: clamp(80px, 8vh, 120px) !important;
          }
          .page-container {
            padding-bottom: clamp(80px, 8vh, 120px) !important;
          }
        }

        @media (min-width: 901px) and (max-width: 1200px) and (orientation: landscape) {
          .mario-footer {
            height: clamp(90px, 12vh, 140px) !important;
          }
          :global(.mario-footer-image) {
            height: clamp(90px, 12vh, 140px) !important;
          }
          .page-container {
            padding-bottom: clamp(90px, 12vh, 140px) !important;
          }
        }

        @media (min-width: 1024px) and (max-width: 1366px) {
          .mario-footer {
            height: clamp(100px, 10vh, 150px) !important;
          }
          :global(.mario-footer-image) {
            height: clamp(100px, 10vh, 150px) !important;
          }
          .page-container {
            padding-bottom: clamp(100px, 10vh, 150px) !important;
          }
        }

        @media (min-width: 601px) and (max-width: 1366px) {
          .page-container {
            padding-bottom: clamp(80px, 10vh, 150px) !important;
            min-height: 100vh;
          }
        }

        @media (max-width: 900px) {
          .cards-container {
            gap: clamp(12px, 3vw, 28px);
          }
        }

        @media (max-width: 600px) {
          .cards-container {
            flex-direction: column;
            align-items: center;
            gap: clamp(14px, 4vw, 18px);
            padding: 0 clamp(6px, 2vw, 10px);
          }
          .page-container {
            padding-bottom: clamp(120px, 15vh, 172px) !important;
          }
          .about-heading {
            margin: clamp(50px, 10vw, 80px) auto clamp(20px, 5vw, 36px) auto;
          }
        }

        @media (max-width: 480px) {
          .about-heading h1 {
            font-size: clamp(1.2rem, 4.5vw, 2rem);
            letter-spacing: clamp(0.5px, 0.3vw, 1px);
          }
          .cards-container {
            gap: clamp(12px, 3.5vw, 16px);
          }
        }
      `}</style>
    </>
  );
};

export default AboutUsPage;
