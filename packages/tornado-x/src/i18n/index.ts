import fs from 'fs'
import path from 'path'

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

const LangList: Lang[] = ['en-US', 'zh-CN']

const translations: Record<Lang, Translation> = {
  'en-US': {},
  'zh-CN': {}
}

/**
 * 加载语言翻译文件
 */
const loadTranslations = (lang: Lang) => {
  const filePath = path.join(__dirname, `../locales/${lang}.json`)
  const fileContents = fs.readFileSync(filePath, 'utf8')

  translations[lang] = JSON.parse(fileContents) as Translation
}

/**
 * 加载所有语言翻译文件
 */
LangList.forEach((lang) => {
  loadTranslations(lang)
})

/**
 * 获取翻译
 */
const getTranslation = (
  translation: Translation,
  key: string
): string | undefined => {
  const parts = key.split('.')
  let current: string | Translation | undefined = translation

  parts.forEach((part) => {
    if (typeof current === 'object' && current !== null) {
      current = current[part]
    } else {
      current = undefined
    }
  })
  return typeof current === 'string' ? current : undefined
}

/**
 * 国际化翻译
 */
export const t = (key: MessageSchema) => {
  const translation = translations[currentLang]
  return getTranslation(translation, key)
}
