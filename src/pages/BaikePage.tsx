/**
 * 百科页面组件
 * 根据路由参数渲染对应的 baike 组件
 */

import { Suspense, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { getBaikeComponent } from './baike'
import { MarkdownContent } from '../components/MarkdownContent'

export const BaikePage = () => {
  const params = useParams<{ sectionId?: string; childId?: string; leafId?: string }>()
  
  // 构建组件 ID：优先使用 leafId，然后是 childId，最后是 sectionId
  const componentId = useMemo(() => {
    return params.leafId || params.childId || params.sectionId || ''
  }, [params.leafId, params.childId, params.sectionId])
  
  const component = useMemo(() => {
    if (!componentId) return null
    return getBaikeComponent(componentId)
  }, [componentId])

  if (!componentId) {
    return (
      <div className="doc-wrapper">
        <div className="doc-content">
          <div className="doc-content-layout">
            <div className="doc-content-main">
              <header>
                <p className="eyebrow">飞飞百科</p>
                <h2>请选择一个分类</h2>
              </header>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if (component) {
    return (
      <Suspense fallback={<div className="markdown-content loading"><p>加载中...</p></div>}>
        {component}
      </Suspense>
    )
  }
  
  // 如果没有对应的组件，使用 MarkdownContent 作为回退
  return (
    <Suspense fallback={<div className="markdown-content loading"><p>加载中...</p></div>}>
      <MarkdownContent anchorId={componentId} />
    </Suspense>
  )
}

