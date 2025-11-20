import { useMemo } from 'react'
import { DocNode } from '../../types/doc'
import { DocNodeItem } from '../DocNodeItem'
import { Outlet } from 'react-router-dom'
import './index.less'

type DocStageProps = {
  activeSection: string
  currentSection?: DocNode
  activeChildId?: string
  searchTerm: string
  onSectionChange: (id: string) => void
  onChildChange: (id: string) => void
  onSearchChange: (value: string) => void
}

export const DocStage = ({
  currentSection,
  activeChildId
}: DocStageProps) => {
  const currentChild = useMemo(
    () => currentSection?.children?.find((child) => child.id === activeChildId),
    [activeChildId, currentSection]
  )

  const hasSecondaryNav = !!currentSection?.children?.length
  const filteredNodes = useMemo(() => {
    if (!hasSecondaryNav || !currentChild?.children) return currentChild?.children
    return currentChild.children
  }, [currentChild, hasSecondaryNav])

  return (
    <section className="doc-stage">
      <section className="doc-content">
        <div className="doc-content-layout">
          <div className="doc-content-main">
            <header>
              <p className="eyebrow">{currentSection?.title ?? '子导航'}</p>
              <h2>{currentChild?.title ?? currentSection?.title ?? '请选择一个分类'}</h2>
              {currentChild?.description ? (
                <p className="lede">{currentChild.description}</p>
              ) : currentSection?.description ? (
                <p className="lede">{currentSection.description}</p>
              ) : null}
            </header>
            <div className="doc-tree">
              {hasSecondaryNav ? (
                currentChild ? (
                  <>
                    {/* 显示当前二级导航项的内容 */}
                    <Outlet />
                    {/* 如果有子节点，显示子节点列表 */}
                    {currentChild.children && (
                      <>
                        {filteredNodes && filteredNodes.length > 0 ? (
                          filteredNodes.map((node) => (
                            <DocNodeItem key={node.id} node={node} showContent={false} />
                          ))
                        ) : (
                          <div className="empty-state-card">
                            <p>未找到匹配的条目，请调整搜索条件。</p>
                          </div>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <div className="empty-state-card">
                    <p>请选择左侧二级导航，查看详细条目。</p>
                  </div>
                )
              ) : currentSection ? (
                <Outlet />
              ) : (
                <div className="doc-node depth-0">
                  <div className="doc-node-header is-leaf">
                    <strong>该分类暂未细分</strong>
                    <small>后续将补充更多交互内容</small>
                  </div>
                  <div className="doc-node-cta">
                    <button className="solid-btn">创建任务卡</button>
                    <button className="ghost-btn">订阅更新</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

