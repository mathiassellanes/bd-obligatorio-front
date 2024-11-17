import './index.scss'

import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { BrowserRouter } from './utils/router'
import { ModalProvider } from './utils/ModalContext'

createRoot(document.getElementById('root')!).render(
  <ModalProvider>
    <RouterProvider router={BrowserRouter} />
  </ModalProvider>
)
