// hooks/useNavigationWithLoading.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import LoadingSpinner from './LoadingSpinner';

export function useNavigationWithLoading() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);
  const navigationIdRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (pathname !== currentPath && isLoading) {
      console.log("✅ Route changed, stopping loading");
      setCurrentPath(pathname);
      setIsLoading(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, [pathname, currentPath, isLoading]);

  const navigateWithLoading = useCallback(async (url: string) => {
    const navigationId = ++navigationIdRef.current;
    console.log(`🔄 Navigation ${navigationId} starting to:`, url);
    
    setIsLoading(true);

    timeoutRef.current = setTimeout(() => {
      if (navigationId === navigationIdRef.current && isLoading) {
        console.warn(`⚠️ Navigation ${navigationId} timeout, forcing completion`);
        setIsLoading(false);
        
        if (typeof window !== 'undefined') {
          window.location.href = url;
        }
      }
    }, 6000); 

    try {
      await new Promise(resolve => setTimeout(resolve, 50));
      
      await router.push(url);
      
      console.log(`✅ Navigation ${navigationId} completed successfully`);
      
      if (timeoutRef.current && navigationId === navigationIdRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
    } catch (error) {
      console.error(`❌ Navigation ${navigationId} failed:`, error);
      
      if (navigationId === navigationIdRef.current) {
        setIsLoading(false);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      
        if (typeof window !== 'undefined') {
          console.log("🔄 Using fallback navigation");
          window.location.href = url;
        }
      }
    }
  }, [router, isLoading]);

  const NavigationSpinner = () => isLoading ? <LoadingSpinner /> : null;

  return {
    navigateWithLoading,
    NavigationSpinner,
    isLoading
  };
}