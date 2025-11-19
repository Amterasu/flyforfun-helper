import { marked } from 'marked'

// 缓存 README.md 内容
let readmeContent: string | null = null

// 加载 README.md 内容
export async function loadReadmeContent(): Promise<string> {
  if (readmeContent) return readmeContent

  try {
    const response = await fetch('/README.md')
    if (!response.ok) {
      throw new Error('Failed to load README.md')
    }
    readmeContent = await response.text()
    return readmeContent
  } catch (error) {
    console.error('Error loading README.md:', error)
    return ''
  }
}

// 将标题转换为锚点 ID（匹配 README.md 中的格式）
function titleToAnchorId(title: string): string {
  // 移除 emoji 和特殊字符，转换为小写，用连字符连接
  // 匹配 README.md 中的锚点格式：移除 emoji，保留中英文，转小写，空格转连字符
  return title
    .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
    .replace(/[\u{1FA70}-\u{1FAFF}]/gu, '') // 更多 emoji
    .toLowerCase()
    .replace(/[^\w\s\u4e00-\u9fa5-]/g, '') // 保留字母、数字、中文、空格、连字符
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// 从锚点链接提取锚点 ID（例如从 "## ⚙️ system" 或 "[updates](#-updates)" 中提取）
function extractAnchorFromLink(text: string): string {
  // 匹配 Markdown 链接格式：[text](#anchor-id)
  const linkMatch = text.match(/\[.*?\]\(#(.+?)\)/)
  if (linkMatch) {
    return linkMatch[1].replace(/^-+|-+$/g, '') // 移除前后的连字符
  }
  return ''
}

// 提取锚点对应的内容
export async function getContentByAnchorId(anchorId: string): Promise<string> {
  const content = await loadReadmeContent()
  if (!content) return ''

  // 解析 Markdown 行
  const lines = content.split('\n')
  
  // 查找锚点对应的标题行
  let startIndex = -1
  let depth = 0
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // 匹配标题行（# ## ### ####）
    const headerMatch = line.match(/^(#{1,6})\s+(.+)$/)
    if (headerMatch) {
      const headerDepth = headerMatch[1].length
      const headerText = headerMatch[2]
      const currentAnchorId = titleToAnchorId(headerText)
      
      // 处理锚点 ID 匹配（移除开头的连字符和特殊字符）
      const normalizedCurrentId = currentAnchorId.replace(/^-+/, '').replace(/^️-/, '')
      const normalizedTargetId = anchorId.replace(/^-+/, '').replace(/^️-/, '')
      
      // 如果找到匹配的锚点（完全匹配或部分匹配）
      if (normalizedCurrentId === normalizedTargetId || 
          normalizedCurrentId.includes(normalizedTargetId) || 
          normalizedTargetId.includes(normalizedCurrentId)) {
        startIndex = i
        depth = headerDepth
        break
      }
    }
  }
  
  // 如果找到了起始位置，提取到文件末尾的内容
  if (startIndex >= 0) {
    // 查找下一个同级或更高级的标题
    let endIndex = lines.length
    for (let i = startIndex + 1; i < lines.length; i++) {
      const line = lines[i].trim()
      const headerMatch = line.match(/^(#{1,6})\s+/)
      if (headerMatch && headerMatch[1].length <= depth) {
        endIndex = i
        break
      }
    }
    
    const sectionContent = lines.slice(startIndex, endIndex).join('\n')
    return sectionContent
  }
  
  return ''
}

// 修复图片路径：将相对路径转换为正确的路径
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

// 渲染 Markdown 为 HTML
export async function renderMarkdownContent(anchorId: string): Promise<string> {
  const content = await getContentByAnchorId(anchorId)
  if (!content) return ''
  
  // 配置 marked 选项
  marked.setOptions({
    breaks: true,
    gfm: true
  })
  
  // 自定义渲染器来修复图片路径
  const renderer = new marked.Renderer()
  
  // 自定义图片渲染器
  renderer.image = (href: string | null, title: string | null, text: string) => {
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
    // 修复 HTML 中的图片路径
    return fixImagePaths(html)
  }
  
  try {
    const html = await marked(content, { renderer })
    // 再次修复可能的图片路径（处理已渲染的 HTML）
    return fixImagePaths(html as string)
  } catch (error) {
    console.error('Error rendering markdown:', error)
    return ''
  }
}

