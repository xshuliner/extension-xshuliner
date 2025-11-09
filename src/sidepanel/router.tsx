import NotFound from '@/src/common/pages/NotFound';
import SidepanelApp from '@/src/sidepanel/App';
import { createHashRouter } from 'react-router-dom';

export const router = createHashRouter([
  // 公开访问的路由
  {
    path: '/',
    children: [
      {
        path: '/',
        element: <SidepanelApp />,
      },
    ],
  },

  // 404 Catch-all 路由 (必须放在最后)
  {
    path: '*',
    element: <NotFound />,
  },
]);
