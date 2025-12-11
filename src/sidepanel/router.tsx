import { XLayoutAnth } from '@/src/common/components/XLayoutAnth';
import { XLayoutMain } from '@/src/common/components/XLayoutMain';
import { XLayoutRoot } from '@/src/common/components/XLayoutRoot';
import { XLayoutUnAnth } from '@/src/common/components/XLayoutUnAnth';
import { Login } from '@/src/common/pages/Login';
import { NotFound } from '@/src/common/pages/NotFound';
import { PrivacyPolicy } from '@/src/common/pages/PrivacyPolicy';
import { TermsOfService } from '@/src/common/pages/TermsOfService';
import { Agent } from '@/src/sidepanel/pages/Agent';
import { Demo } from '@/src/sidepanel/pages/Demo';
import { Discover } from '@/src/sidepanel/pages/Discover';
import { Home } from '@/src/sidepanel/pages/Home';
import { User } from '@/src/sidepanel/pages/User';
import { createHashRouter } from 'react-router-dom';

export const router = createHashRouter([
  {
    path: '/',
    element: <XLayoutRoot />,
    children: [
      {
        // 需要身份认证的路由
        element: <XLayoutAnth />,
        children: [
          {
            element: <XLayoutMain />,
            children: [
              {
                path: '/',
                element: <Home />,
              },
              {
                path: '/agent',
                element: <Agent />,
              },
              {
                path: '/discover',
                element: <Discover />,
              },
              {
                path: '/user',
                element: <User />,
              },
            ],
          },
          {
            path: '/demo',
            element: <Demo />,
          },
        ],
      },
      {
        // 不需要身份认证的路由
        element: <XLayoutUnAnth />,
        children: [
          {
            path: '/login',
            element: <Login />,
          },
          {
            path: '/terms-of-service',
            element: <TermsOfService />,
          },
          {
            path: '/privacy-policy',
            element: <PrivacyPolicy />,
          },
        ],
      },
    ],
  },

  // 404 Catch-all 路由 (必须放在最后)
  {
    path: '*',
    element: <NotFound />,
  },
]);
