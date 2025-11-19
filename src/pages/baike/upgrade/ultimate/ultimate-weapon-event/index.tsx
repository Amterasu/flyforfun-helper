import React from 'react'
import { BaikeImage } from '../../../../../components/BaikeImage'

export const UltimateWeaponEvent = () => {
  return (
    <div className="baike-content">
    
    <div className="baike-image-container" key={1}>
      <BaikeImage key={0} src="/upgrade/ultimate/ultimate_weapon_upgrade_event.png" alt="ultimate_weapon_upgrade_event.png" maxWidth="100%" />
    </div>
    <ul key={2} className="baike-list">
        <li key={0}><strong>终极强化升级活动</strong>仅适用于<strong>终极武器和饰品</strong>。</li>
    </ul>
    </div>
  )
}
