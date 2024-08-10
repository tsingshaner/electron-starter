import type { HTMLAttributes, ReactElement } from 'react'

const AppHeaderActions = () => {
  return (
    <>
      <button
        className="rounded-full border-none bg-transparent pa-0 transition-colors region-no-drag hover:bg-secondary/20"
        type="button"
      >
        <i className="i-ic-baseline-minimize text-xl text-secondary" />
      </button>
      <button
        className="rounded-full border-none bg-transparent pa-0 transition-colors region-no-drag hover:(bg-secondary/20)"
        type="button"
      >
        <i className="i-ic-outline-fullscreen text-xl text-secondary" />
      </button>
      <button
        className="rounded-full border-none bg-transparent pa-0 transition-colors region-no-drag hover:bg-error-60/80 hover:[&>i]:text-white"
        type="button"
      >
        <i className="i-ic-round-close text-xl text-secondary" />
      </button>
    </>
  )
}

export const AppHeader = (props: HTMLAttributes<HTMLDivElement>): ReactElement => {
  return (
    <header {...props}>
      <div className="mx-1 h-full flex items-center justify-between">
        <div className="flex items-center gap-x-1">
          <i className="i-ic-baseline-tungsten text-2xl text-primary" />
        </div>
        <div className="h-full flex items-center gap-x-1">
          <AppHeaderActions />
        </div>
      </div>
    </header>
  )
}

export default AppHeader
