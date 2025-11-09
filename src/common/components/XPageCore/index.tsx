import BG from '@/src/assets/bg.jpg';
import classnames from 'classnames';

export interface IXPageCoreProps {
  renderPageHeader?: () => React.ReactNode;
  renderPageFooter?: () => React.ReactNode;
  children: React.ReactNode;
}

/**
 * 页面容器组件
 */
export default function XPageCore(props: IXPageCoreProps) {
  const { renderPageHeader, renderPageFooter, children } = props || {};

  return (
    <div
      className={classnames(
        'fixed top-0 right-0 bottom-0 left-0 flex flex-col justify-start bg-auto bg-repeat'
      )}
      style={{
        backgroundImage: `url('${BG}')`, // <-- 使用内联 style 属性
      }}
    >
      <div className='flex-0'>{renderPageHeader?.()}</div>
      <div className='flex h-0 flex-1 flex-col justify-start overflow-y-auto'>
        {children}
      </div>
      <div className='flex-0'>{renderPageFooter?.()}</div>
    </div>
  );
}
