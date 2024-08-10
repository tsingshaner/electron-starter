import { Headers, createFetchError, ofetch } from 'ofetch'
import type { $Fetch, FetchContext, FetchResponse } from 'ofetch'

export const fetch: $Fetch = ofetch.create({
  timeout: 60_000,
  baseURL: import.meta.env.VITE_API_BASE_URL,
  onRequest(context) {
    context.options.headers = new Headers({
      ...context.options.headers,
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    })
  }
})

export type FetchResponseContext<T = unknown> = FetchContext<
  T,
  'blob' | 'text' | 'json' | 'arrayBuffer' | 'stream'
> &
  Record<
    'response',
    FetchResponse<'basic' | 'cors' | 'default' | 'error' | 'opaque' | 'opaqueredirect'>
  >

export function defaultOnResponse() {
  return async (context: FetchResponseContext) => {
    const { response, options } = context
    if (!response.ok) {
      context.error = createFetchError(context)
    }

    if (import.meta.env.DEV) {
      const statusColor = response.ok ? '#6FBF88' : response.status < 500 ? '#F29C45' : '#F56C6C'
      console.groupCollapsed(
        `%c${response.status}%c${response.type === 'cors' ? 'CORS' : 'MOCK'}%c${
          options?.method ?? 'GET'
        } ${response.url.slice(import.meta.env.VITE_API_BASE_URL.length)}`,
        `color: #fff;font-weight: bold;background-color: ${statusColor};padding-inline: 4px;`,
        'color: #fff;font-weight: bold;background-color: #409EFF;padding-inline: 4px;',
        'color: #409EFF;font-weight: bold;background-color: #E6F7FF;padding-inline: 4px;'
      )
      console.log(response._data, options, response)
      console.groupEnd()
    }
  }
}
