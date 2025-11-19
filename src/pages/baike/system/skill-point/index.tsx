import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const SkillPoint = () => {
  return (
    <div className="baike-content">
    
    <blockquote key={1} className="baike-blockquote">
      <p key={0}>来源:[@bluechromed @[Dev] Blukie (discord flyff universe)](https://discord.com/channels/778915844070834186/867043266162458654/1179796650504503366 @bluechromed @[Dev] Blukie (discord flyff universe))</p>
    </blockquote>
    <blockquote key={2} className="baike-blockquote">
      <p key={0}>来源:<a href="https://discord.com/channels/778915844070834186/1076577555546656850/1198561141207597127 &quot;@cysotiso @cysotiso (discord flyff universe" target="_blank" rel="noopener noreferrer">@cysotiso @cysotiso (discord flyff universe)</a>")</p>
    </blockquote>
    <div className="baike-image-container" key={3}>
      <BaikeImage key={0} src="/system/skill_point.png" alt="skill_point.png" maxWidth="100%" />
    </div>
    <div className="baike-image-container" key={4}>
      <BaikeImage key={0} src="/system/skill_point_bonus.png" alt="skill_point_bonus.png" maxWidth="100%" />
    </div>
    
    </div>
  )
}
