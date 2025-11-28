export type DocNode = {
  id: string
  title: string
  description?: string
  children?: DocNode[]
}

export type MainNav = '首页' | '社区' | '飞飞百科' | '副本' | '助手' | '代练' | '新版本' | '会战'

