/* eslint-disable no-console */
import fs from 'node:fs'
import path from 'node:path'

import spawn from 'cross-spawn'
import degit from 'degit'
import { red, reset } from 'kolorist'
import minimist from 'minimist'
import prompts from 'prompts'

import { DEFAULT_TARGET_DIR, FRAMEWORKS, TEMPLATES } from './constants'
import type { Framework } from './types'
import {
  capitalizeFirstLetter,
  emptyDir,
  formatTargetDir,
  isEmptyDir,
  isValidPackageName,
  pkgFromUserAgent,
  toValidPackageName
} from './utils'

const argv = minimist<{
  t?: string
  template?: string
}>(process.argv.slice(2), { string: ['_'] })

const cwd = process.cwd()

async function init() {
  const argTargetDir = formatTargetDir(argv._[0])
  const argTemplate = argv.template ?? argv.t

  let targetDir = argTargetDir ?? DEFAULT_TARGET_DIR
  const getProjectName = () =>
    targetDir === '.' ? path.basename(path.resolve()) : targetDir

  let result: prompts.Answers<
    'projectName' | 'overwrite' | 'packageName' | 'framework' | 'template'
  >

  try {
    result = await prompts(
      [
        {
          type: argTargetDir ? null : 'text',
          name: 'projectName',
          message: reset('Project name:'),
          initial: DEFAULT_TARGET_DIR,
          onState: ({ value }) => {
            targetDir = formatTargetDir(value as string) ?? DEFAULT_TARGET_DIR
          }
        },
        {
          type: () =>
            !fs.existsSync(targetDir) || isEmptyDir(targetDir)
              ? null
              : 'confirm',
          name: 'overwrite',
          message: () =>
            `${
              targetDir === '.'
                ? 'Current directory'
                : `Target directory "${targetDir}"`
            } is not empty. Remove existing files and continue?`
        },
        {
          type: (_, { overwrite }: { overwrite?: boolean }) => {
            if (overwrite === false) {
              throw new Error(`${red('✖')} Operation cancelled`)
            }
            return null
          },
          name: 'overwriteChecker'
        },
        {
          type: () => (isValidPackageName(getProjectName()) ? null : 'text'),
          name: 'packageName',
          message: reset('Package name:'),
          initial: () => toValidPackageName(getProjectName()),
          validate: (dir: string) =>
            isValidPackageName(dir) || 'Invalid package.json name'
        },
        {
          type:
            argTemplate && TEMPLATES.includes(argTemplate) ? null : 'select',
          name: 'framework',
          message:
            typeof argTemplate === 'string' && !TEMPLATES.includes(argTemplate)
              ? reset(
                  `"${argTemplate}" isn't a valid template. Please choose from below: `
                )
              : reset('Select a framework:'),
          initial: 0,
          choices: FRAMEWORKS.map((framework) => ({
            title: framework.color(framework.display || framework.name),
            value: framework
          }))
        },
        {
          type: (framework: Framework) =>
            framework?.templates ? 'select' : null,
          name: 'template',
          message: reset('Select a template:'),
          choices: (framework: Framework) =>
            framework.templates.map((template) => ({
              title: template.color(template.display || template.name),
              value: template.name
            }))
        }
      ],
      {
        onCancel: () => {
          throw new Error(`${red('✖')} Operation cancelled`)
        }
      }
    )
  } catch (error) {
    console.log((error as Error).message)
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { framework, overwrite, packageName, template } = result

  const root = path.join(cwd, targetDir)

  if (overwrite) {
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true })
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const selectedTemplate: string = template || framework?.name || argTemplate

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm'
  const isYarnV1 = pkgManager === 'yarn' && pkgInfo?.version.startsWith('1.')

  const { customCommand } =
    FRAMEWORKS.flatMap((f) => f.templates).find(
      (v) => v.name === selectedTemplate
    ) ?? {}

  if (customCommand) {
    const fullCustomCommand = customCommand
      .replace(/^npm create /, () => {
        if (pkgManager === 'bun') {
          return 'bun x create-'
        }
        return `${pkgManager} create `
      })
      .replace('@latest', () => (isYarnV1 ? '' : '@latest'))
      .replace(/^npm exec/, () => {
        if (pkgManager === 'pnpm') {
          return 'pnpm dlx'
        }
        if (pkgManager === 'yarn' && !isYarnV1) {
          return 'yarn dlx'
        }
        if (pkgManager === 'bun') {
          return 'bun x'
        }
        return 'npm exec'
      })

    const [command, ...args] = fullCustomCommand.split(' ')
    const replacedArgs = args.map((arg) => arg.replace('TARGET_DIR', targetDir))
    const { status } = spawn.sync(command, replacedArgs, {
      stdio: 'inherit'
    })
    process.exit(status ?? 0)
  }

  console.log(`\nScaffolding project in ${root}...`)

  const emitter = degit(`https://github.com/recallwei/${selectedTemplate}`, {
    cache: false,
    force: true,
    verbose: true
  })

  try {
    await emitter.clone(root)
  } catch (err) {
    if (err instanceof Error) {
      console.log(`\n${red('✖')} ${capitalizeFirstLetter(err.message)}`)
    }
    console.log(
      `\n${red(
        '✖'
      )} Could not fetch remote https://github.com/recallwei/${selectedTemplate}`
    )
    process.exit(1)
  }

  const pkg = JSON.parse(
    fs.readFileSync(path.join(root, 'package.json'), 'utf-8')
  ) as Record<string, unknown>

  pkg.name = packageName || getProjectName()

  fs.writeFileSync(
    path.join(root, 'package.json'),
    `${JSON.stringify(pkg, null, 2)}\n`
  )

  const cdProjectName = path.relative(cwd, root)
  console.log('\nDone. Now run:\n')
  if (root !== cwd) {
    console.log(
      `  cd ${
        cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName
      }`
    )
  }
  switch (pkgManager) {
    case 'yarn':
      console.log('  yarn')
      console.log('  yarn dev')
      break
    default:
      console.log(`  ${pkgManager} install`)
      console.log(`  ${pkgManager} run dev`)
      break
  }
  console.log()
}

init().catch((e) => console.error((e as Error).message))
