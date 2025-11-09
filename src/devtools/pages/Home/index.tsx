import XPageCore from '@/src/common/components/XPageCore';
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

  return (
    <XPageCore
      renderPageHeader={() => {
        return <div>Home</div>;
      }}
    >
      <div className='fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center'>
        <div onClick={handleBtnDemoClick}>Demo</div>
        <div onClick={handleBtnOtherClick}>404</div>
      </div>
    </XPageCore>
  );
}
