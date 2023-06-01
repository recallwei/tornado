import { BasePageModel } from '@/constants'

import Request from './axios'

type UserResponse = {
  id: number
  uuid: string
  username: string
  email: string | null
}

export const UserApi = {
  getUsers: () => Request.get<UserResponse>('/users', new BasePageModel()),
  getUser: (id: number) => Request.get<UserResponse>(`/users/${id}`)
}
