import React from 'react'
import { BaikeImage } from '../../../../../components/BaikeImage'

export const UltimateJewelry = () => {
  return (
    <div className="baike-content">
    
    <div className="baike-image-container" key={1}>
      <BaikeImage key={0} src="/upgrade/ultimate/ultimate_jewelry.png" alt="ultimate_jewelry.png" maxWidth="100%" />
    </div>
    <div className="baike-image-container" key={2}>
      <BaikeImage key={0} src="/upgrade/ultimate/ultimate_jewelry_upgrade.png" alt="ultimate_jewelry_upgrade.png" maxWidth="100%" />
    </div>
    <ul key={3} className="baike-list">
        <li key={0}>终极首饰提供以下套装效果：</li>
    </ul>
    <ul key={4} className="baike-list">
        <li className="baike-nested-item" key={0}> 嗜血者套装：</li>
    </ul>
    <ul key={5} className="baike-list">
        <li className="baike-nested-item" key={0}>(4/5) 套装效果：暴击率 +10%</li>
    </ul>
    <ul key={6} className="baike-list">
        <li className="baike-nested-item" key={0}>(5/5) 套装效果：攻击 +5%，破甲 +10%</li>
    </ul>
    <ul key={7} className="baike-list">
        <li className="baike-nested-item" key={0}> 神射手套装：</li>
    </ul>
    <ul key={8} className="baike-list">
        <li className="baike-nested-item" key={0}>(4/5) 套装效果：击杀后生命值恢复 +750</li>
    </ul>
    <ul key={9} className="baike-list">
        <li className="baike-nested-item" key={0}>(5/5) 套装效果：攻击 +5%，破甲 +10%</li>
    </ul>
    <ul key={10} className="baike-list">
        <li className="baike-nested-item" key={0}> 圣骑士套装：</li>
    </ul>
    <ul key={11} className="baike-list">
        <li className="baike-nested-item" key={0}>(4/5) 套装效果：格挡 +10%</li>
    </ul>
    <ul key={12} className="baike-list">
        <li className="baike-nested-item" key={0}>(5/5) 套装效果：魔法防御 +5%，暴击抵抗 +10%</li>
    </ul>
    <ul key={13} className="baike-list">
        <li className="baike-nested-item" key={0}> 天侍神套装：</li>
    </ul>
    <ul key={14} className="baike-list">
        <li className="baike-nested-item" key={0}>(4/5) 套装效果：击杀后魔法值恢复 +500</li>
    </ul>
    <ul key={15} className="baike-list">
        <li className="baike-nested-item" key={0}>(5/5) 套装效果：魔法攻击 +5%，施法时间减少 +10%</li>
    </ul>
    <div className="baike-image-container" key={16}>
      <BaikeImage key={0} src="/upgrade/ultimate/1,000,000%20Simulations%20Of%20Ultimate%20Jewelry%20%2B5.png" alt="1,000,000 Simulations Of Ultimate Jewelry +5.png" width={600} maxWidth="100%" />
    </div>
    </div>
  )
}
