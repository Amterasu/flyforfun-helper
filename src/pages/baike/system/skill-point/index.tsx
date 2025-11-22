import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'
import './index.less'

export const SkillPoint = () => {
  return (
    <div className="baike-content">
      <div className="baike-section">
        <div className="skill-point-images-grid">
          <div className="baike-image-thumbnail">
            <BaikeImage src="/system/skill_point.png" alt="skill_point.png" maxWidth="600px" />
          </div>
          <div className="baike-image-thumbnail">
            <BaikeImage
              src="/system/skill_point_bonus.png"
              alt="skill_point_bonus.png"
              maxWidth="600px"
            />
          </div>
        </div>
      </div>

      <div className="baike-section">
      </div>
    </div>
  )
}
