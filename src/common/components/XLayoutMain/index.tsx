import type { ITabInfoType } from '@/src/common/components/XTabbar';
import { XTabbar } from '@/src/common/components/XTabbar';
import { Outlet, useNavigate } from 'react-router-dom';

export function XLayoutMain() {
  const navigate = useNavigate();

  const handleTabbarClick = (tabbar: ITabInfoType) => {
    navigate(tabbar.path, { replace: true });
  };

  return (
    <div className='flex h-full w-full flex-col'>
      <div className='relative flex-1'>
        <Outlet />
      </div>
      <XTabbar defaultTab='home' onTabbarClick={handleTabbarClick} />
    </div>
  );
}
