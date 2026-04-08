import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import WordProvider from '@contexts/WordContext/WordProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WordProvider>
      <App />
    </WordProvider>
  </StrictMode>
)
