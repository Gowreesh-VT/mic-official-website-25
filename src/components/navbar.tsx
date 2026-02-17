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
          width: 40,
          height: 40,
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
        <Image src="/nav_menu.svg" alt="Open Menu" width={36} height={36} />
      </button>
    );
  }

  return (
    <div
      ref={rootRef}
      className="z-[60]"
      style={{
        position: 'fixed',
        bottom: 16,
        right: 12,
        width: 240,
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
      {/* Background + border */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(10, 30, 60, 0.88)',
        border: '3px solid #1B7A9E',
        borderRadius: 0,
        zIndex: 1,
      }} />
      {/* Hover styles */}
      <style>{`
        .cube-nav-link {
          transition: background 0.15s ease, box-shadow 0.15s ease;
          border: 3px solid transparent;
          margin: 0 4px;
        }
        .cube-nav-link:hover {
          background: #0A1A2E;
          border: 3px solid #1A3A5C;
          box-shadow: inset 0 0 0 2px #0D2844;
        }
      `}</style>
      {/* Content */}
      <div style={{
        position: 'relative',
        background: 'transparent',
        borderRadius: 0,
        zIndex: 4,
        padding: '8px 4px',
      }}>
        <nav className="font-press-start" style={{ padding: '16px 0 0 0', width: '100%' }}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="cube-nav-link flex items-center gap-3 px-3 py-2"
              style={{ textDecoration: 'none', position: 'relative', borderRadius: 0 }}
              aria-label={item.name}
            >
              <Image
                src={`/cube/${item.id}.svg`}
                alt={`${item.name} Cube`}
                width={24}
                height={24}
                className="flex-shrink-0"
              />
              <span
                className="select-none font-press-start"
                style={{
                  fontFamily: "'Press Start 2P'",
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: 11,
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
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 12px 8px 0' }}>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation"
            style={{
              width: 28,
              height: 28,
              background: 'transparent',
              border: 'none',
              borderRadius: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'none',
              cursor: 'pointer',
            }}
          >
            <Image
              src="/close_button.svg"
              alt="Close"
              width={22}
              height={22}
              className="object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CubeNavbar;
