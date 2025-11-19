import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const GuildSiege = () => {
  return (
    <div className="baike-content">
    
    <h2 key={1}>红色筹码</h2>
    <ul key={2} className="baike-list">
        <li key={0}><a href="https://docs.google.com/spreadsheets/d/1zX1pZ_bB7aPqpZ4rPB9pAFJmAgL4e7y8F6F9qDRc9gw/edit#gid=1531356297" target="_blank" rel="noopener noreferrer">红色筹码分配计算器</a></li>
    </ul>
    <h2 key={4}>地图</h2>
    <div className="baike-image-container" key={5}>
      <BaikeImage key={0} src="/dungeons/guild_siege_maps.png" alt="guild_siege_maps.png" width={600} maxWidth="100%" />
    </div>
    
    </div>
  )
}
