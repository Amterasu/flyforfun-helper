import React from 'react'
import { BaikeImage } from '../../../../../components/BaikeImage'

export const Event = () => {
  return (
    <div className="baike-content">
    <div className="baike-image-container" key={1}>
      <BaikeImage key={0} src="/upgrade/weapon&armor_upgrade_event.png" alt="weapon&armor_upgrade_event.png" maxWidth="100%" />
    </div>
    <ul key={2} className="baike-list">
        <li key={0}><strong>强化升级（装备）</strong> 活动适用于使用<strong>SProtect卷轴</strong>的升级，包括武器、防具和元素升级（不适用于终极装备、穿刺、首饰、卡片）。</li>
    </ul>
    </div>
  )
}
