import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const DungeonsCurses = () => {
  return (
    <div className="baike-content">
    
    <h2 key={1}>荒野</h2>
    <div className="baike-image-container" key={2}>
      <BaikeImage key={0} src="/dungeons/the_wilds_curses.png" alt="the_wilds_curses.png" maxWidth="100%" />
    </div>
    
    </div>
  )
}
