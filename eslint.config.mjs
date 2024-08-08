import eslint from '@eslint/js'
import reactLint from 'eslint-plugin-react'
import tslint from 'typescript-eslint'

export default [
  { ignores: ['node_modules', 'dist', 'out', '.gitignore'] },
  ...tslint.config(
    eslint.configs.recommended,
    ...tslint.configs.recommended,
    {
      files: ['**/*.{ts,tsx}'],
      ...reactLint.configs.flat.recommended,
      ...reactLint.configs.flat['jsx-runtime']
    },
    {
      files: ['**/*.d.ts'],
      rules: { 'no-var': 'off' }
    },
    {
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            varsIgnorePattern: '^_',
            argsIgnorePattern: '^_'
          }
        ]
      }
    }
  )
]
