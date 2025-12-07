import { useTheme } from '@/src/common/hooks/useTheme';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export default function XLayout() {
  const { initTheme } = useTheme();

  useEffect(() => {
    const cleanupInitTheme = initTheme();
    return () => {
      cleanupInitTheme();
    };
  }, []);

  return <Outlet />;
}
