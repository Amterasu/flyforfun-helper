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

const changes = [
  { text: '从怪物身上获取的经验减半 (-50%)。', highlights: ['-50%', '50%'] },
  { text: '掉落率减半 (-50%)。', highlights: ['-50%', '50%'] },
  { text: '只能与同一主线任务的其他玩家分享经验。', highlights: [] },
  { text: '不能进入副本。', highlights: [] },
  { text: '不能进入 60、80 级公会战。', highlights: ['60', '80'] },
  { text: '可以使用原本等级的装备和技能。', highlights: [] },
  { text: '在大师任务中，经验分享等级差距为 9 级。', highlights: ['9'] },
]

export const MasterheroQuests = () => {
  return (
    <div className="baike-content">

      <div className="baike-image-thumbnail">
        <BaikeImage
          src="/system/quest/master_hero_quests.png"
          alt="master_hero_quests.png"
          maxWidth="600px"
        />
      </div>

      <div className="baike-section">
        <div className="baike-info-item">
          <p>在执行大师任务与英雄任务期间，你的角色将迎来以下变更：</p>
        </div>
        <ol className="baike-ordered-list baike-ordered-list--spacious">
          {changes.map((change, idx) => (
            <li key={idx}>
              <HighlightText text={change.text} highlights={change.highlights} />
            </li>
          ))}
        </ol>
      </div>

      <div className="baike-section">
        <h2 className="baike-section-title">大师披风</h2>
        <div className="baike-info-item">
          <p>完成任务后，奖励大师披风（左图）。</p>
        </div>
        <div className="baike-info-item">
          <p>在活动期间完成可选大师任务的玩家将获得特殊的披风（右图）。</p>
        </div>
        <div className="baike-image-thumbnail">
          <BaikeImage
            src="/system/quest/master_quest_cloak.png"
            alt="master_quest_cloak.png"
            maxWidth="600px"
          />
        </div>
      </div>

      <div className="baike-section">
        <h2 className="baike-section-title">英雄奖励</h2>
        <div className="rewards-grid">
          <div className="reward-card">
            <div className="reward-title">
              成为<strong>英雄120 - 125</strong>
            </div>
            <div className="reward-content">
              将获得独特的徽章和永久免费的属性页面（如果有战斗通行证，则总共
              <HighlightText text="3" highlights={['3']} />
              个属性页面）。
            </div>
          </div>
          <div className="reward-card">
            <div className="reward-title">
              完成<strong>英雄125 - 140</strong>任务
            </div>
            <div className="reward-content">
              将获得独特的徽章和卡牌和骰子袋，允许你存储最多
              <HighlightText text="10" highlights={['10']} />
              个槽位。
            </div>
          </div>
          <div className="reward-card">
            <div className="reward-title">
              完成<strong>英雄140 - 160</strong>任务
            </div>
            <div className="reward-content">
              将获得独特的徽章、扩展动作（包含
              <HighlightText text="9" highlights={['9']} />
              个动作）和黑暗龙套装。
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
