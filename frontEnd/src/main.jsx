import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

// React Query Setup
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./app/queryClient";



createRoot(document.getElementById('root')).render(
  <CookiesProvider>
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
  </CookiesProvider>
)
