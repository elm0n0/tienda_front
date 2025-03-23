import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css';
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './store/auth/index.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
