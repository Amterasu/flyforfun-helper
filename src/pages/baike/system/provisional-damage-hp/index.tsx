import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'
import './index.less'

export const ProvisionalDamageHp = () => {
  return (
    <div className="baike-content">
      <div className="baike-section">
        <div className="baike-info-item">
          <p>选项窗口新增 “临时伤害 HP 计量表” 效果开关（默认处于禁用状态）。</p>
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
