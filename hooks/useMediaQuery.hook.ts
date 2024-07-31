'use client';

// Libs React
import { useCallback, useEffect, useState } from 'react';

// Utils
import { breakpoints } from '@/utils/breakpoints.utils';

const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const handleMobileChange = useCallback(
    (e: MediaQueryListEvent) => setIsMobile(e.matches),
    []
  );
  const handleTabletChange = useCallback(
    (e: MediaQueryListEvent) => setIsTablet(e.matches),
    []
  );
  const handleDesktopChange = useCallback(
    (e: MediaQueryListEvent) => setIsDesktop(e.matches),
    []
  );

  useEffect(() => {
    const mediaQueryMobile = window.matchMedia(breakpoints.mobile);
    const mediaQueryTablet = window.matchMedia(breakpoints.tablet);
    const mediaQueryDesktop = window.matchMedia(breakpoints.desktop);

    mediaQueryMobile.addEventListener('change', handleMobileChange);
    mediaQueryTablet.addEventListener('change', handleTabletChange);
    mediaQueryDesktop.addEventListener('change', handleDesktopChange);

    return () => {
      mediaQueryMobile.removeEventListener('change', handleMobileChange);
      mediaQueryTablet.removeEventListener('change', handleTabletChange);
      mediaQueryDesktop.removeEventListener('change', handleDesktopChange);
    };
  }, [handleMobileChange, handleTabletChange, handleDesktopChange]);

  return { isMobile, isTablet, isDesktop };
};

export default useMediaQuery;
