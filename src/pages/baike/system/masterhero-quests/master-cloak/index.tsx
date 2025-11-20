import React from 'react'
import { BaikeImage } from '../../../../../components/BaikeImage'
import './index.less'

export const MasterCloak = () => {
  return (
    <div className="baike-content">
      <div className="baike-section">
        <div className="baike-source">
          <p>
            source:
            <a
              href="https://discord.com/channels/778915844070834186/778927702874652682/1095975334270226492"
              target="_blank"
              rel="noopener noreferrer"
            >
              @gm_shadow [GM] Shadow (discord flyff universe)
            </a>
          </p>
        </div>
        <div className="baike-info-item">
          <p>完成任务后，奖励大师披风（左图）。</p>
        </div>
        <div className="baike-info-item">
          <p>在活动期间完成可选大师任务的玩家将获得特殊的披风（右图）。</p>
        </div>
        <div className="baike-image-thumbnail">
          <BaikeImage
            src="/system/quest/master_quest_cloak.png"
            alt="master_quest_cloak.png"
            maxWidth="600px"
          />
        </div>
      </div>
    </div>
  )
}
