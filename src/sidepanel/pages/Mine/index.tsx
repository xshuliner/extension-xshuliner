import { XNavHeader } from '@/src/common/components/XNavHeader';
import { XPageCore } from '@/src/common/components/XPageCore';
import { XPageMine } from '@/src/common/components/XPageMine';
import type React from 'react';

export function Mine(): React.ReactNode {
  return (
    <XPageCore
      customClassNameChildren='px-2'
      renderPageHeader={() => {
        return <XNavHeader renderCustomLeft={() => null} />;
      }}
    >
      <XPageMine />
    </XPageCore>
  );
}
