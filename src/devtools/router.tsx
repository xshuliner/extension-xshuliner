import { NotFound } from '@/src/common/pages/NotFound';
import { Demo } from '@/src/devtools/pages/Demo';
import { Home } from '@/src/devtools/pages/Home';
import { createHashRouter } from 'react-router-dom';

export const router = createHashRouter([
  {
    path: '/',
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/demo',
        element: <Demo />,
      },
    ],
  },

  // 404 Catch-all 路由 (必须放在最后)
  {
    path: '*',
    element: <NotFound />,
  },
]);
