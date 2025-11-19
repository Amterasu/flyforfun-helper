import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const Piercing = () => {
  return (
    <div className="baike-content">
    
    
    <p key={2}><strong>平均尝试次数说白了就是看你运气好不好而已～</strong></p>
    <BaikeImage key={3} src="/upgrade/armor_piercing_upgrade.png" alt="armor_piercing_upgrade.png" maxWidth="100%" />
    <div className="baike-image-container" key={4}>
      <BaikeImage key={0} src="/upgrade/armor_piercing_card.png" alt="armor_piercing_card.png" maxWidth="100%" />
    </div>
    <p key={5}>***</p>
    <div className="baike-image-container" key={6}>
      <BaikeImage key={0} src="/upgrade/weapon&shield_piercing_upgrade.png" alt="weapon&shield_piercing_upgrade.png" maxWidth="100%" />
    </div>
    <div className="baike-image-container" key={7}>
      <BaikeImage key={0} src="/upgrade/weapon&shield_piercing_card.png" alt="weapon&shield_piercing_card.png" maxWidth="100%" />
    </div>
    <h2 key={8}>活动</h2>
    <div className="baike-image-container" key={9}>
      <BaikeImage key={0} src="/upgrade/armor_piercing_upgrade_event.png" alt="armor_piercing_upgrade_event.png" maxWidth="100%" />
    </div>
    <ul key={10} className="baike-list">
        <li key={0}><strong>Enhanced Armor Piercing</strong> event is for upgrade with <strong>Scroll of GProtect</strong>, only including armor piercing(not weapon and shield piercing).</li>
    </ul>
    <div className="baike-image-container" key={11}>
      <BaikeImage key={0} src="/upgrade/weapon&shield_piercing_upgrade_event.png" alt="weapon&shield_piercing_upgrade_event.png" maxWidth="100%" />
    </div>
    <ul key={12} className="baike-list">
        <li key={0}><strong>Enhanced Weapon Piercing</strong> event is for upgrade with <strong>Scroll of GProtect</strong>, only including weapon and shield piercing(not armor piercing).</li>
    </ul>
    
    </div>
  )
}
