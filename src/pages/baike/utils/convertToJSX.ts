/**
 * 批量转换所有 baike 组件，将 JSON 数据直接转换为 JSX
 * 运行方式: npx ts-node web/src/pages/baike/utils/convertToJSX.ts
 */

import * as fs from 'fs'
import * as path from 'path'
import { contentItemsToJSXComponent } from './jsonToJSX'
import type { ContentItem } from '../../../config/types'

/**
 * 处理 Markdown 内容，转换为安全的 HTML
 */
function processMarkdownContent(content: string): string {
  // 处理代码块
  content = content.replace(/`([^`]+)`/g, '<code>$1</code>')
  
  // 处理粗体
  content = content.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  content = content.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  
  // 处理链接
  content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    const isExternal = url.startsWith('http://') || url.startsWith('https://')
    if (isExternal) {
      return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(text)}</a>`
    }
    return `<a href="${escapeHtml(url)}">${escapeHtml(text)}</a>`
  })
  
  return content
}

/**
 * HTML 转义
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * 将单个 ContentItem 转换为 JSX 代码字符串
 */
function contentItemToJSX(item: ContentItem, index: number, indent: number = 0): string {
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

function textToJSX(item: ContentItem, index: number, indent: string, nextIndent: number): string {
  const content = (item as any).content_zh || (item as any).translatedContent || item.content || ''
  const processedContent = processMarkdownContent(content)
  
  if (item.links && item.links.length > 0) {
    let result = processedContent
    item.links.forEach((link) => {
      const isExternal = link.url.startsWith('http://') || link.url.startsWith('https://')
      const linkElement = isExternal
        ? `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.text)}</a>`
        : `<a href="${escapeHtml(link.url)}">${escapeHtml(link.text)}</a>`
      result = result.replace(link.text, linkElement)
    })
    return `${indent}<p key={${index}} dangerouslySetInnerHTML={{ __html: ${JSON.stringify(result)} }} />\n`
  }
  
  return `${indent}<p key={${index}} dangerouslySetInnerHTML={{ __html: ${JSON.stringify(processedContent)} }} />\n`
}

function paragraphToJSX(item: ContentItem, index: number, indent: string, nextIndent: number): string {
  const content = (item as any).content_zh || (item as any).translatedContent || item.content || ''
  const processedContent = processMarkdownContent(content)
  
  if (item.links && item.links.length > 0) {
    let result = processedContent
    item.links.forEach((link) => {
      const isExternal = link.url.startsWith('http://') || link.url.startsWith('https://')
      const linkElement = isExternal
        ? `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.text)}</a>`
        : `<a href="${escapeHtml(link.url)}">${escapeHtml(link.text)}</a>`
      result = result.replace(link.text, linkElement)
    })
    return `${indent}<p key={${index}} dangerouslySetInnerHTML={{ __html: ${JSON.stringify(result)} }} />\n`
  }
  
  return `${indent}<p key={${index}} dangerouslySetInnerHTML={{ __html: ${JSON.stringify(processedContent)} }} />\n`
}

function listToJSX(item: ContentItem, index: number, indent: string, nextIndent: number): string {
  if (!item.items || item.items.length === 0) return ''
  
  const items = item.items.map((listItem, idx) => {
    const listItemAny = listItem as { content_zh?: string; translatedContent?: string; content?: string; indent?: number }
    const content = listItemAny.content_zh || 
                   listItemAny.translatedContent || 
                   listItemAny.content || 
                   ''
    const itemIndent = listItemAny.indent || 0
    const processedContent = processMarkdownContent(content)
    
    const itemIndentStr = '  '.repeat(nextIndent + 1)
    const style = itemIndent > 0 ? ` style={{ marginLeft: '${itemIndent * 20}px' }}` : ''
    
    return `${itemIndentStr}<li key={${idx}}${style} dangerouslySetInnerHTML={{ __html: ${JSON.stringify(processedContent)} }} />\n`
  }).join('')
  
  return `${indent}<ul key={${index}}>\n${items}${indent}</ul>\n`
}

function blockquoteToJSX(item: ContentItem, index: number, indent: string, nextIndent: number): string {
  const quotes = (item as any).quotes_cn || (item as any).quotes || []
  if (quotes.length === 0) return ''
  
  const quoteItems = quotes.map((quote: string, idx: number) => {
    const processedQuote = processMarkdownContent(quote)
    const quoteIndent = '  '.repeat(nextIndent)
    return `${quoteIndent}<p key={${idx}} dangerouslySetInnerHTML={{ __html: ${JSON.stringify(processedQuote)} }} />\n`
  }).join('')
  
  return `${indent}<blockquote key={${index}}>\n${quoteItems}${indent}</blockquote>\n`
}

function tableToJSX(item: ContentItem, index: number, indent: string, nextIndent: number): string {
  if (!item.table) return ''
  
  const { headers, rows } = item.table
  const tableIndent = '  '.repeat(nextIndent)
  const rowIndent = '  '.repeat(nextIndent + 1)
  const cellIndent = '  '.repeat(nextIndent + 2)
  
  let jsx = `${indent}<table key={${index}}>\n`
  
  if (headers && headers.length > 0) {
    jsx += `${tableIndent}<thead>\n${rowIndent}<tr>\n`
    headers.forEach((header, idx) => {
      const headerContent = processMarkdownContent(header)
      jsx += `${cellIndent}<th key={${idx}} dangerouslySetInnerHTML={{ __html: ${JSON.stringify(headerContent)} }} />\n`
    })
    jsx += `${rowIndent}</tr>\n${tableIndent}</thead>\n`
  }
  
  if (rows && rows.length > 0) {
    jsx += `${tableIndent}<tbody>\n`
    rows.forEach((row, rowIdx) => {
      jsx += `${rowIndent}<tr key={${rowIdx}}>\n`
      row.forEach((cell, cellIdx) => {
        const cellContent = processMarkdownContent(cell)
        jsx += `${cellIndent}<td key={${cellIdx}} dangerouslySetInnerHTML={{ __html: ${JSON.stringify(cellContent)} }} />\n`
      })
      jsx += `${rowIndent}</tr>\n`
    })
    jsx += `${tableIndent}</tbody>\n`
  }
  
  jsx += `${indent}</table>\n`
  return jsx
}

function codeBlockToJSX(item: ContentItem, index: number, indent: string, nextIndent: number): string {
  const code = item.code || ''
  const language = item.language || ''
  const codeIndent = '  '.repeat(nextIndent)
  
  return `${indent}<pre key={${index}}><code className="${escapeHtml(language)}">${escapeHtml(code)}</code></pre>\n`
}

function htmlToJSX(item: ContentItem, index: number, indent: string, nextIndent: number): string {
  const html = (item as any).html_cn || (item as any).translatedHtml || item.html || ''
  
  // 修复图片路径
  let fixedHtml = html.replace(/src=["'](\.\/[^"']+)["']/g, (match, src) => {
    const fixedSrc = src.replace(/^\.\//, '/')
    return `src="${fixedSrc}"`
  })
  
  return `${indent}<div key={${index}} dangerouslySetInnerHTML={{ __html: ${JSON.stringify(fixedHtml)} }} />\n`
}

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
    const alt = img.alt || img.src
    
    jsx += `${galleryIndent}<div key={${idx}} className="gallery-item">\n`
    jsx += `${itemIndent}<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}"   />\n`
    jsx += `${galleryIndent}</div>\n`
  })
  
  jsx += `${indent}</div>\n`
  return jsx
}

function contentItemsToJSXComponent(contentItems: ContentItem[], componentName: string): string {
  const jsxItems = contentItems
    .map((item, index) => contentItemToJSX(item, index, 2))
    .join('')
  
  return `import React from 'react'

export const ${componentName} = () => {
  return (
    <div className="baike-content">
${jsxItems}    </div>
  )
}
`
}

/**
 * 批量转换所有 baike 组件
 */
function convertAllBaikeComponentsToJSX(): void {
  const baikeDir = path.join(__dirname, '..')
  
  function findTSXFiles(dir: string): string[] {
    const files: string[] = []
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory() && entry.name !== 'utils' && entry.name !== 'node_modules') {
        files.push(...findTSXFiles(fullPath))
      } else if (entry.isFile() && entry.name === 'index.tsx') {
        files.push(fullPath)
      }
    }
    
    return files
  }
  
  const tsxFiles = findTSXFiles(baikeDir)
  
  console.log(`Found ${tsxFiles.length} TSX files to convert`)
  
  let converted = 0
  let skipped = 0
  
  for (const tsxFile of tsxFiles) {
    try {
      const content = fs.readFileSync(tsxFile, 'utf-8')
      
      // 检查是否包含 contentItems 数组
      const contentItemsMatch = content.match(/const contentItems\s*=\s*(\[[\s\S]*?\])\s*as ContentItem\[\]/)
      
      if (contentItemsMatch) {
        try {
          // 使用 eval 来解析 JSON（因为可能包含注释等）
          const contentItemsJson = contentItemsMatch[1]
          const contentItems: ContentItem[] = eval(`(${contentItemsJson})`)
          
          // 提取组件名
          const componentMatch = content.match(/export const (\w+)\s*=/)
          if (componentMatch) {
            const componentName = componentMatch[1]
            
            // 生成 JSX 代码
            const jsxCode = contentItemsToJSXComponent(contentItems, componentName)
            
            // 写入文件
            fs.writeFileSync(tsxFile, jsxCode, 'utf-8')
            console.log(`✓ Converted ${path.relative(baikeDir, tsxFile)}`)
            converted++
          } else {
            console.log(`⚠ Skipped ${path.relative(baikeDir, tsxFile)}: No component name found`)
            skipped++
          }
        } catch (error) {
          console.error(`✗ Error converting ${path.relative(baikeDir, tsxFile)}:`, error)
          skipped++
        }
      } else {
        // 检查是否已经是 JSX 格式
        if (content.includes('dangerouslySetInnerHTML') || content.includes('<p key=')) {
          console.log(`⊘ Already JSX: ${path.relative(baikeDir, tsxFile)}`)
          skipped++
        } else {
          console.log(`⚠ Skipped ${path.relative(baikeDir, tsxFile)}: No contentItems found`)
          skipped++
        }
      }
    } catch (error) {
      console.error(`✗ Error reading ${path.relative(baikeDir, tsxFile)}:`, error)
      skipped++
    }
  }
  
  console.log(`\nConversion complete: ${converted} converted, ${skipped} skipped`)
}

// 如果直接运行此脚本
if (require.main === module) {
  convertAllBaikeComponentsToJSX()
}

export { convertAllBaikeComponentsToJSX }

