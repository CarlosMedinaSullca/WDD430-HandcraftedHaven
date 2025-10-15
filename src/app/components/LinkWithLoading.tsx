// components/LinkWithLoading.tsx
"use client";
import { useState, useEffect } from "react";
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
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 5000); 

      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <>
      <Link 
        href={href} 
        className={className}
        onClick={handleClick}
      >
        {children}
      </Link>
      
      {isLoading && <LoadingSpinner />}
    </>
  );
}