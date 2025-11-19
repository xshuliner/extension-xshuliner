import GlobalManager from '@/src/common/kits/GlobalManager';
import '@/src/tailwind.css';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    // <React.StrictMode>
    <RouterProvider router={router} />
    // </React.StrictMode>
  );
}

GlobalManager.connectBackground({
  name: 'sidepanel',
});
