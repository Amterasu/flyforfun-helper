import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DocNode } from '../../types/doc'
import './index.less'

type DocNodeItemProps = {
  node: DocNode
  depth?: number
  showContent?: boolean
}

export const DocNodeItem = ({ node, depth = 0, showContent = false }: DocNodeItemProps) => {
  const params = useParams<{ sectionId?: string; childId?: string; leafId?: string }>()
  const sectionId = params.sectionId || ''
  const childId = params.childId || ''

  // 默认展开所有层级
  const [open, setOpen] = useState(true)
  const hasChildren = !!node.children?.length

  const getNodePath = (nodeId: string): string => {
    if (depth === 0) {
      // 一级节点（叶子节点，显示在二级分类下的三级列表）
      // 当前在 /baike/:sectionId/:childId 路径下
      return `/baike/${sectionId}/${childId}/${nodeId}`
    } else if (depth === 1) {
      // 二级节点下的子节点（三级节点）
      return `/baike/${sectionId}/${childId}/${nodeId}`
    }
    return `/baike/${nodeId}`
  }

  return (
    <div className={`doc-node depth-${depth}`}>
      {!hasChildren ? (
        <Link
          to={getNodePath(node.id)}
          className={`doc-node-header is-leaf ${node.id === params.leafId ? 'active' : ''}`}
        >
          <span>
            <strong>{node.title}</strong>
            {node.description && <small>{node.description}</small>}
          </span>
        </Link>
      ) : (
        <button
          className={`doc-node-header is-group`}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span>
            <strong>{node.title}</strong>
            {node.description && <small>{node.description}</small>}
          </span>
          <span className={`chevron ${open ? 'open' : ''}`}>⌄</span>
        </button>
      )}
      {hasChildren && open && (
        <div className="doc-node-children">
          {node.children!.map((child) => (
            <DocNodeItem key={child.id} node={child} depth={depth + 1} showContent={showContent} />
          ))}
        </div>
      )}
    </div>
  )
}

