import { XMarkdown } from '@/src/common/components/XMarkdown';
import { XNavHeader } from '@/src/common/components/XNavHeader';
import { XPageCore } from '@/src/common/components/XPageCore';
import termsOfServiceContent from '@/src/common/config/terms-of-service.md?raw';
import type React from 'react';

export function TermsOfService(): React.ReactNode {
  return (
    <XPageCore
      customClassNameChildren='px-4 py-6'
      renderPageHeader={() => {
        return <XNavHeader>服务条款</XNavHeader>;
      }}
    >
      <div className='mx-auto max-w-4xl'>
        <XMarkdown content={termsOfServiceContent} />
      </div>
    </XPageCore>
  );
}
