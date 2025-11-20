import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'
import './index.less'

export const ProvisionalDamageHp = () => {
  return (
    <div className="baike-content">
      <div className="baike-section">
        <div className="baike-info-item">
          <p>选项窗口中添加了临时伤害HP计量表效果选项（默认禁用）。</p>
        </div>
        <div className="baike-image-thumbnail">
          <BaikeImage
            src="/system/provisional_damage_hp.gif"
            alt="provisional_damage_hp.gif"
            maxWidth="600px"
          />
        </div>
      </div>
    </div>
  )
}
