import { Link } from 'react-router-dom'
import { docTree } from '../constants'
import './PrimaryNavBar.less'

// 提取文字内容（去掉emoji）
const extractText = (text: string): string => {
  return text.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim()
}

type PrimaryNavBarProps = {
  activeSection: string
}

export const PrimaryNavBar = ({ activeSection }: PrimaryNavBarProps) => {

  const getSectionPath = (sectionId: string): string => {
    const section = docTree.find(s => s.id === sectionId)
    if (section?.children && section.children.length > 0) {
      // 如果有子节点，导航到第一个子节点
      return `/baike/${sectionId}/${section.children[0].id}`
    }
    return `/baike/${sectionId}`
  }

  return (
    <div className="primary-nav-bar">
      <div className="primary-nav-scroll">
        {docTree.map((section) => {
          const isActive = section.id === activeSection
          const displayText = extractText(section.title)
          const path = getSectionPath(section.id)
          return (
            <Link
              key={section.id}
              to={path}
              className={`primary-nav-item ${isActive ? 'active' : ''}`}
              title={section.title}
            >
              {displayText}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

