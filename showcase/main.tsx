import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Knihovna se importuje stejně jako v aplikaci: jeden CSS agregátor a komponenty
// z veřejného vstupu. Uvnitř repa jde o relativní cestu, v aplikaci je to
// `@indracorp/darkglass/styles.css` a `@indracorp/darkglass`.
import '../src/styles.css'
import './showcase.css'
import { App } from './App'

const host = document.getElementById('root')
if (!host) throw new Error('V index.html chybí #root')

createRoot(host).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
