/**
 * Config 模块导出
 */

// 导出类型
export type { Config, ConfigIndex, Section, ContentItem } from './types'

// 导出加载函数
export {
  loadAppConfig,
  loadIndex,
  loadRootContent,
  loadSection,
  loadAllSections,
  getSectionContent,
  contentItemsToMarkdown,
  clearCache
} from './loader'

