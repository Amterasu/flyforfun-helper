/**
 * DOM 结构优化工具
 * 用于清理和优化 baike 组件的 DOM 结构
 */

export interface OptimizationRule {
  name: string
  transform: (node: any) => any | null
}

/**
 * 清理空的 span 节点
 */
function removeEmptySpans(node: any): any | null {
  if (typeof node !== 'object' || !node) return node

  if (node.type === 'span') {
    // 检查是否是空节点或只包含元数据
    const children = node.props?.children
    const textContent = typeof children === 'string' ? children.trim() : ''
    
    // 如果为空或只是 "details"
    if (!textContent || textContent === 'details' || textContent === '详情') {
      return null // 删除节点
    }
    
    // 如果是年份格式，转换为更好的结构
    if (/^\d{4}(~\d{4})?$/.test(textContent)) {
      return {
        type: 'div',
        props: {
          className: 'baike-year-header',
          children: textContent
        }
      }
    }
  }

  // 递归处理子节点
  if (node.props?.children) {
    const children = Array.isArray(node.props.children)
      ? node.props.children.map(removeEmptySpans).filter(Boolean)
      : removeEmptySpans(node.props.children)

    return {
      ...node,
      props: {
        ...node.props,
        children
      }
    }
  }

  return node
}

/**
 * 优化列表结构 - 合并相邻的单个列表项
 */
function optimizeLists(node: any): any | null {
  if (typeof node !== 'object' || !node) return node

  if (node.type === 'div' && node.props?.className === 'baike-content') {
    const children = node.props.children
    if (!Array.isArray(children)) return node

    const optimized: any[] = []
    let i = 0

    while (i < children.length) {
      const current = children[i]
      
      // 检查是否是单个列表项
      if (
        current?.type === 'ul' &&
        current?.props?.className === 'baike-list' &&
        Array.isArray(current.props.children) &&
        current.props.children.length === 1
      ) {
        // 收集所有相邻的单个列表项
        const listItems: any[] = []
        let j = i

        while (
          j < children.length &&
          children[j]?.type === 'ul' &&
          children[j]?.props?.className === 'baike-list' &&
          Array.isArray(children[j].props.children) &&
          children[j].props.children.length === 1
        ) {
          listItems.push(children[j].props.children[0])
          j++
        }

        // 合并为一个列表
        if (listItems.length > 1) {
          optimized.push({
            type: 'ul',
            props: {
              className: 'baike-list',
              children: listItems
            }
          })
          i = j
          continue
        }
      }

      // 递归优化子节点
      optimized.push(optimizeLists(current))
      i++
    }

    return {
      ...node,
      props: {
        ...node.props,
        children: optimized.filter(Boolean)
      }
    }
  }

  // 递归处理子节点
  if (node.props?.children) {
    const children = Array.isArray(node.props.children)
      ? node.props.children.map(optimizeLists).filter(Boolean)
      : optimizeLists(node.props.children)

    return {
      ...node,
      props: {
        ...node.props,
        children
      }
    }
  }

  return node
}

/**
 * 优化列表项的内联样式
 */
function optimizeListItemStyles(node: any): any | null {
  if (typeof node !== 'object' || !node) return node

  if (node.type === 'li' && node.props?.style?.marginLeft) {
    return {
      ...node,
      props: {
        ...node.props,
        style: undefined, // 移除内联样式，使用 CSS 类
        className: `${node.props.className || ''} baike-nested-item`.trim()
      }
    }
  }

  // 递归处理子节点
  if (node.props?.children) {
    const children = Array.isArray(node.props.children)
      ? node.props.children.map(optimizeListItemStyles)
      : optimizeListItemStyles(node.props.children)

    return {
      ...node,
      props: {
        ...node.props,
        children
      }
    }
  }

  return node
}

/**
 * 优化图片容器
 */
function optimizeImageContainers(node: any): any | null {
  if (typeof node !== 'object' || !node) return node

  if (
    node.type === 'div' &&
    node.props?.style?.textAlign === 'center'
  ) {
    return {
      ...node,
      props: {
        ...node.props,
        className: `${node.props.className || ''} baike-image-container`.trim(),
        style: {
          ...node.props.style,
          // 保留必要的样式，但移除 textAlign（通过 CSS 处理）
        }
      }
    }
  }

  // 递归处理子节点
  if (node.props?.children) {
    const children = Array.isArray(node.props.children)
      ? node.props.children.map(optimizeImageContainers)
      : optimizeImageContainers(node.props.children)

    return {
      ...node,
      props: {
        ...node.props,
        children
      }
    }
  }

  return node
}

/**
 * 应用所有优化规则
 */
export function optimizeDOM(node: any): any {
  let optimized = node

  // 应用所有优化规则
  optimized = removeEmptySpans(optimized)
  optimized = optimizeLists(optimized)
  optimized = optimizeListItemStyles(optimized)
  optimized = optimizeImageContainers(optimized)

  return optimized
}

