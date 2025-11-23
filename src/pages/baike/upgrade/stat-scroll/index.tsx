import React from "react";
import "./index.less";

export const StatScroll = () => {
  const probabilities = [
    { value: "+1", chance: "64%" },
    { value: "+2", chance: "30%" },
    { value: "+3", chance: "5%" },
    { value: "+4", chance: "1%" },
  ];

  return (
    <div className="baike-content">
      <div className="baike-section">
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <img
            src="https://flyffipedia.com/Icons/Items/syssysscrscroll01.png"
            alt="属性卷轴"
            className="stat-scroll-icon"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <h2 className="baike-section-title" style={{ margin: 0 }}>属性卷轴</h2>
        </div>

        <div className="baike-info-card" style={{ marginTop: "16px" }}>
          <p style={{ color: "rgba(255, 255, 255, 0.85)", margin: 0 }}>
            为你的武器或防具随机附加 1 条{" "}
            <span className="highlight-text">STR/STA/DEX/INT</span> 属性，属性数值区间为{" "}
            <span className="highlight-text">+1 至 +4</span>。
          </p>
        </div>

        <div className="baike-info-card" style={{ marginTop: "12px" }}>
          <p style={{ color: "rgba(255, 255, 255, 0.85)", margin: 0 }}>
            <strong>注意：</strong>该操作将
            <span className="highlight-warning">覆盖装备上已有的所有属性</span>（原属性不可保留）。
          </p>
        </div>

        <div style={{ marginTop: "16px" }}>
          <h3 style={{ color: "rgba(255, 217, 77, 0.9)", marginBottom: "12px", fontSize: "1.2rem" }}>
            属性概率
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table className="baike-table">
              <thead>
                <tr>
                  <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>属性值</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>概率</th>
                </tr>
              </thead>
              <tbody>
                {probabilities.map((prob, idx) => (
                  <tr key={idx}>
                    <td>
                      <span className="highlight-value">{prob.value}</span>
                    </td>
                    <td>
                      <span className="highlight-chance">{prob.chance}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
