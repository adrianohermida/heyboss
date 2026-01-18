
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { AuthProvider } from './auth/supabaseAuth'
import App from './App'
import './index.css'
import { ThemeProvider } from '../styles/ThemeProvider';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found in index.html');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);

