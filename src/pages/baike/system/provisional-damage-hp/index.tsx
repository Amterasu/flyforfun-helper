import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const ProvisionalDamageHp = () => {
  return (
    <div className="baike-content">
    
    <ul key={1} className="baike-list">
        <li key={0}>选项窗口中添加了临时伤害HP计量表效果选项（默认禁用）。</li>
    </ul>
    <div className="baike-image-container" key={2}>
      <BaikeImage key={0} src="/system/provisional_damage_hp.gif" alt="provisional_damage_hp.gif" maxWidth="100%" />
    </div>
    
    </div>
  )
}
