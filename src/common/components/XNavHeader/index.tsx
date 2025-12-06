import { XButton } from '@/src/common/components/XButton';
import { useTheme } from '@/src/common/hooks/useTheme';
import { cva } from 'class-variance-authority';
import { Home, Moon, Sun } from 'lucide-react';
import type React from 'react';
import { useNavigate } from 'react-router-dom';

export interface IXNavHeaderProps {
  customClassName?: string;
  customClassNameChildren?: string;
  renderCustomLeft?: () => React.ReactNode;
  renderCustomRight?: () => React.ReactNode;
  children: React.ReactNode;
}

const headerClassName = cva(
  'font-semibold text-foreground relative box-border flex flex-row items-center justify-between gap-2 p-2'
);

const childrenWrapperClassName = cva(
  'flex flex-1 flex-row items-center justify-start'
);

export default function XNavHeader(props: IXNavHeaderProps) {
  const {
    customClassName,
    customClassNameChildren,
    renderCustomLeft,
    renderCustomRight,
    children,
  } = props || {};

  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleBtnHomeClick = () => {
    console.log('handleBtnHomeClick');
    // navigate('/', {
    //   replace: true,
    // });
    navigate(-1);
  };

  const handleToggleTheme = () => {
    toggleTheme();
  };

  return (
    <div className={headerClassName({ className: customClassName })}>
      {/* left */}
      {(renderCustomLeft || window.history.length > 1) && (
        <div className='flex flex-0 flex-row items-center justify-center'>
          {renderCustomLeft ? (
            renderCustomLeft?.()
          ) : (
            <XButton variant='ghost' onClick={handleBtnHomeClick}>
              <Home className='size-5' />
            </XButton>
          )}
        </div>
      )}

      {/* children */}
      <div
        className={childrenWrapperClassName({
          className: customClassNameChildren,
        })}
      >
        {children}
      </div>

      {/* right */}
      <div className='flex flex-0 flex-row items-center justify-center gap-2'>
        <XButton
          variant='ghost'
          size='icon'
          onClick={handleToggleTheme}
          aria-label='切换主题'
        >
          {theme === 'dark' ? (
            <Sun className='size-5' />
          ) : (
            <Moon className='size-5' />
          )}
        </XButton>
        {renderCustomRight && renderCustomRight?.()}
      </div>
    </div>
  );
}
