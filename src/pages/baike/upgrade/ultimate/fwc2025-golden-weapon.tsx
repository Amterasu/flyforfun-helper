import React from "react";
import ultimateData from "../../../../config/upgrade/ultimate.json";
import "./index.less";

interface UltimateWeapon {
  name: string;
  abilities: string[];
  possible_random_stats: string[] | string;
}

interface UltimateData {
  fwc2025_golden_ultimate_weapons: UltimateWeapon[];
}

export const Fwc2025GoldenWeapon = () => {
  const data = ultimateData as unknown as UltimateData;

  const formatRandomStats = (stats: string[] | string): string => {
    if (typeof stats === "string") {
      return stats.replace(/\n/g, " | ");
    }
    return stats.join(" | ");
  };

  return (
    <div className="baike-content">
      <div className="baike-section">
        <h2 className="baike-section-title">⚜️ 2025年FWC黄金武器</h2>
        <div style={{ overflowX: "auto" }}>
          <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "200px" }}>武器名称</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "300px" }}>固定属性</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "400px" }}>可能随机属性</th>
              </tr>
            </thead>
            <tbody>
              {data.fwc2025_golden_ultimate_weapons.map((weapon, idx) => (
                <tr key={idx}>
                  <td style={{ whiteSpace: "nowrap" }}>{weapon.name}</td>
                  <td>
                    <ul className="abilities-list">
                      {weapon.abilities.map((ability, aIdx) => (
                        <li key={aIdx}>{ability}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    {Array.isArray(weapon.possible_random_stats) ? (
                      <ul className="random-stats-list">
                        {weapon.possible_random_stats.map((stat: string, sIdx: number) => (
                          <li key={sIdx}>{stat}</li>
                        ))}
                      </ul>
                    ) : (
                      <div style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>
                        {formatRandomStats(weapon.possible_random_stats)}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

