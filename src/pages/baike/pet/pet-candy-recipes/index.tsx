import React from "react";
import petCandyRecipesData from "../../../../config/petCandyRecipes.json";
import "./index.less";

interface Material {
  name: string;
  quantity: number;
}

interface SingleCraftRecipe {
  tier: string;
  materials: Material[];
  penya: string;
}

interface TotalCraftCost {
  tier: string;
  xp_percent: string;
  total_materials: Material[];
  total_penya: string;
}

interface RankUp {
  from: string;
  to: string;
}

interface PetRankUpCost {
  rank_up: RankUp;
  required_candy: Material;
  total_materials_value: Material[];
  total_penya_value: string;
}

interface PetTotalRaisedCost {
  tier_reached: string;
  cumulative_candies: Material[];
  cumulative_materials: Material[];
  cumulative_penya: string;
}

interface PetCandyRecipesData {
  pet_candy_recipes: {
    single_craft_recipe: {
      title_cn: string;
      data: SingleCraftRecipe[];
    };
    total_craft_cost_per_candy: {
      title_cn: string;
      data: TotalCraftCost[];
    };
    pet_rank_up_cost: {
      title_cn: string;
      data: PetRankUpCost[];
    };
    pet_total_raised_cost: {
      title_cn: string;
      data: PetTotalRaisedCost[];
    };
    notes: string[];
  };
}

// 获取材料图标
const getMaterialIcon = (name: string): string => {
  const iconMap: Record<string, string> = {
    云莓: "syssyseveseeding02.png",
    灯莓: "syssyseveseeding04.png",
    奇艺莓: "syssyseveseeding05.png",
  };
  const icon = iconMap[name];
  return icon ? `https://flyffipedia.com/Icons/Items/${icon}` : "";
};

// 获取糖果图标
const getCandyIcon = (tier: string): string => {
  const tierMap: Record<string, string> = {
    F: "01",
    E: "02",
    D: "03",
    C: "04",
    B: "05",
    A: "06",
  };
  // 从tier字符串中提取等级（如 "F" 或 "E (由F升级)"）
  const tierMatch = tier.match(/^([A-F])/);
  const tierCode = tierMatch ? tierMap[tierMatch[1]] : "01";
  return `https://flyffipedia.com/Icons/Items/syssysscrfeed${tierCode}.png`;
};

// 从糖果名称提取等级
const getCandyTierFromName = (name: string): string => {
  const match = name.match(/([A-F])级糖果/);
  return match ? match[1] : "F";
};

// 渲染材料列表
const renderMaterials = (materials: Material[]) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
      {materials.map((material, idx) => {
        const icon = getMaterialIcon(material.name);
        const isCandy = material.name.includes("级糖果");
        const candyIcon = isCandy ? getCandyIcon(getCandyTierFromName(material.name)) : undefined;
        
        return (
          <div key={idx} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <img
              src={isCandy ? (candyIcon || "") : icon}
              alt={material.name}
              style={{ width: "20px", height: "20px" }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <span>{material.name} x{material.quantity.toLocaleString()}</span>
          </div>
        );
      })}
    </div>
  );
};

export const PetCandyRecipes = () => {
  const data = petCandyRecipesData as unknown as PetCandyRecipesData;

  return (
    <div className="baike-content">
      {/* 单次制作消耗 */}
      <div className="baike-section">
        <h2 className="baike-section-title">{data.pet_candy_recipes.single_craft_recipe.title_cn}</h2>
        <div style={{ marginTop: "16px" }}>
          <div style={{ overflowX: "auto" }}>
            <table className="baike-table">
              <thead>
                <tr>
                  <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>等级</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "300px" }}>材料</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>金币</th>
                </tr>
              </thead>
              <tbody>
                {data.pet_candy_recipes.single_craft_recipe.data.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.tier}</td>
                    <td>{renderMaterials(item.materials)}</td>
                    <td>{item.penya}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 制作单个的总计消耗 */}
      <div className="baike-section" style={{ marginTop: "32px" }}>
        <h2 className="baike-section-title">{data.pet_candy_recipes.total_craft_cost_per_candy.title_cn}</h2>
        <div style={{ marginTop: "16px" }}>
          <div style={{ overflowX: "auto" }}>
            <table className="baike-table">
              <thead>
                <tr>
                  <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>等级</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>经验百分比</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "300px" }}>总材料</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>总金币</th>
                </tr>
              </thead>
              <tbody>
                {data.pet_candy_recipes.total_craft_cost_per_candy.data.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.tier}</td>
                    <td>{item.xp_percent}</td>
                    <td>{renderMaterials(item.total_materials)}</td>
                    <td>{item.total_penya}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 宠物进阶升级消耗 */}
      <div className="baike-section" style={{ marginTop: "32px" }}>
        <h2 className="baike-section-title">{data.pet_candy_recipes.pet_rank_up_cost.title_cn}</h2>
        <div style={{ marginTop: "16px" }}>
          <div style={{ overflowX: "auto" }}>
            <table className="baike-table">
              <thead>
                <tr>
                  <th style={{ whiteSpace: "nowrap", minWidth: "100px" }}>进阶</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "150px" }}>所需糖果</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "300px" }}>总材料</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>总金币</th>
                </tr>
              </thead>
              <tbody>
                {data.pet_candy_recipes.pet_rank_up_cost.data.map((item, idx) => {
                  const candyIcon = getCandyIcon(getCandyTierFromName(item.required_candy.name));
                  return (
                    <tr key={idx}>
                      <td>{item.rank_up.from} → {item.rank_up.to}</td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          <img
                            src={candyIcon}
                            alt={item.required_candy.name}
                            style={{ width: "20px", height: "20px" }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                          <span>{item.required_candy.name} x{item.required_candy.quantity.toLocaleString()}</span>
                        </div>
                      </td>
                      <td>{renderMaterials(item.total_materials_value)}</td>
                      <td>{item.total_penya_value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 宠物培养累计总消耗 */}
      <div className="baike-section" style={{ marginTop: "32px" }}>
        <h2 className="baike-section-title">{data.pet_candy_recipes.pet_total_raised_cost.title_cn}</h2>
        <div style={{ marginTop: "16px" }}>
          <div style={{ overflowX: "auto" }}>
            <table className="baike-table">
              <thead>
                <tr>
                  <th style={{ whiteSpace: "nowrap", minWidth: "80px" }}>达到等级</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "300px" }}>累计糖果</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "300px" }}>累计材料</th>
                  <th style={{ whiteSpace: "nowrap", minWidth: "120px" }}>累计金币</th>
                </tr>
              </thead>
              <tbody>
                {data.pet_candy_recipes.pet_total_raised_cost.data.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.tier_reached}</td>
                    <td>{renderMaterials(item.cumulative_candies)}</td>
                    <td>{renderMaterials(item.cumulative_materials)}</td>
                    <td>{item.cumulative_penya}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
    
      {/* 注意事项 */}
      {data.pet_candy_recipes.notes && data.pet_candy_recipes.notes.length > 0 && (
        <div className="baike-section" style={{ marginTop: "32px" }}>
          {data.pet_candy_recipes.notes.map((note, idx) => (
            <div key={idx} className="baike-info-card" style={{ marginTop: idx > 0 ? "12px" : "0" }}>
              <p style={{ color: "rgba(255, 255, 255, 0.85)", margin: 0 }}>{note}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
