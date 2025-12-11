import { XButton } from '@/src/common/components/XButton';
import { XNavHeader } from '@/src/common/components/XNavHeader';
import { XPageCore } from '@/src/common/components/XPageCore';
import { useEventManager } from '@/src/common/hooks/useEventManager';
import GlobalManager from '@/src/common/kits/GlobalManager';
import type { IMessageType } from '@/src/common/types';
import { Bot } from 'lucide-react';
import type React from 'react';
import { useLocation, useParams } from 'react-router-dom';

export function Demo(): React.ReactNode {
  const {
    pathname,
    search: locationSearch,
    state: locationState,
  } = useLocation();
  const routeParams = useParams();

  const { emit: _emitExtensions } = useEventManager(
    'xshuliner-extensions',
    (data: IMessageType) => {
      // console.log('xshuliner-extensions', data);

      const { type, ..._otherInfo } = data || {};

      switch (type) {
        case 'xshuliner-background-all-request-completed': {
          console.log('xshuliner-background-all-request-completed', data);
          break;
        }
      }
    }
  );

  const handleBtnTestClick = () => {
    GlobalManager.postConnectMessage({
      type: 'background-test-demo',
      payload: {
        pathname,
        params: routeParams,
        state: locationState,
        search: locationSearch,
      },
    });
  };

  const variants = [
    'primary',
    'destructive',
    'outline',
    'secondary',
    'accent',
    'muted',
    'ghost',
    'link',
    'gradient',
  ] as const;

  const sizes = ['sm', 'default', 'lg'] as const;
  const iconSizes = ['icon-sm', 'icon', 'icon-lg'] as const;

  return (
    <XPageCore
      customClassNameChildren='px-4 py-6'
      renderPageHeader={() => {
        return <XNavHeader>XButton 组件演示</XNavHeader>;
      }}
    >
      <div className='w-full space-y-8'>
        {/* 变体展示 */}
        <section className='space-y-4'>
          <h2 className='text-lg font-semibold text-foreground'>
            按钮变体 (Variants)
          </h2>
          <div className='space-y-6'>
            {variants.map(variant => (
              <div key={variant} className='space-y-2'>
                <h3 className='text-sm font-medium text-muted-foreground capitalize'>
                  {variant}
                </h3>
                <div className='flex flex-wrap gap-3'>
                  {sizes.map(size => (
                    <XButton
                      key={`${variant}-${size}`}
                      variant={variant}
                      size={size}
                      onClick={handleBtnTestClick}
                    >
                      {size}
                    </XButton>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 图标按钮展示 */}
        <section className='space-y-4'>
          <h2 className='text-lg font-semibold text-foreground'>
            图标按钮 (Icon Buttons)
          </h2>
          <div className='space-y-6'>
            {variants.map(variant => (
              <div key={`icon-${variant}`} className='space-y-2'>
                <h3 className='text-sm font-medium text-muted-foreground capitalize'>
                  {variant}
                </h3>
                <div className='flex flex-wrap gap-3'>
                  {iconSizes.map(size => (
                    <XButton
                      key={`${variant}-${size}`}
                      variant={variant}
                      size={size}
                      onClick={handleBtnTestClick}
                    >
                      <Bot className='size-6' />
                    </XButton>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 状态展示 */}
        <section className='space-y-4'>
          <h2 className='text-lg font-semibold text-foreground'>
            按钮状态 (States)
          </h2>
          <div className='space-y-3'>
            <div className='flex flex-wrap items-center gap-3'>
              <span className='w-20 text-sm text-muted-foreground'>禁用:</span>
              <XButton variant='primary' disabled>
                Primary
              </XButton>
              <XButton variant='destructive' disabled>
                Destructive
              </XButton>
              <XButton variant='outline' disabled>
                Outline
              </XButton>
            </div>
            <div className='flex flex-wrap items-center gap-3'>
              <span className='w-20 text-sm text-muted-foreground'>
                加载中:
              </span>
              <XButton variant='primary' disabled>
                <svg
                  className='animate-spin'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  />
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  />
                </svg>
                Loading
              </XButton>
            </div>
          </div>
        </section>
      </div>
    </XPageCore>
  );
}
