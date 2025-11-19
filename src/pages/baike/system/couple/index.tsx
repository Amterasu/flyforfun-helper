import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const Couple = () => {
  return (
    <div className="baike-content">
    
    <blockquote key={1} className="baike-blockquote">
      <p key={0}>来源:<a href="https://universe.flyff.com/news/battleformadrigal1400 &quot;Battle for Madrigal Expansion (Flyff Universe Version 1.4.0" target="_blank" rel="noopener noreferrer">Madrigal之战扩展包（Flyff Universe版本1.4.0）</a>")</p>
    </blockquote>
    <h2 key={2}>情侣等级</h2>
    <div className="baike-image-container" key={3}>
      <BaikeImage key={0} src="/system/couple/couple_levels.png" alt="couple_levels.png" maxWidth="100%" />
    </div>
    <h2 key={4}>情侣技能</h2>
    <div className="baike-image-container" key={5}>
      <BaikeImage key={0} src="/system/couple/couple_skills.png" alt="couple_skills.png" maxWidth="100%" />
    </div>
    <h2 key={6}>情侣戒指</h2>
    <div className="baike-image-container" key={7}>
      <BaikeImage key={0} src="/system/couple/couple_ring.png" alt="couple_ring.png" maxWidth="100%" />
    </div>
    <h2 key={8}>情侣日常任务</h2>
    <div className="baike-image-container" key={9}>
      <BaikeImage key={0} src="/system/couple/couple_daily_quests.png" alt="couple_daily_quests.png" maxWidth="100%" />
    </div>
    <h2 key={10}>情侣周年奖励</h2>
    <div className="baike-image-container" key={11}>
      <BaikeImage key={0} src="/system/couple/couple_anniversary_rewards.png" alt="couple_anniversary_rewards.png" maxWidth="100%" />
    </div>
    
    </div>
  )
}
