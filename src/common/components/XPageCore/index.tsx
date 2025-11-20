import { initTheme } from '@/src/common/utils';
import { cva } from 'class-variance-authority';
import type React from 'react';
import { useEffect } from 'react';

export interface IXPageCoreProps {
  customClassNameChildren?: string;
  renderPageHeader?: () => React.ReactNode;
  renderPageFooter?: () => React.ReactNode;
  children: React.ReactNode;
}

const wrapperClassName = cva(
  'fixed top-0 right-0 bottom-0 left-0 flex flex-col justify-start overflow-hidden'
);

const childrenClassName = cva(
  'relative flex h-0 flex-1 flex-col justify-start overflow-y-auto'
);

export default function XPageCore(props: IXPageCoreProps) {
  const {
    customClassNameChildren,
    renderPageHeader,
    renderPageFooter,
    children,
  } = props || {};

  // 初始化主题系统
  useEffect(() => {
    const cleanup = initTheme();
    return cleanup;
  }, []);

  return (
    <div className={wrapperClassName()}>
      {/* 亮色模式背景层 */}
      <div className='pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-700 dark:opacity-0'>
        {/* 主渐变 */}
        <div className='absolute inset-0 bg-linear-to-br from-violet-50 via-indigo-50 to-purple-50' />
        {/* 对角柔光层 */}
        <div className='absolute inset-0 bg-linear-to-tr from-transparent via-pink-100/30 to-transparent' />
        {/* 右上角光晕 */}
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.1),transparent_50%)]' />
      </div>

      {/* 暗色模式背景层 */}
      <div className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 dark:opacity-100'>
        {/* 主渐变 */}
        <div className='absolute inset-0 bg-linear-to-br from-slate-950 via-indigo-950 to-purple-950' />
        {/* 对角柔光层 */}
        <div className='absolute inset-0 bg-linear-to-tr from-transparent via-pink-500/10 to-transparent' />
        {/* 右上角光晕 */}
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.2),transparent_50%)]' />
      </div>

      {/* 内容区域 */}
      <div className='relative z-10 flex-0'>{renderPageHeader?.()}</div>
      <div
        className={childrenClassName({
          className: customClassNameChildren,
        })}
      >
        {children}
      </div>
      <div className='relative z-10 flex-0'>{renderPageFooter?.()}</div>
    </div>
  );
}
