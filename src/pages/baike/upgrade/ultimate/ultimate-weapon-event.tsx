import React from "react";
import ultimateData from "../../../../config/upgrade/ultimate.json";
import "./index.less";

interface UltimateWeaponUpgradeEventItem {
  level: number;
  regular_success: string;
  event_regular_success: string;
  great_success: string;
  event_great_success: string;
  regular_failure: string;
  event_regular_failure: string;
  great_failure: string;
  event_great_failure: string;
  increase: string;
}

interface UltimateData {
  ultimate_weapon_upgrade_event: UltimateWeaponUpgradeEventItem[];
}

export const UltimateWeaponEvent = () => {
  const data = ultimateData as unknown as UltimateData;

  return (
    <div className="baike-content">
      <div className="baike-section">
        <h2 className="baike-section-title">终极武器活动</h2>
        <div className="baike-info-card">
          <ul className="baike-list">
            <li>
              <strong>终极强化升级活动</strong>仅适用于<strong>终极武器和饰品</strong>。
            </li>
          </ul>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>等级</th>
                <th colSpan={2}>普通成功</th>
                <th colSpan={2}>完美成功</th>
                <th colSpan={2}>普通失败</th>
                <th colSpan={2}>完美失败</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>提升</th>
              </tr>
              <tr>
                <th></th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>常规</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>活动</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>常规</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>活动</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>常规</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>活动</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>常规</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>活动</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.ultimate_weapon_upgrade_event.map((item, idx) => (
                <tr key={idx}>
                  <td>+{item.level}</td>
                  <td>{item.regular_success}</td>
                  <td>{item.event_regular_success}</td>
                  <td>{item.great_success}</td>
                  <td>{item.event_great_success}</td>
                  <td>{item.regular_failure}</td>
                  <td>{item.event_regular_failure}</td>
                  <td>{item.great_failure}</td>
                  <td>{item.event_great_failure}</td>
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

