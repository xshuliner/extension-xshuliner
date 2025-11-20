import BG from '@/src/assets/bg.jpg';
import { cva } from 'class-variance-authority';
import type React from 'react';

export interface IXPageCoreProps {
  customClassNameChildren?: string;
  renderPageHeader?: () => React.ReactNode;
  renderPageFooter?: () => React.ReactNode;
  children: React.ReactNode;
}

const wrapperClassName = cva(
  'fixed top-0 right-0 bottom-0 left-0 flex flex-col justify-start bg-auto bg-repeat'
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

  return (
    <div
      className={wrapperClassName()}
      style={{
        backgroundImage: `url('${BG}')`,
      }}
    >
      <div className='flex-0'>{renderPageHeader?.()}</div>
      <div
        className={childrenClassName({
          className: customClassNameChildren,
        })}
      >
        {children}
      </div>
      <div className='flex-0'>{renderPageFooter?.()}</div>
    </div>
  );
}
