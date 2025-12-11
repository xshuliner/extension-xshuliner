import { useTheme } from '@/src/common/hooks/useTheme';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

export function XLayoutRoot() {
  const { initTheme } = useTheme();

  useEffect(() => {
    const cleanupInitTheme = initTheme();
    return () => {
      cleanupInitTheme();
    };
  }, []);

  return (
    <div className='relative flex h-screen w-screen flex-col'>
      {/* 亮色模式背景层 */}
      <div className='pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-[-1] opacity-100 transition-opacity duration-700 dark:opacity-0'>
        {/* 主渐变 */}
        <div className='absolute top-0 right-0 bottom-0 left-0 bg-linear-to-br from-violet-50 via-indigo-50 to-purple-50' />
        {/* 对角柔光层 */}
        <div className='absolute top-0 right-0 bottom-0 left-0 bg-linear-to-tr from-transparent via-pink-100/30 to-transparent' />
        {/* 右上角光晕 */}
        <div className='absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.1),transparent_50%)]' />
      </div>

      {/* 暗色模式背景层 */}
      <div className='pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-[-1] opacity-0 transition-opacity duration-700 dark:opacity-100'>
        {/* 主渐变 */}
        <div className='absolute top-0 right-0 bottom-0 left-0 bg-linear-to-br from-slate-950 via-indigo-950 to-purple-950' />
        {/* 对角柔光层 */}
        <div className='absolute top-0 right-0 bottom-0 left-0 bg-linear-to-tr from-transparent via-pink-500/10 to-transparent' />
        {/* 右上角光晕 */}
        <div className='absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.2),transparent_50%)]' />
      </div>

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
    </div>
  );
}
