import { apiPost } from './client'

export const authApi = {
  login: (user: string, password: string): Promise<{ token: string }> =>
    apiPost<{ user: string; password: string }, { token: string }>('/auth/login', {
      user,
      password
    }).then((r) => r.data)
}
