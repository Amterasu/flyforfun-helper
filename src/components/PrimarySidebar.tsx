import { DocNode } from '../types/doc'
import { docTree } from '../constants'
import './PrimarySidebar.less'

type PrimarySidebarProps = {
  activeSection: string
  onSectionChange: (id: string) => void
}

export const PrimarySidebar = ({ activeSection, onSectionChange }: PrimarySidebarProps) => {
  return (
    <aside className="primary-sidebar">
      <nav className="sidebar-nav">
        {docTree.map((section) => {
          const isActive = section.id === activeSection
          return (
            <button
              key={section.id}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
              onClick={() => onSectionChange(section.id)}
            >
              <span className="sidebar-icon">{section.title}</span>
              <span className="sidebar-text">{section.title}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

