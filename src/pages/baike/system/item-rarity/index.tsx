import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'
import './index.less'

export const ItemRarity = () => {
  return (
    <div className="baike-content">
      <div className="baike-image-thumbnail">
        <BaikeImage
          src="/system/item_rarity_color.png"
          alt="item_rarity_color.png"
          maxWidth="600px"
        />
      </div>
    </div>
  )
}
