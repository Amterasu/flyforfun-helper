import React from 'react'
import { BaikeImage } from '../../../../../components/BaikeImage'

export const MadrigalMinimumLevelLimit = () => {
  return (
    <div className="baike-content">
    <ul key={0} className="baike-list">
        <li key={0}>某些大陆现在需要最低玩家等级：莱斯花园和达肯 3需要<code>20</code>级，雪地需要<code>80</code>级，珊瑚岛需要<code>100</code>级。请注意，等级要求不适用于安全区域，如雪地村庄、珊瑚村庄、荒野入口等。未达到等级要求的玩家将自动传送到帕里。</li>
    </ul>
    <ul key={1} className="baike-list">
        <li key={0}>降低了使用城镇传送卷轴或瑞加传送卷轴传送到海岛胖胖的等级要求，从<code>120</code>级降至<code>110</code>级。</li>
    </ul>
    <div className="baike-image-container" key={3}>
      <BaikeImage key={0} src="/system/map/madrigal_minimum_level.png" alt="madrigal_minimum_level.png" maxWidth="100%" />
    </div>
    </div>
  )
}
