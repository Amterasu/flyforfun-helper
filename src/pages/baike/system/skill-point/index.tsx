import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'
import './index.less'

export const SkillPoint = () => {
  return (
    <div className="baike-content">
      <div className="baike-section">
        <div className="baike-source">
          <p>
            来源:
            <a
              href="https://discord.com/channels/778915844070834186/867043266162458654/1179796650504503366"
              target="_blank"
              rel="noopener noreferrer"
            >
              @bluechromed @[Dev] Blukie (discord flyff universe)
            </a>
          </p>
        </div>
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
        <div className="baike-source">
          <p>
            来源:
            <a
              href="https://discord.com/channels/778915844070834186/1076577555546656850/1198561141207597127"
              target="_blank"
              rel="noopener noreferrer"
            >
              @cysotiso @cysotiso (discord flyff universe)
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
