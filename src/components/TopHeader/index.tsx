import { Link, useLocation } from 'react-router-dom'
import { MainNav } from '../../types/doc'
import { mainNavTabs, docTree } from '../../constants'
import './index.less'

type TopHeaderProps = {
  activeTab: MainNav
}

export const TopHeader = ({ activeTab }: TopHeaderProps) => {
  const location = useLocation()

  const getTabPath = (tab: MainNav): string => {
    switch (tab) {
      case '首页':
        return '/index'
      case '飞飞百科': {
        const firstSection = docTree[0]
        if (firstSection) {
          // 如果有子节点，导航到第一个子节点
          if (firstSection.children && firstSection.children.length > 0) {
            return `/baike/${firstSection.id}/${firstSection.children[0].id}`
          }
          return `/baike/${firstSection.id}`
        }
        return '/baike/system'
      }
      case '社区':
        return '/community'
      case '副本':
        return '/dungeons'
      case '助手':
        return '/tool/fashion-awakening'
      case '代练':
        return '/coaching'
      case '新版本':
        return '/new-version'
      default:
        return '/'
    }
  }

  return (
    <header className="top-header">
      <div className="brand">
        <Link to="/" className="brand-link">
          <div className="brand-logo">
            <img
              src="https://universe.flyff.com/storage/img/logofull.png"
              width={85}
              height={54}
              alt="Flyff Universe Logo"
              loading="lazy"
            />
          </div>
          <div className="brand__texts">
            <strong>Universe Doc</strong>
            <span>Flyff Universe 指南</span>
          </div>
        </Link>
      </div>
      <nav className="primary-nav">
        {mainNavTabs.map((tab) => {
          const path = getTabPath(tab)
          const isActive = tab === activeTab
          const isNewVersion = tab === '新版本'
          return (
            <Link
              key={tab}
              to={path}
              className={isActive ? 'active' : ''}
            >
              {tab}
              {isNewVersion && <span className="nav-new-badge">NEW</span>}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}

