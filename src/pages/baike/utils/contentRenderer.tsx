/**
 * ContentItem 到 TSX 的渲染工具
 * 将 ContentItem 数组转换为 React 组件
 */

import React from 'react'
import type { ContentItem } from '../../../config/types'

/**
 * 渲染单个 ContentItem
 */
export function renderContentItem(item: ContentItem, index: number): React.ReactNode {
  switch (item.type) {
    case 'text':
      return renderText(item, index)
    case 'paragraph':
      return renderParagraph(item, index)
    case 'list':
      return renderList(item, index)
    case 'blockquote':
      return renderBlockquote(item, index)
    case 'table':
      return renderTable(item, index)
    case 'code_block':
      return renderCodeBlock(item, index)
    case 'html':
      return renderHtml(item, index)
    case 'gallery':
      return renderGallery(item, index)
    default:
      return null
  }
}

/**
 * 渲染文本
 */
function renderText(item: ContentItem, index: number): React.ReactNode {
  const content = item.content_zh || item.translatedContent || item.content || ''
  
  // 处理链接
  if (item.links && item.links.length > 0) {
    let result = content
    item.links.forEach((link) => {
      const isExternal = link.url.startsWith('http://') || link.url.startsWith('https://')
      const linkElement = isExternal
        ? `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.text}</a>`
        : `<a href="${link.url}">${link.text}</a>`
      result = result.replace(link.text, linkElement)
    })
    return <p key={index} dangerouslySetInnerHTML={{ __html: result }} />
  }
  
  return <p key={index}>{content}</p>
}

/**
 * 渲染段落
 */
function renderParagraph(item: ContentItem, index: number): React.ReactNode {
  const content = item.content_zh || item.translatedContent || item.content || ''
  return <p key={index}>{content}</p>
}

/**
 * 渲染列表
 */
function renderList(item: ContentItem, index: number): React.ReactNode {
  if (!item.items || item.items.length === 0) return null
  
  const listItems = item.items.map((listItem, idx) => {
    const listItemAny = listItem as { content_zh?: string; translatedContent?: string; content?: string; indent?: number }
    const content = listItemAny.content_zh || 
                   listItemAny.translatedContent || 
                   listItemAny.content || 
                   ''
    const indent = listItemAny.indent || 0
    
    // 处理嵌套列表
    if (indent > 0) {
      return (
        <li key={idx} style={{ marginLeft: `${indent * 20}px` }}>
          {renderMarkdownContent(content)}
        </li>
      )
    }
    
    return (
      <li key={idx}>
        {renderMarkdownContent(content)}
      </li>
    )
  })
  
  return <ul key={index}>{listItems}</ul>
}

/**
 * 渲染引用
 */
function renderBlockquote(item: ContentItem, index: number): React.ReactNode {
  const quotes = item.quotes || item.content_cn || []
  return (
    <blockquote key={index}>
      {quotes.map((quote, idx) => (
        <p key={idx}>{quote}</p>
      ))}
    </blockquote>
  )
}

/**
 * 渲染表格
 */
function renderTable(item: ContentItem, index: number): React.ReactNode {
  const table = item.translatedTable || item.table
  if (!table || !table.headers || !table.rows) return null
  
  return (
    <table key={index}>
      <thead>
        <tr>
          {table.headers.map((header, idx) => (
            <th key={idx}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {row.map((cell, cellIdx) => (
              <td key={cellIdx} dangerouslySetInnerHTML={{ __html: cell }} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

/**
 * 渲染代码块
 */
function renderCodeBlock(item: ContentItem, index: number): React.ReactNode {
  const code = item.code || ''
  const language = item.language || ''
  return (
    <pre key={index}>
      <code className={language ? `language-${language}` : ''}>{code}</code>
    </pre>
  )
}

/**
 * 渲染 HTML
 */
function renderHtml(item: ContentItem, index: number): React.ReactNode {
  const html = item.translatedHtml || item.html || ''
  if (!html) return null
  
  // 修复图片路径
  const fixedHtml = fixImagePaths(html)
  
  return <div key={index} dangerouslySetInnerHTML={{ __html: fixedHtml }} />
}

/**
 * 渲染图片画廊
 */
function renderGallery(item: ContentItem, index: number): React.ReactNode {
  const gallery = item.gallery
  if (!gallery || !gallery.images || gallery.images.length === 0) return null
  
  const folder = gallery.folder || '/costume_collection/'
  
  return (
    <div key={index} className="image-gallery">
      {gallery.images.map((img, idx) => {
        let src = img.src
        if (!src.startsWith('./') && !src.startsWith('/') && !src.startsWith('http://') && !src.startsWith('https://')) {
          src = `${folder}${src}`
        }
        if (src.startsWith('./')) {
          src = src.replace(/^\.\//, '/')
        }
        
        // URL 编码文件名部分
        const pathParts = src.split('/')
        const encodedParts = pathParts.map((part, partIndex) => {
          if (partIndex === pathParts.length - 1 && part) {
            return encodeURIComponent(part)
          }
          return part
        })
        src = encodedParts.join('/')
        
        const alt = img.alt || decodeURIComponent(img.src.replace(/^.*\//, '').replace(/\.[^.]+$/, ''))
        
        return (
          <div key={idx} className="gallery-item">
            <img src={src} alt={alt}   />
          </div>
        )
      })}
    </div>
  )
}

/**
 * 渲染 Markdown 内容（简单处理）
 */
function renderMarkdownContent(content: string): React.ReactNode {
  // 简单的 Markdown 处理：代码、链接、粗体等
  let html = content
  
  // 处理代码 `code`
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  
  // 处理粗体 **text**
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  
  // 处理链接 [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    const isExternal = url.startsWith('http://') || url.startsWith('https://')
    if (isExternal) {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`
    }
    return `<a href="${url}">${text}</a>`
  })
  
  return <span dangerouslySetInnerHTML={{ __html: html }} />
}

/**
 * 修复图片路径
 */
function fixImagePaths(html: string): string {
  // 修复相对路径
  html = html.replace(/<img([^>]*?)src=["'](\.\/[^"']+)["']/g, (match, attrs, src) => {
    const fixedSrc = src.replace(/^\.\//, '/')
    return `<img${attrs}src="${fixedSrc}"`
  })
  
  html = html.replace(/src=["'](\.\/[^"']+\.(png|jpg|jpeg|gif|svg|ico))["']/gi, (match, src) => {
    const fixedSrc = src.replace(/^\.\//, '/')
    return `src="${fixedSrc}"`
  })
  
  return html
}

/**
 * 渲染 ContentItem 数组
 */
export function renderContentItems(items: ContentItem[]): React.ReactNode {
  return items.map((item, index) => renderContentItem(item, index))
}

