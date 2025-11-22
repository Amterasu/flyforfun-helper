import React from 'react'
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

const timerData = [
  { condition: '少于4只怪物', time: '3分钟', highlights: ['3分钟', '4'] },
  { condition: '4-6只怪物', time: '80秒', highlights: ['80秒', '4-6'] },
  { condition: '8-12只怪物', time: '50秒', highlights: ['50秒', '8-12'] },
  { condition: '14只及以上怪物', time: '28秒', highlights: ['28秒', '14'] },
]

export const MonsterFocusTimer = () => {
  return (
    <div className="baike-content">
      <div className="baike-section">

        <div className="baike-info-item">
          <p>
          怪物的仇恨计时器（即攻击未命中时的追逐时长），现根据同时锁定同一玩家的怪物数量来判定：
          </p>
        </div>

        <div className="timer-grid">
          {timerData.map((item, idx) => (
            <div key={idx} className="timer-card">
              <div className="timer-condition">
                <HighlightText text={item.condition} highlights={item.highlights} />
              </div>
              <div className="timer-value">
                <HighlightText text={item.time} highlights={[item.time]} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
