// components/LinkWithLoading.tsx
"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";

interface LinkWithLoadingProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function LinkWithLoading({ href, children, className }: LinkWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [lastPath, setLastPath] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== lastPath) {
      setLastPath(pathname);
      setIsLoading(false);
    }
  }, [pathname, lastPath]);

  useEffect(() => {
    if (!isLoading) return;
    
    const timeout = setTimeout(() => {
      console.warn("Link navigation timeout - resetting loading state");
      setIsLoading(false);
    }, 5000); 

    return () => clearTimeout(timeout);
  }, [isLoading]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    
    if (isLoading) return; 
    
    console.log("🔄 Link navigation started to:", href);
    setIsLoading(true);
    
    const navTimeout = setTimeout(() => {
      window.location.href = href; 
    }, 5000);


    const nextNav = () => {
      clearTimeout(navTimeout);
      window.location.href = href;
    };

    try {
      if (typeof window !== 'undefined') {
        const { router } = require('next/navigation');
        router.push(href).catch(nextNav);
      } else {
        nextNav();
      }
    } catch (error) {
      console.error("Navigation error, using fallback:", error);
      nextNav();
    }
  }, [href, isLoading]);

  return (
    <>
      <Link 
        href={href} 
        className={className}
        onClick={handleClick}
        prefetch={true}
      >
        {children}
      </Link>
      
      {isLoading && <LoadingSpinner />}
    </>
  );
}