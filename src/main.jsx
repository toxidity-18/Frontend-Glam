import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { FetchProvider } from "@/hooks/FetchContext";
import { GlobalProvider } from "@/hooks/GlobalContext"; 

import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <FetchProvider>
        <GlobalProvider> 
          <App />
        </GlobalProvider>
      </FetchProvider>
    </BrowserRouter>
  </StrictMode>,
);
