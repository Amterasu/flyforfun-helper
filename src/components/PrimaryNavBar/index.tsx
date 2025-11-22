import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Popover } from 'antd'
import { docTree } from '../../constants'
import { DocNode } from '../../types/doc'
import './index.less'

// 提取文字内容（去掉emoji）
const extractText = (text: string): string => {
  return text.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim()
}

type PrimaryNavBarProps = {
  activeSection: string
}

// 三级导航内容组件
const SecondaryNavContent = ({ 
  section, 
  onItemClick 
}: { 
  section: DocNode
  onItemClick?: () => void
}) => {
  const params = useParams<{ sectionId?: string; childId?: string }>()
  // 修复：直接使用传入的 section.id，不从URL参数获取，避免跨导航点击时路由错误
  const sectionId = section.id
  const activeChildId = params.childId

  if (!section?.children?.length) return null

  const getChildPath = (childId: string): string => {
    const child = section.children?.find(c => c.id === childId)
    if (child?.children && child.children.length > 0) {
      // 如果有子节点，导航到第一个子节点
      return `/baike/${sectionId}/${childId}/${child.children[0].id}`
    }
    return `/baike/${sectionId}/${childId}`
  }

  // 系统导航和强化导航特殊处理：使用多列布局（三排展示）
  const useMultiColumn = (section.id === 'system' && section.children.length > 15) || 
                         (section.id === 'upgrade' && section.children.length > 0)

  return (
    <div className={`secondary-nav-popover-content ${useMultiColumn ? 'multi-column' : ''}`}>
      {section.children.map((child) => {
        const isActive = child.id === activeChildId
        const path = getChildPath(child.id)
        return (
          <Link
            key={child.id}
            to={path}
            className={`secondary-nav-popover-item ${isActive ? 'active' : ''}`}
            onClick={onItemClick}
          >
            <span className="nav-item-text">{child.title}</span>
            {child.children && child.children.length > 0 && (
              <span className="nav-item-badge">{child.children.length}</span>
            )}
          </Link>
        )
      })}
    </div>
  )
}

export const PrimaryNavBar = ({ activeSection }: PrimaryNavBarProps) => {
  // 管理每个 Popover 的打开状态
  const [openPopovers, setOpenPopovers] = useState<Record<string, boolean>>({})

  const getSectionPath = (sectionId: string): string => {
    const section = docTree.find(s => s.id === sectionId)
    if (section?.children && section.children.length > 0) {
      // 如果有子节点，导航到第一个子节点
      return `/baike/${sectionId}/${section.children[0].id}`
    }
    return `/baike/${sectionId}`
  }

  const handlePopoverOpenChange = (sectionId: string, open: boolean) => {
    setOpenPopovers(prev => ({
      ...prev,
      [sectionId]: open
    }))
  }

  const handleItemClick = (sectionId: string) => {
    // 点击三级导航项后关闭 Popover
    setOpenPopovers(prev => ({
      ...prev,
      [sectionId]: false
    }))
  }

  return (
    <div className="primary-nav-bar">
      <div className="primary-nav-scroll">
        {docTree.map((section) => {
          const isActive = section.id === activeSection
          const displayText = extractText(section.title)
          const path = getSectionPath(section.id)
          const hasChildren = section.children && section.children.length > 0

          const navItem = (
            <Link
              key={section.id}
              to={path}
              className={`primary-nav-item ${isActive ? 'active' : ''}`}
              title={section.title}
            >
              {displayText}
            </Link>
          )

          // 如果有子节点，使用 Popover 包裹
          if (hasChildren) {
            return (
              <Popover
                key={section.id}
                content={
                  <SecondaryNavContent 
                    section={section} 
                    onItemClick={() => handleItemClick(section.id)}
                  />
                }
                placement="bottomLeft"
                trigger={['hover', 'click']}
                mouseEnterDelay={0.2}
                mouseLeaveDelay={0.3}
                destroyTooltipOnHide={false}
                overlayClassName="secondary-nav-popover"
                overlayStyle={{ padding: 0 }}
                open={openPopovers[section.id] ?? false}
                onOpenChange={(open) => handlePopoverOpenChange(section.id, open)}
              >
                {navItem}
              </Popover>
            )
          }

          return navItem
        })}
      </div>
    </div>
  )
}

