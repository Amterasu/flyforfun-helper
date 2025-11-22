import React from "react";
import ultimateData from "../../../../config/upgrade/ultimate.json";
import "./index.less";

interface UltimateJewelryUpgradeItem {
  level: number;
  required_level: number;
  ring_stat: string;
  earring_stat: string;
  necklace_stat_1: string;
  necklace_stat_hp: string;
  necklace_stat_mp: string;
  necklace_stat_fp: string;
  damage: number;
  def_magic_def: string;
  average_chance: string;
  initial_chance: string;
  average_tries: string | number;
  penya: string;
  average_penya: string;
}

interface UltimateData {
  ultimate_jewelry_upgrade: UltimateJewelryUpgradeItem[];
  ultimate_jewelry: {
    dismantling: Array<{
      level: number;
      jewelry_dust: number;
      cursed_jewelry_fragment: string | number;
    }>;
    exchange: {
      dust_exchange_by_level: Array<{
        level: number;
        jewelry_dust: number;
      }>;
      fragment_exchange_by_type: Array<{
        type: string;
        cursed_jewelry_fragment: number;
      }>;
    };
    ultimate_dismantling: {
      dust_by_level: Array<{
        level: number;
        jewelry_dust: number;
      }>;
      fragment_by_type: Array<{
        type: string;
        cursed_jewelry_fragment: number;
      }>;
    };
    note: string;
  };
}

export const UltimateJewelryUpgrade = () => {
  const data = ultimateData as unknown as UltimateData;

  return (
    <div className="baike-content">
      <div className="baike-section">
        <h2 className="baike-section-title">终极首饰升级</h2>

        <div style={{ overflowX: "auto" }}>
          <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>等级</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>需求等级</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "200px" }}>戒指属性</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "200px" }}>耳环属性</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "200px" }}>项链属性1</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "200px" }}>项链属性(HP)</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "200px" }}>项链属性(MP)</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "200px" }}>项链属性(FP)</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>伤害</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>防御/魔法防御</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>平均概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>初始概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>平均尝试</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>金币</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>平均金币</th>
              </tr>
            </thead>
            <tbody>
              {data.ultimate_jewelry_upgrade.map((item, idx) => (
                <tr key={idx}>
                  <td>+{item.level}</td>
                  <td>{item.required_level}</td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>{item.ring_stat}</td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>{item.earring_stat}</td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>{item.necklace_stat_1}</td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>{item.necklace_stat_hp}</td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>{item.necklace_stat_mp}</td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>{item.necklace_stat_fp}</td>
                  <td>{item.damage}</td>
                  <td>{item.def_magic_def}</td>
                  <td>{item.average_chance}</td>
                  <td>{item.initial_chance}</td>
                  <td>{typeof item.average_tries === "number" ? item.average_tries.toFixed(4) : item.average_tries}</td>
                  <td>{item.penya}</td>
                  <td>{item.average_penya}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="baike-info-card" style={{ marginTop: "16px" }}>
          <p style={{ color: "rgba(255, 255, 255, 0.85)", margin: "0 0 12px 0", fontWeight: 600 }}>
            终极首饰提供以下套装效果：
          </p>
          <ul className="baike-list">
            <li>
              <strong>嗜血者套装：</strong>
              <ul className="baike-list" style={{ marginTop: "8px", paddingLeft: "20px" }}>
                <li>(4/5) 套装效果：暴击率 +10%</li>
                <li>(5/5) 套装效果：攻击 +5%，破甲 +10%</li>
              </ul>
            </li>
            <li>
              <strong>神射手套装：</strong>
              <ul className="baike-list" style={{ marginTop: "8px", paddingLeft: "20px" }}>
                <li>(4/5) 套装效果：击杀后生命值恢复 +750</li>
                <li>(5/5) 套装效果：攻击 +5%，破甲 +10%</li>
              </ul>
            </li>
            <li>
              <strong>圣骑士套装：</strong>
              <ul className="baike-list" style={{ marginTop: "8px", paddingLeft: "20px" }}>
                <li>(4/5) 套装效果：格挡 +10%</li>
                <li>(5/5) 套装效果：魔法防御 +5%，暴击抵抗 +10%</li>
              </ul>
            </li>
            <li>
              <strong>天侍神套装：</strong>
              <ul className="baike-list" style={{ marginTop: "8px", paddingLeft: "20px" }}>
                <li>(4/5) 套装效果：击杀后魔法值恢复 +500</li>
                <li>(5/5) 套装效果：魔法攻击 +5%，施法时间减少 +10%</li>
              </ul>
            </li>
          </ul>
        </div>

        <div style={{ overflowX: "auto", marginTop: "16px" }}>
          <h3 style={{ color: "rgba(255, 217, 77, 0.9)", marginBottom: "12px", fontSize: "1.2rem" }}>
            普通首饰拆解数据
          </h3>
          <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>等级</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>粉尘</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>首饰碎片</th>
              </tr>
            </thead>
            <tbody>
              {data.ultimate_jewelry.dismantling.map((item, idx) => (
                <tr key={idx}>
                  <td>+{item.level}</td>
                  <td>{item.jewelry_dust}</td>
                  <td>{item.cursed_jewelry_fragment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ overflowX: "auto", marginTop: "16px" }}>
          <h3 style={{ color: "rgba(255, 217, 77, 0.9)", marginBottom: "12px", fontSize: "1.2rem" }}>
            终极首饰兑换
          </h3>
          <div style={{ marginBottom: "24px" }}>
            <h4 style={{ color: "rgba(255, 255, 255, 0.9)", marginBottom: "8px", fontSize: "1rem" }}>
              粉尘兑换（按等级）
            </h4>
            <table className="baike-table">
              <thead>
                <tr>
                  <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>等级</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>粉尘</th>
                </tr>
              </thead>
              <tbody>
                {data.ultimate_jewelry.exchange.dust_exchange_by_level.map((item, idx) => (
                  <tr key={idx}>
                    <td>+{item.level}</td>
                    <td>{item.jewelry_dust}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h4 style={{ color: "rgba(255, 255, 255, 0.9)", marginBottom: "8px", fontSize: "1rem" }}>
              碎片兑换（按类型）
            </h4>
            <table className="baike-table">
              <thead>
                <tr>
                  <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>类型</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>首饰碎片</th>
                </tr>
              </thead>
              <tbody>
                {data.ultimate_jewelry.exchange.fragment_exchange_by_type.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.type}</td>
                    <td>{item.cursed_jewelry_fragment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ overflowX: "auto", marginTop: "16px" }}>
          <h3 style={{ color: "rgba(255, 217, 77, 0.9)", marginBottom: "12px", fontSize: "1.2rem" }}>
            终极首饰拆解
          </h3>
          <div style={{ marginBottom: "24px" }}>
            <h4 style={{ color: "rgba(255, 255, 255, 0.9)", marginBottom: "8px", fontSize: "1rem" }}>
              粉尘拆解（按等级）
            </h4>
            <table className="baike-table">
              <thead>
                <tr>
                  <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>等级</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>粉尘</th>
                </tr>
              </thead>
              <tbody>
                {data.ultimate_jewelry.ultimate_dismantling.dust_by_level.map((item, idx) => (
                  <tr key={idx}>
                    <td>+{item.level}</td>
                    <td>{item.jewelry_dust}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <h4 style={{ color: "rgba(255, 255, 255, 0.9)", marginBottom: "8px", fontSize: "1rem" }}>
              碎片拆解（按类型）
            </h4>
            <table className="baike-table">
              <thead>
                <tr>
                  <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>类型</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>首饰碎片</th>
                </tr>
              </thead>
              <tbody>
                {data.ultimate_jewelry.ultimate_dismantling.fragment_by_type.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.type}</td>
                    <td>{item.cursed_jewelry_fragment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="baike-info-card" style={{ marginTop: "16px" }}>
            <p style={{ color: "rgba(255, 255, 255, 0.85)", margin: 0, lineHeight: 1.7 }}>
              {data.ultimate_jewelry.note}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

