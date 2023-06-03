const fs = require('fs')
const os = require('os')

const file = fs.readFileSync('.cspell/custom-words.txt', 'utf8')

const words = file.split(os.EOL)

const sortedWords = [...new Set(words)].filter((w) => w).sort((a, b) => a.localeCompare(b))

const writeContent = sortedWords.join(os.EOL)

fs.writeFileSync('.cspell/custom-words.txt', writeContent)

console.log('Sort complete!')
