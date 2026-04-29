import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { BrandProvider } from './contexts/BrandContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BrandProvider>
          <App />
        </BrandProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
