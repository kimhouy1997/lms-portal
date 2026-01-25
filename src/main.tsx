import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n/config';
import App from './App.tsx';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AppThemeProvider } from './utils/providers/AppThemeProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppThemeProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </AppThemeProvider>
    </Provider>
  </StrictMode>
);
