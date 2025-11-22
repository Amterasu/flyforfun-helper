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
      cns: string;
    };
    add: number | null;
    set: number | null;
    rate: boolean | null;
  }): string => {
    const paramName = ability.parameterLocalization?.cns || "";
    let value = "";
    
    if (ability.set !== null) {
      value = `${ability.set}${ability.rate ? "%" : ""}`;
    } else if (ability.add !== null) {
      const sign = ability.add >= 0 ? "+" : "";
      value = `${sign}${ability.add}${ability.rate ? "%" : ""}`;
    } else {
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
    return level.abilities[0];
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
              <span className="raised-pet-perfect-value">
                完美值: +{perfectValue}
              </span>
              <span className="raised-pet-parameter">
                参数: {pet.parameterLocalization?.cns || "未知"}
              </span>
            </div>
          </div>
        </div>

        {/* Level Bonus 部分 */}
        <div className="raised-pet-section">
          <h4 className="raised-pet-section-title">等级加成</h4>
          <div style={{ overflowX: "auto" }}>
            <table className="baike-table">
              <thead>
                <tr>
                  <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>等级</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>
                    {pet.parameterLocalization?.cns || "属性值"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {pet.values.map((value, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>
                      +{value}
                      {pet.rate ? "%" : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tier Data 部分 */}
        <div className="raised-pet-section">
          <h4 className="raised-pet-section-title">等级数据</h4>
          <div style={{ overflowX: "auto" }}>
            <table className="baike-table">
              <thead>
                <tr>
                  <th style={{ whiteSpace: "nowrap", minWidth: "60px" }}>等级</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>最大能量</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>经验值</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>所需糖果</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>祝福技能</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>祝福技能能力</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>持续时间</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>冷却时间</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>能量消耗</th>
                </tr>
              </thead>
              <tbody>
                {pet.tiers.map((tier, tierIdx) => {
                  const candyItem = getCandyItem(pet, tier.requiredCandyItem);
                  const skillAbility = getGraceSkillAbility(
                    pet,
                    tier.graceSkill,
                    tier.graceSkillLevel
                  );

                  return (
                    <tr key={tierIdx}>
                      <td>{tierLabels[tierIdx] || tierIdx + 1}</td>
                      <td>{tier.maxEnergy} 分钟</td>
                      <td>{tier.exp}</td>
                      <td>
                        {candyItem ? (
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <img
                              src={`https://flyffipedia.com/Icons/Items/${candyItem.icon}`}
                              alt={candyItem.name?.cns}
                              style={{ width: "24px", height: "24px" }}
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                              }}
                            />
                            <span>{candyItem.name?.cns || `糖果(${tierLabels[tierIdx]})`}</span>
                          </div>
                        ) : (
                          `糖果(${tierLabels[tierIdx]})`
                        )}
                      </td>
                      <td>
                        {pet.skill.id === tier.graceSkill ? (
                          <div style={{ position: "relative", display: "inline-block" }}>
                            <img
                              src={`https://flyffipedia.com/Icons/Skills/colored/${pet.skill.icon}`}
                              alt={pet.skill.name?.cns}
                              style={{ width: "32px", height: "32px" }}
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                              }}
                            />
                            <span
                              style={{
                                position: "absolute",
                                bottom: "0px",
                                right: "0px",
                                color: "#ffffff",
                                fontSize: "10px",
                                fontWeight: "bold",
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.8), 1px -1px 2px rgba(0, 0, 0, 0.8), -1px 1px 2px rgba(0, 0, 0, 0.8)",
                              }}
                            >
                              {tier.graceSkillLevel}
                            </span>
                          </div>
                        ) : (
                          tier.graceSkillLevel
                        )}
                      </td>
                      <td>
                        {skillAbility
                          ? formatAbilityValue(skillAbility)
                          : "--"}
                      </td>
                      <td>{tier.graceSkillDuration} 秒</td>
                      <td>{tier.graceSkillCooldown} 秒</td>
                      <td>{tier.graceSkillEnergyConsumption} 分钟</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="baike-content">
      <div className="baike-section">
        <h2 className="baike-section-title">养成宠物</h2>

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
