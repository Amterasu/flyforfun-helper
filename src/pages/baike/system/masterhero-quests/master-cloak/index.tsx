import React from 'react'
import { BaikeImage } from '../../../../../components/BaikeImage'

export const MasterCloak = () => {
  return (
    <div className="baike-content">
    <blockquote key={0} className="baike-blockquote">
      <p key={0}>source:[@gm_shadow [GM] Shadow (discord flyff universe)](https://discord.com/channels/778915844070834186/778927702874652682/1095975334270226492 @gm_shadow [GM] Shadow (discord flyff universe))</p>
    </blockquote>
    <p key={1}>完成任务后，奖励大师披风（左图）。</p>
    <p key={2}>在活动期间完成可选大师任务的玩家将获得特殊的披风（右图）。</p>
    <div className="baike-image-container" key={3}>
      <BaikeImage key={0} src="/system/quest/master_quest_cloak.png" alt="master_quest_cloak.png" maxWidth="100%" />
    </div>
    </div>
  )
}
