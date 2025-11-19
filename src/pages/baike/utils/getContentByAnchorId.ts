/**
 * 根据 anchorId 获取对应的 ContentItem 数组
 * 用于从 JSON 配置中查找内容
 */

import { getSectionContent, getSection } from '../../../utils/configData'
import type { ContentItem } from '../../../config/types'

/**
 * 根据锚点 ID 获取内容项数组
 * @param anchorId 锚点 ID
 * @param titleMap 可选的标题映射表，用于从 node id 获取中文标题
 */
export function getContentItemsByAnchorId(anchorId: string, titleMap?: Record<string, string>): ContentItem[] | null {
  // 清理锚点 ID
  const cleanId = anchorId.replace(/^-+/, '').replace(/^️-/, '').toLowerCase()

  // 首先尝试直接匹配章节（主章节）
  const section = getSection(cleanId)
  if (section && section.content && section.content.length > 0) {
    return section.content
  }

  // 如果没找到，在所有章节中搜索子章节和子子章节
  const sectionMap: Record<string, any> = {
    'community': getSection('community'),
    'system': getSection('system'),
    'formula': getSection('formula'),
    'upgrade': getSection('upgrade'),
    'pet': getSection('pet'),
    'dungeons': getSection('dungeons'),
    'housing': getSection('housing')
  }

  /**
   * 将标题转换为锚点 ID（用于匹配）
   * 移除 emoji、特殊字符，将空格转换为连字符，并清理前后的连字符
   */
  function titleToAnchorId(title: string): string {
    return title
      .toLowerCase()
      // 只保留字母、数字、中文和空格，移除所有其他字符（包括 emoji 和特殊字符）
      .replace(/[^a-z0-9\u4e00-\u9fa5\s]/g, '')
      // 将多个连续空格替换为单个空格
      .replace(/\s+/g, ' ')
      // 移除首尾空格
      .trim()
      // 空格替换为连字符
      .replace(/\s/g, '-')
      // 移除首尾连字符（防止边缘情况）
      .replace(/^-+|-+$/g, '')
  }

  // 第一轮：只搜索精确匹配
  for (const [sectionKey, section] of Object.entries(sectionMap)) {
    if (!section?.subsections) continue

    for (const [subsectionKey, subsection] of Object.entries(section.subsections)) {
      // 使用标题转换函数，而不是直接处理 key
      const subsectionTitleEn = (subsection as any).title || subsectionKey
      const subsectionTitleZh = (subsection as any).translatedTitle || (subsection as any).title_zh || (subsection as any).title_cn || ''
      const subsectionIdEn = titleToAnchorId(subsectionTitleEn)
      const subsectionIdZh = subsectionTitleZh ? titleToAnchorId(subsectionTitleZh) : ''

      // 精确匹配一级子章节
      if ((subsectionIdEn === cleanId || subsectionIdZh === cleanId)) {
        const result: ContentItem[] = []
        
        // 添加父模块的内容
        if ((subsection as any).content && Array.isArray((subsection as any).content)) {
          result.push(...(subsection as any).content)
        }
        
        // 如果有子模块，合并所有子模块的内容，并为每个子模块添加标题
        if ((subsection as any).subsections) {
          for (const [subSubsectionKey, subSubsection] of Object.entries((subsection as any).subsections)) {
            if ((subSubsection as any).content && Array.isArray((subSubsection as any).content)) {
              // 获取子模块的标题（优先使用 titleMap 中的中文标题，然后是 JSON 中的中文标题，最后是英文标题）
              // 首先尝试从 titleMap 中获取（基于 subSubsectionKey，需要转换为与 constants 中 id 匹配的格式）
              // 将 JSON key（如 "madrigal minimum level limit"）转换为 id 格式（如 "madrigal-minimum-level-limit"）
              const normalizedKey = subSubsectionKey.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
              let subSubsectionTitle = titleMap?.[normalizedKey] || 
                                      titleMap?.[subSubsectionKey] ||
                                      (subSubsection as any).translatedTitle || 
                                      (subSubsection as any).title_zh || 
                                      (subSubsection as any).title_cn || 
                                      (subSubsection as any).title || 
                                      subSubsectionKey
              
              // 添加标题作为 HTML 类型的 ContentItem
              if (subSubsectionTitle) {
                result.push({
                  type: 'html',
                  html: `<h2>${subSubsectionTitle}</h2>`
                } as ContentItem)
              }
              
              // 添加子模块的内容
              result.push(...(subSubsection as any).content)
            }
          }
        }
        
        if (result.length > 0) {
          return result
        }
      }

      // 精确匹配二级子章节
      if ((subsection as any).subsections) {
        for (const [subSubsectionKey, subSubsection] of Object.entries((subsection as any).subsections)) {
          const subSubsectionTitleEn = (subSubsection as any).title || subSubsectionKey
          const subSubsectionTitleZh = (subSubsection as any).translatedTitle || (subSubsection as any).title_zh || (subSubsection as any).title_cn || ''
          const subSubsectionIdEn = titleToAnchorId(subSubsectionTitleEn)
          const subSubsectionIdZh = subSubsectionTitleZh ? titleToAnchorId(subSubsectionTitleZh) : ''

          if ((subSubsectionIdEn === cleanId || subSubsectionIdZh === cleanId) && 
              (subSubsection as any).content && (subSubsection as any).content.length > 0) {
            return (subSubsection as any).content
          }
        }
      }
    }
  }

  // 第二轮：包含匹配
  let bestMatch: ContentItem[] | null = null

  for (const [sectionKey, section] of Object.entries(sectionMap)) {
    if (!section?.subsections) continue

    for (const [subsectionKey, subsection] of Object.entries(section.subsections)) {
      const subsectionTitleEn = (subsection as any).title || subsectionKey
      const subsectionTitleZh = (subsection as any).translatedTitle || (subsection as any).title_zh || (subsection as any).title_cn || ''
      const subsectionIdEn = titleToAnchorId(subsectionTitleEn)
      const subsectionIdZh = subsectionTitleZh ? titleToAnchorId(subsectionTitleZh) : ''

      // 包含匹配的二级子章节
      if ((subsection as any).subsections) {
        for (const [subSubsectionKey, subSubsection] of Object.entries((subsection as any).subsections)) {
          const subSubsectionTitleEn = (subSubsection as any).title || subSubsectionKey
          const subSubsectionTitleZh = (subSubsection as any).translatedTitle || (subSubsection as any).title_zh || (subSubsection as any).title_cn || ''
          const subSubsectionIdEn = titleToAnchorId(subSubsectionTitleEn)
          const subSubsectionIdZh = subSubsectionTitleZh ? titleToAnchorId(subSubsectionTitleZh) : ''

          if ((subSubsectionIdEn.includes(cleanId) || cleanId.includes(subSubsectionIdEn) ||
               subSubsectionIdZh.includes(cleanId) || cleanId.includes(subSubsectionIdZh)) &&
              (subSubsection as any).content && (subSubsection as any).content.length > 0) {
            if (!bestMatch) {
              bestMatch = (subSubsection as any).content
            }
          }
        }
      }

      // 包含匹配的一级子章节
      if ((subsectionIdEn.includes(cleanId) || cleanId.includes(subsectionIdEn) ||
           subsectionIdZh.includes(cleanId) || cleanId.includes(subsectionIdZh))) {
        if (!bestMatch) {
          const result: ContentItem[] = []
          
          // 添加父模块的内容
          if ((subsection as any).content && Array.isArray((subsection as any).content)) {
            result.push(...(subsection as any).content)
          }
          
          // 如果有子模块，合并所有子模块的内容，并为每个子模块添加标题
          if ((subsection as any).subsections) {
            for (const [subSubsectionKey, subSubsection] of Object.entries((subsection as any).subsections)) {
              if ((subSubsection as any).content && Array.isArray((subSubsection as any).content)) {
                // 获取子模块的标题（优先使用 titleMap 中的中文标题，然后是 JSON 中的中文标题，最后是英文标题）
                // 首先尝试从 titleMap 中获取（基于 subSubsectionKey，需要转换为与 constants 中 id 匹配的格式）
                // 将 JSON key（如 "madrigal minimum level limit"）转换为 id 格式（如 "madrigal-minimum-level-limit"）
                const normalizedKey = subSubsectionKey.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
                let subSubsectionTitle = titleMap?.[normalizedKey] || 
                                        titleMap?.[subSubsectionKey] ||
                                        (subSubsection as any).translatedTitle || 
                                        (subSubsection as any).title_zh || 
                                        (subSubsection as any).title_cn || 
                                        (subSubsection as any).title || 
                                        subSubsectionKey
                
                // 添加标题作为 HTML 类型的 ContentItem
                if (subSubsectionTitle) {
                  result.push({
                    type: 'html',
                    html: `<h2>${subSubsectionTitle}</h2>`
                  } as ContentItem)
                }
                
                // 添加子模块的内容
                result.push(...(subSubsection as any).content)
              }
            }
          }
          
          if (result.length > 0) {
            bestMatch = result
          }
        }
      }
    }
  }

  return bestMatch
}

