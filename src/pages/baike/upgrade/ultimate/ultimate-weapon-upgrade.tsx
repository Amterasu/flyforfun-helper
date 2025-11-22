import React from "react";
import ultimateData from "../../../../config/upgrade/ultimate.json";
import "./index.less";

interface UltimateWeaponUpgradeItem {
  target_level: number;
  average_tries_from_0?: number;
  average_tries_from_1?: number;
  average_tries_from_2?: number;
  average_tries_from_3?: number;
  average_tries_from_4?: number;
  weapon_attack: string;
  regular_success: string;
  great_success: string;
  regular_failure: string;
  great_failure: string;
  mineral: number;
  penya: string;
}

interface UltimateData {
  ultimate_weapon_upgrade: {
    upgrade_data: UltimateWeaponUpgradeItem[];
    notes: string[];
  };
}

export const UltimateWeaponUpgrade = () => {
  const data = ultimateData as unknown as UltimateData;

  return (
    <div className="baike-content">
      <div className="baike-section">
        <h2 className="baike-section-title">终极武器升级</h2>
        <div className="baike-info-card">
          <ul className="baike-list">
            <li>
              升级终极武器时，其机制是有条件的，即先判断成功或失败，然后再决定是否为完美升级。
            </li>
          </ul>
        </div>

        <div style={{ overflowX: "auto", marginTop: "16px" }}>
          <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>目标等级</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>从+0平均尝试</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>从+1平均尝试</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>从+2平均尝试</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>从+3平均尝试</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>从+4平均尝试</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>武器攻击力</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>普通成功</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>大成功</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>普通失败</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>大失败</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>矿石</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>金币</th>
              </tr>
            </thead>
            <tbody>
              {data.ultimate_weapon_upgrade.upgrade_data.map((item, idx) => (
                <tr key={idx}>
                  <td>+{item.target_level}</td>
                  <td>{item.average_tries_from_0?.toFixed(2) || "--"}</td>
                  <td>{item.average_tries_from_1?.toFixed(2) || "--"}</td>
                  <td>{item.average_tries_from_2?.toFixed(2) || "--"}</td>
                  <td>{item.average_tries_from_3?.toFixed(2) || "--"}</td>
                  <td>{item.average_tries_from_4?.toFixed(2) || "--"}</td>
                  <td>{item.weapon_attack}</td>
                  <td>{item.regular_success}</td>
                  <td>{item.great_success}</td>
                  <td>{item.regular_failure}</td>
                  <td>{item.great_failure}</td>
                  <td>{item.mineral}</td>
                  <td>{item.penya}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="baike-info-card" style={{ marginTop: "16px" }}>
          <ul className="baike-list">
            {data.ultimate_weapon_upgrade.notes.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

