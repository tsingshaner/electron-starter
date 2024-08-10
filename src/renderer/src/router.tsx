import { createHashRouter } from 'react-router-dom'
import DefaultLayout from './layouts/default'
import HomePage from './pages/home'

export const router: ReturnType<typeof createHashRouter> = createHashRouter([
  {
    path: '/',
    Component: DefaultLayout,
    children: [
      {
        path: '',
        Component: HomePage
      }
    ]
  }
])
