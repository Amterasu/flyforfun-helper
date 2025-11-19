import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { getContentItemsByAnchorId } from './getContentByAnchorId.js';
import { contentItemsToJSXComponent } from './jsonToJSX.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baikeDir = join(__dirname, '..');
const baikeIndexPath = join(baikeDir, 'index.tsx');
const baikeIndexContent = readFileSync(baikeIndexPath, 'utf-8');

// 读取 constants/index.ts 以获取标题映射
const constantsPath = join(__dirname, '../../../constants/index.ts');
let titleMap = {};
try {
  const constantsContent = readFileSync(constantsPath, 'utf-8');
  // 提取 docTree 中的标题映射
  // 匹配格式: { id: 'xxx', title: 'yyy' }
  const titleMatches = [...constantsContent.matchAll(/\{\s*id:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"]/g)];
  titleMatches.forEach(match => {
    const id = match[1];
    const title = match[2];
    titleMap[id] = title;
  });
} catch (error) {
  console.warn('Could not read constants/index.ts, titles may be in English:', error.message);
}

// 提取所有组件映射
const componentMatches = [...baikeIndexContent.matchAll(/const (\w+) = lazy\(\(\) => import\('\.\/([^']+)'\)/g)];
console.log(`Found ${componentMatches.length} components to regenerate\n`);

let generated = 0;
let skipped = 0;

for (const match of componentMatches) {
  const componentName = match[1];
  const importPath = match[2];
  
  try {
    // 将 importPath 转换为 anchorId
    // 提取最后一部分，例如 "system/updates" -> "updates", "system/updates/top-up-event" -> "top-up-event"
    let anchorId = importPath;
    if (anchorId.includes('/')) {
      anchorId = anchorId.split('/').pop();
    }
    // 清理前缀的连字符和特殊字符，转换为小写
    anchorId = anchorId.replace(/^-+/, '').replace(/^️-/, '').toLowerCase().trim();
    
    const contentItems = getContentItemsByAnchorId(anchorId, titleMap);
    
    if (contentItems && Array.isArray(contentItems) && contentItems.length > 0) {
      const outputPath = join(baikeDir, importPath, 'index.tsx');
      const outputDir = dirname(outputPath);
      
      if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
      }
      
      const jsxCode = contentItemsToJSXComponent(contentItems, componentName);
      writeFileSync(outputPath, jsxCode, 'utf-8');
      console.log(`✓ ${importPath}/index.tsx`);
      generated++;
    } else {
      console.log(`⊘ ${importPath} - No content found`);
      skipped++;
    }
  } catch (error) {
    console.error(`✗ ${importPath} - Error: ${error.message}`);
    skipped++;
  }
}

console.log(`\nGeneration complete:`);
console.log(`  Generated: ${generated}`);
console.log(`  Skipped: ${skipped}`);

