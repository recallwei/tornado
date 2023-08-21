import { blue, cyan, green, yellow } from 'kolorist'
import prompts from 'prompts'

type ColorFunc = (str: string | number) => string

type Framework = {
  name: string
  display: string
  color: ColorFunc
  variants: FrameworkVariant[]
}

const FRAMEWORKS: Framework[] = [
  {
    name: 'vue',
    display: 'Vue',
    color: green,
    variants: [
      {
        name: 'vue-ts',
        display: 'TypeScript',
        color: blue
      },
      {
        name: 'vue',
        display: 'JavaScript',
        color: yellow
      }
    ]
  },
  {
    name: 'react',
    display: 'React',
    color: cyan,
    variants: [
      {
        name: 'react-ts',
        display: 'TypeScript',
        color: blue
      },
      {
        name: 'react',
        display: 'JavaScript',
        color: yellow
      }
    ]
  }
]

type FrameworkVariant = {
  name: string
  display: string
  color: ColorFunc
  customCommand?: string
}

const enterProjectName = async () =>
  prompts({
    type: 'text',
    name: 'projectName',
    message: 'Project Name:'
  })

const enterSelectFramework = async () =>
  prompts({
    type: 'select',
    name: 'framework',
    message: 'Select Framework:',
    choices: FRAMEWORKS.map((framework) => {
      const frameworkColor = framework.color
      return {
        title: frameworkColor(framework.display || framework.name),
        value: framework
      }
    })
  })

await enterProjectName()
await enterSelectFramework()
