import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as TRPCProvider } from './services/trpc.tsx'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TRPCProvider>
      <App />
    </TRPCProvider>
  </React.StrictMode>,
)
