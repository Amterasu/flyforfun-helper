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
        <h2 className="baike-section-title">瑞加大陆最低等级限制</h2>
        <div className="baike-info-card">
          <div className="baike-info-item">
            <p>
              <HighlightText
                text="目前部分大陆区域设有最低准入等级限制：莱斯花园、达肯3需玩家等级达到 20 级，雪地需 80 级，珊瑚岛需 100 级。需注意，该等级要求不适用于雪地村庄、珊瑚村庄、荒野入口等安全区域。未满足等级条件的玩家，将被自动传送至帕里。"
                highlights={['20', '80', '100']}
              />
            </p>
          </div>
          <div className="baike-info-item">
            <p>
              <HighlightText
                text="同时调整了城镇传送卷轴的使用规则：传送到海岛胖胖的等级要求从 120 级下调至 110 级。"
                highlights={['120', '110']}
              />
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
        <h2 className="baike-section-title">瑞加大陆</h2>
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
