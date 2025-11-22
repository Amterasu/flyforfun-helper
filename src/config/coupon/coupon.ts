import couponData from "./coupon.json";

export interface CoupleLevel {
  level: number;
  maxSkillPoints: number;
  skillPointsReward: number;
  bankSlotsReward: number;
  baseCheers: number;
}

export interface CoupleRing {
  name_en: string;
  name_cn: string;
  rarity_en: string;
  rarity_cn: string;
  icon: string;
  teleports: number;
  cheers: number;
  bankSlots: number;
  price: string | null;
}

export interface CoupleSkill {
  name_en: string;
  name_cn: string;
  requiredLevel: number;
  consumedPoints: number;
  duration_en: string;
  duration_cn: string;
  description_en: string;
  description_cn: string;
}

export interface AnniversaryReward {
  days: number;
  rewardName_en: string;
  rewardName_cn: string;
  contents: Array<{
    item_en: string;
    item_cn: string;
  }>;
  repeatDays: number | null;
}

export interface DailyQuest {
  questName_en: string;
  questName_cn: string;
  objective_en?: string;
  objective_cn?: string;
  neededItem_en: string;
  neededItem_cn: string;
}

export interface QuestGroup {
  group_description: string;
  quests: DailyQuest[];
  xp_reward_table: Record<string, string>;
}

export interface CouponData {
  coupleLevels: CoupleLevel[];
  coupleRings: CoupleRing[];
  coupleSkills: CoupleSkill[];
  coupleAnniversaryRewards: AnniversaryReward[];
  coupleDailyQuests: QuestGroup[];
}

export const couponDataTyped = couponData as unknown as CouponData;

