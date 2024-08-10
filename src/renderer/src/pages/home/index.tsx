import { ipcPing } from '#ipc/ping'
import Versions from './Versions'

const HomePage = () => {
  const handlePing = ipcPing

  return (
    <main className="pa-xs">
      <header className="mt-4xl flex justify-center gap-x-lg">
        <div className="rounded-full bg-surface-variant/50 pa-6">
          <i className="i-logos-electron text-7xl" />
        </div>
        <div className="rounded-full bg-surface-variant/50 pa-6">
          <i className="i-logos-vitejs text-7xl" />
        </div>
      </header>
      <section>
        <h1 className="text-center text-3xl text-primary">Welcome to your Electron application</h1>
        <p className="text-center text-lg text-on-surface underline decoration-outline underline-offset-4 decoration-dashed">
          This is a minimal Electron application that uses Vite, React, and Unocss.
        </p>
      </section>
      <section className="flex justify-center gap-x-lg">
        <a
          className="inline-block decoration-none ui-button"
          href="https://electron-vite.org/"
          target="_blank"
          rel="noreferrer"
        >
          Docs
        </a>
        <button className="ui-button" type="button" onClick={handlePing}>
          Ping
        </button>
      </section>
      <footer className="mx-auto w-full">
        <Versions />
      </footer>
    </main>
  )
}

export default HomePage
