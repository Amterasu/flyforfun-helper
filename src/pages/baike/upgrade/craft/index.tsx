import React from "react";
import craftData from "../../../../config/craft.json";
import "./index.less";

interface CreationRate {
  gem_en: string;
  gem_cn: string;
  icon?: string;
  level: number;
  regular_chance: string;
  shining_dice12_chance: string;
}

interface GemCreation {
  weapon_upgrade_level: number;
  chance: string;
  number_of_gems: number | string;
}

interface CraftData {
  create_unique_weapon: {
    creation_rates: {
      title_cn: string;
      data: CreationRate[];
    };
    gem_creation: {
      title_cn: string;
      data: GemCreation[];
    };
    notes: string[];
  };
}

export const Craft = () => {
  const data = craftData as unknown as CraftData;

  return (
    <div className="baike-content">
      <div className="baike-section">
        <h2 className="baike-section-title">制作武器</h2>

        {/* 制作武器成功率 */}
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ color: "rgba(255, 217, 77, 0.9)", marginBottom: "12px", fontSize: "1.2rem" }}>
            {data.create_unique_weapon.creation_rates.title_cn}
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table className="baike-table">
              <thead>
                <tr>
                  <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>宝石类型</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>等级</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>普通概率</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>闪亮12点骰子概率</th>
                </tr>
              </thead>
              <tbody>
                {data.create_unique_weapon.creation_rates.data.map((item, idx) => {
                  // 优先使用 icon 字段，如果没有则使用 gem_en 生成 URL
                  const iconUrl = item.icon
                    ? `https://flyffipedia.com/Icons/Items/${item.icon}`
                    : `https://flyffipedia.com/Icons/Items/genmat${item.gem_en.toLowerCase()}.png`;
                  return (
                    <tr key={idx}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <img
                            src={iconUrl}
                            alt={item.gem_cn}
                            style={{ width: "24px", height: "24px" }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                          <div>
                            <div>{item.gem_cn}</div>
                            <div style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.6)" }}>
                              {item.gem_en}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{item.level}</td>
                      <td>{item.regular_chance}</td>
                      <td>{item.shining_dice12_chance}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 制作宝石（武器转换） */}
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ color: "rgba(255, 217, 77, 0.9)", marginBottom: "12px", fontSize: "1.2rem" }}>
            {data.create_unique_weapon.gem_creation.title_cn}
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table className="baike-table">
              <thead>
                <tr>
                  <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>武器强化等级</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>概率</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>宝石数量</th>
                </tr>
              </thead>
              <tbody>
                {data.create_unique_weapon.gem_creation.data.map((item, idx) => (
                  <tr key={idx}>
                    <td>+{item.weapon_upgrade_level}</td>
                    <td>{item.chance}</td>
                    <td>{item.number_of_gems}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 说明信息 */}
        {data.create_unique_weapon.notes && data.create_unique_weapon.notes.length > 0 && (
          <div className="baike-info-card" style={{ marginTop: "16px" }}>
            <ul className="baike-list">
              {data.create_unique_weapon.notes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
