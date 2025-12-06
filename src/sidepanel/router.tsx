import XLayout from '@/src/common/components/XLayout';
import NotFound from '@/src/common/pages/NotFound';
import Demo from '@/src/sidepanel/pages/Demo';
import Home from '@/src/sidepanel/pages/Home';
import Login from '@/src/sidepanel/pages/Login';
import { createHashRouter } from 'react-router-dom';

export const router = createHashRouter([
  {
    path: '/',
    element: <XLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/demo',
        element: <Demo />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },

  // 404 Catch-all 路由 (必须放在最后)
  {
    path: '*',
    element: <NotFound />,
  },
]);
