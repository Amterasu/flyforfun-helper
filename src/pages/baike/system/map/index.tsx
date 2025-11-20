import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'
import './index.less'

// 高亮文本组件
const HighlightText: React.FC<{ text: string; highlights: string[] }> = ({ text, highlights }) => {
  if (highlights.length === 0) {
    return <>{text}</>
  }

  const pattern = highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
  const regex = new RegExp(`(${pattern})`, 'g')
  const parts = text.split(regex)

  return (
    <>
      {parts.map((part, idx) => {
        const isHighlight = highlights.includes(part)
        return isHighlight ? (
          <span key={idx} className="highlight">
            {part}
          </span>
        ) : (
          <React.Fragment key={idx}>{part}</React.Fragment>
        )
      })}
    </>
  )
}

export const Map = () => {
  return (
    <div className="baike-content">
      <div className="baike-section">
        <h2 className="baike-section-title">瑞嘉大陆最低等级限制</h2>
        <div className="baike-info-card">
          <div className="baike-info-item">
            <p>
              <HighlightText
                text="某些大陆现在需要最低玩家等级：莱斯花园和达肯 3需要20级，雪地需要80级，珊瑚岛需要100级。请注意，等级要求不适用于安全区域，如雪地村庄、珊瑚村庄、荒野入口等。未达到等级要求的玩家将自动传送到帕里。"
                highlights={['20', '80', '100']}
              />
            </p>
          </div>
          <div className="baike-info-item">
            <p>
              <HighlightText
                text="降低了使用城镇传送卷轴或Madrigal传送卷轴传送到海岛胖胖的等级要求，从120级降至110级。"
                highlights={['120', '110']}
              />
            </p>
          </div>
          <div className="baike-source">
            <p>
              来源:
              <a
                href="https://universe.flyff.com/news/patchnotes1311"
                target="_blank"
                rel="noopener noreferrer"
              >
                游戏版本1.3.11更新说明
              </a>
            </p>
          </div>
        </div>
        <div className="baike-image-thumbnail">
          <BaikeImage
            src="/system/map/madrigal_minimum_level.png"
            alt="madrigal_minimum_level.png"
            maxWidth="600px"
          />
        </div>
      </div>

      <div className="baike-section">
        <h2 className="baike-section-title">瑞嘉大陆</h2>
        <div className="baike-image-thumbnail">
          <BaikeImage src="/system/map/wdmadrigal.png" alt="wdmadrigal.png" maxWidth="600px" />
        </div>
      </div>

      <div className="baike-section">
        <h2 className="baike-section-title">珊瑚岛怪物</h2>
        <div className="baike-image-thumbnail">
          <BaikeImage
            src="/system/map/coral_island_monster.png"
            alt="coral_island_monster.png"
            maxWidth="600px"
          />
        </div>
      </div>

      <div className="baike-section">
        <h2 className="baike-section-title">海洞怪物</h2>
        <div className="baike-image-thumbnail">
          <BaikeImage
            src="/system/map/herneos_monster.png"
            alt="herneos_monster.png"
            maxWidth="600px"
          />
        </div>
      </div>
    </div>
  )
}
