const fs = require('fs')
const path = require('path')

// 简单的翻译函数 - 使用 Google Translate 免费 API
// 注意：这可能需要代理或使用其他翻译服务
async function translateText(text) {
  if (!text || typeof text !== 'string') return text
  
  // 如果文本太短或包含特殊格式，不需要翻译
  if (text.trim().length < 3) return text
  if (text.startsWith('http://') || text.startsWith('https://')) return text
  if (text.trim().match(/^<[^>]+>$/)) return text
  
  try {
    // 尝试使用 Google Translate 免费 API
    // 需要安装：npm install @vitalets/google-translate-api
    const { translate } = require('@vitalets/google-translate-api')
    const result = await translate(text, { to: 'zh-CN' })
    return result.text
  } catch (e) {
    // 如果翻译失败，返回原文本（稍后可以手动翻译）
    console.warn(`翻译失败: ${text.substring(0, 50)}... - ${e.message}`)
    return text
  }
}

// 翻译内容，保留 Markdown 链接、HTML 标签、代码块等格式
async function translateContentWithFormat(content) {
  if (!content || typeof content !== 'string') return content
  
  // 如果是纯 HTML 标签，不翻译
  if (content.trim().startsWith('<') && content.trim().endsWith('>')) {
    return content
  }
  
  // 如果是纯链接，不翻译
  if (content.trim().match(/^https?:\/\//)) {
    return content
  }
  
  // 翻译整个内容（Google Translate 会保留格式）
  return await translateText(content)
}

// 处理单个内容项，添加中文翻译
async function addTranslationToContentItem(item) {
  const translatedItem = JSON.parse(JSON.stringify(item)) // 深拷贝
  
  switch (item.type) {
    case 'text':
    case 'paragraph':
      if (item.content && !item.content_cn) {
        translatedItem.content_cn = await translateContentWithFormat(item.content)
      }
      break
      
    case 'list':
      if (item.items && Array.isArray(item.items)) {
        for (const listItem of item.items) {
          if (listItem.content && !listItem.content_cn) {
            listItem.content_cn = await translateContentWithFormat(listItem.content)
          }
        }
      }
      break
      
    case 'blockquote':
      if (item.quotes && Array.isArray(item.quotes)) {
        translatedItem.quotes_cn = []
        for (const quote of item.quotes) {
          // 如果是 source: 开头的链接，不翻译
          if (quote.startsWith('source:')) {
            translatedItem.quotes_cn.push(quote)
          } else {
            const translated = await translateContentWithFormat(quote)
            translatedItem.quotes_cn.push(translated)
          }
        }
      }
      break
      
    case 'html':
      // HTML 保持原样，不翻译
      break
      
    case 'code_block':
      // 代码块保持原样，不翻译
      break
      
    case 'table':
      // 表格保持原样，不翻译
      break
  }
  
  return translatedItem
}

// 处理整个文件
async function processFile(filePath) {
  console.log(`处理文件: ${path.basename(filePath)}`)
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  let modified = false
  
  // 处理主 content
  if (data.content && Array.isArray(data.content)) {
    for (let i = 0; i < data.content.length; i++) {
      const item = data.content[i]
      const translated = await addTranslationToContentItem(item)
      if (JSON.stringify(translated) !== JSON.stringify(item)) {
        data.content[i] = translated
        modified = true
      }
    }
  }
  
  // 处理子章节
  if (data.subsections) {
    for (const subsectionKey of Object.keys(data.subsections)) {
      const subsection = data.subsections[subsectionKey]
      
      // 处理子章节的 content
      if (subsection.content && Array.isArray(subsection.content)) {
        for (let i = 0; i < subsection.content.length; i++) {
          const item = subsection.content[i]
          const translated = await addTranslationToContentItem(item)
          if (JSON.stringify(translated) !== JSON.stringify(item)) {
            subsection.content[i] = translated
            modified = true
          }
        }
      }
      
      // 处理子子章节
      if (subsection.subsections) {
        for (const subSubsectionKey of Object.keys(subsection.subsections)) {
          const subSubsection = subsection.subsections[subSubsectionKey]
          
          if (subSubsection.content && Array.isArray(subSubsection.content)) {
            for (let i = 0; i < subSubsection.content.length; i++) {
              const item = subSubsection.content[i]
              const translated = await addTranslationToContentItem(item)
              if (JSON.stringify(translated) !== JSON.stringify(item)) {
                subSubsection.content[i] = translated
                modified = true
              }
            }
          }
        }
      }
    }
  }
  
  if (modified) {
    // 备份原文件
    const backupPath = filePath + '.bak'
    if (!fs.existsSync(backupPath)) {
      fs.writeFileSync(backupPath, fs.readFileSync(filePath))
    }
    
    // 写入新文件
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
    console.log(`  ✓ 已更新: ${path.basename(filePath)}`)
  } else {
    console.log(`  - 无需更新: ${path.basename(filePath)}`)
  }
  
  return modified
}

// 主函数
async function main() {
  // 检查是否安装了翻译库
  let hasTranslateLib = false
  try {
    require.resolve('@vitalets/google-translate-api')
    hasTranslateLib = true
    console.log('✓ 找到翻译库，将执行实际翻译\n')
  } catch (e) {
    console.log('⚠ 未找到翻译库 @vitalets/google-translate-api')
    console.log('请运行: npm install @vitalets/google-translate-api')
    console.log('或者修改脚本使用其他翻译服务\n')
  }
  
  const systemDir = 'web/src/config/system'
  const files = fs.readdirSync(systemDir)
    .filter(f => f.startsWith('system-part') && f.endsWith('.json'))
    .sort((a, b) => {
      const numA = parseInt(a.match(/part(\d+)/)[1])
      const numB = parseInt(b.match(/part(\d+)/)[1])
      return numA - numB
    })
  
  console.log(`找到 ${files.length} 个文件需要处理\n`)
  
  let processedCount = 0
  for (const file of files) {
    const filePath = path.join(systemDir, file)
    const modified = await processFile(filePath)
    if (modified) processedCount++
    
    // 添加延迟，避免 API 限制（每个文件后等待 1 秒）
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  
  console.log(`\n处理完成！`)
  console.log(`更新了 ${processedCount} 个文件`)
  
  if (!hasTranslateLib) {
    console.log('\n注意：由于未安装翻译库，content_cn 字段可能包含原始英文内容')
    console.log('请安装翻译库后重新运行脚本以获取实际翻译')
  }
}

main().catch(console.error)
