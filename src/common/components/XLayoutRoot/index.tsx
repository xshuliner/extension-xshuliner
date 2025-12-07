import { useTheme } from '@/src/common/hooks/useTheme';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

export default function XLayout() {
  const { initTheme } = useTheme();

  useEffect(() => {
    const cleanupInitTheme = initTheme();
    return () => {
      cleanupInitTheme();
    };
  }, []);

  return (
    <>
      <Outlet />
      <Toaster
        position='top-center'
        toastOptions={{
          className: '',
          style: {
            background: 'var(--color-card)',
            color: 'var(--color-card-foreground)',
            border: '1px solid var(--color-border)',
          },
          success: {
            iconTheme: {
              primary: 'var(--color-primary)',
              secondary: 'var(--color-primary-foreground)',
            },
          },
          error: {
            iconTheme: {
              primary: 'var(--color-destructive)',
              secondary: 'var(--color-destructive-foreground)',
            },
          },
        }}
      />
    </>
  );
}
