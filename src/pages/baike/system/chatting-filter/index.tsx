import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'
import './index.less'

export const ChattingFilter = () => {
  return (
    <div className="baike-content">
      <div className="baike-info-card">
        <p>
          <strong>
            更多信息请参考{' '}
            <a
              href="https://gothante.wiki/?search=chat"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gothante
            </a>
            。
          </strong>
        </p>
      </div>

      <div className="baike-section">
        <div className="baike-source">
          <p>
            来源：
            <a
              href="https://universe.flyff.com/news/patchnotes133"
              target="_blank"
              rel="noopener noreferrer"
            >
              游戏版本1.3.3更新说明
            </a>
          </p>
        </div>
        <div className="baike-info-item">
          <p>在聊天选项窗口中添加了聊天颜色自定义选项。</p>
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
