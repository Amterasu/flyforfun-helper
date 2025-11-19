import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const BattleForMadrigalUltimateJewels = () => {
  return (
    <div className="baike-content">
    
    <div className="baike-image-container" key={1}>
      <BaikeImage key={0} src="/upgrade/ultimate_jewels.png" alt="ultimate_jewels.png" maxWidth="100%" />
    </div>
    <div className="baike-image-container" key={2}>
      <BaikeImage key={0} src="/upgrade/ultimate_jewels_fusion.png" alt="ultimate_jewels_fusion.png" maxWidth="100%" />
    </div>
    
    </div>
  )
}
