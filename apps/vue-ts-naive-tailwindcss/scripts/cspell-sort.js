const fs = require('node:fs')
const os = require('node:os')
const { stdout } = require('node:process')

const file = fs.readFileSync('.cspell/custom-words.txt', 'utf8')

const words = file.replace(/\r/g, '').split('\n')

const sortedWords = [...new Set(words)]
  .filter((w) => w)
  .sort((a, b) => a.localeCompare(b))

const writeContent = sortedWords.join(os.EOL)

fs.writeFileSync('.cspell/custom-words.txt', writeContent)

stdout.write('Sort complete!')
