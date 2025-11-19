import React from "react"
import { BaikeImage } from '../../../../components/BaikeImage';

export const JewelryUpgrade = () => {
  return (
    <div className="baike-content">
      <p key={2}>
        <strong>平均尝试次数说白了就是看你运气好不好而已～</strong>
      </p>
      <BaikeImage key={3} src="/upgrade/jewelry_upgrade.png" alt="jewelry_upgrade.png" maxWidth="100%" />
      <div className="baike-image-container" key={4}>
        <BaikeImage key={0} src="/upgrade/chart/1,000,000%20Simulations%20Of%20Regular%20Jewelry%20%2B20.png" alt="1,000,000 Simulations Of Regular Jewelry +20.png" width={600} maxWidth="100%" />
      </div>
    </div>
  );
};
