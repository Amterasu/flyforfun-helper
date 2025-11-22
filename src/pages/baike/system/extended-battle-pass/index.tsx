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

const benefits = [
  '更多战斗通行证奖励（包括独家服装）',
  '同账号多角色仓库互通',
  '2天摆摊替身',
  '无限加速燃料（按x）',
  '无限经验锁定',
  '副本地图显示',
  '强化等成功或失败的加载阶段更快（动画）',
  '额外1次免费副本入场',
  '第二属性页面：每次切换有15分钟的冷却时间',
  '每日5次搜索商店传送',
]

export const ExtendedBattlePass = () => {
  return (
    <div className="baike-content">
      <div className="baike-section">
        <h3 className="benefits-title">通行证除了通行证等级奖励外，还提供了以下优势：</h3>
        <div className="benefits-grid">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="benefit-card">
              <p>
                <HighlightText
                  text={benefit}
                  highlights={['100', '15', 'STR', 'DEX', 'INT', 'STA', '5']}
                />
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
