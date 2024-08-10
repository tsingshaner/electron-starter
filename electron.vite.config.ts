import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import unocss from 'unocss/vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        output: {
          format: 'cjs'
        }
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        output: {
          format: 'cjs'
        }
      }
    }
  },
  renderer: {
    css: { transformer: 'lightningcss' },
    envDir: resolve('src/renderer'),
    plugins: [unocss(resolve('unocss.config.ts')), react()],
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '#ui': resolve('src/renderer/src/components/ui'),
        '#ipc': resolve('src/renderer/src/apis/ipc'),
        '#rest': resolve('src/renderer/src/apis/rest')
      }
    }
  }
})
