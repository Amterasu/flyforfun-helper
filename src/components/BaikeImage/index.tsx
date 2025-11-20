import React from 'react'
import { Image } from 'antd'
import type { ImageProps } from 'antd/es/image'

interface BaikeImageProps extends Omit<ImageProps, 'preview'> {
  src: string
  alt?: string
  width?: number | string
  maxWidth?: number | string
}

/**
 * Baike 内容区域的图片组件
 * 支持宽度限制、不拉伸、点击预览
 */
export const BaikeImage: React.FC<BaikeImageProps> = ({
  src,
  alt,
  width,
  maxWidth = '100%',
  style,
  ...restProps
}) => {
  const imageStyle: React.CSSProperties = {
    maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
    width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: 'auto',
    cursor: 'pointer',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    display: 'block',
    ...style,
  }

  // 处理 width 属性
  const imageWidth = width 
    ? (typeof width === 'number' ? width : parseInt(width as string, 10) || undefined)
    : undefined

  return (
    <Image
      src={src}
      alt={alt || ''}
      width={imageWidth}
      style={imageStyle}
      preview={{
        mask: false,
      }}
      {...restProps}
    />
  )
}

