import React from "react"
import { BaikeImage } from '../../../../components/BaikeImage';

export const KalgasAssault = () => {
  return (
    <div className="baike-content">
      <div className="baike-image-container" key={6}>
        <BaikeImage key={0} src="/dungeons/kalgas_assault/wdrealm.png" alt="wdrealm.png" maxWidth="100%" />
      </div>
      <div className="baike-image-container" key={7}>
        <BaikeImage key={0} src="/dungeons/kalgas_assault/tradekalgaschips.jpg" alt="tradekalgaschips.jpg" width={400} maxWidth="100%" />
      </div>
      <div className="baike-image-container" key={8}>
        <BaikeImage key={0} src="/dungeons/kalgas_assault/kalgas_wrath_wing.jpg" alt="kalgas_wrath_wing.jpg" width={600} maxWidth="100%" />
      </div>
      <div className="baike-image-container" key={11}>
        <BaikeImage key={0} src="/dungeons/kalgas_assault/kalgas_fury.png" alt="kalgas_fury.png" width={400} maxWidth="100%" />
      </div>
    </div>
  );
};
