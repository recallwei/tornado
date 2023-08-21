type ColorFunc = (str: string | number) => string

export type Framework = {
  name: string
  display: string
  color: ColorFunc
  templates: FrameworkTemplate[]
}

type FrameworkTemplate = {
  name: string
  display: string
  color: ColorFunc
  customCommand?: string
}
