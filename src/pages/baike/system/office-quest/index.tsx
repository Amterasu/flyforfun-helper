import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const OfficeQuest = () => {
  return (
    <div className="baike-content">
    
    <div className="baike-image-container" key={1}>
      <BaikeImage key={0} src="/system/quest/office_quest_flaris.png" alt="office_quest_flaris.png" maxWidth="100%" />
    </div>
    <div className="baike-image-container" key={2}>
      <BaikeImage key={0} src="/system/quest/office_quest_saint_morning.png" alt="office_quest_saint_morning.png" maxWidth="100%" />
    </div>
    <div className="baike-image-container" key={3}>
      <BaikeImage key={0} src="/system/quest/office_quest_darkon.png" alt="office_quest_darkon.png" maxWidth="100%" />
    </div>
    <div className="baike-image-container" key={4}>
      <BaikeImage key={0} src="/system/quest/office_quest_azria.png" alt="office_quest_azria.png" maxWidth="100%" />
    </div>
    <div className="baike-image-container" key={5}>
      <BaikeImage key={0} src="/system/quest/office_quest_coral_island.png" alt="office_quest_coral_island.png" maxWidth="100%" />
    </div>
    
    </div>
  )
}
