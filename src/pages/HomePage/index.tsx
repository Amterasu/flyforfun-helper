import { Link } from 'react-router-dom'
import { docTree } from '../../constants'
import './index.less'

export const HomePage = () => {
  const getSectionPath = (sectionId: string): string => {
    const section = docTree.find(s => s.id === sectionId)
    if (section?.children && section.children.length > 0) {
      return `/baike/${sectionId}/${section.children[0].id}`
    }
    return `/baike/${sectionId}`
  }

  return (
    <div className="home-page">
      <section className="home-hero">
        <p className="eyebrow">Flyff Universe · 资料中枢</p>
        <h1>欢迎来到飞飞百科</h1>
        <p className="lede">
          即点即用的攻略、系统说明与版本资讯。探索游戏世界的每一个角落，掌握强化技巧，了解宠物系统，挑战副本挑战。
        </p>
      </section>

      <section className="home-sections">
        <h2 className="section-title">快速导航</h2>
        <div className="section-grid">
          {docTree.map((section) => {
            const path = getSectionPath(section.id)
            return (
              <Link
                key={section.id}
                to={path}
                className="section-card"
              >
                <div className="section-card-header">
                  <span className="section-icon">{section.title.split(' ')[0]}</span>
                  <h3 className="section-card-title">
                    {section.title.replace(/^[^\s]+\s/, '')}
                  </h3>
                </div>
                {section.description && (
                  <p className="section-card-description">{section.description}</p>
                )}
                {section.children && section.children.length > 0 && (
                  <div className="section-card-footer">
                    <span className="section-count">{section.children.length} 个分类</span>
                  </div>
                )}
              </Link>
            )
          })}
        </div>
      </section>

      <section className="home-features">
        <h2 className="section-title">功能特色</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>完整攻略</h3>
            <p>涵盖游戏各个系统的详细说明和攻略指南</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔧</div>
            <h3>实用工具</h3>
            <p>提供各种游戏辅助工具，提升游戏体验</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>社区交流</h3>
            <p>加入社区，与其他玩家分享经验和心得</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📰</div>
            <h3>最新资讯</h3>
            <p>及时获取游戏更新和活动信息</p>
          </div>
        </div>
      </section>
    </div>
  )
}

