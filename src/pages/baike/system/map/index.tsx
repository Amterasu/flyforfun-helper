import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const Map = () => {
  return (
    <div className="baike-content">
    
    <h2 key={1}>瑞嘉大陆最低等级限制</h2>
    <ul key={2} className="baike-list">
        <li key={0}>某些大陆现在需要最低玩家等级：莱斯花园和达肯 3需要<code>20</code>级，雪地需要<code>80</code>级，珊瑚岛需要<code>100</code>级。请注意，等级要求不适用于安全区域，如雪地村庄、珊瑚村庄、荒野入口等。未达到等级要求的玩家将自动传送到帕里。</li>
    </ul>
    <ul key={3} className="baike-list">
        <li key={0}>降低了使用城镇传送卷轴或Madrigal传送卷轴传送到海岛胖胖的等级要求，从<code>120</code>级降至<code>110</code>级。</li>
    </ul>
    <blockquote key={4} className="baike-blockquote">
      <p key={0}>来源:<a href="https://universe.flyff.com/news/patchnotes1311 Game Version 1.3.11 Patch Notes" target="_blank" rel="noopener noreferrer">游戏版本1.3.11更新说明</a></p>
    </blockquote>
    <div className="baike-image-container" key={5}>
      <BaikeImage key={0} src="/system/map/madrigal_minimum_level.png" alt="madrigal_minimum_level.png" maxWidth="100%" />
    </div>
    <h2 key={6}>瑞嘉大陆</h2>
    <div className="baike-image-container" key={7}>
      <BaikeImage key={0} src="/system/map/wdmadrigal.png" alt="wdmadrigal.png" maxWidth="100%" />
    </div>
    <h2 key={8}>珊瑚岛怪物</h2>
    <div className="baike-image-container" key={9}>
      <BaikeImage key={0} src="/system/map/coral_island_monster.png" alt="coral_island_monster.png" maxWidth="100%" />
    </div>
    <h2 key={10}>海洞怪物</h2>
    <div className="baike-image-container" key={11}>
      <BaikeImage key={0} src="/system/map/herneos_monster.png" alt="herneos_monster.png" maxWidth="100%" />
    </div>
    
    </div>
  )
}
