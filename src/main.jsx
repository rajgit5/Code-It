import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ThemeProvider from './components/contextAPI/ThemeContext.jsx'
import CookieProvider from './components/contextAPI/cookieContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <ThemeProvider>
    <CookieProvider>
    <App />
    </CookieProvider>
    </ThemeProvider>
  // </StrictMode>,
)
