'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface NavItem {
  name: string;
  color: string;
  id: string;
  href: string;
}

const CubeNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const navItems: NavItem[] = [
    { name: 'Home', color: '#FF69B4', id: 'home', href: '/main' },
    { name: 'About Us', color: '#90EE90', id: 'about', href: '/about-us' },
    { name: 'Board', color: '#87CEEB', id: 'board', href: '/leads' },
    { name: 'Gallery', color: '#DDA0DD', id: 'gallery', href: '/gallery' },
    { name: 'Events', color: '#BDBEAC', id: 'events', href: '/events' },
    { name: 'Projects', color: '#1CA6A6', id: 'projects', href: '/projects' },
    { name: 'Leaderboard', color: '#F5DEB3', id: 'leaderboard', href: '/leaderboard' },
  ];

  // Close on outside click and on Escape
  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      if (!rootRef.current) return;
      if (isOpen && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('mousedown', handleDocClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleDocClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  // small compact toggle button when closed
  if (!isOpen) {
    return (
      <button
        aria-label="Open navigation"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-4 z-[60] p-0"
        style={{
          width: 56,
          height: 56,
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          borderRadius: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="fixed bottom-8 right-4 z-[60] p-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
      >
        <Image src="/nav_menu.svg" alt="Open Menu" width={44} height={44} />
      </button>
    );
  }

  return (
    <div
      ref={rootRef}
      className="z-[60]"
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: 380,
        height: 716,
        background: 'transparent',
        borderRadius: 0,
        overflow: 'visible',
        opacity: 1,
        transform: 'rotate(0deg)',
      }}
      aria-expanded={isOpen}
      role="dialog"
      aria-label="Navigation menu"
    >
      {/* First border */}
      <div style={{
        position: 'absolute',
        top: 15,
        left: 7,
        width: 380,
        height: 716,
        border: '4px solid #0A1627',
        borderRadius: 0,
        background: 'transparent',
        pointerEvents: 'none',
        zIndex: 1,
      }} />
      {/* In-between background */}
      <div style={{
        position: 'absolute',
        top: 31,
        left: 23,
        width: 348,
        height: 682,
        background: 'rgba(25, 44, 85, 0.4)',
        borderRadius: 0,
        zIndex: 2,
      }} />
      {/* Second border */}
      <div style={{
        position: 'absolute',
        top: 31,
        left: 23,
        width: 348,
        height: 682,
        border: '4px solid #00173C',
        borderRadius: 0,
        background: 'transparent',
        opacity: 0.6,
        zIndex: 3,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 363px 100%, 363px 705px, 355px 705px, 355px 100%, 0 100%)',
      }} />
      {/* Hover styles */}
      <style>{`
        .cube-nav-link {
          transition: background 0.15s ease, box-shadow 0.15s ease;
          border: 3px solid transparent;
          margin: 0 8px;
        }
        .cube-nav-link:hover {
          background: #0A1A2E;
          border: 3px solid #1A3A5C;
          box-shadow: inset 0 0 0 2px #0D2844;
        }
      `}</style>
      {/* Content */}
      <div style={{
        position: 'absolute',
        top: 31,
        left: 23,
        width: 348,
        height: 682,
        background: 'transparent',
        borderRadius: 0,
        zIndex: 4,
      }}>
        <nav className="font-press-start" style={{ padding: '32px 0 0 0', width: '100%' }}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="cube-nav-link flex items-center gap-4 px-4 py-3"
              style={{ textDecoration: 'none', position: 'relative', borderRadius: 0 }}
              aria-label={item.name}
            >
              <Image
                src={`/cube/${item.id}.svg`}
                alt={`${item.name} Cube`}
                width={36}
                height={36}
                className="flex-shrink-0"
              />
              <span
                className="select-none font-press-start"
                style={{
                  fontFamily: "'Press Start 2P'",
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: 16,
                  lineHeight: 1,
                  letterSpacing: '0.07em',
                  color: 'white',
                  textShadow: '0 2px 0 #0A1627',
                  borderRadius: 0,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {item.name}
              </span>
            </a>
          ))}
        </nav>
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close navigation"
          style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            width: 48,
            height: 48,
            background: 'transparent',
            border: 'none',
            borderRadius: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'none',
            zIndex: 10,
          }}
        >
          <Image
            src="/close_button.svg"
            alt="Close"
            width={32}
            height={32}
            className="object-contain"
          />
        </button>
      </div>
    </div>
  );
};

export default CubeNavbar;
