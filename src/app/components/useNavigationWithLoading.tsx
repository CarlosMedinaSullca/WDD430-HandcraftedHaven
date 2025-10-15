// hooks/useNavigationWithLoading.ts
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from './LoadingSpinner';

export function useNavigationWithLoading() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const navigateWithLoading = (url: string) => {
    setIsLoading(true);
    router.push(url);
  };

  const NavigationSpinner = () => isLoading ? <LoadingSpinner /> : null;

  return {
    navigateWithLoading,
    NavigationSpinner,
    isLoading
  };
}