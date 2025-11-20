/**
 * 百科页面组件
 * 根据路由参数渲染对应的 baike 组件
 */

import { Suspense, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { getBaikeComponentByRoute } from './router'

export const BaikePage = () => {
  const params = useParams<{ sectionId?: string; childId?: string; leafId?: string }>()
  
  // 根据路由参数获取对应的组件
  const Component = useMemo(() => {
    return getBaikeComponentByRoute(params.sectionId, params.childId, params.leafId)
  }, [params.sectionId, params.childId, params.leafId])

  if (!params.sectionId) {
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
  
  if (Component) {
    return (
      <Suspense fallback={<div className="markdown-content loading"><p>加载中...</p></div>}>
        <Component />
      </Suspense>
    )
  }
  
  // 如果没有对应的组件，返回空状态
  return null
}
