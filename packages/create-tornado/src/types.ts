type ColorFunc = (str: string | number) => string

export interface Framework {
  name: string
  display: string
  color: ColorFunc
  templates: FrameworkTemplate[]
}

interface FrameworkTemplate {
  name: string
  display: string
  color: ColorFunc
  customCommand?: string
}
