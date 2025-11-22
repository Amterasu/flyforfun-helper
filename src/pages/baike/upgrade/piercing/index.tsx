import React from "react";
import piercingData from "../pierce/index.json";
import "./index.less";

interface RequirementByHole {
  hole: number;
  penya_cost: string;
  cards_required: number;
}

interface RateByHole {
  hole: number;
  success_chance: string;
  fail_chance: string;
  penya_cost: string;
  cards_required: number;
  protection_scrolls_required: number;
}

interface PiercingData {
  armor_piercing_cards: {
    card_name_cn: string;
    requirements_by_hole: RequirementByHole[];
  };
  armor_piercing_rates_standard: {
    upgrade_type_cn: string;
    protection_scroll_cn: string;
    rates_by_hole: RateByHole[];
  };
  armor_piercing_rates_event: {
    upgrade_type_cn: string;
    protection_scroll_cn: string;
    rates_by_hole: RateByHole[];
  };
  weapon_shield_piercing_cards: {
    card_name_cn: string;
    requirements_by_hole: RequirementByHole[];
  };
  weapon_shield_piercing_rates_standard: {
    upgrade_type_cn: string;
    protection_scroll_cn: string;
    rates_by_hole: RateByHole[];
  };
  weapon_shield_piercing_rates_event: {
    upgrade_type_cn: string;
    protection_scroll_cn: string;
    rates_by_hole: RateByHole[];
  };
}

export const Piercing = () => {
  const data = piercingData as unknown as PiercingData;

  return (
    <div className="baike-content">
      <div className="baike-section">
        <h2 className="baike-section-title">防具穿孔</h2>

        <div style={{ overflowX: "auto", marginTop: "16px" }}>
          <h3 style={{ color: "rgba(255, 217, 77, 0.9)", marginBottom: "12px", fontSize: "1.2rem" }}>
            {data.armor_piercing_cards.card_name_cn}
          </h3>
          <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>孔数</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>金币</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>所需卡片</th>
              </tr>
            </thead>
            <tbody>
              {data.armor_piercing_cards.requirements_by_hole.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.hole}</td>
                  <td>{item.penya_cost}</td>
                  <td>{item.cards_required}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ overflowX: "auto", marginTop: "16px" }}>
          <h3 style={{ color: "rgba(255, 217, 77, 0.9)", marginBottom: "12px", fontSize: "1.2rem" }}>
            {data.armor_piercing_rates_standard.upgrade_type_cn}
          </h3>
          <div className="baike-info-card" style={{ marginBottom: "12px" }}>
            <p style={{ color: "rgba(255, 255, 255, 0.85)", margin: 0 }}>
              <strong>保护卷轴：</strong>{data.armor_piercing_rates_standard.protection_scroll_cn}
            </p>
          </div>
          <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>孔数</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>成功率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>失败率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>金币</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>所需卡片</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "180px" }}>所需保护卷轴</th>
              </tr>
            </thead>
            <tbody>
              {data.armor_piercing_rates_standard.rates_by_hole.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.hole}</td>
                  <td>{item.success_chance}</td>
                  <td>{item.fail_chance}</td>
                  <td>{item.penya_cost}</td>
                  <td>{item.cards_required}</td>
                  <td>{item.protection_scrolls_required}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="baike-section" style={{ marginTop: "32px" }}>
        <h2 className="baike-section-title">武器和盾牌穿孔</h2>

        <div style={{ overflowX: "auto", marginTop: "16px" }}>
          <h3 style={{ color: "rgba(255, 217, 77, 0.9)", marginBottom: "12px", fontSize: "1.2rem" }}>
            {data.weapon_shield_piercing_cards.card_name_cn}
          </h3>
          <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>孔数</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>金币</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>所需卡片</th>
              </tr>
            </thead>
            <tbody>
              {data.weapon_shield_piercing_cards.requirements_by_hole.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.hole}</td>
                  <td>{item.penya_cost}</td>
                  <td>{item.cards_required}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ overflowX: "auto", marginTop: "16px" }}>
          <h3 style={{ color: "rgba(255, 217, 77, 0.9)", marginBottom: "12px", fontSize: "1.2rem" }}>
            {data.weapon_shield_piercing_rates_standard.upgrade_type_cn}
          </h3>
          <div className="baike-info-card" style={{ marginBottom: "12px" }}>
            <p style={{ color: "rgba(255, 255, 255, 0.85)", margin: 0 }}>
              <strong>保护卷轴：</strong>{data.weapon_shield_piercing_rates_standard.protection_scroll_cn}
            </p>
          </div>
          <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>孔数</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>成功率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>失败率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>金币</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>所需卡片</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "180px" }}>所需保护卷轴</th>
              </tr>
            </thead>
            <tbody>
              {data.weapon_shield_piercing_rates_standard.rates_by_hole.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.hole}</td>
                  <td>{item.success_chance}</td>
                  <td>{item.fail_chance}</td>
                  <td>{item.penya_cost}</td>
                  <td>{item.cards_required}</td>
                  <td>{item.protection_scrolls_required}</td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
    </div>

      <div className="baike-section" style={{ marginTop: "32px" }}>
        <h2 className="baike-section-title">活动</h2>

        <div style={{ overflowX: "auto", marginTop: "16px" }}>
          <h3 style={{ color: "rgba(255, 217, 77, 0.9)", marginBottom: "12px", fontSize: "1.2rem" }}>
            {data.armor_piercing_rates_event.upgrade_type_cn}
          </h3>
          <div className="baike-info-card" style={{ marginBottom: "12px" }}>
            <p style={{ color: "rgba(255, 255, 255, 0.85)", margin: 0 }}>
              <strong>保护卷轴：</strong>{data.armor_piercing_rates_event.protection_scroll_cn}
            </p>
    </div>
          <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>孔数</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>成功率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>失败率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>金币</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>所需卡片</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "180px" }}>所需保护卷轴</th>
              </tr>
            </thead>
            <tbody>
              {data.armor_piercing_rates_event.rates_by_hole.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.hole}</td>
                  <td>{item.success_chance}</td>
                  <td>{item.fail_chance}</td>
                  <td>{item.penya_cost}</td>
                  <td>{item.cards_required}</td>
                  <td>{item.protection_scrolls_required}</td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>

        <div className="baike-info-card" style={{ marginTop: "16px" }}>
          <ul className="baike-list">
            <li>
              <strong>Enhanced Armor Piercing</strong> event is for upgrade with <strong>Scroll of GProtect</strong>, only including armor piercing(not weapon and shield piercing).
            </li>
    </ul>
        </div>

        <div style={{ overflowX: "auto", marginTop: "16px" }}>
          <h3 style={{ color: "rgba(255, 217, 77, 0.9)", marginBottom: "12px", fontSize: "1.2rem" }}>
            {data.weapon_shield_piercing_rates_event.upgrade_type_cn}
          </h3>
          <div className="baike-info-card" style={{ marginBottom: "12px" }}>
            <p style={{ color: "rgba(255, 255, 255, 0.85)", margin: 0 }}>
              <strong>保护卷轴：</strong>{data.weapon_shield_piercing_rates_event.protection_scroll_cn}
            </p>
          </div>
          <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>孔数</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>成功率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>失败率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>金币</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>所需卡片</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "180px" }}>所需保护卷轴</th>
              </tr>
            </thead>
            <tbody>
              {data.weapon_shield_piercing_rates_event.rates_by_hole.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.hole}</td>
                  <td>{item.success_chance}</td>
                  <td>{item.fail_chance}</td>
                  <td>{item.penya_cost}</td>
                  <td>{item.cards_required}</td>
                  <td>{item.protection_scrolls_required}</td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>

        <div className="baike-info-card" style={{ marginTop: "16px" }}>
          <ul className="baike-list">
            <li>
              <strong>Enhanced Weapon Piercing</strong> event is for upgrade with <strong>Scroll of GProtect</strong>, only including weapon and shield piercing(not armor piercing).
            </li>
    </ul>
        </div>
      </div>
    </div>
  );
};
