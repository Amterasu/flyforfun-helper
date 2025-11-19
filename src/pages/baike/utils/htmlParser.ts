/**
 * HTML 字符串解析器
 * 将 HTML 字符串转换为 React JSX 元素
 */

import React from 'react'

/**
 * 解析 HTML 字符串为 React 元素
 * 这是一个简化的解析器，处理常见的 HTML 标签
 */
export function parseHTMLToJSX(html: string, key: number = 0): React.ReactNode {
  if (!html || !html.trim()) return null

  // 修复图片路径
  let fixedHtml = html.replace(/src=["'](\.\/[^"']+)["']/g, (_match: string, src: string) => {
    const fixedSrc = src.replace(/^\.\//, '/')
    return `src="${fixedSrc}"`
  })

  // 移除所有危险的标签和属性
  fixedHtml = fixedHtml
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
    .replace(/on\w+=["'][^"']*["']/gi, '') // 移除事件处理器

  // 处理常见的 HTML 结构
  const elements: React.ReactNode[] = []
  let currentIndex = 0

  // 简单的标签匹配和处理
  const tagPattern = /<(\/?)(\w+)([^>]*)>/gi
  let match
  let lastIndex = 0
  const stack: Array<{ tag: string; props: Record<string, string>; children: React.ReactNode[] }> = []

  // 由于 HTML 解析很复杂，我们使用一个更简单的方法：
  // 对于简单的标签，直接转换；对于复杂的，使用 dangerouslySetInnerHTML（但尽量少用）

  // 处理自闭合标签
  fixedHtml = fixedHtml.replace(/<br\s*\/?>/gi, '<br />')
  fixedHtml = fixedHtml.replace(/<hr\s*\/?>/gi, '<hr />')
  fixedHtml = fixedHtml.replace(/<img([^>]*?)>/gi, (match, attrs) => {
    return `<img${attrs} />`
  })

  // 尝试解析为 JSX
  try {
    // 使用一个简单的递归下降解析器
    return parseHTMLRecursive(fixedHtml, key)
  } catch (error) {
    // 如果解析失败，返回一个包含原始 HTML 的 div
    console.warn('Failed to parse HTML, using dangerouslySetInnerHTML:', error)
    return React.createElement('div', { key, dangerouslySetInnerHTML: { __html: fixedHtml } })
  }
}

/**
 * 递归解析 HTML
 */
function parseHTMLRecursive(html: string, key: number = 0): React.ReactNode {
  if (!html || !html.trim()) return null

  // 移除首尾空白
  html = html.trim()

  // 处理纯文本（没有标签）
  if (!html.includes('<')) {
    return html
  }

  // 处理常见的简单标签
  // <details> 和 <summary>
  if (html.startsWith('<details')) {
    const detailsMatch = html.match(/<details([^>]*)>([\s\S]*?)<\/details>/i)
    if (detailsMatch) {
      const attrs = parseAttributes(detailsMatch[1])
      const content = detailsMatch[2]
      const children = parseHTMLRecursive(content, 0)
      return React.createElement('details', { key, ...attrs }, children)
    }
  }

  if (html.startsWith('<summary')) {
    const summaryMatch = html.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i)
    if (summaryMatch) {
      const content = summaryMatch[1]
      return React.createElement('summary', { key }, content)
    }
  }

  // 处理 <table>, <tr>, <td>, <th>
  if (html.startsWith('<table')) {
    const tableMatch = html.match(/<table([^>]*)>([\s\S]*?)<\/table>/i)
    if (tableMatch) {
      const attrs = parseAttributes(tableMatch[1])
      const content = tableMatch[2]
      const children = parseTableContent(content)
      return React.createElement('table', { key, ...attrs }, children)
    }
  }

  // 处理 <div>
  if (html.startsWith('<div')) {
    const divMatch = html.match(/<div([^>]*)>([\s\S]*?)<\/div>/i)
    if (divMatch) {
      const attrs = parseAttributes(divMatch[1])
      const content = divMatch[2]
      const children = parseHTMLRecursive(content, 0)
      return React.createElement('div', { key, ...attrs }, children)
    }
  }

  // 处理 <p>
  if (html.startsWith('<p')) {
    const pMatch = html.match(/<p([^>]*)>([\s\S]*?)<\/p>/i)
    if (pMatch) {
      const attrs = parseAttributes(pMatch[1])
      const content = pMatch[2]
      const children = parseHTMLRecursive(content, 0)
      return React.createElement('p', { key, ...attrs }, children)
    }
  }

  // 处理 <img>
  const imgMatch = html.match(/<img([^>]*)\s*\/?>/i)
  if (imgMatch) {
    const attrs = parseAttributes(imgMatch[1])
    return React.createElement('img', { key, ...attrs })
  }

  // 处理 <br>
  if (html.includes('<br')) {
    html = html.replace(/<br\s*\/?>/gi, '')
    return React.createElement(React.Fragment, { key }, [
      parseHTMLRecursive(html, 0),
      React.createElement('br', { key: `${key}-br` })
    ])
  }

  // 如果无法解析，返回原始 HTML（使用 dangerouslySetInnerHTML）
  return React.createElement('div', { key, dangerouslySetInnerHTML: { __html: html } })
}

/**
 * 解析 HTML 属性
 */
function parseAttributes(attrString: string): Record<string, string | number | boolean> {
  const attrs: Record<string, string | number | boolean> = {}
  if (!attrString) return attrs

  // 匹配属性
  const attrPattern = /(\w+)=["']([^"']*)["']/g
  let match

  while ((match = attrPattern.exec(attrString)) !== null) {
    const name = match[1]
    let value: string | number | boolean = match[2]

    // 转换常见的属性
    if (name === 'width' || name === 'height') {
      const numValue = parseInt(value, 10)
      if (!isNaN(numValue)) {
        value = numValue
      }
    } else if (name === 'open') {
      value = true
    } else if (name === 'align') {
      // align 转换为 style
      attrs.style = { textAlign: value }
      continue
    }

    // 转换 HTML 属性名到 React 属性名
    const reactName = name === 'class' ? 'className' : name
    attrs[reactName] = value
  }

  // 处理 style 属性
  const styleMatch = attrString.match(/style=["']([^"']*)["']/)
  if (styleMatch) {
    const styleStr = styleMatch[1]
    const styleObj: Record<string, string> = {}
    styleStr.split(';').forEach((rule) => {
      const [prop, val] = rule.split(':').map((s) => s.trim())
      if (prop && val) {
        const camelProp = prop.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
        styleObj[camelProp] = val
      }
    })
    attrs.style = styleObj
  }

  return attrs
}

/**
 * 解析表格内容
 */
function parseTableContent(content: string): React.ReactNode[] {
  const children: React.ReactNode[] = []
  let index = 0

  // 处理 <thead>
  const theadMatch = content.match(/<thead[^>]*>([\s\S]*?)<\/thead>/i)
  if (theadMatch) {
    const theadContent = theadMatch[1]
    const trMatch = theadContent.match(/<tr[^>]*>([\s\S]*?)<\/tr>/i)
    if (trMatch) {
      const cells = parseTableRow(trMatch[1], 'th')
      children.push(React.createElement('thead', { key: index++ }, 
        React.createElement('tr', { key: 0 }, cells)
      ))
    }
  }

  // 处理 <tbody>
  const tbodyMatch = content.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i)
  if (tbodyMatch) {
    const tbodyContent = tbodyMatch[1]
    const rows: React.ReactNode[] = []
    const trPattern = /<tr[^>]*>([\s\S]*?)<\/tr>/gi
    let trMatch
    let rowIndex = 0

    while ((trMatch = trPattern.exec(tbodyContent)) !== null) {
      const cells = parseTableRow(trMatch[1], 'td')
      rows.push(React.createElement('tr', { key: rowIndex++ }, cells))
    }

    children.push(React.createElement('tbody', { key: index++ }, rows))
  } else {
    // 如果没有 tbody，直接处理 tr
    const trPattern = /<tr[^>]*>([\s\S]*?)<\/tr>/gi
    let trMatch
    let rowIndex = 0
    const rows: React.ReactNode[] = []

    while ((trMatch = trPattern.exec(content)) !== null) {
      const cells = parseTableRow(trMatch[1], 'td')
      rows.push(React.createElement('tr', { key: rowIndex++ }, cells))
    }

    if (rows.length > 0) {
      children.push(React.createElement('tbody', { key: index++ }, rows))
    }
  }

  return children
}

/**
 * 解析表格行
 */
function parseTableRow(rowContent: string, cellTag: 'td' | 'th'): React.ReactNode[] {
  const cells: React.ReactNode[] = []
  const cellPattern = new RegExp(`<${cellTag}[^>]*>([\\s\\S]*?)<\/${cellTag}>`, 'gi')
  let cellMatch
  let cellIndex = 0

  while ((cellMatch = cellPattern.exec(rowContent)) !== null) {
    const cellContent = cellMatch[1]
    const attrs = parseAttributes(cellMatch[0].match(/<${cellTag}([^>]*)>/)?.[1] || '')
    const children = parseHTMLRecursive(cellContent, 0)
    cells.push(React.createElement(cellTag, { key: cellIndex++, ...attrs }, children))
  }

  return cells
}

