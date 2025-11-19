/**
 * HTML 到 JSX 转换器
 * 将 HTML 字符串转换为 JSX 代码字符串（用于代码生成）
 */

/**
 * 解析 HTML 属性字符串为对象
 */
function parseAttributes(attrString: string): Record<string, string | number | boolean | Record<string, string>> {
  const attrs: Record<string, string | number | boolean | Record<string, string>> = {}
  if (!attrString || !attrString.trim()) return attrs

  // 匹配属性 name="value" 或 name='value'
  const attrPattern = /(\w+)=["']([^"']*)["']/g
  let match

  while ((match = attrPattern.exec(attrString)) !== null) {
    const name = match[1]
    let value: string | number | boolean = match[2]

    // 转换数字属性
    if (name === 'width' || name === 'height') {
      const numValue = parseInt(value, 10)
      if (!isNaN(numValue)) {
        value = numValue
      }
    } else if (name === 'open') {
      value = true
    }

    // 转换 HTML 属性名到 React 属性名
    const reactName = name === 'class' ? 'className' : name === 'for' ? 'htmlFor' : name
    attrs[reactName] = value
  }

  // 处理 align 属性（转换为 style）
  const alignMatch = attrString.match(/align=["']([^"']+)["']/)
  if (alignMatch) {
    attrs.style = { textAlign: alignMatch[1] }
  }

  return attrs
}

/**
 * 将属性对象转换为 JSX 属性字符串
 */
function attrsToJSXString(attrs: Record<string, any>): string {
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
      // 转义字符串值
      const escaped = String(value)
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/'/g, "\\'")
      parts.push(`${key}="${escaped}"`)
    }
  }

  return parts.length > 0 ? ' ' + parts.join(' ') : ''
}

/**
 * 将 HTML 字符串转换为 JSX 代码字符串
 */
export function htmlToJSXString(html: string, indent: string, nextIndent: number, key: number): string {
  if (!html || !html.trim()) return ''

  // 修复图片路径
  let fixedHtml = html.replace(/src=["'](\.\/[^"']+)["']/g, (_match: string, src: string) => {
    const fixedSrc = src.replace(/^\.\//, '/')
    return `src="${fixedSrc}"`
  })

  // 移除危险的标签和属性
  fixedHtml = fixedHtml
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
    .replace(/on\w+=["'][^"']*["']/gi, '')

  const htmlIndent = '  '.repeat(nextIndent)

  // 处理常见的 HTML 标签，转换为 JSX
  // 1. 处理 <table>...</table>
  const tableMatch = fixedHtml.match(/<table([^>]*)>([\s\S]*?)<\/table>/i)
  if (tableMatch) {
    const attrs = parseAttributes(tableMatch[1])
    const content = tableMatch[2]
    const attrsStr = attrsToJSXString(attrs)
    
    // 解析表格内容
    const theadMatch = content.match(/<thead[^>]*>([\s\S]*?)<\/thead>/i)
    const tbodyMatch = content.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i)
    
    let jsx = `${indent}<table key={${key}}${attrsStr}>\n`
    
    if (theadMatch) {
      const theadContent = theadMatch[1]
      const trMatch = theadContent.match(/<tr[^>]*>([\s\S]*?)<\/tr>/i)
      if (trMatch) {
        const cells = parseTableRow(trMatch[1], 'th', htmlIndent, nextIndent + 1)
        jsx += `${htmlIndent}<thead>\n${htmlIndent}  <tr>\n${cells}${htmlIndent}  </tr>\n${htmlIndent}</thead>\n`
      }
    }
    
    if (tbodyMatch) {
      const tbodyContent = tbodyMatch[1]
      const rows = parseTableRows(tbodyContent, htmlIndent, nextIndent + 1)
      jsx += `${htmlIndent}<tbody>\n${rows}${htmlIndent}</tbody>\n`
    } else {
      // 如果没有 tbody，直接解析 tr
      const rows = parseTableRows(content, htmlIndent, nextIndent + 1)
      if (rows) {
        jsx += `${htmlIndent}<tbody>\n${rows}${htmlIndent}</tbody>\n`
      }
    }
    
    jsx += `${indent}</table>\n`
    return jsx
  }

  // 2. 处理 <details>...</details>
  const detailsMatch = fixedHtml.match(/<details([^>]*)>([\s\S]*?)<\/details>/i)
  if (detailsMatch) {
    const attrs = parseAttributes(detailsMatch[1])
    const content = detailsMatch[2]
    const attrsStr = attrsToJSXString(attrs)
    
    // 处理 summary
    const summaryMatch = content.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i)
    let jsx = `${indent}<details key={${key}}${attrsStr}>\n`
    
    if (summaryMatch) {
      const summaryContent = summaryMatch[1].trim()
      jsx += `${htmlIndent}<summary>${escapeJSXForJSX(summaryContent)}</summary>\n`
      const remainingContent = content.replace(/<summary[^>]*>[\s\S]*?<\/summary>/i, '').trim()
      if (remainingContent) {
        jsx += `${htmlIndent}${htmlToJSXString(remainingContent, htmlIndent, nextIndent + 1, 0).trim()}\n`
      }
    } else {
      const processedContent = htmlToJSXString(content, htmlIndent, nextIndent + 1, 0)
      jsx += processedContent
    }
    
    jsx += `${indent}</details>\n`
    return jsx
  }

  // 3. 处理 <div>...</div>
  const divMatch = fixedHtml.match(/<div([^>]*)>([\s\S]*?)<\/div>/i)
  if (divMatch) {
    const attrs = parseAttributes(divMatch[1])
    const content = divMatch[2]
    const attrsStr = attrsToJSXString(attrs)
    
    const processedContent = htmlToJSXString(content, htmlIndent, nextIndent + 1, 0)
    if (processedContent.trim()) {
      return `${indent}<div key={${key}}${attrsStr}>\n${processedContent}${indent}</div>\n`
    } else {
      return `${indent}<div key={${key}}${attrsStr} />\n`
    }
  }

  // 4. 处理 <img>
  const imgMatch = fixedHtml.match(/<img([^>]*)\s*\/?>/i)
  if (imgMatch) {
    const attrs = parseAttributes(imgMatch[1])
    const attrsStr = attrsToJSXString(attrs)
    return `${indent}<img key={${key}}${attrsStr} />\n`
  }

  // 5. 处理 <br>
  if (fixedHtml.trim() === '<br>' || fixedHtml.trim() === '<br/>' || fixedHtml.trim() === '<br />') {
    return `${indent}<br key={${key}} />\n`
  }

  // 6. 处理 <hr>
  if (fixedHtml.trim() === '<hr>' || fixedHtml.trim() === '<hr/>' || fixedHtml.trim() === '<hr />') {
    return `${indent}<hr key={${key}} />\n`
  }

  // 7. 处理纯文本或包含 HTML 标签的文本
  // 如果包含 HTML 标签但无法完全解析，尝试提取文本内容
  const textContent = fixedHtml.replace(/<[^>]+>/g, '').trim()
  if (textContent && !fixedHtml.includes('<')) {
    return `${indent}<span key={${key}}>${escapeJSXForJSX(textContent)}</span>\n`
  }

  // 8. 如果无法解析，返回空（不渲染）
  // 或者可以返回一个注释
  return ''
}

/**
 * 转义 JSX 中的字符串
 */
function escapeJSXForJSX(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * 解析表格行
 */
function parseTableRow(rowContent: string, cellTag: 'td' | 'th', indent: string, nextIndent: number): string {
  const cells: string[] = []
  const cellPattern = new RegExp(`<${cellTag}([^>]*)>([\\s\\S]*?)<\/${cellTag}>`, 'gi')
  let cellMatch
  let cellIndex = 0
  const cellIndent = '  '.repeat(nextIndent + 1)

  while ((cellMatch = cellPattern.exec(rowContent)) !== null) {
    const attrs = parseAttributes(cellMatch[1])
    const content = cellMatch[2].trim()
    const attrsStr = attrsToJSXString(attrs)
    
    // 处理单元格内容（可能包含 HTML）
    let cellContent = content
    if (content.includes('<')) {
      // 如果包含 HTML，尝试解析
      const parsed = htmlToJSXString(content, cellIndent, nextIndent + 2, 0)
      if (parsed) {
        cells.push(`${cellIndent}<${cellTag} key={${cellIndex}}${attrsStr}>\n${parsed.trim()}\n${cellIndent}</${cellTag}>\n`)
      } else {
        cells.push(`${cellIndent}<${cellTag} key={${cellIndex}}${attrsStr}>${escapeJSXForJSX(content)}</${cellTag}>\n`)
      }
    } else {
      cells.push(`${cellIndent}<${cellTag} key={${cellIndex}}${attrsStr}>${escapeJSXForJSX(content)}</${cellTag}>\n`)
    }
    cellIndex++
  }

  return cells.join('')
}

/**
 * 解析多个表格行
 */
function parseTableRows(rowsContent: string, indent: string, nextIndent: number): string {
  const rows: string[] = []
  const trPattern = /<tr([^>]*)>([\s\S]*?)<\/tr>/gi
  let trMatch
  let rowIndex = 0
  const rowIndent = '  '.repeat(nextIndent)

  while ((trMatch = trPattern.exec(rowsContent)) !== null) {
    const attrs = parseAttributes(trMatch[1])
    const content = trMatch[2]
    const attrsStr = attrsToJSXString(attrs)
    
    const cells = parseTableRow(content, 'td', rowIndent, nextIndent)
    rows.push(`${rowIndent}<tr key={${rowIndex}}${attrsStr}>\n${cells}${rowIndent}</tr>\n`)
    rowIndex++
  }

  return rows.join('')
}

