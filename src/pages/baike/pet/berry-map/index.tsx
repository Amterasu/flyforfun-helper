import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'
import './index.less'

export const BerryMap = () => {
  return (
    <div className="baike-content">
      <div className="berry-map-container">
        <div className="baike-image-container">
          <BaikeImage src="/pet/berryfarming_map_v4.jpg" alt="berryfarming_map_v4.jpg" width={800} maxWidth="100%" />
        </div>
      </div>
    </div>
  )
}
