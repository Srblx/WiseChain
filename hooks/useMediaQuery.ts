"use client";

import { breakpoints } from '@/app/_utils/breakpoints';
import { useEffect, useState } from 'react';

const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQueryMobile = window.matchMedia(breakpoints.mobile);
    const mediaQueryTablet = window.matchMedia(breakpoints.tablet);
    const mediaQueryDesktop = window.matchMedia(breakpoints.desktop);

    const handleMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    const handleTabletChange = (e: MediaQueryListEvent) => setIsTablet(e.matches);
    const handleDesktopChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);

    mediaQueryMobile.addEventListener('change', handleMobileChange);
    mediaQueryTablet.addEventListener('change', handleTabletChange);
    mediaQueryDesktop.addEventListener('change', handleDesktopChange);

    // Nettoyage des listeners lors du démontage du composant
    return () => {
      mediaQueryMobile.removeEventListener('change', handleMobileChange);
      mediaQueryTablet.removeEventListener('change', handleTabletChange);
      mediaQueryDesktop.removeEventListener('change', handleDesktopChange);
    };
  }, []);

  return { isMobile, isTablet, isDesktop };
};

export default useMediaQuery;
