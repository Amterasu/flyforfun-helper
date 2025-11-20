import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'
import './index.less'

export const BuffScale = () => {
  return (
    <div className="baike-content">
      <div className="baike-source">
        <p>
          来源:
          <a
            href="https://discord.com/channels/778915844070834186/999269990098284554/1145962826742116352"
            target="_blank"
            rel="noopener noreferrer"
          >
            @steinschleuder @[Justice] Steinschleuder (discord flyff universe)
          </a>
        </p>
      </div>
      <div className="baike-image-thumbnail">
        <BaikeImage src="/system/buff_scale.png" alt="buff_scale.png" maxWidth="600px" />
      </div>
    </div>
  )
}
