/**
 * 批量优化 baike 组件的 DOM 结构
 * 清理空节点、优化列表、改进图片容器等
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 需要优化的常见问题
function optimizeComponentContent(content) {
  let optimized = content
  
  // 1. 移除空的 span 节点（包含 "details" 或空的）
  optimized = optimized.replace(
    /<span key={[^}]+}>\s*(details|详情)?\s*<\/span>/g,
    ''
  )
  optimized = optimized.replace(
    /<span key={[^}]+}>\s*<\/span>/g,
    ''
  )
  
  // 2. 优化年份标题 - 将简单的 span 转换为带样式的 div
  optimized = optimized.replace(
    /<span key={([^}]+)}>(\d{4}(~\d{4})?)<\/span>/g,
    '<div className="baike-year-header" key={$1}>$2</div>'
  )
  
  // 3. 优化图片容器 - 将内联样式转换为 CSS 类
  optimized = optimized.replace(
    /<div key={([^}]+)}\s+style=\{\{\s*textAlign:\s*['"]center['"]\s*\}\}>/g,
    '<div className="baike-image-container" key={$1}>'
  )
  
  // 4. 优化列表项 - 移除内联 marginLeft 样式，使用 CSS 类
  optimized = optimized.replace(
    /<li key={([^}]+)}\s+style=\{\{\s*marginLeft:\s*['"]\d+px['"]\s*\}\}/g,
    '<li className="baike-nested-item" key={$1}'
  )
  
  // 5. 清理多余的 key 属性（如果已经是最后一个属性）
  optimized = optimized.replace(
    /,\s*<span key={[^}]+}>\s*<\/span>\s*\)/g,
    ')'
  )
  
  // 6. 优化 blockquote 中的链接格式
  optimized = optimized.replace(
    /&quot;([^&]+)&quot;/g,
    '$1'
  )
  
  // 7. 移除不必要的 br 标签（在空 span 前后）
  optimized = optimized.replace(
    /<br key={[^}]+} \/>\s*<span key={[^}]+}>\s*<\/span>/g,
    ''
  )
  
  // 8. 添加   到图片（如果没有）
  optimized = optimized.replace(
    /<img([^>]*?)(?<!loading=)(?<! )(?<!loading='lazy')(\s*\/>)/g,
    '<img$1  $2'
  )
  
  // 9. 改进 alt 文本（如果只是文件名）
  optimized = optimized.replace(
    /alt={['"](\w+\.(png|jpg|jpeg|gif))['"]}/g,
    (match, filename) => {
      // 简单的文件名到中文的转换（可以扩展）
      const altMap = {
        'chatting_filter.png': '聊天过滤',
        'chatting_filter_window.png': '聊天过滤窗口',
        'cbt_announcement.png': '封闭测试公告',
        'universe_early_access.png': '抢先体验',
        'global_launch.png': '全球发布'
      }
      const alt = altMap[filename] || filename.replace(/\.(png|jpg|jpeg|gif)$/, '').replace(/_/g, ' ')
      return `alt="${alt}"`
    }
  )
  
  return optimized
}

// 获取所有 baike 组件文件
function getAllComponentFiles(baseDir) {
  const files = []
  
  function traverseDir(dir) {
    const entries = readdirSync(dir)
    
    for (const entry of entries) {
      const fullPath = join(dir, entry)
      const stat = statSync(fullPath)
      
      if (stat.isDirectory()) {
        traverseDir(fullPath)
      } else if (entry === 'index.tsx') {
        files.push(fullPath)
      }
    }
  }
  
  traverseDir(baseDir)
  return files
}

// 主函数
function main() {
  const baikeDir = join(__dirname, '..')
  const files = getAllComponentFiles(baikeDir)
  
  console.log(`找到 ${files.length} 个组件文件`)
  
  let optimizedCount = 0
  let skippedCount = 0
  
  for (const file of files) {
    try {
      const content = readFileSync(file, 'utf-8')
      const optimized = optimizeComponentContent(content)
      
      if (content !== optimized) {
        writeFileSync(file, optimized, 'utf-8')
        console.log(`✓ 优化: ${file.replace(baikeDir, '')}`)
        optimizedCount++
      } else {
        skippedCount++
      }
    } catch (error) {
      console.error(`✗ 错误处理 ${file}:`, error.message)
    }
  }
  
  console.log(`\n完成！优化了 ${optimizedCount} 个文件，跳过了 ${skippedCount} 个文件`)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { optimizeComponentContent }

