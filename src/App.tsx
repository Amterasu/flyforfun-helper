import { useMemo } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import './styles/global.less'
import { TopHeader } from './components/TopHeader'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { PrimaryNavBar } from './components/PrimaryNavBar'
import { DocStage } from './components/DocStage'
import { BaikePage } from './pages/baike'
import FlyffCommunityLinks from './pages/community'
import { ToolsPage } from './pages/tools'
import { PlaceholderBoard } from './components/PlaceholderBoard'
import { CoachingPage } from './pages/CoachingPage'
import { HomePage } from './pages/HomePage'
import { DungeonsPage } from './pages/dungeons'
import { NewVersionPage } from './pages/NewVersionPage'
import { docTree } from './constants'
import type { MainNav } from './types/doc'

/**
 * 获取飞飞百科的默认路径（第一级分类的第一个二级导航项）
 */
function getDefaultBaikePath(): string {
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

function App() {
  const location = useLocation()

  // 根据路径确定当前标签
  const activeTab: MainNav = useMemo(() => {
    const path = location.pathname
    if (path === '/index' || path.startsWith('/index')) return '首页'
    if (path.startsWith('/community')) return '社区'
    if (path.startsWith('/tool')) return '助手'
    if (path.startsWith('/dungeons')) return '副本'
    if (path.startsWith('/coaching')) return '代练'
    if (path.startsWith('/new-version')) return '新版本'
    if (path.startsWith('/baike') || path === '/') return '飞飞百科'
    return '飞飞百科'
  }, [location.pathname])

  // 从路径提取 sectionId、childId 和 leafId
  const pathParts = location.pathname.split('/').filter(Boolean)
  const sectionId = pathParts[1] || ''
  const childId = pathParts[2] || ''
  const leafId = pathParts[3] || ''

  const currentSection = useMemo(
    () => docTree.find((section) => section.id === sectionId),
    [sectionId]
  )

  return (
    <>
      <TopHeader activeTab={activeTab} />
      <div className="app-shell">
        {activeTab === '飞飞百科' && <Hero />}

        <Routes>
          {/* 根路由重定向 */}
          <Route path="/" element={<Navigate to={getDefaultBaikePath()} replace />} />
          
          {/* 首页路由 */}
          <Route
            path="/index"
            element={
              <div className="doc-wrapper">
                <HomePage />
              </div>
            }
          />

          {/* 飞飞百科路由 */}
          <Route
            path="/baike/*"
            element={
              <div className="doc-wrapper">
                <PrimaryNavBar activeSection={sectionId} />
                {currentSection?.description && (
                  <p className="section-description">{currentSection.description}</p>
                )}
                <DocStage
                  activeSection={sectionId}
                  currentSection={currentSection}
                  activeChildId={childId || undefined}
                  activeLeafId={leafId || undefined}
                  searchTerm=""
                  onSectionChange={() => {}}
                  onChildChange={() => {}}
                  onSearchChange={() => {}}
                />
              </div>
            }
          >
            <Route index element={<Navigate to={getDefaultBaikePath()} replace />} />
            <Route path=":sectionId" element={<BaikePage />} />
            <Route path=":sectionId/:childId" element={<BaikePage />} />
            <Route path=":sectionId/:childId/:leafId" element={<BaikePage />} />
          </Route>

          {/* 社区路由 */}
          <Route
            path="/community"
            element={
              <div className="doc-wrapper">
                <div className="doc-content">
                  <div className="doc-content-layout">
                    <div className="doc-content-main community-page">
                      <header>
                        <p className="eyebrow">社区资源</p>
                        <h2>🌐 社区</h2>
                        <p className="lede">官方与社区资源集合</p>
                      </header>
                      <div className="doc-tree community-content">
                        <div className="community-links-container">
                          <FlyffCommunityLinks />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          />

          {/* 工具路由 */}
          <Route
            path="/tool/:navId?"
            element={
              <div className="doc-wrapper">
                <ToolsPage />
              </div>
            }
          />

          {/* 副本路由 */}
          <Route
            path="/dungeons"
            element={
              <div className="doc-wrapper">
                <DungeonsPage />
              </div>
            }
          />

          {/* 代练路由 */}
          <Route
            path="/coaching"
            element={
              <div className="doc-wrapper">
                <CoachingPage />
              </div>
            }
          />

          {/* 新版本路由 */}
          <Route
            path="/new-version"
            element={
              <div className="doc-wrapper">
                <NewVersionPage />
              </div>
            }
          />

          {/* 404 路由 */}
          <Route
            path="*"
            element={
              <div className="doc-wrapper">
                <div className="doc-content">
                  <div className="doc-content-layout">
                    <div className="doc-content-main">
                      <header>
                        <h2>页面未找到</h2>
                        <p className="lede">请检查 URL 是否正确</p>
                      </header>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
