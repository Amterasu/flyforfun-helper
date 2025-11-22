import React from "react";
import upgradeData from "../../../../config/upgrade/upgrade.json";
import "../weaponarmor-upgrade/index.less";

interface WeaponAttackUpgradeBonusItem {
  base_attack: string;
  upgrade_level: string;
  bonus_percent: string;
  additional_attack: string;
  weapon_attack: string;
  increase_percent: string;
}

interface UpgradeData {
  "weapon_attack_upgrade_bonuses": {
    formula: string;
    note: string;
    data: WeaponAttackUpgradeBonusItem[];
  };
}

export const WeaponAttackBonus = () => {
  const data = upgradeData as unknown as UpgradeData;
  const weaponAttackUpgradeBonuses = data["weapon_attack_upgrade_bonuses"];

  return (
    <div className="baike-content">
      <div className="baike-section">
        <h2 className="baike-section-title">武器攻击力强化加成</h2>
        <div className="baike-info-card">
          <p style={{ color: "rgba(255, 255, 255, 0.85)", margin: "0 0 12px 0", lineHeight: 1.7 }}>
            <strong style={{ color: "rgba(255, 217, 77, 0.9)" }}>公式：</strong>{weaponAttackUpgradeBonuses.formula}
          </p>
          <p style={{ color: "rgba(255, 255, 255, 0.85)", margin: 0, lineHeight: 1.7 }}>
            {weaponAttackUpgradeBonuses.note}
          </p>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>基础攻击力</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>强化等级</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>加成百分比</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>额外攻击力</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>武器攻击力</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>提升百分比</th>
              </tr>
            </thead>
            <tbody>
              {weaponAttackUpgradeBonuses.data.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.base_attack}</td>
                  <td>{item.upgrade_level}</td>
                  <td>{item.bonus_percent}</td>
                  <td>{item.additional_attack}</td>
                  <td>{item.weapon_attack}</td>
                  <td>{item.increase_percent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

