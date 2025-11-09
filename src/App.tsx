import XPageCore from '@/src/common/components/XPageCore';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <XPageCore
      renderPageHeader={() => {
        return <div>Home</div>;
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
    </XPageCore>
  );
}

export default App;
