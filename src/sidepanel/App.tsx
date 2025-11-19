import XNavHeader from '@/src/common/components/XNavHeader';
import XPageCore from '@/src/common/components/XPageCore';
import { useEventManager } from '@/src/common/hooks/useEventManager';
import GlobalManager from '@/src/common/kits/GlobalManager';
import type { IMessageType } from '@/src/types';

export default function SidepanelApp() {
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

  const handleBtnTest = () => {
    GlobalManager.postConnectMessage({
      type: 'background-test-demo',
      payload: {
        a: 1,
        b: 2,
      },
    });
  };

  return (
    <XPageCore
      customClassNameChildren='px-2'
      renderPageHeader={() => {
        return <XNavHeader>Side Panel</XNavHeader>;
      }}
    >
      <p style={{ marginTop: 8 }} onClick={handleBtnTest}>
        你好，这是 React 123 侧边面板。
      </p>
    </XPageCore>
  );
}
