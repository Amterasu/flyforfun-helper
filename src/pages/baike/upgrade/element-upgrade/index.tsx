import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const ElementUpgrade = () => {
  return (
    <div className="baike-content">
    
    <div className="baike-image-container" key={1}>
      <BaikeImage key={0} src="/upgrade/elemental_upgrade.png" alt="elemental_upgrade.png" maxWidth="100%" />
    </div>
    <ul key={2} className="baike-list">
        <li key={0}>怪物对某一元素拥有 +30% 抗性（受到该元素伤害减少），而对其对立元素则拥有 -30% 抗性（受到该元素伤害增加</li>
    </ul>
    <ul key={3} className="baike-list">
        <li key={0}>若你的武器带有 优势元素（例如 + 1 火焰属性），则会借助怪物对该元素的负抗性，使你的伤害提升 30%。</li>
    </ul>
    <ul key={4} className="baike-list">
        <li key={0}>为武器附加元素属性时，除了获得抗性加成外，还将额外提升一定百分比的攻击力。</li>
    </ul>
    <ul key={5} className="baike-list">
        <li key={0}>对战怪物时，务必使用带有至少 + 1 元素优势的武器—— 此举可额外获得 7% 攻击力加成与 30% 伤害提升。</li>
    </ul>
    <div className="baike-image-container" key={7}>
      <BaikeImage key={0} src="/upgrade/scroll_of_element_change.png" alt="scroll_of_element_change.png" maxWidth="100%" />
    </div>
    
    </div>
  )
}
