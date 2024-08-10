import type { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

import AppHeader from '../components/AppHeader'

const DefaultLayout = (): ReactElement => {
  return (
    <div className="h-100vh w-100vw flex flex-col overflow-hidden border-2 border-outline-variant rounded-md border-solid bg-background">
      <AppHeader className="h-7 w-full bg-surface-1 region-drag" />
      <div className="ma-lg flex-1 overflow-hidden rounded-md bg-surface-1">
        <div className="h-full overflow-auto ui-scrollbar-slim">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
