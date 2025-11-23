import React from "react";
import { BaikeImage } from '../../../../components/BaikeImage';
import './index.less';

export const KalgasAssault = () => {
  return (
    <div className="baike-content">
      <div className="baike-section">
        <h2 className="baike-section-title">卡尔加斯突袭</h2>

        {/* 地图 */}
        <div className="kalgas-section" style={{ marginTop: "16px" }}>
          <h3 className="kalgas-section-title">地图</h3>
          <div className="kalgas-image-container">
            <BaikeImage src="/dungeons/kalgas_assault/wdrealm.png" alt="wdrealm.png" maxWidth="400px" />
          </div>
        </div>

        {/* 兑换奖励 */}
        <div className="kalgas-section" style={{ marginTop: "32px" }}>
          <h3 className="kalgas-section-title">兑换奖励</h3>
          <div className="kalgas-image-container">
            <BaikeImage src="/dungeons/kalgas_assault/tradekalgaschips.jpg" alt="tradekalgaschips.jpg" maxWidth="400px" />
          </div>
        </div>

        {/* 翅膀 */}
        <div className="kalgas-section" style={{ marginTop: "32px" }}>
          <h3 className="kalgas-section-title">翅膀</h3>
          <div className="kalgas-image-container">
            <BaikeImage src="/dungeons/kalgas_assault/kalgas_wrath_wing.jpg" alt="kalgas_wrath_wing.jpg" maxWidth="400px" />
          </div>
        </div>

        {/* 武器皮肤 */}
        <div className="kalgas-section" style={{ marginTop: "32px" }}>
          <h3 className="kalgas-section-title">武器皮肤</h3>
          <div className="kalgas-image-container">
            <BaikeImage src="/dungeons/kalgas_assault/kalgas_fury.png" alt="kalgas_fury.png" maxWidth="400px" />
          </div>
        </div>
      </div>
    </div>
  );
};

