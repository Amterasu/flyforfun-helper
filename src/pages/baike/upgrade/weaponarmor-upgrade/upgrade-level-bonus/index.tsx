import React from 'react'
import { BaikeImage } from '../../../../../components/BaikeImage'

export const UpgradeLevelBonus = () => {
  return (
    <div className="baike-content">
    
    <div className="baike-image-container" key={1}>
      <BaikeImage key={0} src="/upgrade/upgrade_level_bonus.png" alt="upgrade_level_bonus.png" maxWidth="100%" />
    </div>
    <div className="baike-image-container" key={2}>
      <BaikeImage key={0} src="/upgrade/weapon_attack_upgrade_bonuses.png" alt="weapon_attack_upgrade_bonuses.png" maxWidth="100%" />
    </div>
    
    </div>
  )
}
