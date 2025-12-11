import { createRoot } from 'react-dom/client';
import { NewtabApp } from './App';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(<NewtabApp />);
}
