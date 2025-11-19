import { Link, useParams } from 'react-router-dom'
import { DocNode } from '../types/doc'
import './SecondarySidebar.less'

type SecondarySidebarProps = {
  section?: DocNode
  activeChildId?: string
}

export const SecondarySidebar = ({ section, activeChildId }: SecondarySidebarProps) => {
  const params = useParams<{ sectionId?: string }>()
  const sectionId = params.sectionId || ''

  if (!section?.children?.length) return null

  const getChildPath = (childId: string): string => {
    const child = section.children?.find(c => c.id === childId)
    if (child?.children && child.children.length > 0) {
      // 如果有子节点，导航到第一个子节点
      return `/baike/${sectionId}/${childId}/${child.children[0].id}`
    }
    return `/baike/${sectionId}/${childId}`
  }

  return (
    <nav className="secondary-nav-bar">
      <div className="secondary-nav-scroll">
        {section.children.map((child) => {
          const isActive = child.id === activeChildId
          const path = getChildPath(child.id)
          return (
            <Link
              key={child.id}
              to={path}
              className={`secondary-nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-item-text">{child.title}</span>
              {child.children && (
                <span className="nav-item-badge">{child.children.length}</span>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

