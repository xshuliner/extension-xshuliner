import App from '@/src/App';
import NotFound from '@/src/common/pages/NotFound';
import { createHashRouter } from 'react-router-dom';

export const router = createHashRouter([
  // 公开访问的路由
  {
    path: '/',
    element: <App />,
    // children: [
    //   {
    //     path: '/demo',
    //     element: <Demo />,
    //   },
    // ],
  },

  // 认证布局（公共路由守卫：已登录用户不能访问登录/注册页面）
  // {
  //   element: <PublicOnlyRoute />,
  //   children: [
  //     {
  //       path: '/auth',
  //       element: <AuthLayout />, // 可选：用于登录/注册页面的特殊布局
  //       children: [
  //         {
  //           path: 'login', // 完整路径: /auth/login
  //           element: <LoginPage />,
  //         },
  //         // ... 其他公共路由, 如 /auth/register
  //       ],
  //     },
  //   ],
  // },

  // 私有路由布局（路由守卫：未登录用户不能访问）
  // {
  //   element: <PrivateRoute />, // 路由守卫组件
  //   children: [
  //     {
  //       path: 'dashboard',
  //       element: <DashboardLayout />, // 父级布局组件
  //       children: [
  //         {
  //           index: true, // 完整路径: /dashboard。作为父路由的默认子路由
  //           element: <ProfilePage />,
  //         },
  //         // 动态路由示例：
  //         {
  //           path: 'user/:userId', // 完整路径: /dashboard/user/123
  //           element: <UserDetailPage />,
  //         },
  //         // ... 其他私有路由, 如 /dashboard/settings
  //       ],
  //     },
  //   ],
  // },

  // 404 Catch-all 路由 (必须放在最后)
  {
    path: '*',
    element: <NotFound />,
  },
]);
