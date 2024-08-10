import { type StaticShortcutMap, definePreset } from 'unocss'

export type Shortcuts = Record<string, string>
export type NestingShortcuts = Record<string, string | Shortcuts>
type Component = string
export type ComponentShortcuts = Record<Component, NestingShortcuts>

export const presetComponentShortcuts = definePreset<
  {
    prefix?: string
    shortcuts: ComponentShortcuts
  },
  object
>(({ prefix, shortcuts } = { prefix: undefined, shortcuts: {} }) => {
  const userShortcuts = (Reflect.ownKeys(shortcuts) as string[]).map((component) =>
    resolveShortcuts(component, shortcuts[component])
  )

  const tokens = userShortcuts.flatMap((item) => Reflect.ownKeys(item) as string[])

  return {
    name: 'components-shortcuts',
    layer: 'components',
    prefix,
    shortcuts: userShortcuts,
    autocomplete: {
      templates: [`${prefix}<tokens>`],
      shorthands: {
        tokens
      }
    }
  }
})

function resolveShortcuts(component: Component, shortcuts: NestingShortcuts): StaticShortcutMap {
  const result: Shortcuts = {}
  const pre = `${component}`

  for (const key in shortcuts) {
    const value = shortcuts[key]
    if (typeof value === 'string') {
      result[key === '' ? pre : `${pre}-${key}`] = value
    } else {
      Object.assign(result, resolveShortcuts(`${pre}-${key}`, value))
    }
  }

  return result
}
