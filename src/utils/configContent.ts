/**
 * 从 config 文件夹加载并渲染内容
 */

import { marked } from 'marked'
import { getContentByAnchorId, contentItemsToMarkdown } from './configData'

// 缓存已渲染的内容
const contentCache: Map<string, string> = new Map()

/**
 * 根据锚点 ID 获取并渲染内容（从配置数据）
 */
export async function renderConfigContent(anchorId: string): Promise<string> {
  // 检查缓存
  const cached = contentCache.get(anchorId)
  if (cached !== undefined) {
    return cached
  }

  // 从配置数据获取内容
  const markdown = getContentByAnchorId(anchorId)
  
  if (!markdown) {
    return ''
  }

  // 配置 marked 选项
  marked.setOptions({
    breaks: true,
    gfm: true
  })

  // 自定义渲染器来修复图片路径
  const renderer = new marked.Renderer()

  // 自定义链接渲染器 - 外部链接在新页面打开
  renderer.link = (href: string | null, title: string | null, text: string) => {
    if (!href) return text || ''
    
    // 判断是否为外部链接（http/https）或锚点链接
    const isExternal = href.startsWith('http://') || href.startsWith('https://')
    const isAnchor = href.startsWith('#')
    
    // 对于外部链接，在新页面打开
    if (isExternal) {
      const titleAttr = title ? ` title="${title}"` : ''
      return `<a href="${href}" target="_blank" rel="noopener noreferrer"${titleAttr}>${text || ''}</a>`
    }
    
    // 对于内部链接或锚点，保持原样
    const titleAttr = title ? ` title="${title}"` : ''
    return `<a href="${href}"${titleAttr}>${text || ''}</a>`
  }

  // 自定义图片渲染器 - 如果是社区内容，不显示图片
  renderer.image = (href: string | null, title: string | null, text: string) => {
    // 社区页面不显示图片
    if (anchorId === 'community') {
      return ''
    }
    
    if (!href) return ''

    // 修复相对路径
    let fixedHref = href
    if (href.startsWith('./')) {
      fixedHref = href.replace(/^\.\//, '/')
    } else if (!href.startsWith('http://') && !href.startsWith('https://') && !href.startsWith('//') && !href.startsWith('/')) {
      fixedHref = `/${href}`
    }

    const titleAttr = title ? ` title="${title}"` : ''
    return `<img src="${fixedHref}" alt="${text || ''}"${titleAttr} />`
  }

  // 自定义 HTML 渲染器（处理 <img> 标签）
  renderer.html = (html: string) => {
    // 如果是社区内容，移除所有 img 标签
    if (anchorId === 'community') {
      html = html.replace(/<img[^>]*>/gi, '')
    } else {
      // 修复 HTML 中的图片路径
      html = fixImagePaths(html)
    }
    return html
  }

  try {
    const html = await marked(markdown, { renderer })
    // 如果是社区内容，移除所有 img 标签
    let fixedHtml = html as string
    if (anchorId === 'community') {
      fixedHtml = fixedHtml.replace(/<img[^>]*>/gi, '')
      // 确保所有外部链接都在新页面打开（作为备用，因为 renderer.link 已经处理了）
      fixedHtml = fixedHtml.replace(/<a([^>]*?)href=["'](https?:\/\/[^"']+)["']([^>]*?)>/gi, (match, attrs1, href, attrs2) => {
        // 如果已经有 target 属性，替换它；否则添加
        let newAttrs = (attrs1 + ' ' + attrs2).trim()
        if (newAttrs && !newAttrs.endsWith(' ')) {
          newAttrs += ' '
        }
        if (!newAttrs.includes('target=')) {
          newAttrs += 'target="_blank" '
        } else {
          newAttrs = newAttrs.replace(/target=["'][^"']*["']/gi, 'target="_blank"')
        }
        if (!newAttrs.includes('rel=')) {
          newAttrs += 'rel="noopener noreferrer"'
        }
        return `<a ${newAttrs}href="${href}">`
      })
    } else {
      // 再次修复可能的图片路径（处理已渲染的 HTML）
      fixedHtml = fixImagePaths(fixedHtml)
    }
    
    // 展开所有 details 标签，移除折叠功能
    fixedHtml = expandAllDetails(fixedHtml)
    
    // 缓存结果
    contentCache.set(anchorId, fixedHtml)
    return fixedHtml
  } catch (error) {
    console.error('Error rendering config content:', error)
    return ''
  }
}

/**
 * 展开所有 details 标签，移除折叠功能
 */
function expandAllDetails(html: string): string {
  // 移除 details 和 summary 标签，只保留内容
  // 匹配 <details>...</details> 结构，移除整个 summary 部分
  html = html.replace(/<details(?:\s[^>]*)?>[\s\S]*?<summary(?:\s[^>]*)?>[\s\S]*?<\/summary>/gi, (match) => {
    // 提取 summary 后的内容
    const summaryMatch = match.match(/<\/summary>([\s\S]*)$/i)
    return summaryMatch ? summaryMatch[1].trim() : ''
  })
  
  // 移除剩余的 details 闭合标签
  html = html.replace(/<\/details>/gi, '')
  
  // 移除可能遗留的 <details open> 等开始标签
  html = html.replace(/<details(?:\s[^>]*)?>/gi, '')
  
  // 移除可能遗留的 summary 标签
  html = html.replace(/<summary(?:\s[^>]*)?>[\s\S]*?<\/summary>/gi, '')
  
  return html
}

/**
 * 修复图片路径
 */
function fixImagePaths(html: string): string {
  // 匹配 HTML 中的 img 标签和 Markdown 图片语法
  // 1. 修复 <img src="./path/to/image.png"> 格式
  html = html.replace(/<img([^>]*?)src=["'](\.\/[^"']+)["']/g, (match, attrs, src) => {
    // 移除开头的 ./
    const fixedSrc = src.replace(/^\.\//, '/')
    return `<img${attrs}src="${fixedSrc}"`
  })

  // 2. 修复 Markdown 渲染后的 <img src="./path/to/image.png"> 格式
  html = html.replace(/src=["'](\.\/[^"']+\.(png|jpg|jpeg|gif|svg|ico))["']/gi, (match, src) => {
    const fixedSrc = src.replace(/^\.\//, '/')
    return `src="${fixedSrc}"`
  })

  // 3. 修复可能的绝对路径，确保以 / 开头
  html = html.replace(/src=["']([^"']+\.(png|jpg|jpeg|gif|svg|ico))["']/gi, (match, src) => {
    // 如果已经是绝对路径或完整的 URL，保持不变
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')) {
      return match
    }
    // 如果是相对路径且不是以 ./ 开头，添加 /
    if (!src.startsWith('/') && !src.startsWith('./')) {
      return `src="/${src}"`
    }
    // 如果是 ./ 开头，移除它
    if (src.startsWith('./')) {
      const fixedSrc = src.replace(/^\.\//, '/')
      return `src="${fixedSrc}"`
    }
    return match
  })

  return html
}

/**
 * 清除缓存
 */
export function clearConfigCache(): void {
  contentCache.clear()
}
