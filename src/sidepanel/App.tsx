import XNavHeader from '@/src/common/components/XNavHeader';
import XPageCore from '@/src/common/components/XPageCore';
import GlobalManager from '@/src/common/kits/GlobalManager';

export default function SidepanelApp() {
  const handleBtnTest = () => {
    GlobalManager.g_connectPort?.postMessage({
      type: 'test-demo',
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
