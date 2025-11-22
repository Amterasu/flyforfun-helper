export type DocNode = {
  id: string
  title: string
  description?: string
  children?: DocNode[]
}

export type MainNav = '首页' | '社区' | '飞飞百科' | '助手' | '新闻' | '代练'

