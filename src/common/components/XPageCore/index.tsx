import { cva } from 'class-variance-authority';
import type React from 'react';

export interface IXPageCoreProps {
  customClassNameChildren?: string;
  renderPageHeader?: () => React.ReactNode | null;
  renderPageFooter?: () => React.ReactNode | null;
  children: React.ReactNode | null;
}

const wrapperClassName = cva(
  'absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-start overflow-hidden'
);

const childrenClassName = cva(
  'relative flex h-0 flex-1 flex-col justify-start overflow-y-auto'
);

export function XPageCore(props: IXPageCoreProps) {
  const {
    customClassNameChildren,
    renderPageHeader,
    renderPageFooter,
    children,
  } = props || {};

  return (
    <div className={wrapperClassName()}>
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
