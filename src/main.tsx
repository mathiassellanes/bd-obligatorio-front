import './index.scss'

import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { BrowserRouter } from './utils/router'

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={BrowserRouter} />
)
