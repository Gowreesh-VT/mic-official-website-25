"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

// --- Cloud Animation Hook (copied from meetttheboardpage/page.tsx) ---
interface CloudFloatOptions {
  baseTop: number;
  baseLeft: number;
  amplitude?: number;
  speed?: number;
  phase?: number;
}
function useCloudFloat({ baseTop, baseLeft, amplitude = 30, speed = 1, phase = 0 }: CloudFloatOptions) {
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
    return () => { running = false; };
  }, [baseTop, amplitude, speed, phase]);
  return { top, left: baseLeft };
}

const menuButtonSvg = (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="40" height="40" rx="4" fill="#0F3" stroke="#000" strokeWidth="4" />
    <rect x="12" y="16" width="24" height="4" rx="2" fill="#222" />
    <rect x="12" y="24" width="24" height="4" rx="2" fill="#222" />
    <rect x="12" y="32" width="24" height="4" rx="2" fill="#222" />
  </svg>
);



const whiteDotsSvg = (
  <svg width="1159" height="364" viewBox="0 0 1159 364" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}>
    <circle cx="1155" cy="55" r="4" fill="white" />
    <circle cx="954" cy="19" r="4" fill="white" />
    <circle cx="204" cy="4" r="4" fill="white" />
    <circle cx="135" cy="211" r="4" fill="white" />
    <circle cx="4" cy="360" r="4" fill="white" />
    <circle cx="489" cy="95" r="4" fill="white" />
    <circle cx="680" cy="47" r="4" fill="white" />
    <circle cx="1089" cy="299" r="4" fill="white" />
  </svg>
);


const textPngUrl = "/images/you-died-404.png"; // Place your PNG text in public/images/you-died-404.png

const NotFoundPage: React.FC = () => {


  const [menuOpen, setMenuOpen] = useState(false);
  // Theme detection
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDark(mq.matches);
      const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
      if (mq.addEventListener) {
        mq.addEventListener('change', handler);
      } else {
        mq.addListener(handler);
      }
      return () => {
        if (mq.removeEventListener) {
          mq.removeEventListener('change', handler);
        } else {
          mq.removeListener(handler);
        }
      };
    }
  }, []);

  // Choose gradient based on theme
  const gradientBg = isDark
    ? "linear-gradient(180deg, rgba(0,8,16,0.95) 0%, rgba(23,72,98,0.95) 34%, rgba(17,51,115,0.95) 71%, rgba(25,44,85,0.95) 100%)"
    : "linear-gradient(180deg, rgba(179,217,255,0.85) 0%, rgba(179,229,255,0.85) 34%, rgba(177,240,252,0.85) 71%, rgba(176,249,250,0.85) 100%) repeat-y";

  return (
    <>
      {/* Grid background at the very bottom */}
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundColor: 'transparent'
        }}
      />
      {/* Gradient overlay */}
      <div className="pointer-events-none fixed inset-0 z-10" style={{
        background: gradientBg,
        mixBlendMode: "multiply"
      }} />
      <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center z-20" style={{ fontFamily: 'Press Start 2P, monospace' }}>
        {/* White dots */}
        {whiteDotsSvg}
        {/* Clouds */}
        <Image src="/images/cloud1.png" alt="Cloud 1" width={355} height={228} style={{ position: 'absolute', ...useCloudFloat({ baseTop: 154, baseLeft: -12, amplitude: 25, speed: 0.8, phase: 0 }), zIndex: 2 }} />
        <Image src="/images/cloud2.png" alt="Cloud 2" width={367} height={219} style={{ position: 'absolute', ...useCloudFloat({ baseTop: 466, baseLeft: 22, amplitude: 35, speed: 1.1, phase: 1 }), zIndex: 2 }} />
        <Image src="/images/cloud1.png" alt="Cloud 3" width={355} height={228} style={{ position: 'absolute', ...useCloudFloat({ baseTop: 772.98, baseLeft: 232, amplitude: 30, speed: 0.9, phase: 2 }), zIndex: 2 }} />
        <Image src="/images/cloud3.png" alt="Cloud 4" width={204} height={125} style={{ position: 'absolute', ...useCloudFloat({ baseTop: 790, baseLeft: 1003, amplitude: 28, speed: 1.2, phase: 3 }), zIndex: 2 }} />
        <Image src="/images/cloud3.png" alt="Cloud 5" width={204} height={125} style={{ position: 'absolute', ...useCloudFloat({ baseTop: 604.98, baseLeft: 1331, amplitude: 32, speed: 1.0, phase: 4 }), zIndex: 2 }} />
        <Image src="/images/cloud2.png" alt="Cloud 6" width={388} height={254} style={{ position: 'absolute', ...useCloudFloat({ baseTop: 127.98, baseLeft: 1142, amplitude: 27, speed: 1.3, phase: 5 }), zIndex: 2 }} />
        <Image src="/images/cloud1.png" alt="Cloud 7" width={355} height={228} style={{ position: 'absolute', ...useCloudFloat({ baseTop: -23, baseLeft: 847, amplitude: 22, speed: 1.05, phase: 6 }), zIndex: 2 }} />

        {/* Dot on right edge above clouds */}
        <div style={{ position: 'absolute', top: 80, right: 40, zIndex: 10 }}>
          <Image src="/images/dot.png" alt="Star" width={8} height={8} />
        </div>
        {/* Cloud above YOU DIED! 404 (animated) */}
        <Image src="/images/cloud3.png" alt="Cloud Above 404" width={204} height={125} style={{ position: 'absolute', ...useCloudFloat({ baseTop: 80, baseLeft: 500, amplitude: 18, speed: 1.1, phase: 7 }), zIndex: 11 }} />
        {/* Main PNG text */}
        <div style={{ position: 'absolute', left: '50%', top: '45%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
          <Image src={textPngUrl} alt="YOU DIED! 404" width={1000} height={258} />
        </div>
        {/* Button */}
        <button
          type="button"
          style={{
            position: 'absolute',
            left: '50%',
            top: 'calc(45% + 129px)', // 45% (new center) + half image height (129px) + margin (8px)
            transform: 'translateX(-50%)',
            zIndex: 10,
            width: 340,
            height: 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
          onClick={() => {
            // TODO: Add navigation or logic for respawn button here
          }}
        >
          <Image src="/images/respawn-button.png" alt="RESPAWN TO HOME" width={340} height={70} />
        </button>
        {/* Cloud under and bottom right to RESPWAN button (animated) */}
        <Image src="/images/cloud3.png" alt="Cloud Bottom Right Respawn" width={204} height={125} style={{ position: 'absolute', ...useCloudFloat({ baseTop: 520, baseLeft: 950, amplitude: 20, speed: 1.15, phase: 8 }), zIndex: 2 }} />
        {/* Green menu button */}
        <button
          style={{ position: 'absolute', right: 32, bottom: 32, zIndex: 20, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Open menu"
        >
          {menuButtonSvg}
        </button>
        {/* Placeholder menu */}
        {menuOpen && (
          <div style={{ position: 'absolute', right: 90, bottom: 90, zIndex: 30, background: '#222', color: '#fff', padding: 24, borderRadius: 12, minWidth: 200, fontSize: 16 }}>
            <div>Menu placeholder</div>
          </div>
        )}
      </div>
    </>
  );
};

export default NotFoundPage; 