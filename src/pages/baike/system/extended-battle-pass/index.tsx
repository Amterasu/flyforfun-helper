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
  '公共银行',
  '2天商人商店',
  '无限加速燃料',
  '无限经验锁定',
  '地下城地图和导航器',
  '更快的安全升级：成功或失败的加载阶段更快（动画）。',
  '额外1次免费地下城入场',
  '第二属性页面：每次切换有15分钟的冷却时间。',
  '每个属性页面都有自己的STR、DEX、INT、STA和剩余属性点。',
  '使用重置属性只会应用于当前选中的属性页面，而不是两个属性页面。',
  '每日5次搜索商店传送',
  '以及游戏更新中即将推出的更多内容！',
]

export const ExtendedBattlePass = () => {
  return (
    <div className="baike-content">
      <div className="baike-info-card">
        <p>
          <strong>
            更多信息请参考{' '}
            <a
              href="https://gothante.wiki/?search=extended+pass+system"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gothante
            </a>
            。
          </strong>
        </p>
      </div>

      <div className="baike-sources">
        <div className="baike-source">
          <p>
            来源:
            <a href="https://universe.flyff.com/news/battlepass" target="_blank" rel="noopener noreferrer">
              战斗通行证系统
            </a>
          </p>
        </div>
        <div className="baike-source">
          <p>
            来源:
            <a
              href="https://universe.flyff.com/news/reborn120"
              target="_blank"
              rel="noopener noreferrer"
            >
              v1.2.0 重生将于3月13日推出！
            </a>
          </p>
        </div>
        <div className="baike-source">
          <p>
            来源:
            <a
              href="https://wcdn-universe.flyff.com/site/patch1_2_0.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              重生扩展 Flyff Universe版本 1.2.0
            </a>
          </p>
        </div>
        <div className="baike-source">
          <p>
            来源:
            <a href="https://universe.flyff.com/news/ver141" target="_blank" rel="noopener noreferrer">
              Madrigal之战扩展更新 (Flyff Universe版本 1.4.1)
            </a>
          </p>
        </div>
      </div>

      <div className="baike-section">
        <div className="baike-info-item">
          <p>亲爱的玩家，</p>
        </div>
        <div className="baike-info-item">
          <p>在2022年11月3日维护后，将为所有玩家推出一个新系统：战斗通行证系统。</p>
        </div>
        <div className="baike-info-item">
          <p>通过战斗通行证系统，你可以完成各种任务来赚取点数，提升你的战斗通行证等级。</p>
        </div>
        <div className="baike-info-item">
          <p>每次升级后，你将获得不同类型的奖励。</p>
        </div>
        <div className="baike-info-item">
          <p>
            为了升级，你需要通过不同的任务收集
            <HighlightText text="100" highlights={['100']} />
            点。
          </p>
        </div>
        <div className="baike-info-item">
          <p>任务分为每日、每周和赛季任务。</p>
        </div>
        <div className="baike-info-item">
          <p>
            你每周最多可获得
            <HighlightText text="1,000" highlights={['1,000']} />
            点，且这些点数仅在战斗通行证开放的赛季内有效。
          </p>
        </div>
        <div className="baike-info-item">
          <p>扩展通行证也仅在购买时的特定赛季内有效。</p>
        </div>
      </div>

      <div className="baike-section">
        <h3 className="benefits-title">此次购买将在战斗通行证赛季期间为您提供许多优势：</h3>
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
