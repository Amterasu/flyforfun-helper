import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'
import './index.less'

export const PixelPerfectCursorPrecision = () => {
  return (
    <div className="baike-content">
      <div className="baike-section">
        <div className="baike-source">
          <p>
            来源:
            <a
              href="https://universe.flyff.com/news/patchnotes1212minor"
              target="_blank"
              rel="noopener noreferrer"
            >
              游戏版本1.2.12小型更新说明
            </a>
          </p>
        </div>
        <div className="precision-images-grid">
          <div className="baike-image-thumbnail">
            <BaikeImage
              src="/system/pixel_perfect_cursor_precision1.gif"
              alt="pixel_perfect_cursor_precision1"
              maxWidth="400px"
            />
          </div>
          <div className="baike-image-thumbnail">
            <BaikeImage
              src="/system/pixel_perfect_cursor_precision2.gif"
              alt="pixel_perfect_cursor_precision2"
              maxWidth="400px"
            />
          </div>
        </div>
        <div className="baike-info-item">
          <p>像素完美光标选择功能允许精确的像素级选择，并确保在UI元素的边界和角落进行准确选择，适合那些希望更精确地瞄准对象的玩家。</p>
        </div>
      </div>
    </div>
  )
}
