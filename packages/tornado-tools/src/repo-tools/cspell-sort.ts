import fs from 'node:fs'
import os from 'node:os'
import { promisify } from 'node:util'

import { bgBlue, lightGreen, red } from 'kolorist'

import { TORNADO_TOOLS } from '../constants'

/**
 * 根据字母 a-z 顺序对 /.cspell/custom-words 中的单词进行排序
 */

// 获取路径参数
let [pathArg] = process.argv.slice(2)

// 拼接 .txt 后缀
if (pathArg && !pathArg.endsWith('.txt')) {
  pathArg += '.txt'
}

// 默认文件为 .cspell.txt
const CSPELL_FILE_PATH = pathArg || '.cspell.txt'

let file = null
// 读取文件内容
try {
  file = await promisify(fs.readFile)(CSPELL_FILE_PATH, 'utf-8')
} catch {
  process.stdout.write(
    `${bgBlue(TORNADO_TOOLS)} ${red(`Cannot find path: ${CSPELL_FILE_PATH}`)}\n`
  )
  process.exit(1)
}

// 按行分割
const words = file.replace(/\r/g, '').split('\n')

// 去重、过滤、排序
const sortedWords = [...new Set(words)]
  .filter((w) => w)
  .sort((a, b) => a.localeCompare(b))

// 按行合并
const writeContent = sortedWords.join(os.EOL)

// 写入文件
fs.writeFileSync(CSPELL_FILE_PATH, writeContent)

process.stdout.write(
  `${bgBlue(TORNADO_TOOLS)} ${lightGreen(
    'The dictionary is sorted successfully according to A-Z!'
  )}\n`
)
