/**
 * 配置文件类型定义
 */

// 列表项类型（用于 list 类型的 items 数组）
export type ListItem = {
  content: string
  content_zh?: string
  translatedContent?: string
  indent: number
}

// 配置文件内容项类型
export type ContentItem = {
  type: 'text' | 'paragraph' | 'list' | 'blockquote' | 'table' | 'code_block' | 'html' | 'gallery'
  line?: number
  content?: string
  content_zh?: string
  translatedContent?: string
  trimmed?: string
  text?: string
  links?: Array<{ text: string; url: string }>
  images?: Array<{ alt: string; src: string }>
  items?: Array<ListItem | ContentItem>
  quotes?: string[]
  content_cn?: string[]
  table?: {
    headers: string[]
    rows: string[][]
  }
  translatedTable?: {
    headers: string[]
    rows: string[][]
  }
  language?: string
  code?: string
  html?: string
  translatedHtml?: string
  gallery?: {
    folder?: string
    images?: Array<{ src: string; alt?: string }>
  }
}

// 章节类型
export type Section = {
  title: string
  translatedTitle?: string
  title_zh?: string
  content: ContentItem[]
  subsections?: Record<string, Section>
}

// 配置类型
export type Config = {
  title: string
  banner: string
  warnings: Array<{
    type: 'IMPORTANT' | 'CAUTION' | 'NOTE'
    message: string
  }>
  copyright: string
  metadata: {
    sourceFile: string
    totalLines: number
    conversionType: string
  }
}

// 索引类型
export type ConfigIndex = {
  title: string
  config: string
  rootContent?: string
  sections: Record<string, string>
}

