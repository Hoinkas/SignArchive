import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/main.css'
import App from './App.tsx'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
