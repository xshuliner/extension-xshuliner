import XNavHeader from '@/src/common/components/XNavHeader';
import XPageCore from '@/src/common/components/XPageCore';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <XPageCore
      customClassNameChildren='px-2'
      renderPageHeader={() => {
        return <XNavHeader>App</XNavHeader>;
      }}
    >
      <div>hello start</div>
      <div
        className='cursor-pointer'
        onClick={() => {
          setCount(prev => prev + 1);
        }}
      >
        {count}
      </div>
      <div>hello end</div>
      <div>
        <Outlet />
      </div>
    </XPageCore>
  );
}

export default App;
