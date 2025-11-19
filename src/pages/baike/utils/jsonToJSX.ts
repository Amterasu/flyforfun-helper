/**
 * 将 ContentItem JSON 转换为 JSX 代码字符串
 * 用于在构建时生成 React 组件代码
 * 直接生成 React DOM 元素，不使用 dangerouslySetInnerHTML
 */

import type { ContentItem } from '../../../config/types'

/**
 * 转义 JSX 字符串
 */
function escapeJSX(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * HTML 属性值转义（只转义必要的字符）
 */
function escapeHtmlAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * 将 Markdown 内容转换为 React 元素数组
 */
function markdownToReactElements(content: string, links?: Array<{ url: string; text: string; text_cn?: string }>): string {
  if (!content) return ''
  
  let processedContent = content
  
  // 首先处理链接 [text](url) - 必须在处理粗体之前，因为粗体可能包含链接
  processedContent = processedContent.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, text, url) => {
    const isExternal = url.startsWith('http://') || url.startsWith('https://')
    if (isExternal) {
      return `<a href="${escapeHtmlAttr(url)}" target="_blank" rel="noopener noreferrer">${text}</a>`
    }
    return `<a href="${escapeHtmlAttr(url)}">${text}</a>`
  })
  
  // 处理 links 数组中的链接（优先使用中文链接文本）
  if (links && links.length > 0) {
    links.forEach((link) => {
      const linkText = link.text_cn || link.text || ''
      // 只替换还没有被包裹在 <a> 标签中的链接文本
      if (!processedContent.includes(`<a href="${escapeHtmlAttr(link.url)}"`)) {
        const isExternal = link.url.startsWith('http://') || link.url.startsWith('https://')
        const linkElement = isExternal
          ? `<a href="${escapeHtmlAttr(link.url)}" target="_blank" rel="noopener noreferrer">${linkText}</a>`
          : `<a href="${escapeHtmlAttr(link.url)}">${linkText}</a>`
        // 使用单词边界来避免部分匹配
        const regex = new RegExp(`(^|[^>])${linkText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^<]|$)`, 'g')
        processedContent = processedContent.replace(regex, (match, before, after) => {
          // 如果已经在 <a> 标签中，不替换
          return match.includes('<a') ? match : `${before}${linkElement}${after}`
        })
      }
    })
  }
  
  // 处理代码块 `code`（使用临时占位符，避免与链接冲突）
  processedContent = processedContent.replace(/`([^`]+)`/g, '<code>$1</code>')
  
  // 处理粗体 **text**（使用非贪婪匹配，避免匹配到链接）
  processedContent = processedContent.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  
  // 处理斜体 *text*（使用非贪婪匹配，避免匹配到链接）
  processedContent = processedContent.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  
  return processedContent
}

/**
 * 将 HTML 字符串转换为 React JSX（未使用，保留供将来使用）
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function htmlToReactJSX(html: string, indent: string, _nextIndent: number): string {
  if (!html) return ''
  
  // 修复图片路径
  let fixedHtml = html.replace(/src=["'](\.\/[^"']+)["']/g, (match, src) => {
    const fixedSrc = src.replace(/^\.\//, '/')
    return `src="${fixedSrc}"`
  })
  
  // 简单的 HTML 到 JSX 转换
  // 处理常见的 HTML 标签
  fixedHtml = fixedHtml
    .replace(/<img([^>]*?)>/gi, (match, attrs) => {
      // 提取属性
      const srcMatch = attrs.match(/src=["']([^"']+)["']/)
      const altMatch = attrs.match(/alt=["']([^"']*)["']/)
      const widthMatch = attrs.match(/width=["']?(\d+)["']?/)
      const alignMatch = attrs.match(/align=["']([^"']+)["']/)
      
      const src = srcMatch ? srcMatch[1] : ''
      const alt = altMatch ? altMatch[1] : ''
      const width = widthMatch ? widthMatch[1] : ''
      const align = alignMatch ? alignMatch[1] : ''
      
      let imgAttrs = `src="${src}"`
      if (alt) imgAttrs += ` alt="${alt}"`
      if (width) imgAttrs += ` width={${width}}`
      if (align) imgAttrs += ` style={{ textAlign: '${align}' }}`
      
      return `<img ${imgAttrs} />`
    })
    .replace(/<div([^>]*?)>/gi, (match, attrs) => {
      const alignMatch = attrs.match(/align=["']([^"']+)["']/)
      const align = alignMatch ? alignMatch[1] : ''
      if (align) {
        return `<div style={{ textAlign: '${align}' }}>`
      }
      return '<div>'
    })
    .replace(/<details([^>]*?)>/gi, (match, attrs) => {
      const openMatch = attrs.match(/open/i)
      return openMatch ? '<details open>' : '<details>'
    })
    .replace(/<summary>/gi, '<summary>')
    .replace(/<\/summary>/gi, '</summary>')
    .replace(/<table>/gi, '<table>')
    .replace(/<\/table>/gi, '</table>')
    .replace(/<tr>/gi, '<tr>')
    .replace(/<\/tr>/gi, '</tr>')
    .replace(/<td>/gi, '<td>')
    .replace(/<\/td>/gi, '</td>')
    .replace(/<th>/gi, '<th>')
    .replace(/<\/th>/gi, '</th>')
    .replace(/<thead>/gi, '<thead>')
    .replace(/<\/thead>/gi, '</thead>')
    .replace(/<tbody>/gi, '<tbody>')
    .replace(/<\/tbody>/gi, '</tbody>')
    .replace(/<br\s*\/?>/gi, '<br />')
    .replace(/<hr\s*\/?>/gi, '<hr />')
  
  // 将多行 HTML 转换为 JSX，保持缩进
  const lines = fixedHtml.split('\n')
  const jsxLines: string[] = []
  
  lines.forEach((line) => {
    const trimmed = line.trim()
    if (!trimmed) return
    
    // 简单的标签匹配和缩进
    if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
      jsxLines.push(`${indent}${trimmed}`)
    } else {
      jsxLines.push(`${indent}{${JSON.stringify(trimmed)}}`)
    }
  })
  
  return jsxLines.join('\n')
}

/**
 * 将单个 ContentItem 转换为 JSX 代码字符串
 */
export function contentItemToJSX(item: ContentItem, index: number, indent: number = 0): string {
  const indentStr = '  '.repeat(indent)
  const nextIndent = indent + 1
  
  switch (item.type) {
    case 'text':
      return textToJSX(item, index, indentStr, nextIndent)
    case 'paragraph':
      return paragraphToJSX(item, index, indentStr, nextIndent)
    case 'list':
      return listToJSX(item, index, indentStr, nextIndent)
    case 'blockquote':
      return blockquoteToJSX(item, index, indentStr, nextIndent)
    case 'table':
      return tableToJSX(item, index, indentStr, nextIndent)
    case 'code_block':
      return codeBlockToJSX(item, index, indentStr, nextIndent)
    case 'html':
      return htmlToJSX(item, index, indentStr, nextIndent)
    case 'gallery':
      return galleryToJSX(item, index, indentStr, nextIndent)
    default:
      return ''
  }
}

/**
 * 文本转 JSX - 使用 <p> 标签
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function textToJSX(item: ContentItem, index: number, indent: string, _nextIndent: number): string {
  // 优先使用 content_cn
  const content = (item as { content_cn?: string; content_zh?: string; translatedContent?: string; content?: string }).content_cn || 
                  (item as { content_zh?: string; translatedContent?: string; content?: string }).content_zh || 
                  (item as { translatedContent?: string; content?: string }).translatedContent || 
                  item.content || ''
  const processedContent = markdownToReactElements(content, item.links)
  
  // 如果包含 HTML 标签，解析为 JSX
  if (processedContent.includes('<')) {
    const inlineContent = parseInlineHTML(processedContent, '', 0)
    return `${indent}<p key={${index}}>${inlineContent}</p>\n`
  }
  
  return `${indent}<p key={${index}}>${escapeJSX(content)}</p>\n`
}

/**
 * 段落转 JSX - 使用 <p> 标签
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function paragraphToJSX(item: ContentItem, index: number, indent: string, _nextIndent: number): string {
  // 优先使用 content_cn
  const content = (item as { content_cn?: string; content_zh?: string; translatedContent?: string; content?: string }).content_cn || 
                  (item as { content_zh?: string; translatedContent?: string; content?: string }).content_zh || 
                  (item as { translatedContent?: string; content?: string }).translatedContent || 
                  item.content || ''
  const processedContent = markdownToReactElements(content, item.links)
  
  // 如果包含 HTML 标签，解析为 JSX
  if (processedContent.includes('<')) {
    const inlineContent = parseInlineHTML(processedContent, '', 0)
    return `${indent}<p key={${index}}>${inlineContent}</p>\n`
  }
  
  return `${indent}<p key={${index}}>${escapeJSX(content)}</p>\n`
}

/**
 * 列表转 JSX - 使用 <ul><li> 标签
 */
function listToJSX(item: ContentItem, index: number, indent: string, nextIndent: number): string {
  if (!item.items || item.items.length === 0) return ''
  
  const liIndentStr = '  '.repeat(nextIndent + 1)
  
  const items = item.items.map((listItem, idx) => {
    const listItemAny = listItem as { content_cn?: string; content_zh?: string; translatedContent?: string; content?: string; indent?: number }
    // 优先使用 content_cn
    const content = listItemAny.content_cn || 
                   listItemAny.content_zh || 
                   listItemAny.translatedContent || 
                   listItemAny.content || 
                   ''
    const itemIndent = listItemAny.indent || 0
    const processedContent = markdownToReactElements(content)
    
    const style = itemIndent > 0 ? ` style={{ marginLeft: '${itemIndent * 20}px' }}` : ''
    
    // 如果包含 HTML 标签，解析为 JSX
    if (processedContent.includes('<')) {
      const inlineContent = parseInlineHTML(processedContent, '', 0)
      return `${liIndentStr}<li key={${idx}}${style}>${inlineContent}</li>\n`
    }
    
    return `${liIndentStr}<li key={${idx}}${style}>${escapeJSX(content)}</li>\n`
  }).join('')
  
  return `${indent}<ul key={${index}} className="baike-list">\n${items}${indent}</ul>\n`
}

/**
 * 引用转 JSX - 使用 <blockquote> 标签
 */
function blockquoteToJSX(item: ContentItem, index: number, indent: string, nextIndent: number): string {
  // 优先使用 quotes_cn
  const quotes = (item as { quotes_cn?: string[]; quotes?: string[] }).quotes_cn || (item as { quotes?: string[] }).quotes || []
  if (quotes.length === 0) return ''
  
  const quoteIndent = '  '.repeat(nextIndent)
  
  const quoteItems = quotes.map((quote: string, idx: number) => {
    const processedQuote = markdownToReactElements(quote)
    
    // 如果包含 HTML 标签，解析为 JSX
    if (processedQuote.includes('<')) {
      const inlineContent = parseInlineHTML(processedQuote, '', 0)
      return `${quoteIndent}<p key={${idx}}>${inlineContent}</p>\n`
    }
    
    return `${quoteIndent}<p key={${idx}}>${escapeJSX(quote)}</p>\n`
  }).join('')
  
  return `${indent}<blockquote key={${index}} className="baike-blockquote">\n${quoteItems}${indent}</blockquote>\n`
}

/**
 * 表格转 JSX - 使用 <table> 标签
 */
function tableToJSX(item: ContentItem, index: number, indent: string, nextIndent: number): string {
  // 优先使用 translatedTable
  const table = (item as { translatedTable?: { headers?: string[]; rows?: string[][] }; table?: { headers?: string[]; rows?: string[][] } }).translatedTable || item.table
  if (!table) return ''
  
  const { headers, rows } = table
  const tableIndent = '  '.repeat(nextIndent)
  const rowIndent = '  '.repeat(nextIndent + 1)
  const cellIndent = '  '.repeat(nextIndent + 2)
  
  let jsx = `${indent}<table key={${index}} className="baike-table">\n`
  
  if (headers && headers.length > 0) {
    jsx += `${tableIndent}<thead>\n${rowIndent}<tr>\n`
    headers.forEach((header: string, idx: number) => {
      const headerContent = markdownToReactElements(header)
      if (headerContent.includes('<')) {
        const inlineContent = parseInlineHTML(headerContent, '', 0)
        jsx += `${cellIndent}<th key={${idx}}>${inlineContent}</th>\n`
      } else {
        jsx += `${cellIndent}<th key={${idx}}>${escapeJSX(header)}</th>\n`
      }
    })
    jsx += `${rowIndent}</tr>\n${tableIndent}</thead>\n`
  }
  
  if (rows && rows.length > 0) {
    jsx += `${tableIndent}<tbody>\n`
    rows.forEach((row: string[], rowIdx: number) => {
      jsx += `${rowIndent}<tr key={${rowIdx}}>\n`
      row.forEach((cell: string, cellIdx: number) => {
        const cellContent = markdownToReactElements(cell)
        if (cellContent.includes('<')) {
          const inlineContent = parseInlineHTML(cellContent, '', 0)
          jsx += `${cellIndent}<td key={${cellIdx}}>${inlineContent}</td>\n`
        } else {
          jsx += `${cellIndent}<td key={${cellIdx}}>${escapeJSX(cell)}</td>\n`
        }
      })
      jsx += `${rowIndent}</tr>\n`
    })
    jsx += `${tableIndent}</tbody>\n`
  }
  
  jsx += `${indent}</table>\n`
  return jsx
}

/**
 * 代码块转 JSX - 使用 <pre><code> 标签
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function codeBlockToJSX(item: ContentItem, index: number, indent: string, _nextIndent: number): string {
  const code = item.code || ''
  const language = item.language || ''
  
  return `${indent}<pre key={${index}} className="baike-code-block"><code className="${language}">${escapeJSX(code)}</code></pre>\n`
}

/**
 * HTML 转 JSX - 解析 HTML 并转换为 React 组件
 * 完全转换为 JSX，不使用 dangerouslySetInnerHTML
 */
function htmlToJSX(item: ContentItem, index: number, indent: string, nextIndent: number): string {
  // 优先使用 html_cn
  const html = (item as { html_cn?: string; translatedHtml?: string; html?: string }).html_cn || 
               (item as { translatedHtml?: string; html?: string }).translatedHtml || 
               item.html || ''
  if (!html) return ''
  
  // 修复图片路径
  let fixedHtml = html.replace(/src=["'](\.\/[^"']+)["']/g, (_match: string, src: string) => {
    const fixedSrc = src.replace(/^\.\//, '/')
    return `src="${fixedSrc}"`
  })
  
  // 使用改进的 HTML 解析器
  return parseHTMLRecursive(fixedHtml, indent, nextIndent, index)
}

/**
 * 递归解析 HTML 内容
 */
function parseHTMLRecursive(html: string, indent: string, nextIndent: number, key: number): string {
  if (!html || !html.trim()) return ''
  
  // 移除危险的标签和属性
  html = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
    .replace(/on\w+=["'][^"']*["']/gi, '')
  
  const htmlIndent = '  '.repeat(nextIndent)
  
  // 1. 处理完整的 <table>...</table>
  const tableMatch = html.match(/<table([^>]*)>([\s\S]*?)<\/table>/i)
  if (tableMatch) {
    const beforeTable = html.substring(0, tableMatch.index || 0)
    const afterTable = html.substring((tableMatch.index || 0) + tableMatch[0].length)
    let result = ''
    if (beforeTable.trim()) {
      result += parseHTMLRecursive(beforeTable, indent, nextIndent, key)
    }
    result += parseTableHTML(tableMatch[1], tableMatch[2], indent, nextIndent, key)
    if (afterTable.trim()) {
      result += parseHTMLRecursive(afterTable, indent, nextIndent, key + 1)
    }
    return result
  }
  
  // 1.5. 处理不完整的 <table> 标签（没有闭合标签）- 展开为 div
  // 因为不完整的 table 标签在 React 中会导致问题，我们将其展开为 div
  const openTableMatch = html.match(/<table([^>]*)>/i)
  if (openTableMatch && !html.includes('</table>')) {
    const beforeTable = html.substring(0, openTableMatch.index || 0)
    const afterTable = html.substring((openTableMatch.index || 0) + openTableMatch[0].length)
    let result = ''
    if (beforeTable.trim()) {
      result += parseHTMLRecursive(beforeTable, indent, nextIndent, key)
    }
    // 将不完整的 table 结构展开为 div
    if (afterTable.trim()) {
      result += parseHTMLRecursive(afterTable, indent, nextIndent, key)
    }
    return result
  }
  
  // 2. 处理 <details>...</details>
  const detailsMatch = html.match(/<details([^>]*)>([\s\S]*?)<\/details>/i)
  if (detailsMatch) {
    const beforeDetails = html.substring(0, detailsMatch.index || 0)
    const afterDetails = html.substring((detailsMatch.index || 0) + detailsMatch[0].length)
    let result = ''
    if (beforeDetails.trim()) {
      result += parseHTMLRecursive(beforeDetails, indent, nextIndent, key)
    }
    result += parseDetailsHTML(detailsMatch[1], detailsMatch[2], indent, nextIndent, key)
    if (afterDetails.trim()) {
      result += parseHTMLRecursive(afterDetails, indent, nextIndent, key + 1)
    }
    return result
  }
  
  // 2.5. 处理不完整的 <details> 标签（没有闭合标签）- 展开内容
  const openDetailsMatch = html.match(/<details([^>]*)>/i)
  if (openDetailsMatch && !html.includes('</details>')) {
    const beforeDetails = html.substring(0, openDetailsMatch.index || 0)
    const afterDetails = html.substring((openDetailsMatch.index || 0) + openDetailsMatch[0].length)
    let result = ''
    if (beforeDetails.trim()) {
      result += parseHTMLRecursive(beforeDetails, indent, nextIndent, key)
    }
    // 处理 <summary> 标签，但展开 details（移除折叠功能）
    const summaryMatch = afterDetails.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i)
    if (summaryMatch) {
      const summaryContent = summaryMatch[1].trim()
      const summaryInline = summaryContent.includes('<') 
        ? parseInlineHTML(summaryContent, '', 0)
        : escapeJSX(summaryContent)
      // 将 summary 内容作为普通文本显示
      result += `${indent}<span key={${key}}>${summaryInline}</span>\n`
      const remainingContent = afterDetails.substring((summaryMatch.index || 0) + summaryMatch[0].length).trim()
      if (remainingContent) {
        const parsed = parseHTMLRecursive(remainingContent, indent, nextIndent, key + 1)
        if (parsed) {
          result += parsed
        }
      }
    } else if (afterDetails.trim()) {
      // 如果没有 <summary>，直接解析剩余内容
      result += parseHTMLRecursive(afterDetails, indent, nextIndent, key)
    }
    return result
  }
  
  // 2.6. 处理 <summary>...</summary> 标签
  const summaryMatch = html.match(/<summary([^>]*)>([\s\S]*?)<\/summary>/i)
  if (summaryMatch) {
    const beforeSummary = html.substring(0, summaryMatch.index || 0)
    const afterSummary = html.substring((summaryMatch.index || 0) + summaryMatch[0].length)
    let result = ''
    if (beforeSummary.trim()) {
      result += parseHTMLRecursive(beforeSummary, indent, nextIndent, key)
    }
    const summaryContent = summaryMatch[2].trim()
    const summaryInline = summaryContent.includes('<') 
      ? parseInlineHTML(summaryContent, '', 0)
      : escapeJSX(summaryContent)
    result += `${indent}<summary key={${key}}>${summaryInline}</summary>\n`
    if (afterSummary.trim()) {
      result += parseHTMLRecursive(afterSummary, indent, nextIndent, key + 1)
    }
    return result
  }
  
  // 2.7. 处理嵌套的 <tr> 和 <td> 标签（不完整的情况）- 展开为普通内容
  // 这些标签在不完整的情况下会被忽略，直接解析其内容
  const trMatch = html.match(/<tr([^>]*)>/i)
  if (trMatch && !html.includes('</tr>')) {
    const beforeTr = html.substring(0, trMatch.index || 0)
    const afterTr = html.substring((trMatch.index || 0) + trMatch[0].length)
    let result = ''
    if (beforeTr.trim()) {
      result += parseHTMLRecursive(beforeTr, indent, nextIndent, key)
    }
    // 展开 tr，直接解析内容
    if (afterTr.trim()) {
      result += parseHTMLRecursive(afterTr, indent, nextIndent, key)
    }
    return result
  }
  
  const tdMatch = html.match(/<td([^>]*)>/i)
  if (tdMatch && !html.includes('</td>')) {
    const beforeTd = html.substring(0, tdMatch.index || 0)
    const afterTd = html.substring((tdMatch.index || 0) + tdMatch[0].length)
    let result = ''
    if (beforeTd.trim()) {
      result += parseHTMLRecursive(beforeTd, indent, nextIndent, key)
    }
    // 展开 td，直接解析内容
    if (afterTd.trim()) {
      result += parseHTMLRecursive(afterTd, indent, nextIndent, key)
    }
    return result
  }
  
  // 3. 处理 <h1>...</h1> 到 <h6>...</h6> 标题标签
  const headingMatch = html.match(/<(h[1-6])([^>]*)>([\s\S]*?)<\/h[1-6]>/i)
  if (headingMatch) {
    const beforeHeading = html.substring(0, headingMatch.index || 0)
    const afterHeading = html.substring((headingMatch.index || 0) + headingMatch[0].length)
    let result = ''
    if (beforeHeading.trim()) {
      result += parseHTMLRecursive(beforeHeading, indent, nextIndent, key)
    }
    const tagName = headingMatch[1]
    const attrs = parseHTMLAttributes(headingMatch[2])
    const attrsJSX = htmlAttrsToJSX(attrs)
    const headingContent = headingMatch[3].trim()
    const headingInline = headingContent.includes('<') 
      ? parseInlineHTML(headingContent, '', 0)
      : escapeJSX(headingContent)
    result += `${indent}<${tagName} key={${key}}${attrsJSX}>${headingInline}</${tagName}>\n`
    if (afterHeading.trim()) {
      result += parseHTMLRecursive(afterHeading, indent, nextIndent, key + 1)
    }
    return result
  }
  
  // 4. 处理 <div>...</div>
  const divMatch = html.match(/<div([^>]*)>([\s\S]*?)<\/div>/i)
  if (divMatch) {
    const beforeDiv = html.substring(0, divMatch.index || 0)
    const afterDiv = html.substring((divMatch.index || 0) + divMatch[0].length)
    let result = ''
    if (beforeDiv.trim()) {
      result += parseHTMLRecursive(beforeDiv, indent, nextIndent, key)
    }
    result += parseDivHTML(divMatch[1], divMatch[2], indent, nextIndent, key)
    if (afterDiv.trim()) {
      result += parseHTMLRecursive(afterDiv, indent, nextIndent, key + 1)
    }
    return result
  }
  
  // 5. 处理 <p>...</p>
  const pMatch = html.match(/<p([^>]*)>([\s\S]*?)<\/p>/i)
  if (pMatch) {
    const beforeP = html.substring(0, pMatch.index || 0)
    const afterP = html.substring((pMatch.index || 0) + pMatch[0].length)
    let result = ''
    if (beforeP.trim()) {
      result += parseHTMLRecursive(beforeP, indent, nextIndent, key)
    }
    const pAttrs = parseHTMLAttributes(pMatch[1])
    const pAttrsJSX = htmlAttrsToJSX(pAttrs)
    const pContent = parseInlineHTML(pMatch[2], htmlIndent + '  ', 0)
    result += `${indent}<p key={${key}}${pAttrsJSX}>${pContent}</p>\n`
    if (afterP.trim()) {
      result += parseHTMLRecursive(afterP, indent, nextIndent, key + 1)
    }
    return result
  }
  
  // 6. 处理 <img>
  const imgMatch = html.match(/<img([^>]*)\s*\/?>/i)
  if (imgMatch) {
    const beforeImg = html.substring(0, imgMatch.index || 0)
    const afterImg = html.substring((imgMatch.index || 0) + imgMatch[0].length)
    let result = ''
    if (beforeImg.trim()) {
      result += parseHTMLRecursive(beforeImg, indent, nextIndent, key)
    }
    result += parseImgHTML(imgMatch[1], indent, key)
    if (afterImg.trim()) {
      result += parseHTMLRecursive(afterImg, indent, nextIndent, key + 1)
    }
    return result
  }
  
  // 7. 处理 <br>
  if (html.trim() === '<br>' || html.trim() === '<br/>' || html.trim() === '<br />' || html.trim() === '</br>') {
    return `${indent}<br key={${key}} />\n`
  }
  
  // 8. 处理 <hr>
  if (html.trim() === '<hr>' || html.trim() === '<hr/>' || html.trim() === '<hr />') {
    return `${indent}<hr key={${key}} />\n`
  }
  
  // 9. 处理闭合标签 - 忽略
  if (html.trim().match(/^<\/\w+>$/)) {
    return ''
  }
  
  // 10. 处理内联 HTML（<code>, <strong>, <em>, <a> 等）
  if (html.includes('<')) {
    return `${indent}<span key={${key}}>${parseInlineHTML(html, '', 0)}</span>\n`
  }
  
  // 11. 处理纯文本
  const textContent = html.trim()
  if (textContent) {
    return `${indent}<span key={${key}}>${escapeJSX(textContent)}</span>\n`
  }
  
  return ''
}

/**
 * 解析内联 HTML 标签（<code>, <strong>, <em>, <a> 等）
 */
function parseInlineHTML(html: string, indent: string, key: number): string {
  if (!html || !html.trim()) return ''
  
  // 移除所有 HTML 标签，保留文本
  const textOnly = html.replace(/<[^>]+>/g, '')
  if (!html.includes('<')) {
    return escapeJSX(textOnly)
  }
  
  let result = html
  let elementKey = key
  
  // 处理 <a>...</a>（优先处理，因为可能包含其他标签）
  result = result.replace(/<a([^>]*)>([\s\S]*?)<\/a>/gi, (_match, attrs, content) => {
    const aAttrs = parseHTMLAttributes(attrs)
    const aAttrsJSX = htmlAttrsToJSX(aAttrs)
    const parsedContent = parseInlineHTML(content, indent, elementKey++)
    return `<a${aAttrsJSX}>${parsedContent}</a>`
  })
  
  // 处理 <code>...</code>
  result = result.replace(/<code([^>]*)>([\s\S]*?)<\/code>/gi, (_match, attrs, content) => {
    const parsedContent = parseInlineHTML(content, indent, elementKey++)
    return `<code>${parsedContent}</code>`
  })
  
  // 处理 <strong>...</strong>
  result = result.replace(/<strong([^>]*)>([\s\S]*?)<\/strong>/gi, (_match, attrs, content) => {
    const parsedContent = parseInlineHTML(content, indent, elementKey++)
    return `<strong>${parsedContent}</strong>`
  })
  
  // 处理 <em>...</em>
  result = result.replace(/<em([^>]*)>([\s\S]*?)<\/em>/gi, (_match, attrs, content) => {
    const parsedContent = parseInlineHTML(content, indent, elementKey++)
    return `<em>${parsedContent}</em>`
  })
  
  // 处理剩余的未识别标签，直接移除（但保留文本）
  // 只移除没有被上述处理过的标签（即不是 a, code, strong, em）
  result = result.replace(/<(?!\/?(?:a|code|strong|em)\b)[^>]+>/gi, '')
  
  return result
}

/**
 * 解析 HTML 属性
 */
function parseHTMLAttributes(attrString: string): Record<string, string | number | boolean | Record<string, string>> {
  const attrs: Record<string, string | number | boolean | Record<string, string>> = {}
  if (!attrString || !attrString.trim()) return attrs

  // 先处理 align 属性（转换为 style）
  const alignMatch = attrString.match(/align=["']([^"']+)["']/i)
  if (alignMatch) {
    if (!attrs.style) {
      attrs.style = {} as Record<string, string>
    }
    (attrs.style as Record<string, string>).textAlign = alignMatch[1]
  }

  const attrPattern = /(\w+)=["']([^"']*)["']/g
  let match

  while ((match = attrPattern.exec(attrString)) !== null) {
    const name = match[1].toLowerCase()
    let value: string | number | boolean = match[2]

    // 跳过 align 属性，因为它已经被转换为 style
    if (name === 'align') {
      continue
    }

    if (name === 'width' || name === 'height') {
      const numValue = parseInt(value, 10)
      if (!isNaN(numValue)) {
        value = numValue
      }
    } else if (name === 'open') {
      value = true
    }

    const reactName = name === 'class' ? 'className' : name === 'for' ? 'htmlFor' : name
    attrs[reactName] = value
  }

  return attrs
}

/**
 * 将 HTML 属性对象转换为 JSX 属性字符串
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function htmlAttrsToJSX(attrs: Record<string, any>): string {
  const parts: string[] = []

  for (const [key, value] of Object.entries(attrs)) {
    if (value === undefined || value === null) continue

    if (key === 'style' && typeof value === 'object') {
      const styleStr = Object.entries(value)
        .map(([k, v]) => `${k}: '${v}'`)
        .join(', ')
      parts.push(`style={{ ${styleStr} }}`)
    } else if (typeof value === 'boolean') {
      if (value) {
        parts.push(key)
      }
    } else if (typeof value === 'number') {
      parts.push(`${key}={${value}}`)
    } else {
      const escaped = String(value)
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
      parts.push(`${key}="${escaped}"`)
    }
  }

  return parts.length > 0 ? ' ' + parts.join(' ') : ''
}

/**
 * 解析表格 HTML
 */
function parseTableHTML(attrsStr: string, content: string, indent: string, nextIndent: number, key: number): string {
  const attrs = parseHTMLAttributes(attrsStr)
  const attrsJSX = htmlAttrsToJSX(attrs)
  const htmlIndent = '  '.repeat(nextIndent)
  const rowIndent = '  '.repeat(nextIndent + 1)
  const cellIndent = '  '.repeat(nextIndent + 2)
  
  let jsx = `${indent}<table key={${key}}${attrsJSX}>\n`
  
  const theadMatch = content.match(/<thead[^>]*>([\s\S]*?)<\/thead>/i)
  if (theadMatch) {
    const theadContent = theadMatch[1]
    const trMatch = theadContent.match(/<tr[^>]*>([\s\S]*?)<\/tr>/i)
    if (trMatch) {
      const cells = parseTableCells(trMatch[1], 'th', cellIndent)
      jsx += `${htmlIndent}<thead>\n${rowIndent}<tr>\n${cells}${rowIndent}</tr>\n${htmlIndent}</thead>\n`
    }
  }
  
  const tbodyMatch = content.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i)
  if (tbodyMatch) {
    const tbodyContent = tbodyMatch[1]
    const rows = parseTableRows(tbodyContent, rowIndent, cellIndent)
    jsx += `${htmlIndent}<tbody>\n${rows}${htmlIndent}</tbody>\n`
  } else {
    const rows = parseTableRows(content, rowIndent, cellIndent)
    if (rows) {
      jsx += `${htmlIndent}<tbody>\n${rows}${htmlIndent}</tbody>\n`
    }
  }
  
  jsx += `${indent}</table>\n`
  return jsx
}

/**
 * 解析 details HTML
 */
function parseDetailsHTML(attrsStr: string, content: string, indent: string, nextIndent: number, key: number): string {
  const attrs = parseHTMLAttributes(attrsStr)
  const attrsJSX = htmlAttrsToJSX(attrs)
  const htmlIndent = '  '.repeat(nextIndent)
  
  let jsx = `${indent}<details key={${key}}${attrsJSX}>\n`
  
  const summaryMatch = content.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i)
  if (summaryMatch) {
    const summaryContent = summaryMatch[1].trim()
    const summaryInline = summaryContent.includes('<') 
      ? parseInlineHTML(summaryContent, '', 0)
      : escapeJSX(summaryContent)
    jsx += `${htmlIndent}<summary>${summaryInline}</summary>\n`
    
    const remainingContent = content.replace(/<summary[^>]*>[\s\S]*?<\/summary>/i, '').trim()
    if (remainingContent) {
      const parsed = parseHTMLRecursive(remainingContent, htmlIndent, nextIndent + 1, 0)
      if (parsed) {
        jsx += parsed
      }
    }
  } else {
    const parsed = parseHTMLRecursive(content, htmlIndent, nextIndent + 1, 0)
    if (parsed) {
      jsx += parsed
    }
  }
  
  jsx += `${indent}</details>\n`
  return jsx
}

/**
 * 解析 div HTML
 */
function parseDivHTML(attrsStr: string, content: string, indent: string, nextIndent: number, key: number): string {
  const attrs = parseHTMLAttributes(attrsStr)
  // 移除 align 属性（如果存在），因为它已经在 parseHTMLAttributes 中被转换为 style
  const attrsJSX = htmlAttrsToJSX(attrs)
  const htmlIndent = '  '.repeat(nextIndent)
  
  const parsedContent = parseHTMLRecursive(content, htmlIndent, nextIndent + 1, 0)
  if (parsedContent.trim()) {
    return `${indent}<div key={${key}}${attrsJSX}>\n${parsedContent}${indent}</div>\n`
  } else {
    return `${indent}<div key={${key}}${attrsJSX} />\n`
  }
}

/**
 * 解析 img HTML - 使用 BaikeImage 组件
 */
function parseImgHTML(attrsStr: string, indent: string, key: number): string {
  const attrs = parseHTMLAttributes(attrsStr)
  
  // 提取关键属性，确保转换为字符串
  const src = String(attrs.src || attrs.SRC || '')
  const alt = String(attrs.alt || attrs.ALT || '')
  const width = String(attrs.width || attrs.WIDTH || '')
  
  // 构建 BaikeImage 组件的属性
  let props = `key={${key}} src="${escapeHtmlAttr(src)}"`
  if (alt) {
    props += ` alt="${escapeHtmlAttr(alt)}"`
  }
  if (width) {
    // 如果 width 是数字，直接使用；否则作为字符串
    const widthValue = /^\d+$/.test(width) ? width : `"${width}"`
    props += ` width={${widthValue}}`
  }
  // 添加 maxWidth 限制，防止图片过大
  props += ` maxWidth="100%"`
  
  return `${indent}<BaikeImage ${props} />\n`
}

/**
 * 解析表格单元格
 */
function parseTableCells(rowContent: string, cellTag: 'td' | 'th', cellIndent: string): string {
  const cells: string[] = []
  const cellPattern = new RegExp(`<${cellTag}([^>]*)>([\\s\\S]*?)</${cellTag}>`, 'gi')
  let cellMatch
  let cellIndex = 0

  while ((cellMatch = cellPattern.exec(rowContent)) !== null) {
    const attrs = parseHTMLAttributes(cellMatch[1])
    const content = cellMatch[2].trim()
    const attrsJSX = htmlAttrsToJSX(attrs)
    
    if (content.includes('<')) {
      const parsedContent = parseInlineHTML(content, '', 0)
      cells.push(`${cellIndent}<${cellTag} key={${cellIndex}}${attrsJSX}>${parsedContent}</${cellTag}>\n`)
    } else {
      cells.push(`${cellIndent}<${cellTag} key={${cellIndex}}${attrsJSX}>${escapeJSX(content)}</${cellTag}>\n`)
    }
    cellIndex++
  }

  return cells.join('')
}

/**
 * 解析多个表格行
 */
function parseTableRows(rowsContent: string, rowIndent: string, cellIndent: string): string {
  const rows: string[] = []
  const trPattern = /<tr([^>]*)>([\s\S]*?)<\/tr>/gi
  let trMatch
  let rowIndex = 0

  while ((trMatch = trPattern.exec(rowsContent)) !== null) {
    const attrs = parseHTMLAttributes(trMatch[1])
    const content = trMatch[2]
    const attrsJSX = htmlAttrsToJSX(attrs)
    
    const cells = parseTableCells(content, 'td', cellIndent)
    rows.push(`${rowIndent}<tr key={${rowIndex}}${attrsJSX}>\n${cells}${rowIndent}</tr>\n`)
    rowIndex++
  }

  return rows.join('')
}

/**
 * 画廊转 JSX - 使用 <div> 和 <img> 标签
 */
function galleryToJSX(item: ContentItem, index: number, indent: string, nextIndent: number): string {
  const gallery = item.gallery
  if (!gallery) return ''
  
  const folder = gallery.folder || ''
  const images = gallery.images || []
  const galleryIndent = '  '.repeat(nextIndent)
  const itemIndent = '  '.repeat(nextIndent + 1)
  
  let jsx = `${indent}<div key={${index}} className="image-gallery">\n`
  
  images.forEach((img, idx) => {
    const src = img.src.startsWith('./') 
      ? img.src.replace(/^\.\//, '/')
      : folder 
        ? `/${folder}/${encodeURIComponent(img.src)}`
        : `/${encodeURIComponent(img.src)}`
    // 优先使用中文 alt
    const alt = (img as { alt_cn?: string; alt?: string; src: string }).alt_cn || img.alt || img.src
    
    jsx += `${galleryIndent}<div key={${idx}} className="gallery-item">\n`
    jsx += `${itemIndent}<BaikeImage src="${escapeHtmlAttr(src)}" alt="${escapeHtmlAttr(alt)}" maxWidth="100%" />\n`
    jsx += `${galleryIndent}</div>\n`
  })
  
  jsx += `${indent}</div>\n`
  return jsx
}

/**
 * 将 ContentItem 数组转换为完整的 JSX 组件代码
 */
export function contentItemsToJSXComponent(
  contentItems: ContentItem[],
  componentName: string
): string {
  const jsxItems = contentItems
    .map((item, index) => contentItemToJSX(item, index, 2))
    .join('')
  
  // 检查是否包含图片（需要导入 BaikeImage）
  const hasImages = jsxItems.includes('<BaikeImage') || jsxItems.includes('<img')
  // 计算正确的导入路径（从生成的组件文件到 components 目录）
  // 生成的组件在 pages/baike/*/index.tsx，需要回到 src/components
  const importStatement = hasImages 
    ? `import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'
`
    : `import React from 'react'
`
  
  return `${importStatement}
export const ${componentName} = () => {
  return (
    <div className="baike-content">
${jsxItems}    </div>
  )
}
`
}
