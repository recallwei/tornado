import fs from 'node:fs'
import path from 'node:path'

export const formatTargetDir = (targetDir?: string) =>
  targetDir?.trim().replace(/\/+$/g, '')

export function isEmptyDir(dirPath: string) {
  const files = fs.readdirSync(dirPath)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

export function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return
  }
  fs.readdirSync(dir).forEach((file) => {
    if (file === '.git') {
      return
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true })
  })
}

export const isValidPackageName = (projectName: string) =>
  /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(projectName)

export const toValidPackageName = (projectName: string) =>
  projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\d\-~]+/g, '-')

export function pkgFromUserAgent(userAgent: string | undefined) {
  if (!userAgent) return undefined
  const pkgSpec = userAgent.split(' ')[0]
  const pkgSpecArr = pkgSpec.split('/')
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1]
  }
}

export function copy(src: string, dest: string) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

export function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true })
  fs.readdirSync(srcDir).forEach((file) => {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  })
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
