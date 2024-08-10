import { resolve } from 'node:path'
import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'
import { presetMaterialTheme } from './plugins/preset-material-theme'
import {
  type ComponentShortcuts,
  presetComponentShortcuts
} from './plugins/prest-component-shortcuts'

const shortcuts: ComponentShortcuts = {
  button: {
    '': 'flex items-center gap-x-2 rounded-full border-none bg-primary py-2 px-lg text-base text-on-primary transition-colors active:(bg-primary-60 shadow-none) hover:bg-primary-50 hover:shadow-shadow hover:shadow-sm',
    text: 'flex items-center gap-x-2 py-2 px-lg text-base transition-colors bg-transparent hover:bg-secondary-90/50  active:bg-secondary-80/50 text-secondary border-none rounded-full'
  },
  dialog: {
    backdrop: 'fixed inset-0 bg-scrim/50',
    positioner: 'absolute inset-0 flex justify-center items-center',
    content: 'rounded-3xl pa-xl bg-surface pa-lg',
    title: 'text-2xl text-on-surface font-bold',
    description: 'my-xs text-lg text-on-surface',
    'close-trigger':
      'mla flex items-center gap-x-2 rounded-full border-none bg-primary pa-xs text-lg text-on-primary transition-colors active:bg-primary-60 hover:bg-primary-50'
  },
  scrollbar: {
    slim: 'scrollbar:(w-1 h-1 bg-transparent) scrollbar-corner:bg-transparent scrollbar-thumb:(rounded bg-primary h-1 w-1)'
  }
}

export default defineConfig({
  content: {
    pipeline: {
      include: [/\.(tsx|css)($|\?)/]
    }
  },
  presets: [
    presetIcons({ extraProperties: { display: 'inline-block', 'vertical-align': 'middle' } }),
    presetUno(),
    presetMaterialTheme({ cssFilePath: resolve(__dirname, 'src/renderer/colors.css') }),
    presetComponentShortcuts({ prefix: 'ui-', shortcuts })
  ],
  rules: [
    [/^region-drag$/, () => ({ '-webkit-app-region': 'drag' })],
    [/^region-no-drag$/, () => ({ '-webkit-app-region': 'no-drag' })]
  ],
  safelist: [],
  shortcuts: [{}],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  variants: [
    (matcher) => {
      if (!matcher.startsWith('scrollbar:')) return matcher
      return {
        matcher: matcher.slice(10),
        selector: (s) => `${s}::-webkit-scrollbar`
      }
    },
    (matcher) => {
      if (!matcher.startsWith('scrollbar-thumb:')) return matcher
      return {
        matcher: matcher.slice(16),
        selector: (s) => `${s}::-webkit-scrollbar-thumb`
      }
    },
    (matcher) => {
      if (!matcher.startsWith('scrollbar-corner:')) return matcher
      return {
        matcher: matcher.slice(17),
        selector: (s) => `${s}::-webkit-scrollbar-corner`
      }
    }
  ]
})
