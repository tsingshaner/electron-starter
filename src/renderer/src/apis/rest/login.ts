import { fetch } from './fetcher'

export function ApiLogin(payload: {
  username: string
  password: string
}) {
  return fetch<{ code: string }>('/login', {
    method: 'POST',
    body: payload
  })
}
