import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const PowerDice = () => {
  return (
    <div className="baike-content">
    
    
    <div className="baike-image-container" key={4}>
      <BaikeImage key={0} src="/upgrade/power_dices.png" alt="power_dices.png" maxWidth="100%" />
    </div>
    <div className="baike-image-container" key={5}>
      <BaikeImage key={0} src="/upgrade/power_dice.jpg" alt="power_dice.jpg" width={500} maxWidth="100%" />
    </div>
    
    </div>
  )
}
