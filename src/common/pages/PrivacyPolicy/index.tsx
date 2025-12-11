import { XMarkdown } from '@/src/common/components/XMarkdown';
import { XNavHeader } from '@/src/common/components/XNavHeader';
import { XPageCore } from '@/src/common/components/XPageCore';
import privacyPolicyContent from '@/src/common/config/privacy-policy.md?raw';
import type React from 'react';

export function PrivacyPolicy(): React.ReactNode {
  return (
    <XPageCore
      customClassNameChildren='px-4 py-6'
      renderPageHeader={() => {
        return <XNavHeader>隐私政策</XNavHeader>;
      }}
    >
      <div className='mx-auto max-w-4xl'>
        <XMarkdown content={privacyPolicyContent} />
      </div>
    </XPageCore>
  );
}
