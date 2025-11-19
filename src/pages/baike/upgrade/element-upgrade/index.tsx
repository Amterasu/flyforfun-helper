import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const ElementUpgrade = () => {
  return (
    <div className="baike-content">
    
    <div className="baike-image-container" key={1}>
      <BaikeImage key={0} src="/upgrade/elemental_upgrade.png" alt="elemental_upgrade.png" maxWidth="100%" />
    </div>
    <ul key={2} className="baike-list">
        <li key={0}>Monsters have a +30% resistance to 1 element (taking less damage) and a -30% resistance for the opposite element (taking more damage).</li>
    </ul>
    <ul key={3} className="baike-list">
        <li key={0}>Having the advantageous element (e.g. +1 fire) on your weapon increases your damage by 30% due to the monster&#39;s negative resistance.</li>
    </ul>
    <ul key={4} className="baike-list">
        <li key={0}>Upgrading weapon with an element also increases attack by a % on top of the resistance bonus.</li>
    </ul>
    <ul key={5} className="baike-list">
        <li key={0}>Always use a weapon with at least a +1 elemental advantage against the monster for a 7% attack bonus boost and 30% damage increase.</li>
    </ul>
    <p key={6}><strong>For more information please refer to <a href="./Formulas.md Formulas.md">Formulas/damage/dps/auto attack/DamagePropertyFactor</a>.</strong></p>
    <div className="baike-image-container" key={7}>
      <BaikeImage key={0} src="/upgrade/scroll_of_element_change.png" alt="scroll_of_element_change.png" maxWidth="100%" />
    </div>
    
    </div>
  )
}
