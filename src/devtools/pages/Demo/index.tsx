import { XButton } from '@/src/common/components/XButton';
import XNavHeader from '@/src/common/components/XNavHeader';
import XPageCore from '@/src/common/components/XPageCore';
import { useEventManager } from '@/src/common/hooks/useEventManager';
import GlobalManager from '@/src/common/kits/GlobalManager';
import type { IMessageType } from '@/src/common/types';
import type React from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function Demo(): React.ReactNode {
  const {
    pathname,
    search: locationSearch,
    state: locationState,
  } = useLocation();
  const routeParams = useParams();

  const { emit: _emitExtensions } = useEventManager(
    'xshuliner-extensions',
    (data: IMessageType) => {
      // console.log('xshuliner-extensions', data);

      const { type, ..._otherInfo } = data || {};

      switch (type) {
        case 'xshuliner-background-all-request-completed': {
          console.log('xshuliner-background-all-request-completed', data);
          break;
        }
      }
    }
  );

  const handleBtnTestClick = () => {
    GlobalManager.postConnectMessage({
      type: 'background-test-demo',
      payload: {
        pathname,
        params: routeParams,
        state: locationState,
        search: locationSearch,
      },
    });
  };

  return (
    <XPageCore
      customClassNameChildren='px-2 flex items-center justify-center'
      renderPageHeader={() => {
        return <XNavHeader>Demo</XNavHeader>;
      }}
    >
      <XButton onClick={handleBtnTestClick}>Demo</XButton>
    </XPageCore>
  );
}
