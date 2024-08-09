/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
}

// biome-ignore lint/correctness/noUnusedVariables: This is a global type
interface ImportMeta {
  readonly env: ImportMetaEnv
}
