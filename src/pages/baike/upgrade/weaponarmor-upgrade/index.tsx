import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const WeaponarmorUpgrade = () => {
  return (
    <div className="baike-content">
    
    
    <p key={2}><strong>平均尝试次数仅能说明你是否幸运。</strong></p>
    <BaikeImage key={3} src="/upgrade/weapon&armor_upgrade.png" alt="weapon&armor_upgrade.png" maxWidth="100%" />
    <div className="baike-image-container" key={4}>
      <BaikeImage key={0} src="/upgrade/chart/1,000,000%20Simulations%20Of%20Regular%20Weapon%20%2B10.png" alt="1,000,000 Simulations Of Regular Weapon +10.png" width={600} maxWidth="100%" />
    </div>
    <h2 key={5}>活动</h2>
    <blockquote key={6} className="baike-blockquote">
      <p key={0}>来源[@piccolo0002 @[GM] Piccolo (discord flyff universe)](https://discord.com/channels/778915844070834186/778927702874652682/1076113591536717834 @piccolo0002 @[GM] Piccolo (discord flyff universe))</p>
    </blockquote>
    <div className="baike-image-container" key={7}>
      <BaikeImage key={0} src="/upgrade/weapon&armor_upgrade_event.png" alt="weapon&armor_upgrade_event.png" maxWidth="100%" />
    </div>
    <ul key={8} className="baike-list">
        <li key={0}><strong>强化升级（装备）</strong> 活动适用于使用<strong>SProtect卷轴</strong>的升级，包括武器、防具和元素升级（不适用于终极装备、穿刺、首饰、卡片）。</li>
    </ul>
    <h2 key={9}>强化等级加成</h2>
    
    <div className="baike-image-container" key={11}>
      <BaikeImage key={0} src="/upgrade/upgrade_level_bonus.png" alt="upgrade_level_bonus.png" maxWidth="100%" />
    </div>
    <div className="baike-image-container" key={12}>
      <BaikeImage key={0} src="/upgrade/weapon_attack_upgrade_bonuses.png" alt="weapon_attack_upgrade_bonuses.png" maxWidth="100%" />
    </div>
    <blockquote key={13} className="baike-blockquote">
      <p key={0}>来源:[@frostiae @[Dev] Frostiae (discord flyff universe)](https://discord.com/channels/778915844070834186/867043266162458654/1218321541029167194 @frostiae @[Dev] Frostiae (discord flyff universe))</p>
    </blockquote>
    
    </div>
  )
}
