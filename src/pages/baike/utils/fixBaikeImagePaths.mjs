/**
 * 修复所有 baike 组件中 BaikeImage 的导入路径
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname, relative } from 'path'
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

// 计算正确的相对路径
function getCorrectImportPath(filePath, componentsPath) {
  const fileDir = dirname(filePath)
  const relativePath = relative(fileDir, componentsPath)
  
  // 确保路径使用正斜杠
  let importPath = relativePath.replace(/\\/g, '/')
  
  // 如果路径不是以 . 开头，添加 ./
  if (!importPath.startsWith('.')) {
    importPath = './' + importPath
  }
  
  // 添加文件名
  importPath += '/BaikeImage'
  
  return importPath
}

// 修复文件中的导入路径
function fixImportPath(filePath) {
  let content = readFileSync(filePath, 'utf-8')
  let modified = false
  
  // 检查是否有 BaikeImage 导入
  const importMatch = content.match(/import\s+.*BaikeImage.*from\s+['"]([^'"]+)['"]/)
  if (!importMatch) {
    return false // 没有 BaikeImage 导入，不需要修改
  }
  
  const currentPath = importMatch[1]
  const componentsPath = join(__dirname, '../../../components')
  const correctPath = getCorrectImportPath(filePath, componentsPath)
  
  // 如果路径不正确，修复它
  if (currentPath !== correctPath) {
    content = content.replace(
      /import\s+.*BaikeImage.*from\s+['"][^'"]+['"]/,
      `import { BaikeImage } from '${correctPath}'`
    )
    writeFileSync(filePath, content, 'utf-8')
    console.log(`✓ 修复: ${filePath.replace(join(__dirname, '..'), '')} (${currentPath} -> ${correctPath})`)
    return true
  }
  
  return false
}

// 主函数
function main() {
  const baikeDir = join(__dirname, '..')
  const files = getAllComponentFiles(baikeDir)
  
  console.log(`找到 ${files.length} 个组件文件`)
  
  let fixedCount = 0
  let skippedCount = 0
  
  for (const file of files) {
    try {
      if (fixImportPath(file)) {
        fixedCount++
      } else {
        skippedCount++
      }
    } catch (error) {
      console.error(`✗ 错误处理 ${file}:`, error.message)
    }
  }
  
  console.log(`\n完成！修复了 ${fixedCount} 个文件，跳过了 ${skippedCount} 个文件`)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { fixImportPath }

