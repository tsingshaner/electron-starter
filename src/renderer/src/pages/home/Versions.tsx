import { type ReactElement, useState } from 'react'

function Versions(): ReactElement {
  const [versions] = useState(window.electron.process.versions)

  return (
    <ul className="flex list-none items-center justify-around gap-xs text-base text-secondary font-bold">
      <li className="flex flex-col items-center gap-xs">
        <i className="i-logos-electron text-2xl" /> v{versions.electron}
      </li>
      <li className="flex flex-col items-center gap-xs">
        <i className="i-logos-chrome text-2xl" /> v{versions.chrome}
      </li>
      <li className="flex flex-col items-center gap-xs">
        <i className="i-logos-nodejs-icon-alt text-2xl" /> v{versions.node}
      </li>
    </ul>
  )
}

export default Versions
