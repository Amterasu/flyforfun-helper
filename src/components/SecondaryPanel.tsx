import { DocNode } from '../types/doc'
import './SecondaryPanel.less'

type SecondaryPanelProps = {
  section?: DocNode
  activeChildId?: string
  onSelect: (id: string) => void
}

export const SecondaryPanel = ({ section, activeChildId, onSelect }: SecondaryPanelProps) => {
  if (!section?.children?.length) return null

  return (
    <div className="secondary-panel" role="tablist" aria-label="子分类导航">
      <div className="secondary-panel-header">
        <p className="eyebrow">子分类</p>
        <strong>{section.title}</strong>
        <span>{section.description ?? '选择一个子分类以在右侧展示详细锚点。'}</span>
      </div>
      <div className="secondary-panel-grid">
        {section.children.map((child) => (
          <button
            key={child.id}
            role="tab"
            aria-selected={child.id === activeChildId}
            className={child.id === activeChildId ? 'active' : ''}
            onClick={() => onSelect(child.id)}
          >
            <span>{child.title}</span>
            <small>{child.children?.length ?? 0} 项</small>
          </button>
        ))}
      </div>
    </div>
  )
}

