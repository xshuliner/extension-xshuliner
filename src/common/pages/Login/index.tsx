import { XLogin } from '@/src/common/components/XLogin';
import { XNavHeader } from '@/src/common/components/XNavHeader';
import { XPageCore } from '@/src/common/components/XPageCore';
import type React from 'react';

export function Login(): React.ReactNode {
  return (
    <XPageCore
      renderPageHeader={() => {
        return <XNavHeader leftIcon='home' />;
      }}
    >
      <div className='flex h-full w-full items-center justify-center px-2'>
        <XLogin />
      </div>
    </XPageCore>
  );
}
