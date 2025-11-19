import { useEffect } from 'react'
import './ImageViewer.less'

type ImageViewerProps = {
  children: React.ReactNode
}

export const ImageViewer = ({ children }: ImageViewerProps) => {
  useEffect(() => {
    const handleImageClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // 检查是否点击的是图片
      if (target.tagName === 'IMG') {
        e.preventDefault()
        e.stopPropagation()
        
        const img = target as HTMLImageElement
        const src = img.src
        const alt = img.alt || ''
        
        // 创建模态框
        const modal = document.createElement('div')
        modal.className = 'image-viewer-modal'
        modal.setAttribute('role', 'dialog')
        modal.setAttribute('aria-modal', 'true')
        modal.setAttribute('aria-label', '图片查看器')
        
        // 创建关闭按钮
        const closeBtn = document.createElement('button')
        closeBtn.className = 'image-viewer-close'
        closeBtn.innerHTML = '×'
        closeBtn.setAttribute('aria-label', '关闭')
        closeBtn.setAttribute('title', '关闭 (ESC)')
        
        // 创建图片容器
        const imgContainer = document.createElement('div')
        imgContainer.className = 'image-viewer-container'
        
        // 创建放大后的图片
        const largeImg = document.createElement('img')
        largeImg.src = src
        largeImg.alt = alt
        largeImg.className = 'image-viewer-img'
        
        // 组装模态框
        imgContainer.appendChild(largeImg)
        modal.appendChild(closeBtn)
        modal.appendChild(imgContainer)
        document.body.appendChild(modal)
        
        // 添加样式以禁用背景滚动
        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        
        // 关闭函数
        const closeModal = () => {
          if (document.body.contains(modal)) {
            document.body.removeChild(modal)
            document.body.style.overflow = originalOverflow
          }
          document.removeEventListener('keydown', handleEsc)
        }
        
        // ESC 键关闭
        const handleEsc = (e: KeyboardEvent) => {
          if (e.key === 'Escape') {
            closeModal()
          }
        }
        
        // 关闭按钮点击事件
        closeBtn.addEventListener('click', closeModal)
        
        // 点击背景关闭
        modal.addEventListener('click', (e) => {
          if (e.target === modal || e.target === imgContainer) {
            closeModal()
          }
        })
        
        // ESC 键监听
        document.addEventListener('keydown', handleEsc)
        
        // 图片加载完成后添加动画
        if (largeImg.complete) {
          requestAnimationFrame(() => {
            modal.classList.add('image-viewer-modal-visible')
          })
        } else {
          largeImg.onload = () => {
            requestAnimationFrame(() => {
              modal.classList.add('image-viewer-modal-visible')
            })
          }
        }
      }
    }
    
    // 为所有 .markdown-content 容器内的图片添加点击事件监听器
    const updateAllImages = () => {
      const markdownContainers = document.querySelectorAll('.markdown-content')
      markdownContainers.forEach((container) => {
        // 添加点击事件监听器（使用事件委托，只添加一次）
        if (!(container as any).__imageViewerAttached) {
          container.addEventListener('click', handleImageClick)
          ;(container as any).__imageViewerAttached = true
        }
        
        // 为图片添加可点击样式提示
        const images = container.querySelectorAll('img')
        images.forEach((img) => {
          const imgElement = img as HTMLImageElement
          imgElement.style.cursor = 'zoom-in'
          if (!imgElement.getAttribute('title')) {
            imgElement.setAttribute('title', '点击查看大图')
          }
        })
      })
    }
    
    // 初始设置
    updateAllImages()
    
    // 使用 MutationObserver 监听内容变化
    const observer = new MutationObserver(updateAllImages)
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
    
    // 清理函数
    return () => {
      const markdownContainers = document.querySelectorAll('.markdown-content')
      markdownContainers.forEach((container) => {
        container.removeEventListener('click', handleImageClick)
        ;(container as any).__imageViewerAttached = false
      })
      observer.disconnect()
    }
  }, [])
  
  return <>{children}</>
}

