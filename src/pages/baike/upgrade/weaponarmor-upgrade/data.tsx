import React from "react";
import upgradeData from "../../../../config/upgrade/upgrade.json";
import "../weaponarmor-upgrade/index.less";

interface WeaponArmorUpgradeItem {
  level: number;
  dice4_and_6: {
    average_chance: string;
    initial_chance: string;
    average_tries: number;
    reach_average_chance_tries: number;
    reach_100_percent_tries: number;
  };
  dice12: {
    average_chance: string;
    initial_chance: string;
    average_tries: number;
    reach_average_chance_tries: number;
    reach_100_percent_tries: number;
  };
  cost: {
    mineral: number;
    average_mineral: number;
    penya: string;
    average_penya: string;
  };
}

interface UpgradeData {
  "weapon&armor_upgrade": WeaponArmorUpgradeItem[];
}

export const WeaponarmorUpgradeData = () => {
  const data = upgradeData as unknown as UpgradeData;
  const weaponArmorUpgradeData = data["weapon&armor_upgrade"];

  return (
    <div className="baike-content">
      <div className="baike-section">
        <h2 className="baike-section-title">武器&防具强化</h2>
        <div style={{ overflowX: "auto" }}>
          <table className="baike-table">
            <thead>
              <tr>
                <th>等级</th>
                <th colSpan={5}>4或6点骰子</th>
                <th colSpan={5}>12点骰子</th>
                <th colSpan={4}>消耗</th>
              </tr>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "50px" }}></th>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>平均概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>初始概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>平均尝试次数</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "140px" }}>达到平均概率尝试次数</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>达到100%概率尝试次数</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>平均概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>初始概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>平均尝试次数</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "140px" }}>达到平均概率尝试次数</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>达到100%概率尝试次数</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "60px" }}>矿石</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>平均矿石</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>金币</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>平均金币</th>
              </tr>
            </thead>
            <tbody>
              {weaponArmorUpgradeData.map((item, idx) => (
                <tr key={idx}>
                  <td>+{item.level}</td>
                  <td>{item.dice4_and_6.average_chance}</td>
                  <td>{item.dice4_and_6.initial_chance}</td>
                  <td>{item.dice4_and_6.average_tries.toFixed(4)}</td>
                  <td>{item.dice4_and_6.reach_average_chance_tries.toFixed(4)}</td>
                  <td>{item.dice4_and_6.reach_100_percent_tries.toFixed(4)}</td>
                  <td>{item.dice12.average_chance}</td>
                  <td>{item.dice12.initial_chance}</td>
                  <td>{item.dice12.average_tries.toFixed(4)}</td>
                  <td>{item.dice12.reach_average_chance_tries.toFixed(4)}</td>
                  <td>{item.dice12.reach_100_percent_tries.toFixed(4)}</td>
                  <td>{item.cost.mineral}</td>
                  <td>{item.cost.average_mineral.toFixed(2)}</td>
                  <td>{item.cost.penya}</td>
                  <td>{item.cost.average_penya}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

