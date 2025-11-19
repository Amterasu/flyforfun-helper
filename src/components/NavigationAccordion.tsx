import { useState } from 'react'
import { DocNode } from '../types/doc'
import { docTree } from '../constants'
import './NavigationAccordion.less'

type NavigationAccordionProps = {
  activeSection: string
  activeChildId?: string
  onSectionChange: (id: string) => void
  onChildChange: (id: string) => void
}

export const NavigationAccordion = ({
  activeSection,
  activeChildId,
  onSectionChange,
  onChildChange
}: NavigationAccordionProps) => {
  const [expandedSection, setExpandedSection] = useState<string>(activeSection)

  const handleSectionClick = (sectionId: string) => {
    if (expandedSection === sectionId) {
      // 如果点击的是已展开的，可以折叠它
      // setExpandedSection('')
    } else {
      setExpandedSection(sectionId)
      onSectionChange(sectionId)
      // 当切换一级导航时，自动选择第一个二级导航
      const section = docTree.find((s) => s.id === sectionId)
      if (section?.children?.[0]) {
        onChildChange(section.children[0].id)
      }
    }
  }

  return (
    <div className="navigation-accordion">
      {docTree.map((section) => {
        const isExpanded = expandedSection === section.id
        const hasChildren = !!section.children?.length
        const isActive = section.id === activeSection

        return (
          <div key={section.id} className={`accordion-item ${isActive ? 'active' : ''}`}>
            <button
              className="accordion-header"
              onClick={() => handleSectionClick(section.id)}
              aria-expanded={isExpanded}
            >
              <span className="accordion-title">{section.title}</span>
              {hasChildren && (
                <span className={`accordion-icon ${isExpanded ? 'expanded' : ''}`}>⌄</span>
              )}
            </button>
            {hasChildren && isExpanded && (
              <div className="accordion-content">
                <div className="secondary-nav-list">
                  {section.children?.map((child) => {
                    const isChildActive = child.id === activeChildId
                    return (
                      <button
                        key={child.id}
                        className={`secondary-nav-item ${isChildActive ? 'active' : ''}`}
                        onClick={() => onChildChange(child.id)}
                      >
                        <span>{child.title}</span>
                        {child.children && (
                          <small className="item-count">{child.children.length} 项</small>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

