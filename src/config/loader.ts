/**
 * 从 config 文件夹加载数据的工具函数
 */

import type { Config, ConfigIndex, Section, ContentItem } from './types'

// 缓存已加载的配置
const configCache = new Map<string, unknown>()

/**
 * 加载配置文件
 */
async function loadConfig<T>(path: string): Promise<T> {
  // 检查缓存
  if (configCache.has(path)) {
    return configCache.get(path) as T
  }

  try {
    // 在 Vite 中，使用动态 import 加载 JSON
    const module = await import(path)
    const data = module.default || module
    configCache.set(path, data)
    return data as T
  } catch (error) {
    console.error(`Failed to load config from ${path}:`, error)
    throw error
  }
}

/**
 * 加载基本配置
 */
export async function loadAppConfig(): Promise<Config> {
  return loadConfig<Config>('./config.json')
}

/**
 * 加载索引文件
 */
export async function loadIndex(): Promise<ConfigIndex> {
  return loadConfig<ConfigIndex>('./index.json')
}

/**
 * 加载根内容
 */
export async function loadRootContent(): Promise<ContentItem[]> {
  return loadConfig<ContentItem[]>('./root-content.json')
}

/**
 * 加载指定章节
 */
export async function loadSection(sectionId: string): Promise<Section | null> {
  const index = await loadIndex()
  const sectionPath = index.sections[sectionId]
  
  if (!sectionPath) {
    console.warn(`Section ${sectionId} not found in index`)
    return null
  }

  try {
    const section = await loadConfig<Section>(sectionPath)
    return section
  } catch (error) {
    console.error(`Failed to load section ${sectionId}:`, error)
    return null
  }
}

/**
 * 加载所有章节
 */
export async function loadAllSections(): Promise<Record<string, Section>> {
  const index = await loadIndex()
  const sections: Record<string, Section> = {}

  for (const [sectionId, sectionPath] of Object.entries(index.sections)) {
    try {
      const section = await loadConfig<Section>(sectionPath)
      sections[sectionId] = section
    } catch (error) {
      console.error(`Failed to load section ${sectionId}:`, error)
    }
  }

  return sections
}

/**
 * 根据章节 ID 获取章节内容（支持子章节）
 */
export async function getSectionContent(
  sectionId: string,
  subsectionId?: string,
  subSubsectionId?: string
): Promise<ContentItem[] | null> {
  const section = await loadSection(sectionId)
  if (!section) return null

  // 如果指定了子子章节
  if (subSubsectionId && subsectionId) {
    const subsection = section.subsections?.[subsectionId]
    const subSubsection = subsection?.subsections?.[subSubsectionId]
    return subSubsection?.content || null
  }

  // 如果指定了子章节
  if (subsectionId) {
    const subsection = section.subsections?.[subsectionId]
    return subsection?.content || null
  }

  // 返回主章节内容
  return section.content || null
}

/**
 * 将内容项数组转换为 Markdown 字符串
 */
export function contentItemsToMarkdown(items: ContentItem[]): string {
  return items
    .map((item) => {
      switch (item.type) {
        case 'text':
        case 'paragraph':
          return item.content || item.text || item.trimmed || ''
        case 'list':
          return (
            item.items
              ?.map((listItem) => {
                const indent = '  '.repeat(listItem.indent || 0)
                return `${indent}- ${listItem.content || listItem.original || ''}`
              })
              .join('\n') || ''
          )
        case 'blockquote':
          return (
            item.quotes?.map((quote) => `> ${quote}`).join('\n') || ''
          )
        case 'table':
          if (!item.table) return ''
          const headers = `| ${item.table.headers.join(' | ')} |`
          const separator = `| ${item.table.headers.map(() => '---').join(' | ')} |`
          const rows =
            item.table.rows
              ?.map((row) => `| ${row.join(' | ')} |`)
              .join('\n') || ''
          return `${headers}\n${separator}\n${rows}`
        case 'code_block':
          const lang = item.language || ''
          return `\`\`\`${lang}\n${item.code || ''}\n\`\`\``
        case 'html':
          return item.html || ''
        default:
          return ''
      }
    })
    .filter((line) => line.trim().length > 0)
    .join('\n\n')
}

/**
 * 清除缓存
 */
export function clearCache(): void {
  configCache.clear()
}

