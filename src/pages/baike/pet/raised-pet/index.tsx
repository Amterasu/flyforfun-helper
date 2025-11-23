import React, { useState } from "react";
import raisedPetData from "../../../../config/pet/raisedPet.json";
import "./index.less";

interface Tier {
  maxEnergy: number;
  exp: number;
  requiredCandyItem: number;
  graceSkill: number;
  graceSkillCooldown: number;
  graceSkillLevel: number;
  graceSkillDuration: number;
  graceSkillEnergyConsumption: number;
}

interface Pet {
  skill: {
    id: number;
    name: {
      cns: string;
    };
    description: {
      cns: string;
    };
    icon: string;
    levels: Array<{
      abilities: Array<{
        parameter: number;
        parameterLocalization: {
          cns: string;
        };
        add: number | null;
        set: number | null;
        rate: boolean | null;
      }>;
      duration: number | null;
      cooldown: number | null;
    }>;
  };
  item: {
    id: number;
    name: {
      cns: string;
    };
    icon: string;
  };
  candyItems: Array<{
    id: number;
    name: {
      cns: string;
    };
    icon: string;
  }>;
  petItemId: number;
  parameter: number;
  parameterLocalization: {
    cns: string;
  };
  rate: boolean;
  values: number[];
  tiers: Tier[];
}

interface RaisedPetData {
  pets: Pet[];
}

const tierLabels = ["F", "E", "D", "C", "B", "A", "S"];

export const RaisedPet = () => {
  const data = raisedPetData as unknown as RaisedPetData;
  const [selectedPetIndex, setSelectedPetIndex] = useState<number>(0);

  // 过滤有效的宠物
  const validPets = data.pets.filter(
    (pet) => pet && pet.item && pet.values && pet.tiers
  );

  // 获取当前选中的宠物
  const selectedPet = validPets[selectedPetIndex] || validPets[0];

  // 获取完美值（等级 1、2、3、4、5、7、9 的数值之和）
  // 对应数组索引：0、1、2、3、4、6、8
  const getPerfectValue = (values: number[]): number => {
    const indices = [0, 1, 2, 3, 4, 6, 8]; // 对应等级 1、2、3、4、5、7、9
    return indices.reduce((sum, idx) => {
      return sum + (values[idx] || 0);
    }, 0);
  };

  // 格式化属性值显示
  const formatAbilityValue = (ability: {
    parameterLocalization?: {
      cns?: string;
    } | null;
    add?: number | null;
    set?: number | null;
    rate?: boolean | null;
  }): string => {
    if (!ability) return "--";
    
    const paramName = ability.parameterLocalization?.cns || "";
    const rate = ability.rate === true;
    let value = "";
    
    // 优先使用 set，如果 set 存在且不为 null/undefined
    if (ability.set !== null && ability.set !== undefined && !isNaN(ability.set)) {
      value = `${ability.set}${rate ? "%" : ""}`;
    } 
    // 其次使用 add，如果 add 存在且不为 null/undefined
    else if (ability.add !== null && ability.add !== undefined && !isNaN(ability.add)) {
      const sign = ability.add >= 0 ? "+" : "";
      value = `${sign}${ability.add}${rate ? "%" : ""}`;
    } 
    // 如果都没有值，返回 "--"
    else {
      return "--";
    }
    
    return paramName ? `${paramName} ${value}` : value;
  };

  // 根据糖果ID查找糖果信息
  const getCandyItem = (pet: Pet, candyId: number) => {
    return pet.candyItems?.find((candy) => candy.id === candyId);
  };

  // 根据技能ID和等级获取技能能力
  const getGraceSkillAbility = (pet: Pet, skillId: number, skillLevel: number) => {
    if (pet.skill.id !== skillId) return null;
    const level = pet.skill.levels?.[skillLevel - 1];
    if (!level || !level.abilities || level.abilities.length === 0) return null;
    const ability = level.abilities[0];
    // 确保返回的 ability 对象有效
    if (!ability) return null;
    return ability;
  };

  // 渲染宠物详情
  const renderPetDetail = (pet: Pet) => {
    if (!pet) return null;

    const perfectValue = getPerfectValue(pet.values);
    const petIcon = `https://flyffipedia.com/Icons/Items/${pet.item.icon}`;

    return (
      <div className="raised-pet-container">
        {/* 宠物头部信息 */}
        <div className="raised-pet-header">
          <div className="raised-pet-icon">
            <img
              src={petIcon}
              alt={pet.item.name?.cns || "宠物"}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div className="raised-pet-info">
            <h3 className="raised-pet-name">{pet.item.name?.cns || "未知宠物"}</h3>
            <div className="raised-pet-stats">
              <span className="raised-pet-perfect-pet">
                <span className="highlight-label">完美宠：</span>
                <span className="highlight-attribute">{pet.parameterLocalization?.cns?.replace(/增加|减少/, "") || "未知"}</span>
                <span className="highlight-value"> +{perfectValue}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Level Bonus 部分 */}
        <div className="raised-pet-section">
          <h4 className="raised-pet-section-title">不同数字对应<span style={{ color: "rgba(238, 117, 30, 0.9)" }}>{pet.parameterLocalization?.cns?.replace(/增加|减少/, "") || "未知"}</span>数值</h4>
          <div className="level-bonus-grid">
            {pet.values.map((value, idx) => (
              <div key={idx} className="level-bonus-item">
                <span className="level-bonus-level">Lv.{idx + 1}</span>
                <span className="level-bonus-value">
                  +{value}
                  {pet.rate ? "%" : ""}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tier Data 部分 */}
        <div className="raised-pet-section">
          <h4 className="raised-pet-section-title">等级数据</h4>
          <div className="tier-cards-grid">
            {pet.tiers.map((tier, tierIdx) => {
              const candyItem = getCandyItem(pet, tier.requiredCandyItem);
              const skillAbility = getGraceSkillAbility(
                pet,
                tier.graceSkill,
                tier.graceSkillLevel
              );

              return (
                <div key={tierIdx} className="tier-card">
                  <div className="tier-card-header">
                    <span className="tier-label">{tierLabels[tierIdx] || tierIdx + 1}</span>
                    {pet.skill.id === tier.graceSkill && (
                      <div className="tier-skill-icon">
                        <img
                          src={`https://flyffipedia.com/Icons/Skills/colored/${pet.skill.icon}`}
                          alt={pet.skill.name?.cns}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                        <span className="tier-skill-level">{tier.graceSkillLevel}</span>
                      </div>
                    )}
                  </div>
                  <div className="tier-card-body">
                    <div className="tier-info-row">
                      <span className="tier-info-label">能量</span>
                      <span className="tier-info-value">{tier.maxEnergy}</span>
                    </div>
                    <div className="tier-info-row">
                      <span className="tier-info-label">经验</span>
                      <span className="tier-info-value">{tier.exp}</span>
                    </div>
                    <div className="tier-info-row">
                      <span className="tier-info-label">糖果</span>
                      <span className="tier-info-value">
                        {candyItem ? (
                          <div className="tier-candy">
                            <img
                              src={`https://flyffipedia.com/Icons/Items/${candyItem.icon}`}
                              alt={candyItem.name?.cns}
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                              }}
                            />
                            <span>{candyItem.name?.cns || `糖果(${tierLabels[tierIdx]})`}</span>
                          </div>
                        ) : (
                          `糖果(${tierLabels[tierIdx]})`
                        )}
                      </span>
                    </div>
                    {skillAbility && (
                      <div className="tier-info-row">
                        <span className="tier-info-label">技能效果</span>
                        <span className="tier-info-value tier-skill-effect">
                          {formatAbilityValue(skillAbility)}
                        </span>
                      </div>
                    )}
                    <div className="tier-info-row">
                      <span className="tier-info-label">持续</span>
                      <span className="tier-info-value">{tier.graceSkillDuration}秒</span>
                    </div>
                    <div className="tier-info-row">
                      <span className="tier-info-label">冷却</span>
                      <span className="tier-info-value">{tier.graceSkillCooldown}秒</span>
                    </div>
                    <div className="tier-info-row">
                      <span className="tier-info-label">消耗</span>
                      <span className="tier-info-value">{tier.graceSkillEnergyConsumption}分钟</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="baike-content">
      <div className="baike-section">
        <h2 className="baike-section-title">宠物属性</h2>

        <div className="raised-pet-layout">
          {/* 左侧宠物列表 */}
          <div className="raised-pet-sidebar">
            <div className="raised-pet-list">
              {validPets.map((pet, idx) => {
                const petIcon = `https://flyffipedia.com/Icons/Items/${pet.item.icon}`;
                const isSelected = idx === selectedPetIndex;

                return (
                  <div
                    key={idx}
                    className={`raised-pet-list-item ${isSelected ? "active" : ""}`}
                    onClick={() => setSelectedPetIndex(idx)}
                  >
                    <div className="raised-pet-list-icon">
                      <img
                        src={petIcon}
                        alt={pet.item.name?.cns || "宠物"}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div className="raised-pet-list-name">
                      {pet.item.name?.cns || "未知宠物"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 右侧详情区域 */}
          <div className="raised-pet-content">
            {renderPetDetail(selectedPet)}
          </div>
        </div>
      </div>
    </div>
  );
};
