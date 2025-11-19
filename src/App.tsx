import { useMemo } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import './styles/global.less'
import { TopHeader } from './components/TopHeader'
import { Hero } from './components/Hero'
import { PrimaryNavBar } from './components/PrimaryNavBar'
import { DocStage } from './components/DocStage'
import { BaikePage } from './pages/BaikePage'
import { MarkdownContent } from './components/MarkdownContent'
import { AssistantStage } from './components/assistant/AssistantStage'
import { PlaceholderBoard } from './components/PlaceholderBoard'
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
    if (path.startsWith('/community')) return '社区'
    if (path.startsWith('/assistant')) return '助手'
    if (path.startsWith('/news')) return '新闻'
    if (path.startsWith('/baike') || path === '/') return '飞飞百科'
    return '飞飞百科'
  }, [location.pathname])

  // 从路径提取 sectionId 和 childId
  const pathParts = location.pathname.split('/').filter(Boolean)
  const sectionId = pathParts[1] || ''
  const childId = pathParts[2] || ''

  const currentSection = useMemo(
    () => docTree.find((section) => section.id === sectionId),
    [sectionId]
  )

  return (
    <>
      <TopHeader activeTab={activeTab} />
      <div className="app-shell">
        <Hero />

        <Routes>
          {/* 根路由重定向 */}
          <Route path="/" element={<Navigate to={getDefaultBaikePath()} replace />} />

          {/* 飞飞百科路由 */}
          <Route
            path="/baike/*"
            element={
              <div className="doc-wrapper">
                <PrimaryNavBar activeSection={sectionId} />
                <DocStage
                  activeSection={sectionId}
                  currentSection={currentSection}
                  activeChildId={childId || undefined}
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
                        <MarkdownContent anchorId="community" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          />

          {/* 助手路由 */}
          <Route
            path="/assistant/:navId?"
            element={
              <div className="doc-wrapper">
                <AssistantStage />
              </div>
            }
          />

          {/* 新闻路由 */}
          <Route
            path="/news"
            element={
              <div className="doc-wrapper">
                <PlaceholderBoard title="新闻" />
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
    </>
  )
}

export default App
