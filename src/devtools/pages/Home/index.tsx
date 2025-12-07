import { XButton } from '@/src/common/components/XButton';
import XNavHeader from '@/src/common/components/XNavHeader';
import XPageCore from '@/src/common/components/XPageCore';
import { useEventManager } from '@/src/common/hooks/useEventManager';
import type { IMessageType } from '@/src/common/types';
import type React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

export default function Home(): React.ReactNode {
  const navigate = useNavigate();

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

  const handleBtnDemoClick = () => {
    navigate(
      {
        pathname: '/demo',
        search: createSearchParams({
          from: 'home',
          type: 'demo',
        }).toString(),
      },
      {
        state: {
          from: 'homepage',
        },
      }
    );
  };

  const handleBtnOtherClick = () => {
    navigate('/demo2');
  };

  return (
    <XPageCore
      customClassNameChildren='px-2'
      renderPageHeader={() => {
        return <XNavHeader>Home</XNavHeader>;
      }}
    >
      <div className='absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center gap-2'>
        <XButton onClick={handleBtnDemoClick}>Demo</XButton>
        <XButton onClick={handleBtnOtherClick}>404</XButton>
      </div>
    </XPageCore>
  );
}
