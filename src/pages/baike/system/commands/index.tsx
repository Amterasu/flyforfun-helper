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

export const Commands = () => {
  return (
    <div className="baike-content">
      <div className="baike-info-card">
        <p>
          <strong>
            更多信息请参考{' '}
            <a href="https://gothante.wiki/?search=commands" target="_blank" rel="noopener noreferrer">
              Gothante
            </a>
            。
          </strong>
        </p>
      </div>

      <div className="baike-section">
        <div className="baike-source">
          <p>
            来源:
            <a
              href="https://universe.flyff.com/news/patchnotes132"
              target="_blank"
              rel="noopener noreferrer"
            >
              游戏版本1.3.2更新说明
            </a>
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            <HighlightText
              text="添加了聊天命令 /lockedslots 来显示所有解锁库存槽位的未完成任务和成就。"
              highlights={['/lockedslots']}
            />
          </p>
        </div>
      </div>

      <div className="baike-section">
        <div className="baike-source">
          <p>
            来源:
            <a
              href="https://universe.flyff.com/news/patchnotemarch6"
              target="_blank"
              rel="noopener noreferrer"
            >
              游戏版本1.4.3更新说明（3月6日）
            </a>
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            <HighlightText
              text="现在你可以使用 /spectate 在公会战地图内观战玩家，但有一些限制。"
              highlights={['/spectate']}
            />
          </p>
        </div>
      </div>

      <div className="baike-image-thumbnail">
        <BaikeImage src="/system/commands.png" alt="commands.png" maxWidth="600px" />
      </div>
    </div>
  )
}
