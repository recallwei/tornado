import path from 'path'

import en_US from '../locales/en-US.json'
import zh_CN from '../locales/zh-CN.json'
import type { Config, Lang, MessageSchema, Translation } from '../types'

let config: Config | null = null

// TODO: 优化配置文件的读取方式
try {
  // eslint-disable-next-line global-require, import/no-dynamic-require, @typescript-eslint/no-var-requires
  config = require(path.resolve('tornado-x.config.js')) as Config
} catch {
  config = null
}

const currentLang = config?.lang ?? 'en-US'

const translations: Record<Lang, Translation> = {
  'en-US': {},
  'zh-CN': {}
}

/**
 * 加载所有语言翻译文件
 */
translations['en-US'] = en_US
translations['zh-CN'] = zh_CN

/**
 * 获取翻译
 */
const getTranslation = (translation: Translation, key: string): string => {
  const parts = key.split('.')
  let current: string | Translation | undefined = translation

  parts.forEach((part) => {
    if (typeof current === 'object' && current !== null) {
      current = current[part]
    } else {
      current = undefined
    }
  })
  return typeof current === 'string' ? current : ''
}

/**
 * 国际化翻译
 */
export const t = (key: MessageSchema) => {
  const translation = translations[currentLang]
  return getTranslation(translation, key)
}
