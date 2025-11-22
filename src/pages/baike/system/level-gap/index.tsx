import React from "react";
import levelGapData from "../../../../config/levelGap.json";
import "./index.less";

interface LevelGapData {
  relativeLevel: number;
  damage: string;
  dropRate: string;
  penyaRate: string;
  experienceSolo: string;
  experienceParty: string;
  hitRate_en: string;
  hitRate_cn: string;
  criticalDamage_en: string;
  criticalDamage_cn: string;
}

const levelGapList: LevelGapData[] = levelGapData as unknown as LevelGapData[];

// 高亮文本组件
const HighlightText: React.FC<{ text: string; highlights: string[] }> = ({
  text,
  highlights,
}) => {
  if (highlights.length === 0) {
    return <>{text}</>;
  }

  const pattern = highlights
    .map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const regex = new RegExp(`(${pattern})`, "g");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, idx) => {
        const isHighlight = highlights.includes(part);
        return isHighlight ? (
          <span key={idx} className="highlight">
            {part}
          </span>
        ) : (
          <React.Fragment key={idx}>{part}</React.Fragment>
        );
      })}
    </>
  );
};

export const LevelGap = () => {
  const formatLevelLabel = (level: number): string => {
    if (level === 0) return "同等级";
    if (level > 0) return `高于怪物 ${level} 级`;
    return `低于怪物 ${Math.abs(level)} 级`;
  };

  const getLevelClass = (level: number): string => {
    if (level <= -10) return "level-negative-extreme";
    if (level < 0) return "level-negative";
    if (level === 0) return "level-zero";
    if (level <= 5) return "level-positive-low";
    if (level <= 10) return "level-positive-medium";
    if (level <= 15) return "level-positive-high";
    return "level-positive-extreme";
  };

  return (
    <div className="baike-content">
      <div className="baike-info-card">
        <h3 style={{ marginTop: 0, marginBottom: "16px", color: "rgba(255, 255, 255, 0.9)" }}>
          等级差距说明
        </h3>
        <div className="info-text">
          <p>
            等级差距影响伤害、掉落率、金币获取、经验值和命中率等属性。相对等级 = 玩家等级 - 怪物等级。
            当玩家等级低于怪物等级时，各项属性会受到惩罚；当玩家等级高于怪物等级时，伤害会逐渐降低。
          </p>
          <p>
            命中率惩罚基于等级的相对差异。一名 <HighlightText text="20" highlights={["20"]} />
            级玩家对抗 <HighlightText text="30" highlights={["30"]} />
            级怪物时，所受的命中率惩罚会远大于 <HighlightText text="150" highlights={["150"]} />
            级玩家对抗 <HighlightText text="160" highlights={["160"]} />
            级怪物时的惩罚。只要拥有足够的命中率，无论该惩罚如何，你对高等级怪物的最大命中概率都可达到{" "}
            <HighlightText text="96%" highlights={["96%"]} />。
          </p>
          <p>
            命中率的计算基于你的等级、敏捷（dex）以及怪物的等级和格挡（parry），普通攻击的命中率最低为{" "}
            <HighlightText text="20%" highlights={["20%"]} />，最高为{" "}
            <HighlightText text="96%" highlights={["96%"]} />
            。若不是普通攻击，命中率始终为 <HighlightText text="100%" highlights={["100%"]} />。
          </p>
        </div>
      </div>

      <div className="level-gap-table-wrapper">
        <table className="baike-table level-gap-table">
          <thead>
            <tr>
              <th>相对等级</th>
              <th>伤害</th>
              <th>掉落率</th>
              <th>金币率</th>
              <th>单人经验</th>
              <th>组队经验</th>
              <th>命中率惩罚</th>
              <th>暴击伤害倍率</th>
            </tr>
          </thead>
          <tbody>
            {levelGapList.map((item, idx) => (
              <tr key={idx} className={getLevelClass(item.relativeLevel)}>
                <td className="level-cell">
                  <span className="level-value">
                    {item.relativeLevel > 0 ? "+" : ""}{item.relativeLevel}
                  </span>
                  <span className="level-label">{formatLevelLabel(item.relativeLevel)}</span>
                </td>
                <td className="damage-cell">{item.damage}</td>
                <td className={`rate-cell ${item.dropRate === "0%" ? "zero-rate" : ""}`}>
                  {item.dropRate}
                </td>
                <td className={`rate-cell ${item.penyaRate === "0%" ? "zero-rate" : ""}`}>
                  {item.penyaRate}
                </td>
                <td className={`rate-cell ${item.experienceSolo === "0%" ? "zero-rate" : ""}`}>
                  {item.experienceSolo}
                </td>
                <td className={`rate-cell ${item.experienceParty === "0%" ? "zero-rate" : ""}`}>
                  {item.experienceParty}
                </td>
                <td className="hitrate-cell">{item.hitRate_cn}</td>
                <td className="crit-damage-cell" title={item.criticalDamage_cn}>
                  {item.relativeLevel < 0 ? (
                    <span className="crit-value">1.2 ~ 2.0x</span>
                  ) : (
                    <span className="crit-value">1.1 ~ 1.4x</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
