import React from "react";
import ultimateData from "../../../../config/upgrade/ultimate.json";
import "./index.less";

interface UltimateJewelryUpgradeEventItem {
  level: number;
  average_chance: string;
  event_average_chance: string;
  initial_chance: string;
  event_initial_chance: string;
  increase: string;
}

interface UltimateData {
  ultimate_jewelry_upgrade_event: UltimateJewelryUpgradeEventItem[];
}

export const UltimateJewelryEvent = () => {
  const data = ultimateData as unknown as UltimateData;

  return (
    <div className="baike-content">
      <div className="baike-section">
        <h2 className="baike-section-title">终极首饰活动</h2>
        <div className="baike-info-card">
          <ul className="baike-list">
            <li>
              <strong>终极强化升级活动</strong> 仅适用于
              <strong>终极武器和终极首饰</strong>.
            </li>
          </ul>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>等级</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>平均概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>活动平均概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>初始概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>活动初始概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>提升</th>
              </tr>
            </thead>
            <tbody>
              {data.ultimate_jewelry_upgrade_event.map((item, idx) => (
                <tr key={idx}>
                  <td>+{item.level}</td>
                  <td>{item.average_chance}</td>
                  <td>{item.event_average_chance}</td>
                  <td>{item.initial_chance}</td>
                  <td>{item.event_initial_chance}</td>
                  <td>{item.increase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

