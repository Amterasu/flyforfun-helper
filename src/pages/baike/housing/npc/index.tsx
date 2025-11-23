import React from 'react'
import { PersonalHouseNpc } from './personal-house-npc'
import { GuildHouseNpc } from './guild-house-npc'
import './index.less'

export const Npc = () => {
  return (
    <div className="baike-content">
      <h2 className="baike-section-title">个人房屋NPC</h2>
      <div style={{ marginTop: '16px' }}>
        <PersonalHouseNpc />
      </div>

      <h2 className="baike-section-title" style={{ marginTop: '48px' }}>工会房屋NPC</h2>
      <div style={{ marginTop: '16px' }}>
        <GuildHouseNpc />
      </div>
    </div>
  )
}
