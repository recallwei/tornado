export const GlobalEnvConfig = Object.freeze({
  API_PORT: import.meta.env.VITE_PORT ?? 5173,
  BASE_API_PREFIX: '/base-api',
  MODE: import.meta.env.MODE,
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD
})
