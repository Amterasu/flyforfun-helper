import React from 'react';
import ultimateJewelsData from '../../../../config/ultimateJewels/index.json';
import './index.less';

interface JewelAttribute {
  grade: number;
  rarity_en: string;
  rarity_cn: string;
  shining_ruby: string;
  shining_amethyst: string;
  shining_emerald: string;
  shining_sapphire: string;
  shining_topaz: string;
  shining_diamond: string;
  shining_onyx: string;
}

interface UltimateJewelsData {
  ultimate_jewels: {
    meta: {
      required_level: number;
    };
    jewel_attributes: JewelAttribute[];
    runes_attributes: {
      note: string;
      defense: string;
      attack: string;
      magic_resist: string;
      critical_resistance: string;
      attack_speed_rate: string;
    };
    notes: string[];
  };
  ultimate_jewels_fusion: {
    fusion_data: Array<{
      target_grades: string;
      using_3_jewels: {
        chance: string;
        penya: string;
        average_tries: number;
        average_penya: string;
      };
      using_4_jewels: {
        chance: string;
        penya: string;
        average_tries: number;
        average_penya: string;
      };
      using_5_jewels: {
        chance: string;
        penya: string;
        average_tries: number;
        average_penya: string;
      };
      using_6_jewels: {
        chance: string;
        penya: string;
        average_tries: number;
        average_penya: string;
      };
    }>;
    notes: string[];
  };
}

export const BattleForMadrigalUltimateJewels = () => {
  const data = ultimateJewelsData as unknown as UltimateJewelsData;

  return (
    <div className="baike-content">
      <div className="baike-section">
        <h2 className="baike-section-title">宝石和符文（测试服会有改动）</h2>

        <div style={{ marginTop: "16px" }}>
          <h3 style={{ color: "rgba(255, 217, 77, 0.9)", marginBottom: "12px", fontSize: "1.2rem" }}>
            宝石属性
          </h3>
          <div className="baike-info-card" style={{ marginBottom: "12px" }}>
            <p style={{ color: "rgba(255, 255, 255, 0.85)", margin: 0 }}>
              <strong>需求等级：</strong>{data.ultimate_jewels.meta.required_level}
            </p>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>等级</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>稀有度</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>闪耀红宝石</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>闪耀紫水晶</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>闪耀绿宝石</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>闪耀蓝宝石</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>闪耀黄宝石</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>闪耀钻石</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>闪耀玛瑙</th>
              </tr>
            </thead>
            <tbody>
              {data.ultimate_jewels.jewel_attributes.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.grade}</td>
                  <td>{item.rarity_cn}</td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>{item.shining_ruby}</td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>{item.shining_amethyst}</td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>{item.shining_emerald}</td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>{item.shining_sapphire}</td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>{item.shining_topaz}</td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>{item.shining_diamond}</td>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem" }}>{item.shining_onyx}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        <div style={{ overflowX: "auto", marginTop: "16px" }}>
          <h3 style={{ color: "rgba(255, 217, 77, 0.9)", marginBottom: "12px", fontSize: "1.2rem" }}>
            符文属性
          </h3>
          <div className="baike-info-card" style={{ marginBottom: "12px" }}>
            <p style={{ color: "rgba(255, 255, 255, 0.85)", margin: 0 }}>
              {data.ultimate_jewels.runes_attributes.note}
            </p>
          </div>
          <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "200px" }}>属性类型</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "200px" }}>属性值</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>防御力</td>
                <td>{data.ultimate_jewels.runes_attributes.defense}</td>
              </tr>
              <tr>
                <td>攻击力</td>
                <td>{data.ultimate_jewels.runes_attributes.attack}</td>
              </tr>
              <tr>
                <td>魔法抗性</td>
                <td>{data.ultimate_jewels.runes_attributes.magic_resist}</td>
              </tr>
              <tr>
                <td>暴击抵抗</td>
                <td>{data.ultimate_jewels.runes_attributes.critical_resistance}</td>
              </tr>
              <tr>
                <td>攻击速度</td>
                <td>{data.ultimate_jewels.runes_attributes.attack_speed_rate}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="baike-info-card" style={{ marginTop: "16px" }}>
          <ul className="baike-list">
            {data.ultimate_jewels.notes.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        </div>

        <div style={{ overflowX: "auto", marginTop: "16px" }}>
          <h3 style={{ color: "rgba(255, 217, 77, 0.9)", marginBottom: "12px", fontSize: "1.2rem" }}>
            宝石融合
          </h3>
          <table className="baike-table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>目标等级</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>使用数量</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>成功率</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>金币</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>平均尝试</th>
                <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>平均金币</th>
              </tr>
            </thead>
            <tbody>
              {data.ultimate_jewels_fusion.fusion_data.map((fusion, fusionIdx) => (
                <React.Fragment key={fusionIdx}>
                  <tr>
                    <td rowSpan={4} style={{ verticalAlign: "middle" }}>
                      {fusion.target_grades}
                    </td>
                    <td>3个</td>
                    <td>{fusion.using_3_jewels.chance}</td>
                    <td>{fusion.using_3_jewels.penya}</td>
                    <td>{fusion.using_3_jewels.average_tries.toFixed(2)}</td>
                    <td>{fusion.using_3_jewels.average_penya}</td>
                  </tr>
                  <tr>
                    <td>4个</td>
                    <td>{fusion.using_4_jewels.chance}</td>
                    <td>{fusion.using_4_jewels.penya}</td>
                    <td>{fusion.using_4_jewels.average_tries.toFixed(2)}</td>
                    <td>{fusion.using_4_jewels.average_penya}</td>
                  </tr>
                  <tr>
                    <td>5个</td>
                    <td>{fusion.using_5_jewels.chance}</td>
                    <td>{fusion.using_5_jewels.penya}</td>
                    <td>{fusion.using_5_jewels.average_tries.toFixed(2)}</td>
                    <td>{fusion.using_5_jewels.average_penya}</td>
                  </tr>
                  <tr>
                    <td>6个</td>
                    <td>{fusion.using_6_jewels.chance}</td>
                    <td>{fusion.using_6_jewels.penya}</td>
                    <td>{fusion.using_6_jewels.average_tries.toFixed(2)}</td>
                    <td>{fusion.using_6_jewels.average_penya}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="baike-info-card" style={{ marginTop: "16px" }}>
          <ul className="baike-list">
            {data.ultimate_jewels_fusion.notes.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
