import { DocNode } from '../types/doc'
import './SecondaryNavBar.less'

type SecondaryNavBarProps = {
  section?: DocNode
  activeChildId?: string
  onSelect: (id: string) => void
}

export const SecondaryNavBar = ({ section, activeChildId, onSelect }: SecondaryNavBarProps) => {
  if (!section?.children?.length) return null

  return (
    <div className="secondary-nav-bar">
      <div className="secondary-nav-scroll">
        {section.children.map((child) => {
          const isActive = child.id === activeChildId
          return (
            <button
              key={child.id}
              className={`secondary-nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelect(child.id)}
            >
              <span>{child.title}</span>
              {child.children && <small>{child.children.length}</small>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

