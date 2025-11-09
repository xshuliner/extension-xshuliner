import XButton from '@/src/common/components/XButton';
import XIcon from '@/src/common/components/XIcon';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';

export interface IXNavHeaderProps {
  customClassName?: string;
  customClassNameChildren?: string;
  renderCustomLeft?: () => React.ReactNode;
  renderCustomRight?: () => React.ReactNode;
  children: React.ReactNode;
}

export default function XNavHeader(props: IXNavHeaderProps) {
  const {
    customClassName,
    customClassNameChildren,
    renderCustomLeft,
    renderCustomRight,
    children,
  } = props || {};

  const navigate = useNavigate();

  const handleBtnHomeClick = () => {
    console.log('handleBtnHomeClick');
    // navigate('/', {
    //   replace: true,
    // });
    navigate(-1);
  };

  return (
    <div
      className={classnames(
        'relative box-border flex flex-row items-center justify-between gap-2 p-2',
        customClassName
      )}
    >
      {/* left */}
      {(renderCustomLeft || window.history.length > 1) && (
        <div className='flex flex-0 flex-row items-center justify-center'>
          {renderCustomLeft ? (
            renderCustomLeft?.()
          ) : (
            <XButton onClick={handleBtnHomeClick}>
              <XIcon name='home' />
            </XButton>
          )}
        </div>
      )}

      {/* children */}
      <div
        className={classnames(
          'flex flex-1 flex-row items-center justify-start',
          customClassNameChildren
        )}
      >
        {children}
      </div>

      {/* right */}
      {renderCustomRight && (
        <div className='flex flex-0 flex-row items-center justify-center'>
          {renderCustomRight?.()}
        </div>
      )}
    </div>
  );
}
