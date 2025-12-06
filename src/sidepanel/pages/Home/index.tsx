import { XButton } from '@/src/common/components/XButton';
import XNavHeader from '@/src/common/components/XNavHeader';
import XPageCore from '@/src/common/components/XPageCore';
import type React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

export default function Home(): React.ReactNode {
  const navigate = useNavigate();

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

  const handleBtnLoginClick = () => {
    navigate(
      {
        pathname: '/login',
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

  return (
    <XPageCore
      customClassNameChildren='px-2'
      renderPageHeader={() => {
        return <XNavHeader />;
      }}
    >
      <div className='absolute top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center gap-4'>
        <div className='flex gap-2'>
          <XButton variant='gradient' onClick={handleBtnDemoClick}>
            Demo
          </XButton>
          <XButton variant='gradient' onClick={handleBtnLoginClick}>
            Login
          </XButton>
        </div>
      </div>
    </XPageCore>
  );
}
