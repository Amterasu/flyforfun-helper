import React from "react";
import upgradeData from "../../../../config/upgrade/upgrade.json";
import "../weaponarmor-upgrade/index.less";

interface WeaponArmorUpgradeEventItem {
  level: number;
  dice4_and_6: {
    average_chance: string;
    event_average_chance: string;
    initial_chance: string;
    event_initial_chance: string;
    increase_percent: string;
  };
  dice12: {
    average_chance: string;
    event_average_chance: string;
    initial_chance: string;
    event_initial_chance: string;
    increase_percent: string;
  };
}

interface UpgradeData {
  "weapon&armor_upgrade_event": WeaponArmorUpgradeEventItem[];
}

export const WeaponarmorUpgradeEvent = () => {
  const data = upgradeData as unknown as UpgradeData;
  const weaponArmorUpgradeEventData = data["weapon&armor_upgrade_event"];

  return (
    <div className="baike-content">
      <div className="baike-section">
        <h2 className="baike-section-title">强化活动</h2>
        <div className="baike-info-card">
          <ul className="baike-list">
            <li>
              <strong>强化升级（装备）</strong> 活动适用于使用
              <strong>装备防爆卷轴</strong>
              的升级，包括武器、防具和元素升级（不适用于终极装备、穿洞、首饰强化、卡片合成）。
            </li>
          </ul>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="baike-table">
            <thead>
              <tr>
                <th>等级</th>
                <th colSpan={5}>4或6点骰子（活动）</th>
                <th colSpan={5}>12点骰子（活动）</th>
              </tr>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "50px" }}></th>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>平均概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>活动平均概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>初始概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>活动初始概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>提升百分比</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>平均概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>活动平均概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>初始概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>活动初始概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>提升百分比</th>
              </tr>
            </thead>
            <tbody>
              {weaponArmorUpgradeEventData.map((item, idx) => (
                <tr key={idx}>
                  <td>+{item.level}</td>
                  <td>{item.dice4_and_6.average_chance}</td>
                  <td>{item.dice4_and_6.event_average_chance}</td>
                  <td>{item.dice4_and_6.initial_chance}</td>
                  <td>{item.dice4_and_6.event_initial_chance}</td>
                  <td>{item.dice4_and_6.increase_percent}</td>
                  <td>{item.dice12.average_chance}</td>
                  <td>{item.dice12.event_average_chance}</td>
                  <td>{item.dice12.initial_chance}</td>
                  <td>{item.dice12.event_initial_chance}</td>
                  <td>{item.dice12.increase_percent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

