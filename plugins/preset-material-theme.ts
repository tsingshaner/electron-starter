import { readFileSync } from 'node:fs'
import { definePreset } from 'unocss'

type ColorToken = {
  prefix: string
  name: string
  color: string
}

export interface Options {
  cssFilePath: string
}

export const presetMaterialTheme = definePreset<Options, object>((opts) => {
  if (!opts?.cssFilePath) {
    throw new Error('cssFilePath is required')
  }

  const { colors, preflight } = materialColorPreset(opts.cssFilePath)
  return {
    name: 'material-theme',
    enforce: 'pre',
    layer: 'utilities',
    theme: {
      name: 'material-theme',
      colors
    },
    preflights: [preflight]
  }
})

function materialColorPreset(colorCSSPath: string) {
  const css = readFileSync(colorCSSPath, 'utf-8')
  const colorMap = {}
  const colorRegex = /(--md-\w+-\w+)-(.*):\s#(.*);/
  const preflightCSS = css
    .split('\n')
    .map((line) => {
      if (!line.startsWith('  --md-')) {
        return line
      }

      const match = colorRegex.exec(line)
      if (match === null) {
        return undefined
      }

      const [, prefix, name, color] = match
      const token: ColorToken = {
        prefix,
        name,
        color: hexToRGB(color)
      }

      colorMap[name] = `rgb(var(--c-${name}))`

      return transformCSS(token)
    })
    .filter((line) => line !== undefined)
    .join('\n')

  return {
    colors: colorMap,
    preflight: {
      layers: 'preflights',
      getCSS: () => preflightCSS
    }
  }
}

function hexToRGB(color: string): string {
  const r = Number.parseInt(color.substring(0, 2), 16)
  const g = Number.parseInt(color.substring(2, 4), 16)
  const b = Number.parseInt(color.substring(4, 6), 16)
  return `${r} ${g} ${b}`
}

function transformCSS(token: ColorToken): string {
  return `  --c-${token.name}: ${token.color};`
}
