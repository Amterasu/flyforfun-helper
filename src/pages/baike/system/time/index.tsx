import React from 'react'
import './index.less'

const timeData = [
  {
    title: '时间换算',
    description: '现实时间与游戏时间的换算关系',
    items: [
      {
        label: '基础换算',
        value: '现实时间 1 秒 = 游戏中 100 秒',
        highlight: ['1', '100'],
      },
    ],
  },
  {
    title: '游戏一天',
    description: '游戏中完整一天的时间',
    items: [
      {
        label: '总时长',
        value: '现实世界 14 分 24 秒（14:24）',
        highlight: ['14', '24', '14:24'],
      },
    ],
  },
  {
    title: '夜晚时间',
    description: '游戏中的夜晚时段',
    items: [
      {
        label: '持续时间',
        value: '现实世界 6 分 36 秒（6:36）',
        highlight: ['6', '36', '6:36'],
      },
      {
        label: '游戏时间',
        value: '从 19:00 到 06:00',
        highlight: ['19:00', '06:00'],
      },
    ],
  },
  {
    title: '白天时间',
    description: '游戏中的白天时段',
    items: [
      {
        label: '持续时间',
        value: '现实世界 7 分 48 秒（7:48）',
        highlight: ['7', '48', '7:48'],
      },
      {
        label: '游戏时间',
        value: '从 06:00 到 19:00',
        highlight: ['06:00', '19:00'],
      },
    ],
  },
]

// 高亮文本中的数字组件
const HighlightText: React.FC<{ text: string; highlights: string[] }> = ({ text, highlights }) => {
  if (highlights.length === 0) {
    return <>{text}</>
  }

  // 创建正则表达式匹配所有需要高亮的内容
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

export const Time = () => {
  return (
    <div className="baike-content">
      <div className="time-info-grid">
        {timeData.map((section, sectionIdx) => (
          <div key={sectionIdx} className="time-info-card">
            <div className="time-info-header">
              <h3 className="time-info-title">{section.title}</h3>
              <p className="time-info-description">{section.description}</p>
            </div>
            <div className="time-info-items">
              {section.items.map((item, itemIdx) => (
                <div key={itemIdx} className="time-info-item">
                  <div className="time-info-label">{item.label}</div>
                  <div className="time-info-value">
                    <HighlightText text={item.value} highlights={item.highlight} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
