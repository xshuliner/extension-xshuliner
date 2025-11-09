import XPageCore from '@/src/common/components/XPageCore';
import type React from 'react';

export default function Demo(): React.ReactNode {
  return (
    <XPageCore>
      <div className='fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center'>
        Demo
      </div>
    </XPageCore>
  );
}
