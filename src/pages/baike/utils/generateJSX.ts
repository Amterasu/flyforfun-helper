/**
 * 将 JSON ContentItem 数据转换为直接生成 JSX 的 TSX 文件
 */

import * as fs from 'fs'
import * as path from 'path'
import { contentItemsToJSXComponent } from './jsonToJSX'
import type { ContentItem } from '../../../config/types'

/**
 * 从 JSON 文件读取内容并生成 JSX TSX 文件
 */
export function generateJSXFromJSON(
  jsonFilePath: string,
  outputDir: string,
  componentName: string
): void {
  // 读取 JSON 文件
  const jsonContent = fs.readFileSync(jsonFilePath, 'utf-8')
  const data = JSON.parse(jsonContent)
  
  // 提取 content 数组
  const contentItems: ContentItem[] = data.content || []
  
  // 转换为 JSX 组件代码
  const jsxCode = contentItemsToJSXComponent(contentItems, componentName)
  
  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  // 写入 TSX 文件
  const outputPath = path.join(outputDir, 'index.tsx')
  fs.writeFileSync(outputPath, jsxCode, 'utf-8')
  
  console.log(`✓ Generated ${outputPath}`)
}

/**
 * 批量转换所有 baike 组件
 */
export function convertAllBaikeComponentsToJSX(): void {
  const baikeDir = path.join(__dirname, '..')
  
  // 递归查找所有 index.tsx 文件
  function findTSXFiles(dir: string, baseDir: string = baikeDir): string[] {
    const files: string[] = []
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory() && entry.name !== 'utils' && entry.name !== 'node_modules') {
        files.push(...findTSXFiles(fullPath, baseDir))
      } else if (entry.isFile() && entry.name === 'index.tsx') {
        files.push(fullPath)
      }
    }
    
    return files
  }
  
  const tsxFiles = findTSXFiles(baikeDir)
  
  console.log(`Found ${tsxFiles.length} TSX files to convert`)
  
  // 转换每个文件
  for (const tsxFile of tsxFiles) {
    try {
      const content = fs.readFileSync(tsxFile, 'utf-8')
      
      // 检查是否包含 contentItems 数组
      const contentItemsMatch = content.match(/const contentItems\s*=\s*(\[[\s\S]*?\])\s*as ContentItem\[\]/)
      
      if (contentItemsMatch) {
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
          console.log(`✓ Converted ${tsxFile}`)
        }
      }
    } catch (error) {
      console.error(`Error converting ${tsxFile}:`, error)
    }
  }
}

