import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import { ThemeProvider } from '@mui/system';
import muiCustomTheme from './muiCustomTheme.ts';
import './index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={muiCustomTheme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
