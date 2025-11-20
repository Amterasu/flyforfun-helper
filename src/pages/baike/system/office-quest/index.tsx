import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'
import './index.less'

const officeQuestImages = [
  {
    location: '帕里',
    image: '/system/quest/office_quest_flaris.png',
  },
  {
    location: '晨光',
    image: '/system/quest/office_quest_saint_morning.png',
  },
  {
    location: '达肯',
    image: '/system/quest/office_quest_darkon.png',
  },
  {
    location: '阿兹利亚',
    image: '/system/quest/office_quest_azria.png',
  },
  {
    location: '珊瑚岛',
    image: '/system/quest/office_quest_coral_island.png',
  },
]

export const OfficeQuest = () => {
  return (
    <div className="baike-content">
      <div className="office-quest-grid">
        {officeQuestImages.map((item, idx) => (
          <div key={idx} className="office-quest-card">
            <h3 className="office-quest-title">{item.location}</h3>
            <div className="baike-image-thumbnail">
              <BaikeImage src={item.image} alt={`${item.location}办公室任务`} maxWidth="100%" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
