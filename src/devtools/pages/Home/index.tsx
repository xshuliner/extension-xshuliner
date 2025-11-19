import XButton from '@/src/common/components/XButton';
import XNavHeader from '@/src/common/components/XNavHeader';
import XPageCore from '@/src/common/components/XPageCore';
import GlobalManager from '@/src/common/kits/GlobalManager';
import type React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home(): React.ReactNode {
  const navigate = useNavigate();

  const handleBtnDemoClick = () => {
    navigate('/demo', { state: { from: 'homepage' } });
  };

  const handleBtnOtherClick = () => {
    navigate('/demo2');
  };

  const handleBtnTestClick = () => {
    GlobalManager.postConnectMessage({
      type: 'background-test-demo',
      payload: {
        a: 333,
        b: 444,
      },
    });
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
        <XButton onClick={handleBtnTestClick}>Test</XButton>
      </div>
    </XPageCore>
  );
}
