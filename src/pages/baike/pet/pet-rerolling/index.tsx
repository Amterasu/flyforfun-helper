import React from "react";
import petRerollingData from "../../../../config/petRerolling.json";
import "./index.less";

interface PetRerollingItem {
  tier: string;
  required_count: number;
}

interface PetRerollingData {
  pet_rerolling: {
    title_cn: string;
    data: PetRerollingItem[];
  };
}

export const PetRerolling = () => {
  const data = petRerollingData as unknown as PetRerollingData;

  return (
    <div className="baike-content">
      <div className="baike-section">
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <img
            src="https://flyffipedia.com/Icons/Items/syssysscrpetrestat.png"
            alt="宠物重随"
            className="pet-rerolling-icon"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <h2 className="baike-section-title" style={{ margin: 0 }}>{data.pet_rerolling.title_cn}</h2>
        </div>

        {/* 说明文字 */}
        <div className="baike-info-card" style={{ marginTop: "16px" }}>
          <ul className="pet-rerolling-list">
            <li>
              通过使用{" "}
              <a 
                href="https://flyffipedia.com/items/details/21526" 
                target="_blank" 
                rel="noopener noreferrer"
                className="pet-rerolling-link"
              >
                宠物重洗卷轴
              </a>
              ，你可以将养成的宠物放入宠物槽中选择一个等级进行重洗，无需献祭宠物。此功能不影响在宠物训练师处使用献祭宠物进行的常规重洗。
            </li>
            <li>
              请注意，一旦你选择了一个等级进行重洗，这将是你今后使用此功能对该宠物进行重洗的唯一等级。重洗的概率与献祭同等级宠物进行重洗的概率相同。
            </li>
            <li>
              重洗一个等级所需的卷轴数量取决于你选择的等级。
            </li>
            <li>
              当你按下重洗按钮时，会显示（N为重洗后的新等级）：所选等级已重洗至<strong style={{ color: "rgba(255, 217, 77, 0.9)" }}>N</strong>。
            </li>
          </ul>
        </div>

        {/* 卷轴数量卡片 */}
        <div style={{ marginTop: "24px" }}>
          <h3 style={{ color: "rgba(255, 217, 77, 0.9)", marginBottom: "12px", fontSize: "1.1rem" }}>
            所需卷轴数量
          </h3>
          <div className="pet-rerolling-cards-grid">
            {data.pet_rerolling.data.map((item, idx) => (
              <div key={idx} className="pet-rerolling-card">
                <div className="pet-rerolling-card-tier">{item.tier}</div>
                <div className="pet-rerolling-card-count">
                  <span className="pet-rerolling-count-number">{item.required_count}</span>
                  <span className="pet-rerolling-count-unit">个</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
