// src/hooks/usePageTracking.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from '../services/analytics';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const pageName = location.pathname;
    analytics.trackPageView(pageName);
  }, [location]);
};