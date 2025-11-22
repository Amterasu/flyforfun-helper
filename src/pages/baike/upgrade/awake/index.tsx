import React, { useState } from "react";
import skillAwakeData from "../../../../config/skillAwake.json";
import "./index.less";

type WeaponType = "bow" | "yoyo" | "stick" | "knuckle" | "swordoraxe" | "staff" | "wandorstaff" | "wand" | "shield";

interface SkillRarityData {
  uncommon: number[] | null;
  rare: number[] | null;
  unique: number[] | null;
}

interface SkillAwakeData {
  skillAwakes: {
    [key in WeaponType]: {
      skills: {
        [skillId: string]: SkillRarityData;
      };
      parameters: {
        [paramName: string]: SkillRarityData;
      };
    };
  };
  skillInformation: Array<{
    skillId: number;
    name: {
      cns: string;
    };
    icon: string;
    requiredLevel: number;
  }>;
}

const weaponTypeNames: Record<WeaponType, string> = {
  bow: "弓箭",
  yoyo: "轮子",
  stick: "魔棒",
  knuckle: "拳套",
  swordoraxe: "剑和斧",
  staff: "法杖",
  wandorstaff: "魔杖和法杖",
  wand: "魔杖",
  shield: "盾牌",
};

export const Awake = () => {
  const data = skillAwakeData as unknown as SkillAwakeData;
  const [selectedWeaponType, setSelectedWeaponType] = useState<WeaponType>("bow");

  // 创建技能信息映射
  const skillInfoMap = new Map(
    data.skillInformation.map((info) => [info.skillId.toString(), info])
  );

  // 获取当前武器类型的数据
  const currentWeaponData = data.skillAwakes[selectedWeaponType];
  const skills = currentWeaponData.skills;
  const parameters = currentWeaponData.parameters;

  // 渲染稀有度数值
  const renderRarityValues = (rarityData: number[] | null, rarityName: string) => {
    if (!rarityData || rarityData.length === 0) return null;

    const colorMap: Record<string, string> = {
      uncommon: "rgba(255, 165, 0, 0.9)", // 橙色
      rare: "rgba(0, 255, 0, 0.9)", // 绿色
      unique: "rgba(255, 0, 0, 0.9)", // 红色
    };

    return (
      <div style={{ marginTop: "4px" }}>
        <span style={{ color: colorMap[rarityName] || "rgba(255, 255, 255, 0.9)", fontWeight: 600, fontSize: "0.8rem" }}>
          {rarityName === "uncommon" ? "优秀" : rarityName === "rare" ? "稀有" : "传说"}:
        </span>
        <span style={{ color: "rgba(255, 255, 255, 0.9)", marginLeft: "6px", fontSize: "0.8rem" }}>
          {rarityData.map((val, idx) => (
            <span key={idx}>
              {val}%{idx < rarityData.length - 1 ? ", " : ""}
            </span>
          ))}
        </span>
      </div>
    );
  };

  // 渲染技能卡片
  const renderSkillCard = (skillId: string, skillData: SkillRarityData) => {
    const skillInfo = skillInfoMap.get(skillId);
    if (!skillInfo) return null;

    return (
      <div key={skillId} className="awake-skill-card">
        <div className="awake-skill-icon">
          <img
            src={`https://flyffipedia.com/Icons/Skills/colored/${skillInfo.icon}`}
            alt={skillInfo.name.cns}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
        <div className="awake-skill-content">
          <h4 className="awake-skill-name">{skillInfo.name.cns}</h4>
          <p className="awake-skill-level">最低武器等级: {skillInfo.requiredLevel}</p>
          <div className="awake-skill-rarities">
            {renderRarityValues(skillData.uncommon, "uncommon")}
            {renderRarityValues(skillData.rare, "rare")}
            {renderRarityValues(skillData.unique, "unique")}
          </div>
        </div>
      </div>
    );
  };

  // 渲染参数卡片（如 healing）
  const renderParameterCard = (paramName: string, paramData: SkillRarityData) => {
    const paramNameMap: Record<string, string> = {
      healing: "治疗",
      block: "格挡",
      reflectdamage: "反射伤害",
      magicdefense: "魔法防御",
      criticalresist: "暴击抵抗",
      electricitydefense: "电属性防御",
      firedefense: "火属性防御",
      winddefense: "风属性防御",
      waterdefense: "水属性防御",
      earthdefense: "土属性防御",
      bleedandpoisonresist: "出血和中毒抵抗",
    };

    return (
      <div key={paramName} className="awake-skill-card">
        <div className="awake-skill-content">
          <h4 className="awake-skill-name">{paramNameMap[paramName] || paramName}</h4>
          <p className="awake-skill-level">最低武器等级: 1</p>
          <div className="awake-skill-rarities">
            {renderRarityValues(paramData.uncommon, "uncommon")}
            {renderRarityValues(paramData.rare, "rare")}
            {renderRarityValues(paramData.unique, "unique")}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="baike-content">
      <div className="baike-section">
        <h2 className="baike-section-title">技能觉醒</h2>

        {/* 武器类型导航 */}
        <div className="awake-weapon-nav">
          {Object.keys(weaponTypeNames).map((weaponType) => (
            <button
              key={weaponType}
              className={`awake-nav-button ${selectedWeaponType === weaponType ? "active" : ""}`}
              onClick={() => setSelectedWeaponType(weaponType as WeaponType)}
            >
              {weaponTypeNames[weaponType as WeaponType]}
            </button>
          ))}
        </div>

        {/* 技能卡片网格 */}
        <div className="awake-skills-grid">
          {Object.entries(skills).map(([skillId, skillData]) =>
            renderSkillCard(skillId, skillData)
          )}
          {Object.entries(parameters).map(([paramName, paramData]) =>
            renderParameterCard(paramName, paramData)
          )}
        </div>
      </div>
    </div>
  );
};
