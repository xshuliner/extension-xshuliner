import XLogin from '@/src/common/components/XLogin';
import XNavHeader from '@/src/common/components/XNavHeader';
import XPageCore from '@/src/common/components/XPageCore';
import type React from 'react';

export default function Demo(): React.ReactNode {
  return (
    <XPageCore
      customClassNameChildren='px-2 items-center'
      renderPageHeader={() => {
        return <XNavHeader>Login</XNavHeader>;
      }}
    >
      <XLogin />
    </XPageCore>
  );
}
