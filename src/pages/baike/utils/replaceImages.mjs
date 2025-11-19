/**
 * 批量替换 baike 组件中的 img 标签为 BaikeImage 组件
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readdirSync, statSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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

// 替换文件中的 img 标签为 BaikeImage
function replaceImagesInFile(filePath) {
  let content = readFileSync(filePath, 'utf-8')
  let modified = false
  
  // 检查是否已经导入了 BaikeImage
  const hasImport = content.includes("from '../../../components/BaikeImage'") || 
                    content.includes('from "../../../components/BaikeImage"') ||
                    content.includes("from '../../../../components/BaikeImage'") ||
                    content.includes('from "../../../../components/BaikeImage"')
  
  // 检查是否有 img 标签
  const hasImg = /<img\s+[^>]*>/i.test(content)
  
  if (!hasImg) {
    return false // 没有图片，不需要修改
  }
  
  // 计算相对路径深度（用于导入路径）
  const depth = filePath.split('/').filter(p => p === 'baike').length === 1 
    ? '../../../components/BaikeImage'
    : '../../../../components/BaikeImage'
  
  // 添加导入语句（如果还没有）
  if (!hasImport) {
    // 查找 React 导入的位置
    const reactImportMatch = content.match(/import\s+React\s+from\s+['"]react['"]/)
    if (reactImportMatch) {
      const insertPos = reactImportMatch.index + reactImportMatch[0].length
      content = content.slice(0, insertPos) + 
                `\nimport { BaikeImage } from '${depth}'` +
                content.slice(insertPos)
      modified = true
    }
  }
  
  // 替换 img 标签为 BaikeImage
  // 匹配 <img ... /> 或 <img ...>
  content = content.replace(
    /<img\s+([^>]*?)(?:\s*\/)?>/gi,
    (match, attrs) => {
      // 提取属性
      const srcMatch = attrs.match(/src={?["']([^"']+)["']}?/i)
      const altMatch = attrs.match(/alt={?["']([^"']*)["']}?/i)
      const widthMatch = attrs.match(/width={?(\d+|["'][^"']+["'])}?/i)
      const keyMatch = attrs.match(/key={([^}]+)}/i)
      
      const src = srcMatch ? srcMatch[1] : ''
      const alt = altMatch ? altMatch[1] : ''
      const width = widthMatch ? widthMatch[1] : ''
      const key = keyMatch ? keyMatch[1] : ''
      
      if (!src) {
        return match // 如果没有 src，保持原样
      }
      
      // 构建 BaikeImage 组件
      let props = []
      if (key) props.push(`key={${key}}`)
      props.push(`src="${src}"`)
      if (alt) props.push(`alt="${alt}"`)
      if (width) {
        // 如果 width 是数字，直接使用；否则作为字符串
        if (/^\d+$/.test(width)) {
          props.push(`width={${width}}`)
        } else {
          props.push(`width="${width.replace(/["']/g, '')}"`)
        }
      }
      props.push('maxWidth="100%"')
      
      return `<BaikeImage ${props.join(' ')} />`
    }
  )
  
  // 检查是否有修改
  if (content !== readFileSync(filePath, 'utf-8')) {
    writeFileSync(filePath, content, 'utf-8')
    return true
  }
  
  return modified
}

// 主函数
function main() {
  const baikeDir = join(__dirname, '..')
  const files = getAllComponentFiles(baikeDir)
  
  console.log(`找到 ${files.length} 个组件文件`)
  
  let modifiedCount = 0
  let skippedCount = 0
  
  for (const file of files) {
    try {
      if (replaceImagesInFile(file)) {
        console.log(`✓ 已替换: ${file.replace(baikeDir, '')}`)
        modifiedCount++
      } else {
        skippedCount++
      }
    } catch (error) {
      console.error(`✗ 错误处理 ${file}:`, error.message)
    }
  }
  
  console.log(`\n完成！修改了 ${modifiedCount} 个文件，跳过了 ${skippedCount} 个文件`)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { replaceImagesInFile }


