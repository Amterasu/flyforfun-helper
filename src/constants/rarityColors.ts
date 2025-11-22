/**
 * 稀有度颜色配置
 * 用于根据 rarity_en 字段获取对应的颜色
 */
export const RARITY_COLORS: Record<string, string> = {
  Unique: "#d20000",
  Rare: "#00aa00",
  VeryRare: "#d20000", // 注意：Very Rare 在数据中可能是 "Very Rare"，需要去除空格后使用
  Uncommon: "#c46200",
  Common: "#78d9ff",
  Ultimate: "#8000ff",
  "Unique-yellow": "#edd441",
};

/**
 * 根据 rarity_en 获取对应的颜色
 * @param rarityEn 稀有度英文名称（可能包含空格）
 * @returns 对应的颜色值，如果未找到则返回默认颜色
 */
export const getRarityColor = (rarityEn: string | null | undefined): string => {
  if (!rarityEn) {
    return "rgba(255, 255, 255, 0.7)"; // 默认颜色
  }

  // 去除空格后查找
  const normalizedRarity = rarityEn.replace(/\s+/g, "");
  return RARITY_COLORS[normalizedRarity] || RARITY_COLORS[rarityEn] || "rgba(255, 255, 255, 0.7)";
};

