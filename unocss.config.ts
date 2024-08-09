import { resolve } from 'node:path'
import { defineConfig, presetIcons, presetUno, transformerDirectives } from 'unocss'
import { materialColorPreset } from './plugins/uno-material-color'

const { colors, preflight } = materialColorPreset(resolve(__dirname, 'src/renderer/colors.css'))

export default defineConfig({
  content: {
    pipeline: {
      include: [/\.(tsx)($|\?)/]
    }
  },
  theme: {
    colors
  },
  presets: [
    presetIcons({ extraProperties: { display: 'inline-block', 'vertical-align': 'middle' } }),
    presetUno()
  ],
  preflights: [preflight],
  safelist: [],
  shortcuts: {},
  transformers: [transformerDirectives()],
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
    }
  ]
})
