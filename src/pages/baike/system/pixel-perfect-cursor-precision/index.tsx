import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'
import './index.less'

export const PixelPerfectCursorPrecision = () => {
  return (
    <div className="baike-content">
      <div className="baike-section">
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
          <p>“像素完美光标” 功能支持像素级精准选择，能确保在 UI 元素的边界与角落实现精准定位，特别适合追求对象瞄准精度的玩家。</p>
        </div>
      </div>
    </div>
  )
}
