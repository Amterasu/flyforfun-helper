/**
 * 从 config 文件夹加载数据的工具函数
 */

import type { Config, ConfigIndex, Section, ContentItem } from '../config/types'

// 直接导入 JSON 文件（Vite 和 TypeScript 支持 resolveJsonModule）
import configData from '../config/config.json'
import indexData from '../config/index.json'
import rootContentData from '../config/root-content.json'
import communityData from '../config/community.json'
// 导入 system 的所有部分（拆分后的文件）
import systemPart1Data from '../config/system/system-part1.json'
import systemPart2Data from '../config/system/system-part2.json'
import systemPart3Data from '../config/system/system-part3.json'
import systemPart4Data from '../config/system/system-part4.json'
import systemPart5Data from '../config/system/system-part5.json'
import systemPart6Data from '../config/system/system-part6.json'
import systemPart7Data from '../config/system/system-part7.json'
import systemPart8Data from '../config/system/system-part8.json'
import systemPart9Data from '../config/system/system-part9.json'
import systemPart10Data from '../config/system/system-part10.json'
import systemPart11Data from '../config/system/system-part11.json'
import systemPart12Data from '../config/system/system-part12.json'
import systemPart13Data from '../config/system/system-part13.json'
import systemPart14Data from '../config/system/system-part14.json'
import systemPart15Data from '../config/system/system-part15.json'
import systemPart16Data from '../config/system/system-part16.json'
import systemPart17Data from '../config/system/system-part17.json'
import systemPart18Data from '../config/system/system-part18.json'
import systemPart19Data from '../config/system/system-part19.json'
import systemPart20Data from '../config/system/system-part20.json'
import systemPart21Data from '../config/system/system-part21.json'
import systemPart22Data from '../config/system/system-part22.json'
import systemPart23Data from '../config/system/system-part23.json'
import systemPart24Data from '../config/system/system-part24.json'
import systemPart25Data from '../config/system/system-part25.json'
import systemPart26Data from '../config/system/system-part26.json'
import systemPart27Data from '../config/system/system-part27.json'
import systemPart28Data from '../config/system/system-part28.json'
import systemPart29Data from '../config/system/system-part29.json'
import systemPart30Data from '../config/system/system-part30.json'
import formulaData from '../config/formula.json'
import upgradePart1Data from '../config/upgrade-part1.json'
import upgradePart2Data from '../config/upgrade-part2.json'
import petData from '../config/pet.json'
import dungeonsData from '../config/dungeons.json'
import housingData from '../config/housing.json'

// 类型断言（JSON 导入在 TypeScript 中返回 any，需要显式断言）
const config = configData as Config
const index = indexData as ConfigIndex
const rootContent = rootContentData as ContentItem[]
const community = communityData as unknown as Section

// 合并 system 的所有部分
const systemParts = [
  systemPart1Data as Section,
  systemPart2Data as Section,
  systemPart3Data as Section,
  systemPart4Data as Section,
  systemPart5Data as Section,
  systemPart6Data as Section,
  systemPart7Data as Section,
  systemPart8Data as Section,
  systemPart9Data as Section,
  systemPart10Data as Section,
  systemPart11Data as Section,
  systemPart12Data as Section,
  systemPart13Data as Section,
  systemPart14Data as Section,
  systemPart15Data as Section,
  systemPart16Data as Section,
  systemPart17Data as Section,
  systemPart18Data as Section,
  systemPart19Data as Section,
  systemPart20Data as Section,
  systemPart21Data as Section,
  systemPart22Data as Section,
  systemPart23Data as Section,
  systemPart24Data as Section,
  systemPart25Data as Section,
  systemPart26Data as Section,
  systemPart27Data as Section,
  systemPart28Data as Section,
  systemPart29Data as Section,
  systemPart30Data as Section
]

// 合并所有子章节
const allSubsections: Record<string, Section> = {}
const largeSectionKey = '💯 level reach rewards'
let mergedLargeSection: Section | null = null

systemParts.forEach((part) => {
  if (!part.subsections) return
  
  Object.entries(part.subsections).forEach(([key, subsection]) => {
    // 如果是拆分的大章节，合并其内容
    if (key === largeSectionKey) {
      if (!mergedLargeSection) {
        mergedLargeSection = {
          title: subsection.title,
          content: [],
          subsections: subsection.subsections || {}
        }
      }
      // 合并内容
      if (subsection.content && Array.isArray(subsection.content)) {
        mergedLargeSection.content.push(...subsection.content)
      }
    } else {
      // 普通子章节，直接添加（避免重复）
      if (!allSubsections[key]) {
        allSubsections[key] = subsection
      }
    }
  })
})

// 如果合并了大章节，添加到所有子章节中
if (mergedLargeSection) {
  allSubsections[largeSectionKey] = mergedLargeSection
}

const system: Section = {
  title: systemParts[0].title,
  content: systemParts[0].content,
  subsections: allSubsections
}

const formula = formulaData as Section
// 合并 upgrade 的两个部分
const upgradePart1 = upgradePart1Data as Section
const upgradePart2 = upgradePart2Data as Section
const upgrade: Section = {
  title: upgradePart1.title,
  content: upgradePart1.content,
  subsections: {
    ...upgradePart1.subsections,
    ...upgradePart2.subsections
  }
}
const pet = petData as Section
const dungeons = dungeonsData as Section
const housing = housingData as Section

// 章节映射
const sectionMap: Record<string, Section> = {
  'community': community,
  '🌐 community': community,
  'system': system,
  '⚙️ system': system,
  'formula': formula,
  '🧪 formula': formula,
  'upgrade': upgrade,
  '🚀 upgrade': upgrade,
  'pet': pet,
  '🐶 pet': pet,
  'dungeons': dungeons,
  '🐉 dungeons': dungeons,
  'housing': housing,
  '🏠 housing': housing
}

/**
 * 获取应用配置
 */
export function getAppConfig(): Config {
  return config
}

/**
 * 获取索引
 */
export function getIndex() {
  return index
}

/**
 * 获取根内容
 */
export function getRootContent(): ContentItem[] {
  return rootContent
}

/**
 * 根据章节 ID 获取章节（不区分大小写）
 */
export function getSection(sectionId: string): Section | null {
  // 首先尝试精确匹配
  if (sectionMap[sectionId]) {
    return sectionMap[sectionId]
  }
  
  // 不区分大小写匹配
  const normalizedId = sectionId.toLowerCase()
  for (const [key, value] of Object.entries(sectionMap)) {
    if (key.toLowerCase() === normalizedId) {
      return value
    }
  }
  
  return null
}

/**
 * 获取章节内容（支持子章节）
 */
export function getSectionContent(
  sectionId: string,
  subsectionId?: string,
  subSubsectionId?: string
): ContentItem[] | null {
  const section = getSection(sectionId)
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
  if (!items || items.length === 0) return ''

  const result: string[] = []
  let i = 0

  while (i < items.length) {
    const item = items[i]
    
    // 检查是否是表格开始（连续的 table 类型项）
    if (item.type === 'table') {
      const tableParts: { headers?: string[], separator?: string[], rows: string[][] } = { rows: [] }
      let tableIndex = i
      
      // 收集连续的表格项
      while (tableIndex < items.length && items[tableIndex].type === 'table') {
        const tableItem = items[tableIndex]
        const tableData = (tableItem as any).translatedTable || tableItem.table
        
        if (tableData && tableData.rows && tableData.rows.length > 0) {
          const firstRow = tableData.rows[0]
          const isSeparatorRow = firstRow.some((cell: string) => /^:?-+:?$/.test(cell))
          
          if (isSeparatorRow) {
            // 这是分隔行
            tableParts.separator = firstRow
          } else if (tableData.headers && tableData.headers.length > 0) {
            // 有明确的 headers
            tableParts.headers = tableData.headers
          } else if (!tableParts.headers && firstRow) {
            // 第一行可能是表头（如果没有 headers 且还没有设置表头）
            tableParts.headers = firstRow
          } else {
            // 数据行
            tableParts.rows.push(...tableData.rows)
          }
        }
        
        tableIndex++
      }
      
      // 处理表头和列：如果表头包含 _cn 后缀的列，只保留中文列
      let headers = tableParts.headers || []
      let separator = tableParts.separator || []
      const rows = tableParts.rows || []
      
      // 检查表头是否包含中英混合列（包含 _cn 后缀）
      const cnColumnIndices: number[] = []
      const cnHeaderNames: string[] = []
      
      if (headers.length > 0) {
        headers.forEach((header, index) => {
          if (header && typeof header === 'string' && header.endsWith('_cn')) {
            cnColumnIndices.push(index)
            // 根据列名映射中文表头名称
            if (header === 'Template_cn') {
              cnHeaderNames.push('模板名称')
            } else if (header === 'Size_cn') {
              cnHeaderNames.push('大小')
            } else if (header === 'Price_cn') {
              cnHeaderNames.push('价格')
            } else {
              // 如果不知道映射关系，使用原列名（去掉 _cn 后缀）
              cnHeaderNames.push(header.replace(/_cn$/, ''))
            }
          }
        })
      }
      
      // 如果找到了中文列，只保留这些列
      if (cnColumnIndices.length > 0) {
        headers = cnHeaderNames
        separator = cnColumnIndices.map(() => ':---:')
        
        // 过滤数据行，只保留中文列
        const filteredRows = rows.map(row => {
          return cnColumnIndices.map(index => row[index] || '').filter(cell => cell !== undefined)
        }).filter(row => row.length > 0)
        
        // 构建完整的表格 Markdown
        if (headers.length > 0 || filteredRows.length > 0) {
          const tableMarkdown: string[] = []
          
          // 表头
          if (headers.length > 0) {
            tableMarkdown.push(`| ${headers.join(' | ')} |`)
          }
          
          // 分隔行
          if (separator.length > 0) {
            tableMarkdown.push(`| ${separator.join(' | ')} |`)
          }
          
          // 数据行
          filteredRows.forEach(row => {
            tableMarkdown.push(`| ${row.join(' | ')} |`)
          })
          
          if (tableMarkdown.length > 0) {
            result.push(tableMarkdown.join('\n'))
          }
        }
      } else {
        // 没有找到中文列，使用原有逻辑
        if (tableParts.headers || tableParts.separator || rows.length > 0) {
          const tableMarkdown: string[] = []
          
          // 表头
          if (tableParts.headers) {
            tableMarkdown.push(`| ${tableParts.headers.join(' | ')} |`)
          }
          
          // 分隔行
          if (tableParts.separator) {
            tableMarkdown.push(`| ${tableParts.separator.join(' | ')} |`)
          } else if (tableParts.headers) {
            // 如果没有分隔行，根据表头生成
            tableMarkdown.push(`| ${tableParts.headers.map(() => '---').join(' | ')} |`)
          }
          
          // 数据行
          if (rows.length > 0) {
            rows.forEach(row => {
              tableMarkdown.push(`| ${row.join(' | ')} |`)
            })
          }
          
          if (tableMarkdown.length > 0) {
            result.push(tableMarkdown.join('\n'))
          }
        }
      }
      
      i = tableIndex
      continue
    }
    
    // 非表格项，按原逻辑处理
    switch (item.type) {
      case 'text':
      case 'paragraph':
        // 优先使用中文内容（translatedContent > content_zh > content_cn），如果没有则使用英文内容
        const textContent = item.translatedContent || item.content_zh || (item as any).content_cn || item.content || item.text || item.trimmed || ''
        if (textContent) {
          result.push(textContent)
        }
        break
      case 'list': {
        if (!item.items) break

        // 特殊优化：将「等级达成奖励」这类结构化列表渲染为表格
        // 识别模式：顶级缩进为 0 的列表项内容类似「等级20（**数量限制：2000**）：」
        const firstItem: any = item.items[0]
        const firstText =
          (firstItem?.translatedContent ||
            firstItem?.content_zh ||
            firstItem?.content_cn ||
            firstItem?.content ||
            '').toString()

        const isLevelHeader =
          firstItem &&
          firstItem.indent === 0 &&
          /等级\s*\d+/.test(firstText)

        if (isLevelHeader) {
          type LevelRewardRow = { level: string; limit: string; rewards: string[] }
          const rows: LevelRewardRow[] = []
          let currentRow: LevelRewardRow | null = null

          let j = i
          while (j < items.length && items[j].type === 'list') {
            const listAny: any = items[j]
            const listItems = listAny.items || []

            for (const li of listItems) {
              const liAny: any = li
              const text =
                liAny.translatedContent ||
                liAny.content_zh ||
                liAny.content_cn ||
                liAny.content ||
                ''

              // 顶级：新的等级行
              if ((liAny.indent ?? 0) === 0) {
                const mLevel = text.match(/等级\s*([0-9]+)/)
                if (mLevel) {
                  const mLimit = text.match(/数量限制[：:]\s*([0-9]+)/)
                  currentRow = {
                    level: mLevel[1],
                    limit: mLimit ? mLimit[1] : '',
                    rewards: []
                  }
                  rows.push(currentRow)
                }
              } else if ((liAny.indent ?? 0) > 0 && currentRow) {
                // 奖励行，归属到当前等级
                const rewardText = text.toString()
                if (rewardText.trim().length > 0) {
                  currentRow.rewards.push(rewardText)
                }
              }
            }

            j++
          }

          if (rows.length > 0) {
            // 竖向列表展示
            const listLines: string[] = []
            rows.forEach((row) => {
              // 等级标题行
              const limitText = row.limit ? `（**数量限制：${row.limit}**）` : ''
              listLines.push(`- 等级${row.level}${limitText}：`)
              
              // 奖励列表
              row.rewards.forEach((reward) => {
                listLines.push(`  - ${reward}`)
              })
            })

            result.push(listLines.join('\n'))
            i = j
            continue
          }
        }

        // 默认：普通列表渲染
        const listContent = item.items
          .map((listItem) => {
            // 列表项可能是 ListItem (有 indent 和 content) 或 ContentItem
            if ('indent' in listItem && 'content' in listItem) {
              const indent = '  '.repeat(listItem.indent || 0)
              // 优先使用中文内容（translatedContent > content_zh > content_cn），如果没有则使用英文内容
              const listItemAny = listItem as any
              const content =
                listItemAny.translatedContent ||
                listItemAny.content_zh ||
                listItemAny.content_cn ||
                listItem.content ||
                ''
              return `${indent}- ${content}`
            }
            // 如果是 ContentItem，递归处理
            return contentItemsToMarkdown([listItem as ContentItem])
          })
          .filter((line) => line && line.trim().length > 0)
          .join('\n')
        if (listContent) {
          result.push(listContent)
        }
        break
      }
      case 'blockquote': {
        // 引用优先显示中文：quotes_cn > content_cn > quotes
        const anyItem = item as any
        const quotesCn = anyItem.quotes_cn
        const contentCn = anyItem.content_cn
        const quotesEn = item.quotes

        let blockquoteLines: string[] = []

        if (Array.isArray(quotesCn) && quotesCn.length > 0) {
          blockquoteLines = quotesCn
        } else if (typeof contentCn === 'string' && contentCn.trim().length > 0) {
          blockquoteLines = [contentCn]
        } else if (Array.isArray(quotesEn) && quotesEn.length > 0) {
          blockquoteLines = quotesEn
        }

        if (blockquoteLines.length > 0) {
          result.push(blockquoteLines.map((quote: string) => `> ${quote}`).join('\n'))
        }
        break
      }
      case 'code_block':
        const lang = item.language || ''
        const code = item.code || ''
        if (code) {
          result.push(`\`\`\`${lang}\n${code}\n\`\`\``)
        }
        break
      case 'html':
        // 优先使用中文HTML（translatedHtml），如果没有则使用英文HTML
        const htmlContent = (item as any).translatedHtml || item.html || ''
        if (htmlContent) {
          result.push(htmlContent)
        }
        break
      case 'gallery': {
        // 照片墙类型
        const galleryData = (item as any).gallery || {}
        const folder = galleryData.folder || '/costume_collection/'
        const images = galleryData.images || []
        
        if (images.length > 0) {
          // 生成照片墙 HTML
          const galleryHtml = [
            '<div class="image-gallery">',
            ...images.map((img: { src: string; alt?: string }) => {
              // 处理图片路径
              let src = img.src
              if (!src.startsWith('./') && !src.startsWith('/') && !src.startsWith('http://') && !src.startsWith('https://')) {
                src = `${folder}${src}`
              }
              // 确保路径以 / 开头（移除 ./ 前缀）
              if (src.startsWith('./')) {
                src = src.replace(/^\.\//, '/')
              }
              // 对路径中的特殊字符进行编码（但保留已编码的部分）
              // 将路径分割为目录和文件名，只对文件名部分进行编码
              const pathParts = src.split('/')
              const encodedParts = pathParts.map((part, index) => {
                // 最后一个部分是文件名，需要编码特殊字符（空格、单引号等）
                if (index === pathParts.length - 1 && part) {
                  // 使用 encodeURIComponent 编码文件名，但需要保留路径分隔符
                  return encodeURIComponent(part)
                }
                return part
              })
              src = encodedParts.join('/')
              
              // 确保 HTML 属性中的 & 符号被正确转义（虽然 URL 编码后应该是 %26，但为了安全起见）
              // 注意：src 已经通过 encodeURIComponent 编码，所以 & 应该是 %26，不需要额外转义
              
              // 生成 alt 文本，解码特殊字符
              const alt = img.alt || decodeURIComponent(img.src.replace(/^.*\//, '').replace(/\.[^.]+$/, ''))
              // 转义 alt 属性中的 HTML 特殊字符
              const escapedAlt = alt.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
              return `  <div class="gallery-item"><img src="${src}" alt="${escapedAlt}" loading="lazy" /></div>`
            }),
            '</div>'
          ].join('\n')
          result.push(galleryHtml)
        }
        break
      }
      default:
        break
    }
    
    i++
  }
  
  return result.filter((line) => line && line.trim().length > 0).join('\n\n')
}

/**
 * 将标题转换为锚点 ID（用于匹配）
 * 移除 emoji、特殊字符，将空格转换为连字符
 */
function titleToAnchorId(title: string): string {
  // 先转换为小写，然后只保留字母、数字、中文和空格，移除所有其他字符（包括 emoji）
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

/**
 * 判断是否应该进行包含匹配
 * 避免短词匹配长词（至少 4 个字符，且短词长度至少是长词的 60%）
 */
function shouldIncludeMatch(id1: string, id2: string): boolean {
  if (!id1 || !id2) return false
  // 避免短词（少于 4 个字符）匹配长词
  if (id1.length < 4 || id2.length < 4) return false
  
  const longer = id1.length > id2.length ? id1 : id2
  const shorter = id1.length > id2.length ? id2 : id1
  
  // 避免短词匹配长词：短词长度应该至少是长词的 60%（更严格）
  const ratio = shorter.length / longer.length
  if (ratio < 0.6) return false
  
  // 使用单词边界匹配，避免部分匹配
  // 只有在较长 ID 中包含完整较短 ID 时才匹配（使用单词边界）
  // 例如：允许 "dungeons-location" 匹配 "location"，但不允许 "story-dungeons" 匹配 "dungeon"
  return longer.includes(shorter) && (
    longer.startsWith(shorter) || 
    longer.endsWith(shorter) || 
    longer.includes(`-${shorter}-`) || 
    longer.includes(`-${shorter}`) || 
    longer.includes(`${shorter}-`)
  )
}

/**
 * 根据锚点 ID 获取内容
 * 支持章节和子章节的映射
 */
export function getContentByAnchorId(anchorId: string): string {
  // 清理锚点 ID
  const cleanId = anchorId.replace(/^-+/, '').replace(/^️-/, '').toLowerCase()

  // 首先尝试直接匹配章节（主章节）
  const section = getSection(cleanId)
  if (section && section.content && section.content.length > 0) {
    return contentItemsToMarkdown(section.content)
  }

  // 如果没找到，在所有章节中搜索子章节和子子章节（不区分大小写）
  // 优先返回最精确的匹配（精确匹配 > 包含匹配，二级子章节 > 一级子章节）
  
  // 第一轮：只搜索精确匹配
  for (const [sectionKey, section] of Object.entries(sectionMap)) {
    if (!section.subsections) continue

    for (const [subsectionKey, subsection] of Object.entries(section.subsections)) {
      const subsectionTitleEn = subsection.title
      const subsectionTitleZh = (subsection as any).translatedTitle || (subsection as any).title_zh || (subsection as any).title_cn
      const subsectionIdEn = titleToAnchorId(subsectionTitleEn)
      const subsectionIdZh = subsectionTitleZh ? titleToAnchorId(subsectionTitleZh) : ''
      
      // 先搜索二级子章节（更精确的匹配）
      if (subsection.subsections) {
        for (const [subSubsectionKey, subSubsection] of Object.entries(subsection.subsections)) {
          const subSubsectionTitleEn = subSubsection.title
          const subSubsectionTitleZh = (subSubsection as any).translatedTitle || (subSubsection as any).title_zh || (subSubsection as any).title_cn
          const subSubsectionIdEn = titleToAnchorId(subSubsectionTitleEn)
          const subSubsectionIdZh = subSubsectionTitleZh ? titleToAnchorId(subSubsectionTitleZh) : ''
          
          // 精确匹配（检查英文和中文）
          if ((subSubsectionIdEn === cleanId || subSubsectionIdZh === cleanId) 
              && subSubsection.content && subSubsection.content.length > 0) {
            return contentItemsToMarkdown(subSubsection.content)
          }
        }
      }
      
      // 检查一级子章节的精确匹配
      if ((subsectionIdEn === cleanId || subsectionIdZh === cleanId) 
          && subsection.content && subsection.content.length > 0) {
        return contentItemsToMarkdown(subsection.content)
      }
      
      // 特殊处理：如果 cleanId 是 "all-server-contents-time"，也尝试匹配包含 "all server contents time" 的标题
      if (cleanId === 'all-server-contents-time') {
        const titleLower = subsectionTitleEn.toLowerCase()
        if ((titleLower.includes('all server contents time') || titleLower.includes('all-server-contents-time'))
            && subsection.content && subsection.content.length > 0) {
          return contentItemsToMarkdown(subsection.content)
        }
      }
    }
  }
  
  // 第二轮：如果没有精确匹配，再搜索包含匹配
  let bestMatch: ContentItem[] | null = null
  
  for (const [sectionKey, section] of Object.entries(sectionMap)) {
    if (!section.subsections) continue

    for (const [subsectionKey, subsection] of Object.entries(section.subsections)) {
      const subsectionTitleEn = subsection.title
      const subsectionTitleZh = (subsection as any).translatedTitle || (subsection as any).title_zh || (subsection as any).title_cn
      const subsectionIdEn = titleToAnchorId(subsectionTitleEn)
      const subsectionIdZh = subsectionTitleZh ? titleToAnchorId(subsectionTitleZh) : ''
      
      // 搜索二级子章节的包含匹配
      if (subsection.subsections) {
        for (const [subSubsectionKey, subSubsection] of Object.entries(subsection.subsections)) {
          const subSubsectionTitleEn = subSubsection.title
          const subSubsectionTitleZh = (subSubsection as any).translatedTitle || (subSubsection as any).title_zh || (subSubsection as any).title_cn
          const subSubsectionIdEn = titleToAnchorId(subSubsectionTitleEn)
          const subSubsectionIdZh = subSubsectionTitleZh ? titleToAnchorId(subSubsectionTitleZh) : ''
          
          // 包含匹配（检查英文和中文）- 避免短词匹配长词
          if ((shouldIncludeMatch(subSubsectionIdEn, cleanId) || shouldIncludeMatch(subSubsectionIdZh, cleanId))
              && subSubsection.content && subSubsection.content.length > 0) {
            // 记录最佳匹配，继续搜索看是否有更精确的
            if (!bestMatch) {
              bestMatch = subSubsection.content
            }
          }
        }
      }
      
      // 包含匹配的一级子章节（检查英文和中文）- 避免短词匹配长词
      if ((shouldIncludeMatch(subsectionIdEn, cleanId) || shouldIncludeMatch(subsectionIdZh, cleanId))
          && subsection.content && subsection.content.length > 0) {
        // 只有在没有更好的匹配时才记录
        if (!bestMatch) {
          bestMatch = subsection.content
        }
      }
    }
  }
  
  // 如果找到了最佳匹配，返回它
  if (bestMatch) {
    return contentItemsToMarkdown(bestMatch)
  }

  // 最后尝试使用索引中的映射关系（不区分大小写）
  // titleToAnchorId 和 cleanId 都已经转换为小写，所以直接比较
  const sectionKey = Object.keys(index.sections).find(key => {
    const keyId = titleToAnchorId(key)
    return keyId === cleanId || keyId.includes(cleanId) || cleanId.includes(keyId)
  })

  if (sectionKey) {
    const section = getSection(sectionKey)
    if (section && section.content && section.content.length > 0) {
      return contentItemsToMarkdown(section.content)
    }
  }

  return ''
}

