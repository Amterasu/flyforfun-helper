import React from "react";
import piercingData from "../../../../config/pierce/index.json";
import "./index.less";

interface DiceData {
  average_chance: string;
  initial_chance: string;
  average_tries?: number;
  reach_average_chance_tries?: number;
  reach_100_percent_tries?: number;
  event_average_chance?: string;
  event_initial_chance?: string;
  increase?: string;
}

interface ArmorPiercingUpgrade {
  level: number;
  dice8_green: DiceData;
  dice10_pink: DiceData;
  penya_cost?: string;
  average_penya_cost?: string;
}

interface WeaponShieldPiercingUpgrade {
  hand_type: string;
  level: number;
  dice8_green: DiceData;
  dice10_pink: DiceData;
  penya_cost?: string;
  average_penya_cost?: string;
}

interface PiercingData {
  armor_piercing_card: {
    title: string;
    bonuses: Array<{
      grade: string;
      lightning_card: string;
      volcano_card: string;
      ocean_card: string;
      earthquake_card: string;
      vacuum_card: string;
    }>;
    notes: string[];
  };
  armor_piercing_upgrade_event: ArmorPiercingUpgrade[];
  armor_piercing_upgrade: ArmorPiercingUpgrade[];
  "weapon&shield_piercing_card": Array<{
    tier: string;
    required_target_level: number;
    attributes: {
      fire?: string;
      electric?: string;
      water?: string;
      land?: string;
      wind?: string;
      thorn?: string;
      lava?: string;
      volt?: string;
    };
  }>;
  "weapon&shield_piercing_upgrade_event": WeaponShieldPiercingUpgrade[];
  "weapon&shield_piercing_upgrade": WeaponShieldPiercingUpgrade[];
}

export const Piercing = () => {
  const data = piercingData as unknown as PiercingData;

  return (
    <div className="baike-content">
      {/* 防具穿孔卡片 */}
      <div className="baike-section">
        <h2 className="baike-section-title">防具穿孔</h2>

        <div style={{ marginTop: "16px" }}>
          <h3 style={{ color: "rgba(255, 217, 77, 0.9)", marginBottom: "12px", fontSize: "1.2rem" }}>
            {data.armor_piercing_card.title}
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>等级</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>电属性装备卡片</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>火属性装备卡片</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>水属性装备卡片</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>土属性装备卡片</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>风属性装备卡片</th>
              </tr>
            </thead>
            <tbody>
              {data.armor_piercing_card.bonuses.map((bonus, idx) => (
                <tr key={idx}>
                  <td>{bonus.grade}</td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>{bonus.lightning_card}</td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>{bonus.volcano_card}</td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>{bonus.ocean_card}</td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>{bonus.earthquake_card}</td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>{bonus.vacuum_card}</td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>

        {data.armor_piercing_card.notes && data.armor_piercing_card.notes.length > 0 && (
          <div className="baike-info-card" style={{ marginTop: "16px" }}>
            <ul className="baike-list">
              {data.armor_piercing_card.notes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 防具穿孔升级（标准） */}
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ color: "rgba(255, 217, 77, 0.9)", marginBottom: "12px", fontSize: "1.2rem" }}>
            防具穿孔升级（标准）
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>等级</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>骰子类型</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>平均概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>初始概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>平均尝试</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "180px" }}>达到平均概率尝试</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "180px" }}>达到100%概率尝试</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>金币</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>平均金币</th>
              </tr>
            </thead>
            <tbody>
              {data.armor_piercing_upgrade.map((upgrade, idx) => (
                <React.Fragment key={idx}>
                  <tr>
                    <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                      {upgrade.level}
                    </td>
                    <td>8点骰子</td>
                    <td>{upgrade.dice8_green.average_chance}</td>
                    <td style={{ fontSize: "0.85rem" }}>{upgrade.dice8_green.initial_chance}</td>
                    <td>{upgrade.dice8_green.average_tries?.toFixed(4)}</td>
                    <td>{upgrade.dice8_green.reach_average_chance_tries?.toFixed(4)}</td>
                    <td>{upgrade.dice8_green.reach_100_percent_tries?.toFixed(4)}</td>
                    <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                      {upgrade.penya_cost}
                    </td>
                    <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                      {upgrade.average_penya_cost}
                    </td>
                  </tr>
                  <tr>
                    <td>10点骰子</td>
                    <td>{upgrade.dice10_pink.average_chance}</td>
                    <td style={{ fontSize: "0.85rem" }}>{upgrade.dice10_pink.initial_chance}</td>
                    <td>{upgrade.dice10_pink.average_tries?.toFixed(4)}</td>
                    <td>{upgrade.dice10_pink.reach_average_chance_tries?.toFixed(4)}</td>
                    <td>{upgrade.dice10_pink.reach_100_percent_tries?.toFixed(4)}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
            </table>
    </div>
    </div>

        {/* 防具穿孔升级（活动） */}
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ color: "rgba(255, 217, 77, 0.9)", marginBottom: "12px", fontSize: "1.2rem" }}>
            防具穿孔升级（活动）
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>等级</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>骰子类型</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>平均概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>活动平均概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>初始概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>活动初始概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>提升</th>
              </tr>
            </thead>
            <tbody>
              {data.armor_piercing_upgrade_event.map((upgrade, idx) => (
                <React.Fragment key={idx}>
                  <tr>
                    <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                      {upgrade.level}
                    </td>
                    <td>8点骰子</td>
                    <td>{upgrade.dice8_green.average_chance}</td>
                    <td>{upgrade.dice8_green.event_average_chance}</td>
                    <td style={{ fontSize: "0.85rem" }}>{upgrade.dice8_green.initial_chance}</td>
                    <td style={{ fontSize: "0.85rem" }}>{upgrade.dice8_green.event_initial_chance}</td>
                    <td>{upgrade.dice8_green.increase}</td>
                  </tr>
                  <tr>
                    <td>10点骰子</td>
                    <td>{upgrade.dice10_pink.average_chance}</td>
                    <td>{upgrade.dice10_pink.event_average_chance}</td>
                    <td style={{ fontSize: "0.85rem" }}>{upgrade.dice10_pink.initial_chance}</td>
                    <td style={{ fontSize: "0.85rem" }}>{upgrade.dice10_pink.event_initial_chance}</td>
                    <td>{upgrade.dice10_pink.increase}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
            </table>
    </div>
    </div>
    </div>

      {/* 武器和盾牌穿孔卡片 */}
      <div className="baike-section" style={{ marginTop: "32px" }}>
        <h2 className="baike-section-title">武器和盾牌穿孔</h2>

        <div style={{ marginTop: "16px" }}>
          <h3 style={{ color: "rgba(255, 217, 77, 0.9)", marginBottom: "12px", fontSize: "1.2rem" }}>
            武器和盾牌穿孔卡片
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>等级</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>需求等级</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>火焰卡片</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>雷电卡片</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>流水卡片</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>岩石卡片</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>暴风卡片</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>荆棘卡片</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>岩浆卡片</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "200px" }}>电伏卡片</th>
              </tr>
            </thead>
            <tbody>
              {data["weapon&shield_piercing_card"].map((card, idx) => (
                <tr key={idx}>
                  <td>{card.tier}</td>
                  <td>{card.required_target_level}</td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>
                    {card.attributes.fire || "--"}
                  </td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>
                    {card.attributes.electric || "--"}
                  </td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>
                    {card.attributes.water || "--"}
                  </td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>
                    {card.attributes.land || "--"}
                  </td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>
                    {card.attributes.wind || "--"}
                  </td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>
                    {card.attributes.thorn || "--"}
                  </td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>
                    {card.attributes.lava || "--"}
                  </td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>
                    {card.attributes.volt || "--"}
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>

        {/* 武器和盾牌穿孔升级（标准） */}
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ color: "rgba(255, 217, 77, 0.9)", marginBottom: "12px", fontSize: "1.2rem" }}>
            武器和盾牌穿孔升级（标准）
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>类型</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>等级</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>骰子类型</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>平均概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>初始概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>平均尝试</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "180px" }}>达到平均概率尝试</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "180px" }}>达到100%概率尝试</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>金币</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>平均金币</th>
              </tr>
            </thead>
            <tbody>
              {data["weapon&shield_piercing_upgrade"].map((upgrade, idx) => (
                <React.Fragment key={idx}>
                  <tr>
                    <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                      {upgrade.hand_type}
                    </td>
                    <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                      {upgrade.level}
                    </td>
                    <td>8点骰子</td>
                    <td>{upgrade.dice8_green.average_chance}</td>
                    <td style={{ fontSize: "0.85rem" }}>{upgrade.dice8_green.initial_chance}</td>
                    <td>{upgrade.dice8_green.average_tries?.toFixed(4)}</td>
                    <td>{upgrade.dice8_green.reach_average_chance_tries?.toFixed(4)}</td>
                    <td>{upgrade.dice8_green.reach_100_percent_tries?.toFixed(4)}</td>
                    <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                      {upgrade.penya_cost}
                    </td>
                    <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                      {upgrade.average_penya_cost}
                    </td>
                  </tr>
                  <tr>
                    <td>10点骰子</td>
                    <td>{upgrade.dice10_pink.average_chance}</td>
                    <td style={{ fontSize: "0.85rem" }}>{upgrade.dice10_pink.initial_chance}</td>
                    <td>{upgrade.dice10_pink.average_tries?.toFixed(4)}</td>
                    <td>{upgrade.dice10_pink.reach_average_chance_tries?.toFixed(4)}</td>
                    <td>{upgrade.dice10_pink.reach_100_percent_tries?.toFixed(4)}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
            </table>
          </div>
        </div>

        {/* 武器和盾牌穿孔升级（活动） */}
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ color: "rgba(255, 217, 77, 0.9)", marginBottom: "12px", fontSize: "1.2rem" }}>
            武器和盾牌穿孔升级（活动）
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>类型</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>等级</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>骰子类型</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>平均概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>活动平均概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>初始概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>活动初始概率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>提升</th>
              </tr>
            </thead>
            <tbody>
              {data["weapon&shield_piercing_upgrade_event"].map((upgrade, idx) => (
                <React.Fragment key={idx}>
                  <tr>
                    <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                      {upgrade.hand_type}
                    </td>
                    <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                      {upgrade.level}
                    </td>
                    <td>8点骰子</td>
                    <td>{upgrade.dice8_green.average_chance}</td>
                    <td>{upgrade.dice8_green.event_average_chance}</td>
                    <td style={{ fontSize: "0.85rem" }}>{upgrade.dice8_green.initial_chance}</td>
                    <td style={{ fontSize: "0.85rem" }}>{upgrade.dice8_green.event_initial_chance}</td>
                    <td>{upgrade.dice8_green.increase}</td>
                  </tr>
                  <tr>
                    <td>10点骰子</td>
                    <td>{upgrade.dice10_pink.average_chance}</td>
                    <td>{upgrade.dice10_pink.event_average_chance}</td>
                    <td style={{ fontSize: "0.85rem" }}>{upgrade.dice10_pink.initial_chance}</td>
                    <td style={{ fontSize: "0.85rem" }}>{upgrade.dice10_pink.event_initial_chance}</td>
                    <td>{upgrade.dice10_pink.increase}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
