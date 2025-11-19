import React from "react"
import { BaikeImage } from '../../../../../components/BaikeImage';

export const TheWilds = () => {
  return (
    <div className="baike-content">
      <div className="baike-image-container" key={0}>
        <BaikeImage key={0} src="/dungeons/the_wilds_curses.png" alt="the_wilds_curses.png" maxWidth="100%" />
      </div>
    </div>
  );
};
