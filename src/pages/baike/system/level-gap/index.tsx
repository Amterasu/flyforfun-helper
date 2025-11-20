import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'
import './index.less'

export const LevelGap = () => {
  return (
    <div className="baike-content">
      <div className="baike-image-thumbnail">
        <BaikeImage src="/system/level_gap.png" alt="level_gap.png" maxWidth="600px" />
      </div>
      <div className="baike-sources">
        <div className="baike-source">
          <p>
            来源:
            <a
              href="https://github.com/Frostiae/Flyffulator/blob/main/src/flyff/flyffdamagecalculator.js#L379"
              target="_blank"
              rel="noopener noreferrer"
            >
              Flyffulator/src/flyff/flyffdamagecalculator.js
            </a>
          </p>
        </div>
        <div className="baike-source">
          <p>
            来源:
            <a
              href="https://github.com/Frostiae/Flyffulator/blob/main/src/assets/LevelDifferencePenalties.json"
              target="_blank"
              rel="noopener noreferrer"
            >
              Flyffulator/src/assets/LevelDifferencePenalties.json
            </a>
          </p>
        </div>
        <div className="baike-source">
          <p>
            来源:
            <a
              href="https://discord.com/channels/778915844070834186/1333187382941585468/1333187382941585468"
              target="_blank"
              rel="noopener noreferrer"
            >
              @navi2765 @Navi (discord flyff universe)
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
