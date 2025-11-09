import XNavHeader from '@/src/common/components/XNavHeader';
import XPageCore from '@/src/common/components/XPageCore';

export default function SidepanelApp() {
  return (
    <XPageCore
      customClassNameChildren='px-2'
      renderPageHeader={() => {
        return <XNavHeader>Side Panel</XNavHeader>;
      }}
    >
      <p style={{ marginTop: 8 }}>你好，这是 React 123 侧边面板。</p>
    </XPageCore>
  );
}
