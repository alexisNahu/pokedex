import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import AppContext from './AppContext.tsx'
import './App.css'
import './scss/Custom.css'
import 'bootstrap-icons/font/bootstrap-icons.css';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContext>
      <App />
    </AppContext>
  </StrictMode>,
)

