import React from 'react'
import { BaikeImage } from '../../../../../components/BaikeImage'

export const UltimateWeapon = () => {
  return (
    <div className="baike-content">
    
    <blockquote key={1} className="baike-blockquote">
      <p key={0}>来源:[@tassel#0672 @[Mod CN] tassel (discord flyff universe)](https://discord.com/channels/778915844070834186/1000058902576119878/1178910002065457202 @tassel#0672 @[Mod CN] tassel (discord flyff universe))</p>
    </blockquote>
    <ul key={2} className="baike-list">
        <li key={0}>升级终极武器时，其机制是有条件的，即先判断成功或失败，然后再决定是否为完美升级。</li>
    </ul>
    <div className="baike-image-container" key={3}>
      <BaikeImage key={0} src="/upgrade/ultimate/ultimate_weapon_upgrade.png" alt="ultimate_weapon_upgrade.png" maxWidth="100%" />
    </div>
    <div className="baike-image-container" key={4}>
      <BaikeImage key={0} src="/upgrade/ultimate/1,000,000%20Simulations%20Of%20Ultimate%20Weapon%20%2B0%20to%20%2B5.png" alt="1,000,000 Simulations Of Ultimate Weapon +0 to +5.png" width={600} maxWidth="100%" />
    </div>
    <blockquote key={5} className="baike-blockquote">
      <p key={0}>来源:[@bluechromed @[Dev] Blukie (discord flyff universe)](https://discord.com/channels/778915844070834186/1000058902576119878/1174954477112021042 @bluechromed @[Dev] Blukie (discord flyff universe))</p>
    </blockquote>
    </div>
  )
}
