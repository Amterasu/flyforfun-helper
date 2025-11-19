/**
 * 将 ContentItem[] 转换为 TSX 组件代码字符串
 * 使用新的转换逻辑，直接生成 React DOM 元素
 */

import type { ContentItem } from '../../../config/types'
import { contentItemsToJSXComponent } from './jsonToJSX'

/**
 * 将 ContentItem 数组转换为 TSX 组件代码
 */
export function contentItemsToTSX(
  items: ContentItem[],
  componentName: string
): string {
  if (!items || items.length === 0) {
    return `import React from 'react'

export const ${componentName} = () => {
  return (
    <div className="baike-content">
    </div>
  )
}
`
  }

  // 使用新的转换逻辑，直接生成 React DOM 元素
  return contentItemsToJSXComponent(items, componentName)
}

