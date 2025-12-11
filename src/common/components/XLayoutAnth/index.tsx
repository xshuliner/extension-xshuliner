import MemberManager from '@/src/common/kits/MemberManager';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export function XLayoutAnth() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const isAuth = await MemberManager.isAuth();
        if (!isAuth) {
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('XLayoutAnth checkToken error', error);
        // 如果检查失败，也重定向到登录页面
        navigate('/login', { replace: true });
      }
    };

    // 路由变化时检查 token
    checkToken();
  }, [location.pathname, navigate]);

  return <Outlet />;
}
