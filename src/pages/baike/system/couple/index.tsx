import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'
import './index.less'

const coupleSections = [
  {
    title: '情侣等级',
    image: '/system/couple/couple_levels.png',
  },
  {
    title: '情侣技能',
    image: '/system/couple/couple_skills.png',
  },
  {
    title: '情侣戒指',
    image: '/system/couple/couple_ring.png',
  },
  {
    title: '情侣日常任务',
    image: '/system/couple/couple_daily_quests.png',
  },
  {
    title: '情侣周年奖励',
    image: '/system/couple/couple_anniversary_rewards.png',
  },
]

export const Couple = () => {
  return (
    <div className="baike-content">
      <div className="baike-source">
        <p>
          来源:
          <a
            href="https://universe.flyff.com/news/battleformadrigal1400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Madrigal之战扩展包（Flyff Universe版本1.4.0）
          </a>
        </p>
      </div>

      <div className="couple-sections-grid">
        {coupleSections.map((section, idx) => (
          <div key={idx} className="couple-section-card">
            <h3 className="couple-section-title">{section.title}</h3>
            <div className="baike-image-thumbnail">
              <BaikeImage src={section.image} alt={section.title} maxWidth="100%" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
