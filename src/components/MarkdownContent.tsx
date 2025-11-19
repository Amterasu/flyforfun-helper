import { useEffect, useState, useMemo } from 'react'
import { renderMarkdownContent } from '../utils/markdownContent'
import { renderConfigContent } from '../utils/configContent'
import { getBaikeComponent, hasBaikeComponent } from '../pages/baike'
import { ImageViewer } from './ImageViewer'
import './MarkdownContent.less'

type MarkdownContentProps = {
  anchorId: string
}

export const MarkdownContent = ({ anchorId }: MarkdownContentProps) => {
  const [htmlContent, setHtmlContent] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // 优先检查是否有 TSX 组件（使用 useMemo 缓存）
  const baikeComponent = useMemo(() => {
    if (!anchorId) return null
    return getBaikeComponent(anchorId)
  }, [anchorId])

  const hasComponent = useMemo(() => {
    if (!anchorId) return false
    return hasBaikeComponent(anchorId)
  }, [anchorId])

  useEffect(() => {
    if (!anchorId) {
      setHtmlContent('')
      setLoading(false)
      return
    }

    // 如果有 TSX 组件，不需要加载其他内容
    if (hasComponent) {
      setHtmlContent('')
      setLoading(false)
      setError(null)
      return
    }

    // 如果没有 TSX 组件，使用配置数据源
    setLoading(true)
    setError(null)

    renderConfigContent(anchorId)
      .then((html) => {
        if (html && html.trim()) {
          setHtmlContent(html)
          setLoading(false)
        } else {
          // 如果配置数据源没有内容，回退到原始 markdown
          return renderMarkdownContent(anchorId)
            .then((fallbackHtml) => {
              setHtmlContent(fallbackHtml || '')
              setLoading(false)
            })
        }
      })
      .catch((err) => {
        console.error('Error loading markdown content:', err)
        // 尝试回退到原始 markdown
        renderMarkdownContent(anchorId)
          .then((html) => {
            setHtmlContent(html || '')
            setLoading(false)
          })
          .catch((fallbackErr) => {
            console.error('Error loading fallback markdown:', fallbackErr)
            setError('加载内容失败')
            setLoading(false)
          })
      })
  }, [anchorId, hasComponent])

  // 优先使用 TSX 组件
  if (baikeComponent) {
    return <ImageViewer>{baikeComponent}</ImageViewer>
  }

  if (loading) {
    return (
      <div className="markdown-content loading">
        <p>加载中...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="markdown-content error">
        <p>{error}</p>
      </div>
    )
  }

  if (!htmlContent) {
    return (
      <div className="markdown-content empty">
        <p>暂无内容</p>
      </div>
    )
  }

  return (
    <ImageViewer>
      <div
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </ImageViewer>
  )
}

