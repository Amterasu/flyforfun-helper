import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const StatScroll = () => {
  return (
    <div className="baike-content">
    
    
    <ul key={4} className="baike-list">
        <li key={0}>Add a random <code>STR</code>/<code>STA</code>/<code>DEX</code>/<code>INT</code> stat to your weapon or armor.</li>
    </ul>
    <ul key={5} className="baike-list">
        <li key={0}>The stat can be anywhere from <code>+1</code> to <code>+4</code>.</li>
    </ul>
    <ul key={6} className="baike-list">
        <li key={0}>This replaces any existing stat on the weapon or armor.</li>
    </ul>
    <div className="baike-image-container" key={7}>
      <BaikeImage key={0} src="/upgrade/stat_scroll.png" alt="stat_scroll.png" maxWidth="100%" />
    </div>
    
    </div>
  )
}
