import { stopEventDefault } from '@/src/common/utils';

export interface XButtonProps {
  type?: string;
  typeHtml?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onClick?: () => void;
}

export default function XButton(props: XButtonProps) {
  const { onClick, typeHtml = 'button', children } = props || {};

  const handleBtnClick = e => {
    stopEventDefault(e);
    onClick?.();
  };

  return (
    <button className='cursor-pointer' type={typeHtml} onClick={handleBtnClick}>
      {children}
    </button>
  );
}
