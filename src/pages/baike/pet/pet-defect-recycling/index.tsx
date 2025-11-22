import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const PetDefectRecycling = () => {
  return (
    <div className="baike-content">
    
    <div className="baike-image-container" key={4}>
      <BaikeImage key={0} src="/pet/pet_defect_recycling.png" alt="pet_defect_recycling.png" maxWidth="100%" />
    </div>
    <ul key={5} className="baike-list">
        <li key={0}>如果成功（绿色文字）：你的宠物获得了新的、更高的等级！</li>
    </ul>
    <ul key={6} className="baike-list">
        <li key={0}>如果失败（红色文字）：你摇到了相同或更低的等级，所以没有任何变化。</li>
    </ul>
    
    </div>
  )
}
