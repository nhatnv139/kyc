//@ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@aws-amplify/ui-react';
import App from './app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
