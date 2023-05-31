import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { useRouter } from 'vue-router'

import type { PageResponseData, ResponseData } from '@/types'

const LOCAL_STORAGE_TOKEN = 'access_token'

const router = useRouter()

const axiosConfig = {
  baseURL: import.meta.env.BASE_URL,
  timeout: 30000,
  withCredentials: true
}

enum ResponseStatusCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500
}

class Request {
  instance: AxiosInstance

  public constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      (req: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem(LOCAL_STORAGE_TOKEN)
        if (token) {
          req.headers.common.Authorization = `Bearer ${token}`
        }
        return req
      },
      (err: any) => Promise.reject(err)
    )

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return res
      },
      (err: AxiosError) => {
        const { response } = err
        if (response) {
          Request.handleCode(response.status)
        }
        if (!window.navigator.onLine) {
          console.error('网络连接失败')
          router.replace('/404')
        }
        Promise.reject(err)
      }
    )
  }

  static handleCode(code: number): void {
    switch (code) {
      case ResponseStatusCode.BAD_REQUEST:
        console.error('Bad Request')
        break
      case ResponseStatusCode.UNAUTHORIZED:
        localStorage.removeItem(LOCAL_STORAGE_TOKEN)
        router.replace('/login')
        break
      case ResponseStatusCode.FORBIDDEN:
        router.replace('/403')
        break
      case ResponseStatusCode.NOT_FOUND:
        router.replace('/404')
        break
      case ResponseStatusCode.CONFLICT:
        console.error('Conflict')
        break
      default:
        console.error('Internal Server Error')
    }
  }

  request(config: AxiosRequestConfig) {
    return this.instance.request(config)
  }

  get<T>(url: string, params?: Record<string, unknown>): Promise<ResponseData<T> | PageResponseData<T>> {
    return this.instance.get(url, { params })
  }

  post<T>(url: string, params?: Record<string, unknown>): Promise<ResponseData<T>> {
    return this.instance.post(url, params)
  }

  put<T>(url: string, params?: Record<string, unknown>): Promise<ResponseData<T>> {
    return this.instance.put(url, params)
  }

  delete<T>(url: string, params?: Record<string, unknown>): Promise<ResponseData<T>> {
    return this.instance.delete(url, { params })
  }
}

export default new Request(axiosConfig)
