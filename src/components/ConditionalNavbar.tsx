'use client';
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import CubeNavbar from './navbar';
import Image from 'next/image';
import Link from 'next/link';


const Logo = () => (
  <Image
    src="/images/mic-logo.png"
    alt="MIC Logo"
    width={95}
    height={95}
    style={{ position: 'fixed', top: 20, left: 27, zIndex: 50, cursor: 'pointer' }}
    priority
  />
);

export default function ConditionalNavbar() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname && pathname.startsWith('/leads')) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }

    // Cleanup to ensure overflow is reset if component unmounts (though it shouldn't in RootLayout)
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [pathname]);

  // Don't render navbar on home page
  if (pathname === '/' || pathname === '/mobile') {
    return <Logo />;
  }

  return (
    <>
      <CubeNavbar />
      <Link href="/main" >
        <Logo />
      </Link>

    </>
  );
}