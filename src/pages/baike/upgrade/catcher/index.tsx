import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const Catcher = () => {
  return (
    <div className="baike-content">
    
    
    <div className="baike-image-container" key={4}>
      <BaikeImage key={0} src="/upgrade/catcher.jpg" alt="catcher.jpg" width={500} maxWidth="100%" />
    </div>
    <ul key={5} className="baike-list">
        <li key={0}>所有灵兽刷新点：<code>达肯 3</code>、<code>雪地</code>。</li>
    </ul>
    <ul key={6} className="baike-list">
        <li key={0}>无灵兽刷新点：<code>Coral Island</code>（珊瑚岛）</li>
    </ul>
    <ul key={7} className="baike-list">
        <li key={0}>收集材料时会直接从你的背包中获取，无需放置到升级窗口中。</li>
    </ul>
    
    </div>
  )
}
