import React from 'react'
import ReactDOM from 'react-dom/client'
import { TRPCProvider } from './services/trpc.tsx'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './services/auth.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <TRPCProvider>
        <App />
      </TRPCProvider>
    </AuthProvider>
  </React.StrictMode>,
)
