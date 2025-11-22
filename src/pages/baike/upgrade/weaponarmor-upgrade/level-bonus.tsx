import React from "react";
import upgradeData from "../../../../config/upgrade/upgrade.json";
import "../weaponarmor-upgrade/index.less";

interface UpgradeLevelBonusItem {
  level: number | string;
  weapon_attack_bonus: string;
  defense_bonus: string;
  effects: string;
}

interface UpgradeData {
  "upgrade_level_bonus": UpgradeLevelBonusItem[];
}

export const UpgradeLevelBonus = () => {
  const data = upgradeData as unknown as UpgradeData;
  const upgradeLevelBonusData = data["upgrade_level_bonus"];

  return (
    <div className="baike-content">
      <div className="baike-section">
        <h2 className="baike-section-title">强化等级加成</h2>
        <div style={{ overflowX: "auto" }}>
          <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>等级</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>武器攻击力加成</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>防御力加成</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "300px" }}>效果</th>
              </tr>
            </thead>
            <tbody>
              {upgradeLevelBonusData.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.level}</td>
                  <td>{item.weapon_attack_bonus}</td>
                  <td>{item.defense_bonus}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{item.effects.replace(/\n/g, " | ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

