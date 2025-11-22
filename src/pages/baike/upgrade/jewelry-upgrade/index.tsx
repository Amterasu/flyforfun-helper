import React from "react";
import jewelryUpgradeData from "../../../../config/jewelsUpgrade/index.json";
import "./index.less";

interface DiceData {
  average_chance: string;
  initial_chance: string;
  average_tries: number;
  reach_average_chance_tries: number;
  reach_100_percent_tries: number;
}

interface JewelryUpgradeItem {
  level: number;
  required_level: number;
  ring_stat: number;
  necklace_hp_restoration: string;
  necklace_mp_consumption_recovery: string;
  necklace_fp_recovery: string;
  earring_damage: number;
  earring_defense_magic_defense: string;
  dice8: DiceData;
  dice10: DiceData;
}

interface JewelryUpgradeData {
  jewelry_upgrade: JewelryUpgradeItem[];
}

export const JewelryUpgrade = () => {
  const data = jewelryUpgradeData as unknown as JewelryUpgradeData;

  return (
    <div className="baike-content">
      <div className="baike-section">
        <h2 className="baike-section-title">首饰升级</h2>

        <div style={{ overflowX: "auto", marginTop: "16px" }}>
          <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>等级</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>需求等级</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>戒指属性</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>项链HP/恢复</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "180px" }}>项链MP/恢复</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>项链FP/恢复</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>耳环伤害</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>耳环防御/魔法防御</th>
              </tr>
            </thead>
            <tbody>
              {data.jewelry_upgrade.map((item, idx) => (
                <tr key={idx}>
                  <td>+{item.level}</td>
                  <td>{item.required_level}</td>
                  <td>+{item.ring_stat}</td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>{item.necklace_hp_restoration}</td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>{item.necklace_mp_consumption_recovery}</td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>{item.necklace_fp_recovery}</td>
                  <td>{item.earring_damage}</td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>{item.earring_defense_magic_defense}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ overflowX: "auto", marginTop: "16px" }}>
          <h3 style={{ color: "rgba(255, 217, 77, 0.9)", marginBottom: "12px", fontSize: "1.2rem" }}>
            8点骰子强化数据
          </h3>
          <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>等级</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>平均概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>初始概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>平均尝试</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "180px" }}>达到平均概率尝试</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "180px" }}>达到100%概率尝试</th>
              </tr>
            </thead>
            <tbody>
              {data.jewelry_upgrade.map((item, idx) => (
                <tr key={idx}>
                  <td>+{item.level}</td>
                  <td>{item.dice8.average_chance}</td>
                  <td style={{ fontSize: "0.85rem" }}>{item.dice8.initial_chance}</td>
                  <td>{item.dice8.average_tries.toFixed(4)}</td>
                  <td>{item.dice8.reach_average_chance_tries.toFixed(4)}</td>
                  <td>{item.dice8.reach_100_percent_tries.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ overflowX: "auto", marginTop: "16px" }}>
          <h3 style={{ color: "rgba(255, 217, 77, 0.9)", marginBottom: "12px", fontSize: "1.2rem" }}>
            10点骰子强化数据
          </h3>
          <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>等级</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>平均概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>初始概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>平均尝试</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "180px" }}>达到平均概率尝试</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "180px" }}>达到100%概率尝试</th>
              </tr>
            </thead>
            <tbody>
              {data.jewelry_upgrade.map((item, idx) => (
                <tr key={idx}>
                  <td>+{item.level}</td>
                  <td>{item.dice10.average_chance}</td>
                  <td style={{ fontSize: "0.85rem" }}>{item.dice10.initial_chance}</td>
                  <td>{item.dice10.average_tries.toFixed(4)}</td>
                  <td>{item.dice10.reach_average_chance_tries.toFixed(4)}</td>
                  <td>{item.dice10.reach_100_percent_tries.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
