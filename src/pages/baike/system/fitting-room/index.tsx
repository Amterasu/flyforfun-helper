import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'
import './index.less'

export const FittingRoom = () => {
  return (
    <div className="baike-content">
      <div className="fitting-room-images-grid">
        <div className="baike-image-thumbnail">
          <BaikeImage
            src="/system/fitting_room/fitting_room.png"
            alt="fitting_room.png"
            maxWidth="400px"
          />
        </div>
        <div className="baike-image-thumbnail">
          <BaikeImage
            src="/system/fitting_room/fitting_room_window.png"
            alt="fitting_room_window.png"
            maxWidth="500px"
          />
        </div>
      </div>
    </div>
  )
}
