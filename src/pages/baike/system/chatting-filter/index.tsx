import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'
import './index.less'

export const ChattingFilter = () => {
  return (
    <div className="baike-content">
      <div className="baike-section">
        <div className="baike-info-item">
          <p>聊天选项窗口新增「聊天颜色自定义」功能，支持自主过滤聊天文本颜色。</p>
        </div>
      </div>

      <div className="chatting-images-grid">
        <div className="baike-image-thumbnail">
          <BaikeImage
            src="/system/chatting_filter/chatting_filter.png"
            alt="聊天过滤"
            maxWidth="300px"
          />
        </div>
        <div className="baike-image-thumbnail">
          <BaikeImage
            src="/system/chatting_filter/chatting_filter_window.png"
            alt="聊天过滤窗口"
            maxWidth="400px"
          />
        </div>
      </div>
    </div>
  )
}
