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

const rewards = [
  {
    title: '成为英雄120 - 125',
    content: '将获得独特的徽章和永久免费的属性页面（如果有战斗通行证，则总共3个属性页面）。',
    highlights: ['3'],
  },
  {
    title: '完成英雄125 - 140任务',
    content: '将获得独特的徽章和卡牌和骰子袋，允许你存储最多10个槽位。',
    highlights: ['10'],
  },
  {
    title: '完成英雄140 - 160任务',
    content: '将获得独特的徽章、扩展动作（包含9个动作）和黑暗龙套装。',
    highlights: ['9'],
  },
]

export const HeroReward = () => {
  return (
    <div className="baike-content">
      <div className="rewards-grid">
        {rewards.map((reward, idx) => (
          <div key={idx} className="reward-card">
            <div className="reward-title">{reward.title}</div>
            <div className="reward-content">
              <HighlightText text={reward.content} highlights={reward.highlights} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
