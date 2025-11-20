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

const damageData = [
  { monster: '第1到第8只', damage: '100%' },
  { monster: '第9只', damage: '90%' },
  { monster: '第10只', damage: '81%' },
  { monster: '第11只', damage: '72.9%' },
  { monster: '第12只', damage: '65.61%' },
  { monster: '第13只', damage: '59.05%' },
  { monster: '第14只', damage: '53.14%' },
  { monster: '第15只', damage: '47.83%' },
  { monster: '第16只', damage: '43.05%' },
  { monster: '第17只', damage: '38.74%' },
  { monster: '第18只', damage: '34.87%' },
  { monster: '第19只', damage: '31.38%' },
  { monster: '第20只', damage: '28.24%' },
]

export const HerdDamageReduction = () => {
  return (
    <div className="baike-content">
      <div className="baike-info-card">
        <p>
          <strong>
            更多信息请参考{' '}
            <a
              href="https://gothante.wiki/?search=herd+damage+reduction"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gothante
            </a>
            。
          </strong>
        </p>
      </div>

      <div className="baike-image-thumbnail">
        <BaikeImage
          src="/system/herd_damage_reduction.png"
          alt="herd_damage_reduction.png"
          maxWidth="600px"
        />
      </div>

      <div className="baike-section">
        <div className="baike-info-item">
          <p>
            当同一技能攻击的怪物数量大于
            <HighlightText text="8" highlights={['8']} />
            时，第n只怪物将受到伤害会减少
          </p>
        </div>

        <div className="damage-reduction-grid">
          {damageData.map((item, idx) => (
            <div key={idx} className="damage-item-card">
              <div className="damage-monster">{item.monster}</div>
              <div className="damage-value">
                <HighlightText text={item.damage} highlights={[item.damage]} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
