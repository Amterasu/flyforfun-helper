import React from "react"
import { BaikeImage } from '../../../../components/BaikeImage';

export const ForsakenTower = () => {
  return (
    <div className="baike-content">
      <p key={2}>
        <strong>
          更多信息请参考{" "}
          <a
            href="https://gothante.wiki/?search=forsaken+tower"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gothante
          </a>
          。
        </strong>
      </p>
      <p key={3}>
        <strong>仅计算升一级所需的经验，不考虑累积经验。</strong>
      </p>
      <p key={4}>
        <strong>实际升级所需的天数将比图表中显示的少。</strong>
      </p>
      <div className="baike-image-container" key={7}>
        <BaikeImage key={0} src="/dungeons/forsaken_tower/forsaken_tower_daily_quests.png" alt="forsaken_tower_daily_quests.png" maxWidth="100%" />
      </div>
      <div className="baike-image-container" key={8}>
        <BaikeImage key={0} src="/dungeons/forsaken_tower/forsaken_tower_daily_quests_1f.png" alt="forsaken_tower_daily_quests_1f.png" maxWidth="100%" />
      </div>
      <div className="baike-image-container" key={9}>
        <BaikeImage key={0} src="/dungeons/forsaken_tower/forsaken_tower_daily_quests_2f.png" alt="forsaken_tower_daily_quests_2f.png" maxWidth="100%" />
      </div>
      <div className="baike-image-container" key={10}>
        <BaikeImage key={0} src="/dungeons/forsaken_tower/forsaken_tower_daily_quests_3f.png" alt="forsaken_tower_daily_quests_3f.png" maxWidth="100%" />
      </div>
      <div className="baike-image-container" key={11}>
        <BaikeImage key={0} src="/dungeons/forsaken_tower/forsaken_tower_daily_quests_4f.png" alt="forsaken_tower_daily_quests_4f.png" maxWidth="100%" />
      </div>
      <div className="baike-image-container" key={12}>
        <BaikeImage key={0} src="/dungeons/forsaken_tower/forsaken_tower_daily_quests_5f.png" alt="forsaken_tower_daily_quests_5f.png" maxWidth="100%" />
      </div>
      <div className="baike-image-container" key={13}>
        <BaikeImage key={0} src="/dungeons/forsaken_tower/forsaken_tower_daily_quests_6f.png" alt="forsaken_tower_daily_quests_6f.png" maxWidth="100%" />
      </div>
      <div className="baike-image-container" key={14}>
        <BaikeImage key={0} src="/dungeons/forsaken_tower/forsaken_tower_daily_quests_7f.png" alt="forsaken_tower_daily_quests_7f.png" maxWidth="100%" />
      </div>
    </div>
  );
};
