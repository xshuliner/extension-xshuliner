import React from 'react';
import { createRoot } from 'react-dom/client';
import DevtoolsPanelApp from './App';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<DevtoolsPanelApp />);
}

