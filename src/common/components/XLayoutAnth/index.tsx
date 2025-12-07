import CacheManager from '@/src/common/kits/CacheManager';
import { validateJwtToken } from '@/src/common/utils';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function XLayoutAnth() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storage = await CacheManager.getSyncStorage(['token']);
        const token = storage?.token;

        // 验证 JWT token 的合法性和是否过期
        const { isValid, isExpired } = validateJwtToken(token);

        if (!token || !isValid || isExpired) {
          // 如果没有 token、token 无效或已过期，重定向到登录页面
          console.warn('Token validation failed:', {
            hasToken: !!token,
            isValid,
            isExpired,
          });
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
