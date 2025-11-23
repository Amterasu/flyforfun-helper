import React from "react";
import goddessData from "../../../../config/bless/godness.json";
import demonData from "../../../../config/bless/demon.json";
import "./index.less";

interface Stat {
  chancePercent: number;
  statValue: number | string;
}

interface BlessingStat {
  statType: string;
  statName: string;
  stats: Stat[];
}

interface GoddessData {
  blessingOfTheGoddess: BlessingStat[];
}

interface DemonData {
  blessingOfTheDemon: BlessingStat[];
}

export const Blessing = () => {
  const goddess = goddessData as unknown as GoddessData;
  const demon = demonData as unknown as DemonData;

  // 渲染属性卡片网格
  const renderStatCards = (stats: BlessingStat[], title: string) => {
    return (
      <div style={{ marginTop: "12px" }}>
        <h3 style={{ color: "rgba(255, 217, 77, 0.9)", marginBottom: "8px", fontSize: "1.1rem" }}>
          {title}
        </h3>
        <div className="blessing-cards-grid">
          {stats.map((stat, statIdx) => (
            <div key={statIdx} className="blessing-stat-card">
              <h4 className="blessing-stat-name">{stat.statName}</h4>
              <div className="blessing-stat-table">
                <table className="baike-table">
                  <thead>
                    <tr>
                      <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>属性值</th>
                      <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>概率</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stat.stats.map((item, itemIdx) => (
                      <tr key={itemIdx}>
                        <td>{typeof item.statValue === "string" ? item.statValue : item.statValue}</td>
                        <td>{item.chancePercent}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="baike-content">
      {/* 女神祝福 */}
      <div className="baike-section">
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <img
            src="https://flyffipedia.com/Icons/Items/syssysscrblessedness.png"
            alt="女神祝福"
            className="blessing-icon"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <h2 className="baike-section-title" style={{ margin: 0 }}>女神祝福</h2>
        </div>
        {renderStatCards(goddess.blessingOfTheGoddess, "女神祝福属性概率")}
      </div>

      {/* 恶魔祝福 */}
      <div className="baike-section" style={{ marginTop: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <img
            src="https://flyffipedia.com/Icons/Items/syssysscrdemonblessing.png"
            alt="恶魔祝福"
            className="blessing-icon"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <h2 className="baike-section-title" style={{ margin: 0 }}>恶魔祝福</h2>
        </div>
        {renderStatCards(demon.blessingOfTheDemon, "恶魔祝福属性概率")}
      </div>
    </div>
  );
};
