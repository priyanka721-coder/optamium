import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MissionProvider } from './context/MissionContext.tsx';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MissionProvider>
        <App />
      </MissionProvider>
    </BrowserRouter>
  </StrictMode>
);
