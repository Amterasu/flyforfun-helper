import React, { useCallback, useRef, useState } from "react";
import weaponData from "../../../config/weapon.json";
import ultimate190Data from "../../../config/upgrade/ulimate190.json";
import { PresetDisplay } from "./PresetDisplay";
import "./index.less";

// 属性唤醒数据
const attributeData = [
  {
    name: "智力",
    list: [
      { open_num: 0, color: "blue", name: "+4", probability: 0.01 },
      { open_num: 0, color: "red", name: "+3", probability: 0.05 },
      { open_num: 0, color: "green", name: "+2", probability: 0.3 },
      { open_num: 0, color: "purple", name: "+1", probability: 0.64 },
    ],
  },
  {
    name: "体质",
    list: [
      { open_num: 0, color: "blue", name: "+4", probability: 0.01 },
      { open_num: 0, color: "red", name: "+3", probability: 0.05 },
      { open_num: 0, color: "green", name: "+2", probability: 0.3 },
      { open_num: 0, color: "purple", name: "+1", probability: 0.64 },
    ],
  },
  {
    name: "力量",
    list: [
      { open_num: 0, color: "blue", name: "+4", probability: 0.01 },
      { open_num: 0, color: "red", name: "+3", probability: 0.05 },
      { open_num: 0, color: "green", name: "+2", probability: 0.3 },
      { open_num: 0, color: "purple", name: "+1", probability: 0.64 },
    ],
  },
  {
    name: "敏捷",
    list: [
      { open_num: 0, color: "blue", name: "+4", probability: 0.01 },
      { open_num: 0, color: "red", name: "+3", probability: 0.05 },
      { open_num: 0, color: "green", name: "+2", probability: 0.3 },
      { open_num: 0, color: "purple", name: "+1", probability: 0.64 },
    ],
  },
];

interface WeaponAbility {
  name: string;
  min: number;
  max: number;
  rate?: boolean;
  fixed?: number;
  cur: string;
}

interface WeaponWakeUp {
  name: string;
  item: number[];
}

interface Weapon {
  id: number;
  name: string;
  minAttack: number;
  maxAttack: number;
  job: string;
  attackSpeed: string;
  type: string;
  imgUrl: string;
  description?: string;
  abilities: WeaponAbility[];
  possibleRandomStats: WeaponAbility[];
  wakeUpList?: WeaponWakeUp[];
}

interface WeaponMessage {
  id: number;
  text: string;
  type: "info" | "success" | "warning";
}

interface CurrentWeaponStats {
  abilities: Array<{
    name: string;
    value: number;
    display: string;
    range: string;
  }>;
  yellowStats: Array<{
    name: string;
    value: number;
    display: string;
    range: string;
  }>;
  orangeStats: Array<{
    name: string;
    value: number;
    display: string;
    range: string;
  }>;
  wakeUp?: {
    name: string;
    percentage: number;
  };
  attributeWakeUp?: Array<{
    name: string;
    value: string;
  }>;
}

export const WeaponTool = () => {
  const weapons = weaponData as unknown as Weapon[];

  const [selectedWeaponId, setSelectedWeaponId] = useState<number | null>(null);
  const [currentWeapon, setCurrentWeapon] = useState<Weapon | null>(null);
  const [currentStats, setCurrentStats] = useState<CurrentWeaponStats>({
    abilities: [],
    yellowStats: [],
    orangeStats: [],
    attributeWakeUp: [],
  });
  // 日志状态 - 每个操作独立的日志
  const [abilitiesMessages, setAbilitiesMessages] = useState<WeaponMessage[]>(
    []
  );
  const [yellowMessages, setYellowMessages] = useState<WeaponMessage[]>([]);
  const [orangeMessages, setOrangeMessages] = useState<WeaponMessage[]>([]);
  const [wakeUpMessages, setWakeUpMessages] = useState<WeaponMessage[]>([]);
  const [attributeWakeUpMessages, setAttributeWakeUpMessages] = useState<
    WeaponMessage[]
  >([]);
  const [showLogModal, setShowLogModal] = useState(false);
  const [logModalType, setLogModalType] = useState<
    "abilities" | "yellow" | "orange" | "wakeUp" | "attributeWakeUp" | "upgrade" | null
  >(null);
  const [showWeaponSelectorModal, setShowWeaponSelectorModal] = useState(false);
  const [showPresetModal, setShowPresetModal] = useState(false);
  const [presetModalType, setPresetModalType] = useState<
    "abilities" | "yellow" | "orange" | "wakeUp" | "attributeWakeUp" | null
  >(null);

  // 统计次数
  const [cleanNum, setCleanNum] = useState(0); // 洗基础次数
  const [cleanUNum, setCleanUNum] = useState(0); // 洗黄字次数
  const [cleanOrangeNum, setCleanOrangeNum] = useState(0); // 洗橙字次数
  const [wakeUpNum, setWakeUpNum] = useState(0); // 技能唤醒次数
  const [attributeWakeUpNum, setAttributeWakeUpNum] = useState(0); // 属性唤醒次数
  
  // 强化相关状态
  const [upgradeLevel, setUpgradeLevel] = useState(0); // 当前强化等级
  const [targetUpgradeLevel, setTargetUpgradeLevel] = useState<number | null>(10); // 目标强化等级，默认10
  const [upgradeFailureCount, setUpgradeFailureCount] = useState(0); // 累计失败次数
  const [isAutoUpgrading, setIsAutoUpgrading] = useState(false); // 是否正在自动强化
  const [upgradeMessages, setUpgradeMessages] = useState<WeaponMessage[]>([]); // 强化日志
  const [currentLevelTries, setCurrentLevelTries] = useState(0); // 当前等级尝试次数
  const [levelSuccessTries, setLevelSuccessTries] = useState<Record<number, number>>({}); // 每级成功时的次数 {level: tries}
  const [upgradeStats, setUpgradeStats] = useState({
    totalTries: 0, // 总尝试次数
    totalSuccess: 0, // 总成功次数
    totalPenyaCost: 0, // 总金币消耗
    totalBlueMineral: 0, // 总蓝矿消耗
    totalGreenMineral: 0, // 总绿矿消耗
    totalXP: 0, // 总XP消耗
    totalSunstone: 0, // 总太阳石消耗
  });
  const autoUpgradeTimerRef = useRef<number | null>(null);
  const autoUpgradeStopRef = useRef(false);
  const targetUpgradeLevelRef = useRef<number | null>(null);
  const upgradeLevelRef = useRef(0); // 存储最新的强化等级
  const upgradeFailureCountRef = useRef(0); // 存储最新的失败次数
  const currentLevelTriesRef = useRef(0); // 存储当前等级尝试次数

  // 预设值状态
  const [presetAbilities, setPresetAbilities] = useState<
    Array<{ name: string; value: number | null; tolerance: number }>
  >([]); // 基础词条预设值
  const [presetYellowStats, setPresetYellowStats] = useState<
    Array<{ name: string; value: number | null; tolerance: number }>
  >([]); // 黄字预设值
  const [presetOrangeStats, setPresetOrangeStats] = useState<
    Array<{ name: string; value: number | null; tolerance: number }>
  >([]); // 橙字预设值
  const [presetWakeUp, setPresetWakeUp] = useState<{
    name: string | null;
    percentage: number | null;
  }>({ name: null, percentage: null }); // 技能唤醒预设值
  const [presetAttributeWakeUp, setPresetAttributeWakeUp] = useState<{
    attributeIndex: number | null; // 0:智力 1:体质 2:力量 3:敏捷
    value: string | null; // +1, +2, +3, +4
  }>({ attributeIndex: 0, value: null }); // 属性唤醒预设值，默认选中智力

  // 自动洗练状态 - 每个操作独立的状态
  const [isAutoCleaningAbilities, setIsAutoCleaningAbilities] = useState(false);
  const [isAutoCleaningYellow, setIsAutoCleaningYellow] = useState(false);
  const [isAutoCleaningOrange, setIsAutoCleaningOrange] = useState(false);
  const [isAutoCleaningWakeUp, setIsAutoCleaningWakeUp] = useState(false);
  const [isAutoCleaningAttributeWakeUp, setIsAutoCleaningAttributeWakeUp] =
    useState(false);

  // 每个操作独立的定时器引用
  const autoCleanAbilitiesTimerRef = useRef<number | null>(null);
  const autoCleanYellowTimerRef = useRef<number | null>(null);
  const autoCleanOrangeTimerRef = useRef<number | null>(null);
  const autoCleanWakeUpTimerRef = useRef<number | null>(null);
  const autoCleanAttributeWakeUpTimerRef = useRef<number | null>(null);

  // 每个操作独立的停止标志
  const autoCleanAbilitiesStopRef = useRef(false);
  const autoCleanYellowStopRef = useRef(false);
  const autoCleanOrangeStopRef = useRef(false);
  const autoCleanWakeUpStopRef = useRef(false);
  const autoCleanAttributeWakeUpStopRef = useRef(false);

  const messageIdRef = useRef(0);

  // 添加消息 - 根据类型添加到对应的日志
  const addMessage = useCallback(
    (
      text: string,
      type: "info" | "success" | "warning" = "info",
      logType: "abilities" | "yellow" | "orange" | "wakeUp" | "attributeWakeUp" | "upgrade"
    ) => {
      const message = { id: messageIdRef.current++, text, type };
      switch (logType) {
        case "abilities":
          setAbilitiesMessages((prev) => [message, ...prev]);
          break;
        case "yellow":
          setYellowMessages((prev) => [message, ...prev]);
          break;
        case "orange":
          setOrangeMessages((prev) => [message, ...prev]);
          break;
        case "wakeUp":
          setWakeUpMessages((prev) => [message, ...prev]);
          break;
        case "attributeWakeUp":
          setAttributeWakeUpMessages((prev) => [message, ...prev]);
          break;
        case "upgrade":
          setUpgradeMessages((prev) => [message, ...prev]);
          break;
      }
    },
    []
  );

  // 生成随机属性值
  const generateRandomAbility = useCallback((ability: WeaponAbility) => {
    const maxNum = ability.name === "承受伤害" ? ability.min : ability.max;
    const minNum = ability.name === "承受伤害" ? ability.max : ability.min;
    const randomNum =
      Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

    const displayMax = ability.fixed ? maxNum / ability.fixed : maxNum;
    const displayMin = ability.fixed ? minNum / ability.fixed : minNum;
    const displayValue = ability.fixed ? randomNum / ability.fixed : randomNum;

    const addStr = ability.name === "承受伤害" ? "" : "+";
    const display = `${ability.name}${addStr}${displayValue}${ability.cur}`;
    const range = `(${displayMin}~${displayMax})${ability.cur}`;

    return {
      name: ability.name,
      value: randomNum,
      display,
      range,
    };
  }, []);

  // 初始化武器
  const initializeWeapon = useCallback(
    (weaponId: number) => {
      const weapon = weapons.find((w) => w.id === weaponId);
      if (!weapon) {
        addMessage("选择的武器不存在！", "warning", "abilities");
        return;
      }

      setCurrentWeapon(weapon);

      // 初始化上词条
      const abilities = weapon.abilities.map((ability) =>
        generateRandomAbility(ability)
      );
      
      // 初始化黄字（默认生成2条）
      const arr = [...weapon.possibleRandomStats];
      const value1 = arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
      const value2 = arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
      const yellowStats = [value1, value2].map((ability) =>
        generateRandomAbility(ability)
      );
      
      setCurrentStats({
        abilities,
        yellowStats,
        orangeStats: [],
        attributeWakeUp: [],
      });

      // 重置强化等级
      upgradeLevelRef.current = 0;
      upgradeFailureCountRef.current = 0;
      currentLevelTriesRef.current = 0;
      setUpgradeLevel(0);
      setTargetUpgradeLevel(10); // 默认目标等级为10
      setUpgradeFailureCount(0);
      setCurrentLevelTries(0);
      setLevelSuccessTries({});
      setUpgradeStats({
        totalTries: 0,
        totalSuccess: 0,
        totalPenyaCost: 0,
        totalBlueMineral: 0,
        totalGreenMineral: 0,
        totalXP: 0,
        totalSunstone: 0,
      });

      // 初始化预设值（默认为空）
      setPresetAbilities(
        weapon.abilities.map((ability) => ({
          name: ability.name,
          value: null,
          tolerance: ability.fixed === 10 ? 0.1 : 1, // 默认误差：精度0.1的属性误差0.1，精度1的属性误差1
        }))
      );
      setPresetYellowStats([]);
      setPresetOrangeStats([]);
      setPresetWakeUp({ name: null, percentage: null });
      setPresetAttributeWakeUp({ attributeIndex: 0, value: null }); // 默认选中智力

      // 重置统计
      setCleanNum(0);
      setCleanUNum(0);
      setCleanOrangeNum(0);
      setWakeUpNum(0);
      setAttributeWakeUpNum(0);

      // 重置强化相关
      upgradeLevelRef.current = 0;
      upgradeFailureCountRef.current = 0;
      currentLevelTriesRef.current = 0;
      setUpgradeLevel(0);
      setTargetUpgradeLevel(10); // 默认目标等级为10
      setUpgradeFailureCount(0);
      setUpgradeStats({
        totalTries: 0,
        totalSuccess: 0,
        totalPenyaCost: 0,
        totalBlueMineral: 0,
        totalGreenMineral: 0,
        totalXP: 0,
        totalSunstone: 0,
      });

      // 清空所有日志
      setAbilitiesMessages([]);
      setYellowMessages([]);
      setOrangeMessages([]);
      setWakeUpMessages([]);
      setAttributeWakeUpMessages([]);
      setUpgradeMessages([]);

      // 停止所有自动洗练
      if (autoCleanAbilitiesTimerRef.current) {
        window.clearInterval(autoCleanAbilitiesTimerRef.current);
        autoCleanAbilitiesTimerRef.current = null;
      }
      if (autoCleanYellowTimerRef.current) {
        window.clearInterval(autoCleanYellowTimerRef.current);
        autoCleanYellowTimerRef.current = null;
      }
      if (autoCleanOrangeTimerRef.current) {
        window.clearInterval(autoCleanOrangeTimerRef.current);
        autoCleanOrangeTimerRef.current = null;
      }
      if (autoCleanWakeUpTimerRef.current) {
        window.clearInterval(autoCleanWakeUpTimerRef.current);
        autoCleanWakeUpTimerRef.current = null;
      }
      if (autoCleanAttributeWakeUpTimerRef.current) {
        window.clearInterval(autoCleanAttributeWakeUpTimerRef.current);
        autoCleanAttributeWakeUpTimerRef.current = null;
      }

      setIsAutoCleaningAbilities(false);
      setIsAutoCleaningYellow(false);
      setIsAutoCleaningOrange(false);
      setIsAutoCleaningWakeUp(false);
      setIsAutoCleaningAttributeWakeUp(false);
      
      // 停止自动强化
      if (autoUpgradeTimerRef.current) {
        window.clearInterval(autoUpgradeTimerRef.current);
        autoUpgradeTimerRef.current = null;
      }
      setIsAutoUpgrading(false);
      autoUpgradeStopRef.current = false;

      autoCleanAbilitiesStopRef.current = false;
      autoCleanYellowStopRef.current = false;
      autoCleanOrangeStopRef.current = false;
      autoCleanWakeUpStopRef.current = false;
      autoCleanAttributeWakeUpStopRef.current = false;

      addMessage(`已选择${weapon.name}！`, "success", "abilities");
    },
    [weapons, addMessage, generateRandomAbility]
  );

  // 选择武器时自动初始化
  React.useEffect(() => {
    if (selectedWeaponId) {
      const weapon = weapons.find((w) => w.id === selectedWeaponId);
      if (weapon && (!currentWeapon || currentWeapon.id !== selectedWeaponId)) {
        initializeWeapon(selectedWeaponId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWeaponId]);

  // 检查是否达到预设值（基础词条）
  const checkAbilitiesPreset = useCallback(
    (
      abilities: Array<{
        name: string;
        value: number;
        display: string;
        range: string;
      }>
    ) => {
      if (presetAbilities.length === 0) return true;

      for (let i = 0; i < presetAbilities.length; i++) {
        const preset = presetAbilities[i];
        if (preset.value === null) continue;

        const ability = abilities.find((a) => a.name === preset.name);
        if (!ability) continue;

        const weaponAbility = currentWeapon?.abilities.find(
          (a) => a.name === preset.name
        );
        if (!weaponAbility) continue;

        // 根据精度计算显示值
        const displayValue = weaponAbility.fixed
          ? ability.value / weaponAbility.fixed
          : ability.value;

        // 使用预设的误差范围
        const tolerance =
          preset.tolerance ?? (weaponAbility.fixed === 10 ? 0.1 : 1);
        if (Math.abs(displayValue - preset.value) > tolerance) {
          return false;
        }
      }
      return true;
    },
    [presetAbilities, currentWeapon]
  );

  // 洗固定武器数值（上词条）
  const cleanAbilities = useCallback(() => {
    if (!currentWeapon) {
      addMessage("请先选择武器！", "warning", "abilities");
      return;
    }

    const newAbilities = currentWeapon.abilities.map((ability) =>
      generateRandomAbility(ability)
    );
    setCurrentStats((prev) => ({
      ...prev,
      abilities: newAbilities,
    }));

    setCleanNum((prev) => prev + 1);
    addMessage(`洗基础词条第${cleanNum + 1}次`, "info", "abilities");

    return newAbilities;
  }, [currentWeapon, cleanNum, generateRandomAbility, addMessage]);

  // 停止自动洗练 - 每个操作独立的停止函数
  const stopAutoCleanAbilities = useCallback(() => {
    autoCleanAbilitiesStopRef.current = true;
    setIsAutoCleaningAbilities(false);
    if (autoCleanAbilitiesTimerRef.current) {
      window.clearInterval(autoCleanAbilitiesTimerRef.current);
      autoCleanAbilitiesTimerRef.current = null;
    }
  }, []);

  const stopAutoCleanYellow = useCallback(() => {
    autoCleanYellowStopRef.current = true;
    setIsAutoCleaningYellow(false);
    if (autoCleanYellowTimerRef.current) {
      window.clearInterval(autoCleanYellowTimerRef.current);
      autoCleanYellowTimerRef.current = null;
    }
  }, []);

  const stopAutoCleanOrange = useCallback(() => {
    autoCleanOrangeStopRef.current = true;
    setIsAutoCleaningOrange(false);
    if (autoCleanOrangeTimerRef.current) {
      window.clearInterval(autoCleanOrangeTimerRef.current);
      autoCleanOrangeTimerRef.current = null;
    }
  }, []);

  const stopAutoCleanWakeUp = useCallback(() => {
    autoCleanWakeUpStopRef.current = true;
    setIsAutoCleaningWakeUp(false);
    if (autoCleanWakeUpTimerRef.current) {
      window.clearInterval(autoCleanWakeUpTimerRef.current);
      autoCleanWakeUpTimerRef.current = null;
    }
  }, []);

  const stopAutoCleanAttributeWakeUp = useCallback(() => {
    autoCleanAttributeWakeUpStopRef.current = true;
    setIsAutoCleaningAttributeWakeUp(false);
    if (autoCleanAttributeWakeUpTimerRef.current) {
      window.clearInterval(autoCleanAttributeWakeUpTimerRef.current);
      autoCleanAttributeWakeUpTimerRef.current = null;
    }
  }, []);

  // 自动洗基础词条
  const autoCleanAbilities = useCallback(() => {
    if (!currentWeapon) {
      addMessage("请先选择武器！", "warning", "abilities");
      return;
    }

    // 如果已经在运行，则停止
    if (isAutoCleaningAbilities) {
      stopAutoCleanAbilities();
      return;
    }

    // 检查是否有预设值
    const hasPreset = presetAbilities.some((p) => p.value !== null);
    if (!hasPreset) {
      cleanAbilities();
      return;
    }

    setIsAutoCleaningAbilities(true);
    autoCleanAbilitiesStopRef.current = false;

    const cleanOnce = () => {
      if (autoCleanAbilitiesStopRef.current) {
        setIsAutoCleaningAbilities(false);
        if (autoCleanAbilitiesTimerRef.current) {
          clearInterval(autoCleanAbilitiesTimerRef.current);
          autoCleanAbilitiesTimerRef.current = null;
        }
        return;
      }

      const newAbilities = currentWeapon.abilities.map((ability) =>
        generateRandomAbility(ability)
      );
      setCurrentStats((prev) => ({
        ...prev,
        abilities: newAbilities,
      }));

      setCleanNum((prev) => prev + 1);

      // 检查是否达到预设值
      if (checkAbilitiesPreset(newAbilities)) {
        setIsAutoCleaningAbilities(false);
        if (autoCleanAbilitiesTimerRef.current) {
          clearInterval(autoCleanAbilitiesTimerRef.current);
          autoCleanAbilitiesTimerRef.current = null;
        }
        addMessage(
          `洗基础词条第${cleanNum + 1}次，已达到预设值！`,
          "success",
          "abilities"
        );
      } else {
        addMessage(`洗基础词条第${cleanNum + 1}次`, "info", "abilities");
      }
    };

    // 立即执行一次
    cleanOnce();

    // 设置定时器，每50ms执行一次（模拟快速洗练）
    autoCleanAbilitiesTimerRef.current = window.setInterval(cleanOnce, 50);
  }, [
    currentWeapon,
    cleanNum,
    generateRandomAbility,
    addMessage,
    presetAbilities,
    checkAbilitiesPreset,
    cleanAbilities,
    isAutoCleaningAbilities,
    stopAutoCleanAbilities,
  ]);

  // 生成随机属性值（带上限限制，用于橙字）
  const generateRandomAbilityWithLimit = useCallback(
    (ability: WeaponAbility, maxLimit?: number) => {
      // 对于"承受伤害"，逻辑是反过来的：min 是最大值，max 是最小值
      // 如果有限制，对于"承受伤害"应该限制最小值（即限制最大值）
      let maxNum: number;
      let minNum: number;

      if (ability.name === "承受伤害") {
        if (maxLimit !== undefined) {
          // 对于承受伤害，maxLimit 应该作为最小值（因为承受伤害是反向的）
          // 但我们需要限制最大值，所以应该用 ability.min 的一半作为最小值
          const limitedMin = Math.floor(ability.min / 2);
          maxNum = ability.min; // 最大值不变
          minNum = limitedMin; // 最小值是原来的一半
        } else {
          maxNum = ability.min;
          minNum = ability.max;
        }
      } else {
        maxNum = maxLimit !== undefined ? maxLimit : ability.max;
        minNum = ability.min;
      }

      const randomNum =
        Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

      const displayMax = ability.fixed ? maxNum / ability.fixed : maxNum;
      const displayMin = ability.fixed ? minNum / ability.fixed : minNum;
      const displayValue = ability.fixed
        ? randomNum / ability.fixed
        : randomNum;

      const addStr = ability.name === "承受伤害" ? "" : "+";
      const display = `${ability.name}${addStr}${displayValue}${ability.cur}`;
      const range = `(${displayMin}~${displayMax})${ability.cur}`;

      return {
        name: ability.name,
        value: randomNum,
        display,
        range,
      };
    },
    []
  );

  // 检查是否达到预设值（黄字）
  const checkYellowStatsPreset = useCallback(
    (
      yellowStats: Array<{
        name: string;
        value: number;
        display: string;
        range: string;
      }>
    ) => {
      if (presetYellowStats.length === 0) return true;

      // 检查所有预设的属性是否都存在且匹配
      for (const preset of presetYellowStats) {
        if (!preset.name || preset.value === null) continue;

        // 检查洗出来的属性中是否有这个预设的属性
        const stat = yellowStats.find((s) => s.name === preset.name);
        if (!stat) {
          // 如果预设了属性但洗出来的属性中没有，返回false
          return false;
        }

        const weaponAbility = currentWeapon?.possibleRandomStats.find(
          (a) => a.name === preset.name
        );
        if (!weaponAbility) continue;

        const displayValue = weaponAbility.fixed
          ? stat.value / weaponAbility.fixed
          : stat.value;

        // 使用预设的误差范围
        const tolerance =
          preset.tolerance ?? (weaponAbility.fixed === 10 ? 0.1 : 1);
        if (Math.abs(displayValue - preset.value) > tolerance) {
          return false;
        }
      }
      return true;
    },
    [presetYellowStats, currentWeapon]
  );

  // 洗黄字
  const cleanYellowStats = useCallback(() => {
    if (!currentWeapon) {
      addMessage("请先选择武器！", "warning", "yellow");
      return;
    }

    const arr = [...currentWeapon.possibleRandomStats];
    const value1 = arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
    const value2 = arr.splice(Math.floor(Math.random() * arr.length), 1)[0];

    const yellowStats = [value1, value2].map((ability) =>
      generateRandomAbility(ability)
    );

    setCurrentStats((prev) => ({
      ...prev,
      yellowStats,
    }));

    setCleanUNum((prev) => prev + 1);
    addMessage(`洗黄字第${cleanUNum + 1}次`, "info", "yellow");

    return yellowStats;
  }, [currentWeapon, cleanUNum, generateRandomAbility, addMessage]);

  // 自动洗黄字
  const autoCleanYellowStats = useCallback(() => {
    if (!currentWeapon) {
      addMessage("请先选择武器！", "warning", "yellow");
      return;
    }

    // 如果已经在运行，则停止
    if (isAutoCleaningYellow) {
      stopAutoCleanYellow();
      return;
    }

    const hasPreset = presetYellowStats.some((p) => p.value !== null);
    if (!hasPreset) {
      cleanYellowStats();
      return;
    }

    setIsAutoCleaningYellow(true);
    autoCleanYellowStopRef.current = false;

    const cleanOnce = () => {
      if (autoCleanYellowStopRef.current) {
        setIsAutoCleaningYellow(false);
        if (autoCleanYellowTimerRef.current) {
          clearInterval(autoCleanYellowTimerRef.current);
          autoCleanYellowTimerRef.current = null;
        }
        return;
      }

      const arr = [...currentWeapon.possibleRandomStats];
      const value1 = arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
      const value2 = arr.splice(Math.floor(Math.random() * arr.length), 1)[0];

      const yellowStats = [value1, value2].map((ability) =>
        generateRandomAbility(ability)
      );

      setCurrentStats((prev) => ({
        ...prev,
        yellowStats,
      }));

      setCleanUNum((prev) => prev + 1);

      if (checkYellowStatsPreset(yellowStats)) {
        setIsAutoCleaningYellow(false);
        if (autoCleanYellowTimerRef.current) {
          clearInterval(autoCleanYellowTimerRef.current);
          autoCleanYellowTimerRef.current = null;
        }
        addMessage(
          `洗黄字第${cleanUNum + 1}次，已达到预设值！`,
          "success",
          "yellow"
        );
      } else {
        addMessage(`洗黄字第${cleanUNum + 1}次`, "info", "yellow");
      }
    };

    cleanOnce();
    autoCleanYellowTimerRef.current = window.setInterval(cleanOnce, 50);
  }, [
    currentWeapon,
    cleanUNum,
    generateRandomAbility,
    addMessage,
    presetYellowStats,
    checkYellowStatsPreset,
    cleanYellowStats,
    isAutoCleaningYellow,
    stopAutoCleanYellow,
  ]);

  // 检查是否达到预设值（橙字）
  const checkOrangeStatsPreset = useCallback(
    (
      orangeStats: Array<{
        name: string;
        value: number;
        display: string;
        range: string;
      }>
    ) => {
      if (presetOrangeStats.length === 0) return true;

      // 检查所有预设的属性是否都存在且匹配
      for (const preset of presetOrangeStats) {
        if (!preset.name || preset.value === null) continue;

        // 检查洗出来的属性中是否有这个预设的属性
        const stat = orangeStats.find((s) => s.name === preset.name);
        if (!stat) {
          // 如果预设了属性但洗出来的属性中没有，返回false
          return false;
        }

        const weaponAbility = currentWeapon?.possibleRandomStats.find(
          (a) => a.name === preset.name
        );
        if (!weaponAbility) continue;

        const displayValue = weaponAbility.fixed
          ? stat.value / weaponAbility.fixed
          : stat.value;

        // 使用预设的误差范围
        const tolerance =
          preset.tolerance ?? (weaponAbility.fixed === 10 ? 0.1 : 1);
        if (Math.abs(displayValue - preset.value) > tolerance) {
          return false;
        }
      }
      return true;
    },
    [presetOrangeStats, currentWeapon]
  );

  // 洗橙字（逻辑和洗黄字一样，但数值上限是黄字的一半）
  // 强化等级6时只有一条属性，10时有两条属性
  const cleanOrangeStats = useCallback(() => {
    if (!currentWeapon) {
      addMessage("请先选择武器！", "warning", "orange");
      return;
    }

    // 检查强化等级
    if (upgradeLevelRef.current < 6) {
      addMessage("需要强化到+6才能洗橙字！", "warning", "orange");
      return;
    }

    // 过滤掉"生命偷取"属性，橙字不包含此属性
    const arr = [...currentWeapon.possibleRandomStats].filter(
      (ability) => ability.name !== "生命偷取"
    );
    
    if (arr.length === 0) {
      addMessage("没有可用的橙字属性！", "warning", "orange");
      return;
    }
    
    // 根据强化等级决定洗几条属性：6-9级洗1条，10级洗2条
    const count = upgradeLevelRef.current >= 10 ? 2 : 1;
    
    const orangeStats: Array<{
      name: string;
      value: number;
      display: string;
      range: string;
    }> = [];
    for (let i = 0; i < count; i++) {
      const ability = arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
      // 数值上限是黄字的一半
      const maxLimit = Math.floor(ability.max / 2);
      orangeStats.push(generateRandomAbilityWithLimit(ability, maxLimit));
    }

    setCurrentStats((prev) => ({
      ...prev,
      orangeStats,
    }));

    setCleanOrangeNum((prev) => prev + 1);
    addMessage(`洗橙字第${cleanOrangeNum + 1}次`, "info", "orange");

    return orangeStats;
  }, [
    currentWeapon,
    cleanOrangeNum,
    generateRandomAbilityWithLimit,
    addMessage,
  ]);

  // 自动洗橙字
  const autoCleanOrangeStats = useCallback(() => {
    if (!currentWeapon) {
      addMessage("请先选择武器！", "warning", "orange");
      return;
    }

    // 检查强化等级
    if (upgradeLevelRef.current < 6) {
      addMessage("需要强化到+6才能洗橙字！", "warning", "orange");
      return;
    }

    // 如果已经在运行，则停止
    if (isAutoCleaningOrange) {
      stopAutoCleanOrange();
      return;
    }

    const hasPreset = presetOrangeStats.some((p) => p.value !== null);
    if (!hasPreset) {
      cleanOrangeStats();
      return;
    }

    setIsAutoCleaningOrange(true);
    autoCleanOrangeStopRef.current = false;

    const cleanOnce = () => {
      if (autoCleanOrangeStopRef.current) {
        setIsAutoCleaningOrange(false);
        if (autoCleanOrangeTimerRef.current) {
          clearInterval(autoCleanOrangeTimerRef.current);
          autoCleanOrangeTimerRef.current = null;
        }
        return;
      }

      // 检查强化等级
      if (upgradeLevelRef.current < 6) {
        setIsAutoCleaningOrange(false);
        if (autoCleanOrangeTimerRef.current) {
          clearInterval(autoCleanOrangeTimerRef.current);
          autoCleanOrangeTimerRef.current = null;
        }
        return;
      }

      // 过滤掉"生命偷取"属性，橙字不包含此属性
      const arr = [...currentWeapon.possibleRandomStats].filter(
        (ability) => ability.name !== "生命偷取"
      );
      
      if (arr.length === 0) {
        setIsAutoCleaningOrange(false);
        if (autoCleanOrangeTimerRef.current) {
          clearInterval(autoCleanOrangeTimerRef.current);
          autoCleanOrangeTimerRef.current = null;
        }
        addMessage("没有可用的橙字属性！", "warning", "orange");
        return;
      }
      
      // 根据强化等级决定洗几条属性：6-9级洗1条，10级洗2条
      const count = upgradeLevelRef.current >= 10 ? 2 : 1;
      
      const orangeStats: Array<{
        name: string;
        value: number;
        display: string;
        range: string;
      }> = [];
      for (let i = 0; i < count; i++) {
        const ability = arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
        const maxLimit = Math.floor(ability.max / 2);
        orangeStats.push(generateRandomAbilityWithLimit(ability, maxLimit));
      }

      setCurrentStats((prev) => ({
        ...prev,
        orangeStats,
      }));

      setCleanOrangeNum((prev) => prev + 1);

      if (checkOrangeStatsPreset(orangeStats)) {
        setIsAutoCleaningOrange(false);
        if (autoCleanOrangeTimerRef.current) {
          clearInterval(autoCleanOrangeTimerRef.current);
          autoCleanOrangeTimerRef.current = null;
        }
        addMessage(
          `洗橙字第${cleanOrangeNum + 1}次，已达到预设值！`,
          "success",
          "orange"
        );
      } else {
        addMessage(`洗橙字第${cleanOrangeNum + 1}次`, "info", "orange");
      }
    };

    cleanOnce();
    autoCleanOrangeTimerRef.current = window.setInterval(cleanOnce, 50);
  }, [
    currentWeapon,
    cleanOrangeNum,
    generateRandomAbilityWithLimit,
    addMessage,
    presetOrangeStats,
    checkOrangeStatsPreset,
    cleanOrangeStats,
    isAutoCleaningOrange,
    stopAutoCleanOrange,
  ]);

  // 洗唤醒
  const wakeUp = useCallback(() => {
    if (
      !currentWeapon ||
      !currentWeapon.wakeUpList ||
      currentWeapon.wakeUpList.length === 0
    ) {
      addMessage("该武器没有唤醒列表！", "warning", "wakeUp");
      return;
    }

    const wakeUp =
      currentWeapon.wakeUpList[
        Math.floor(Math.random() * currentWeapon.wakeUpList.length)
      ];
    const percentage =
      wakeUp.item[Math.floor(Math.random() * wakeUp.item.length)];

    setCurrentStats((prev) => ({
      ...prev,
      wakeUp: {
        name: wakeUp.name,
        percentage,
      },
    }));

    setWakeUpNum((prev) => prev + 1);
    const isMax = percentage === wakeUp.item[wakeUp.item.length - 1];
    if (isMax) {
      addMessage(
        `技能唤醒第${wakeUpNum + 1}次：${wakeUp.name}${
          wakeUp.name === "治疗" ? "+" : "造成伤害+"
        }${percentage}%（最大值！）`,
        "success",
        "wakeUp"
      );
    } else {
      addMessage(
        `技能唤醒第${wakeUpNum + 1}次：${wakeUp.name}${
          wakeUp.name === "治疗" ? "+" : "造成伤害+"
        }${percentage}%`,
        "info",
        "wakeUp"
      );
    }

    return { name: wakeUp.name, percentage };
  }, [currentWeapon, wakeUpNum, addMessage]);

  // 自动洗唤醒
  const autoWakeUp = useCallback(() => {
    if (
      !currentWeapon ||
      !currentWeapon.wakeUpList ||
      currentWeapon.wakeUpList.length === 0
    ) {
      addMessage("该武器没有唤醒列表！", "warning", "wakeUp");
      return;
    }

    // 如果已经在运行，则停止
    if (isAutoCleaningWakeUp) {
      stopAutoCleanWakeUp();
      return;
    }

    const hasPreset =
      presetWakeUp.name !== null && presetWakeUp.percentage !== null;
    if (!hasPreset) {
      wakeUp();
      return;
    }

    setIsAutoCleaningWakeUp(true);
    autoCleanWakeUpStopRef.current = false;

    const cleanOnce = () => {
      if (autoCleanWakeUpStopRef.current) {
        setIsAutoCleaningWakeUp(false);
        if (autoCleanWakeUpTimerRef.current) {
          clearInterval(autoCleanWakeUpTimerRef.current);
          autoCleanWakeUpTimerRef.current = null;
        }
        return;
      }

      if (!currentWeapon.wakeUpList) return;
      const wakeUp =
        currentWeapon.wakeUpList[
          Math.floor(Math.random() * currentWeapon.wakeUpList.length)
        ];
      const percentage =
        wakeUp.item[Math.floor(Math.random() * wakeUp.item.length)];

      setCurrentStats((prev) => ({
        ...prev,
        wakeUp: {
          name: wakeUp.name,
          percentage,
        },
      }));

      setWakeUpNum((prev) => prev + 1);

      // 检查是否达到预设值
      if (
        wakeUp.name === presetWakeUp.name &&
        percentage === presetWakeUp.percentage
      ) {
        setIsAutoCleaningWakeUp(false);
        if (autoCleanWakeUpTimerRef.current) {
          clearInterval(autoCleanWakeUpTimerRef.current);
          autoCleanWakeUpTimerRef.current = null;
        }
        addMessage(
          `技能唤醒第${wakeUpNum + 1}次：${wakeUp.name}${
            wakeUp.name === "治疗" ? "+" : "造成伤害+"
          }${percentage}%（已达到预设值！）`,
          "success",
          "wakeUp"
        );
      } else {
        addMessage(
          `技能唤醒第${wakeUpNum + 1}次：${wakeUp.name}${
            wakeUp.name === "治疗" ? "+" : "造成伤害+"
          }${percentage}%`,
          "info",
          "wakeUp"
        );
      }
    };

    cleanOnce();
    autoCleanWakeUpTimerRef.current = window.setInterval(cleanOnce, 50);
  }, [
    currentWeapon,
    wakeUpNum,
    addMessage,
    presetWakeUp,
    wakeUp,
    isAutoCleaningWakeUp,
    stopAutoCleanWakeUp,
  ]);

  // 获取随机属性数组
  const getRandomValues = useCallback((array: number[], numValues: number) => {
    const values: number[] = [];
    for (let i = 0; i < numValues; i++) {
      values.push(array[Math.floor(Math.random() * array.length)]);
    }
    return [...new Set(values)];
  }, []);

  // 洗属性唤醒（单属性）
  const attributeWakeUpSingle = useCallback(
    (attributeIndex: number) => {
      if (!currentWeapon) {
        addMessage("请先选择武器！", "warning", "attributeWakeUp");
        return;
      }

      const attribute = attributeData[attributeIndex];
      const randomNum = Math.random();
      let cumulativeProb = 0;
      let selectedValue = "+1";

      for (let i = 0; i < attribute.list.length; i++) {
        const data = attribute.list[i];
        cumulativeProb += data.probability;
        if (randomNum < cumulativeProb) {
          selectedValue = data.name;
          break;
        }
      }

      const newAttribute = {
        name: attribute.name,
        value: selectedValue,
      };

      setCurrentStats((prev) => ({
        ...prev,
        attributeWakeUp: [newAttribute],
      }));

      setAttributeWakeUpNum((prev) => prev + 1);
      const isMax = selectedValue === "+4";
      if (isMax) {
        addMessage(
          `属性唤醒第${attributeWakeUpNum + 1}次：${
            attribute.name
          }${selectedValue}（最大值！）`,
          "success",
          "attributeWakeUp"
        );
      } else {
        addMessage(
          `属性唤醒第${attributeWakeUpNum + 1}次：${
            attribute.name
          }${selectedValue}`,
          "info",
          "attributeWakeUp"
        );
      }
    },
    [currentWeapon, attributeWakeUpNum, addMessage]
  );

  // 洗属性唤醒（多属性）
  const attributeWakeUpMultiple = useCallback(
    (attributeIndices: number[]) => {
      if (!currentWeapon) {
        addMessage("请先选择武器！", "warning", "attributeWakeUp");
        return;
      }

      const attributes: Array<{ name: string; value: string }> = [];
      let valNum = "";
      // 使用第一个属性的概率列表（根据 a.js 的逻辑）
      const firstAttributeList = attributeData[attributeIndices[0]].list;

      for (let j = 0; j < attributeIndices.length; j++) {
        const attribute = attributeData[attributeIndices[j]];
        const randomNum = parseFloat(Math.random().toFixed(2));
        let cumulativeProb = 0;

        // 使用第一个属性的概率列表
        for (let i = 0; i < firstAttributeList.length; i++) {
          const data = firstAttributeList[i];
          if (i > 0) {
            cumulativeProb = parseFloat(
              (
                parseFloat(data.probability.toString()) + cumulativeProb
              ).toFixed(2)
            );
          } else {
            cumulativeProb = parseFloat(data.probability.toString());
          }

          // 数字是否匹配
          if (randomNum < cumulativeProb) {
            // 第一次是+3的话,则返回+2
            if (valNum === "+3") {
              valNum =
                data.name === "+4" || data.name === "+3" ? "+2" : data.name;
            } else {
              valNum = data.name === "+4" ? "+3" : data.name;
            }

            attributes.push({
              name: attribute.name,
              value: valNum,
            });
            break;
          }
        }
      }

      setCurrentStats((prev) => ({
        ...prev,
        attributeWakeUp: attributes,
      }));

      setAttributeWakeUpNum((prev) => prev + 1);
      const attributeNames = attributes
        .map((a) => `${a.name}${a.value}`)
        .join("、");
      addMessage(
        `属性唤醒第${attributeWakeUpNum + 1}次：${attributeNames}`,
        "info",
        "attributeWakeUp"
      );
    },
    [currentWeapon, attributeWakeUpNum, addMessage]
  );

  // 洗属性唤醒（随机）
  const attributeWakeUp = useCallback(() => {
    // 如果有预设值，使用预设的属性
    if (presetAttributeWakeUp.attributeIndex !== null) {
      attributeWakeUpSingle(presetAttributeWakeUp.attributeIndex);
      return;
    }

    const myArray = [0, 1, 2, 3]; // 0:智力 1:体质 2:力量 3:敏捷
    const numList = getRandomValues(myArray, 2);
    if (numList.length === 2) {
      attributeWakeUpMultiple(numList);
    } else {
      attributeWakeUpSingle(numList[0]);
    }
  }, [
    getRandomValues,
    attributeWakeUpSingle,
    attributeWakeUpMultiple,
    presetAttributeWakeUp,
  ]);

  // 自动洗属性唤醒
  const autoAttributeWakeUp = useCallback(() => {
    if (!currentWeapon) {
      addMessage("请先选择武器！", "warning", "attributeWakeUp");
      return;
    }

    // 如果已经在运行，则停止
    if (isAutoCleaningAttributeWakeUp) {
      stopAutoCleanAttributeWakeUp();
      return;
    }

    if (
      presetAttributeWakeUp.attributeIndex === null ||
      presetAttributeWakeUp.value === null
    ) {
      attributeWakeUp();
      return;
    }

    setIsAutoCleaningAttributeWakeUp(true);
    autoCleanAttributeWakeUpStopRef.current = false;

    const cleanOnce = () => {
      if (autoCleanAttributeWakeUpStopRef.current) {
        setIsAutoCleaningAttributeWakeUp(false);
      
      // 停止自动强化
      if (autoUpgradeTimerRef.current) {
        window.clearInterval(autoUpgradeTimerRef.current);
        autoUpgradeTimerRef.current = null;
      }
      setIsAutoUpgrading(false);
      autoUpgradeStopRef.current = false;
        if (autoCleanAttributeWakeUpTimerRef.current) {
          clearInterval(autoCleanAttributeWakeUpTimerRef.current);
          autoCleanAttributeWakeUpTimerRef.current = null;
        }
        return;
      }

      const attribute = attributeData[presetAttributeWakeUp.attributeIndex!];
      const randomNum = Math.random();
      let cumulativeProb = 0;
      let selectedValue = "+1";

      for (let i = 0; i < attribute.list.length; i++) {
        const data = attribute.list[i];
        cumulativeProb += data.probability;
        if (randomNum < cumulativeProb) {
          selectedValue = data.name;
          break;
        }
      }

      const newAttribute = {
        name: attribute.name,
        value: selectedValue,
      };

      setCurrentStats((prev) => ({
        ...prev,
        attributeWakeUp: [newAttribute],
      }));

      setAttributeWakeUpNum((prev) => prev + 1);

      // 检查是否达到预设值（必须同时匹配属性名称和数值）
      if (
        attribute.name ===
          attributeData[presetAttributeWakeUp.attributeIndex!].name &&
        selectedValue === presetAttributeWakeUp.value
      ) {
        setIsAutoCleaningAttributeWakeUp(false);
      
      // 停止自动强化
      if (autoUpgradeTimerRef.current) {
        window.clearInterval(autoUpgradeTimerRef.current);
        autoUpgradeTimerRef.current = null;
      }
      setIsAutoUpgrading(false);
      autoUpgradeStopRef.current = false;
        if (autoCleanAttributeWakeUpTimerRef.current) {
          clearInterval(autoCleanAttributeWakeUpTimerRef.current);
          autoCleanAttributeWakeUpTimerRef.current = null;
        }
        addMessage(
          `属性唤醒第${attributeWakeUpNum + 1}次：${
            attribute.name
          }${selectedValue}（已达到预设值！）`,
          "success",
          "attributeWakeUp"
        );
      } else {
        addMessage(
          `属性唤醒第${attributeWakeUpNum + 1}次：${
            attribute.name
          }${selectedValue}`,
          "info",
          "attributeWakeUp"
        );
      }
    };

    cleanOnce();
    autoCleanAttributeWakeUpTimerRef.current = window.setInterval(
      cleanOnce,
      50
    );
  }, [
    currentWeapon,
    attributeWakeUpNum,
    addMessage,
    presetAttributeWakeUp,
    attributeWakeUp,
    isAutoCleaningAttributeWakeUp,
    stopAutoCleanAttributeWakeUp,
  ]);

  // 强化功能
  const upgradeWeapon = useCallback(() => {
    if (!currentWeapon) {
      addMessage("请先选择武器！", "warning", "upgrade");
      return;
    }

    // 使用 ref 获取最新值，确保在快速连续调用时也能获取到最新状态
    const currentLevel = upgradeLevelRef.current;
    const currentFailureCount = upgradeFailureCountRef.current;
    const currentTries = currentLevelTriesRef.current;

    if (currentLevel >= 10) {
      addMessage("武器已达到最高强化等级！", "warning", "upgrade");
      return;
    }

    const nextLevel = currentLevel + 1;
    const upgradeData = ultimate190Data.upgrade_data.find(d => d.level === nextLevel);
    
    if (!upgradeData || !upgradeData.upgrade_info.initial_chance_percent) {
      addMessage("无法获取强化数据！", "warning", "upgrade");
      return;
    }

    const initialChance = upgradeData.upgrade_info.initial_chance_percent / 100; // 转换为小数
    // 计算当前成功率：(累计失败次数 + 1) × 初始成功率
    const currentChance = (currentFailureCount + 1) * initialChance;
    const success = Math.random() < currentChance || currentChance >= 1;

    // 消耗统计
    const penyaCost = upgradeData.upgrade_info.penya_cost;
    const mineralCost = upgradeData.upgrade_info.mineral_cost;

    // 更新当前等级尝试次数
    const newCurrentLevelTries = currentTries + 1;
    currentLevelTriesRef.current = newCurrentLevelTries;
    setCurrentLevelTries(newCurrentLevelTries);

    setUpgradeStats(prev => ({
      totalTries: prev.totalTries + 1,
      totalSuccess: prev.totalSuccess + (success ? 1 : 0),
      totalPenyaCost: prev.totalPenyaCost + penyaCost,
      totalBlueMineral: prev.totalBlueMineral + mineralCost,
      totalGreenMineral: prev.totalGreenMineral + mineralCost,
      totalXP: prev.totalXP + 1,
      totalSunstone: prev.totalSunstone + 1,
    }));

    if (success) {
      // 强化成功 - 记录该级成功时的次数
      setLevelSuccessTries(prev => ({
        ...prev,
        [nextLevel]: newCurrentLevelTries,
      }));
      upgradeLevelRef.current = nextLevel;
      upgradeFailureCountRef.current = 0;
      currentLevelTriesRef.current = 0;
      setUpgradeLevel(nextLevel);
      setUpgradeFailureCount(0);
      setCurrentLevelTries(0); // 重置当前等级尝试次数
      
      // 升级到+6时，自动生成一条橙字属性
      if (nextLevel === 6 && currentWeapon) {
        // 过滤掉"生命偷取"属性，橙字不包含此属性
        const arr = [...currentWeapon.possibleRandomStats].filter(
          (ability) => ability.name !== "生命偷取"
        );
        
        if (arr.length > 0) {
          const ability = arr[Math.floor(Math.random() * arr.length)];
          const maxLimit = Math.floor(ability.max / 2);
          const orangeStat = generateRandomAbilityWithLimit(ability, maxLimit);
          
          setCurrentStats((prev) => ({
            ...prev,
            orangeStats: [orangeStat],
          }));
          
          addMessage(`强化到+6，自动生成橙字属性：${orangeStat.display}`, "success", "orange");
        }
      }
      
      // 升级到+10时，如果只有一条橙字属性，自动生成第二条
      if (nextLevel === 10 && currentWeapon) {
        setCurrentStats((prev) => {
          if (prev.orangeStats.length === 1) {
            // 过滤掉"生命偷取"属性，橙字不包含此属性
            const arr = [...currentWeapon.possibleRandomStats].filter(
              (ability) => ability.name !== "生命偷取"
            );
            // 排除已存在的属性
            const existingStat = prev.orangeStats[0];
            const availableAbilities = arr.filter(
              (a) => a.name !== existingStat.name
            );
            
            if (availableAbilities.length > 0) {
              const ability = availableAbilities[Math.floor(Math.random() * availableAbilities.length)];
              const maxLimit = Math.floor(ability.max / 2);
              const secondOrangeStat = generateRandomAbilityWithLimit(ability, maxLimit);
              
              addMessage(`强化到+10，自动生成第二条橙字属性：${secondOrangeStat.display}`, "success", "orange");
              
              return {
                ...prev,
                orangeStats: [...prev.orangeStats, secondOrangeStat],
              };
            }
          }
          return prev;
        });
      }
    } else {
      // 强化失败
      const newFailureCount = currentFailureCount + 1;
      upgradeFailureCountRef.current = newFailureCount;
      setUpgradeFailureCount(newFailureCount);
    }
  }, [currentWeapon, addMessage, generateRandomAbilityWithLimit]);

  const stopAutoUpgrade = useCallback(() => {
    autoUpgradeStopRef.current = true;
    setIsAutoUpgrading(false);
    if (autoUpgradeTimerRef.current) {
      window.clearInterval(autoUpgradeTimerRef.current);
      autoUpgradeTimerRef.current = null;
    }
  }, []);

  const autoUpgrade = useCallback(() => {
    if (!currentWeapon) {
      addMessage("请先选择武器！", "warning", "upgrade");
      return;
    }

    if (isAutoUpgrading) {
      stopAutoUpgrade();
      return;
    }

    if (targetUpgradeLevel === null || targetUpgradeLevel <= upgradeLevel) {
      addMessage("请先选择目标强化等级！", "warning", "upgrade");
      return;
    }

    setIsAutoUpgrading(true);
    autoUpgradeStopRef.current = false;
    targetUpgradeLevelRef.current = targetUpgradeLevel;

    const upgradeOnce = () => {
      if (autoUpgradeStopRef.current) {
        setIsAutoUpgrading(false);
        if (autoUpgradeTimerRef.current) {
          clearInterval(autoUpgradeTimerRef.current);
          autoUpgradeTimerRef.current = null;
        }
        return;
      }

      // 使用 ref 检查是否达到目标等级（确保获取最新值）
      if (upgradeLevelRef.current >= targetUpgradeLevelRef.current!) {
        setIsAutoUpgrading(false);
        if (autoUpgradeTimerRef.current) {
          clearInterval(autoUpgradeTimerRef.current);
          autoUpgradeTimerRef.current = null;
        }
        return;
      }
      
      // 执行强化
      upgradeWeapon();
    };

    upgradeOnce();
    autoUpgradeTimerRef.current = window.setInterval(upgradeOnce, 50);
  }, [currentWeapon, isAutoUpgrading, targetUpgradeLevel, upgradeLevel, upgradeWeapon, addMessage, stopAutoUpgrade]);

  return (
    <div className="weapon-tool">
      <div className="weapon-tool-container">
        {/* 顶部标题栏 */}
        <div className="weapon-header-bar">
          <h2 className="weapon-page-title">武器洗练工具</h2>
          <div className="weapon-log-buttons">
            <button
              className="weapon-log-btn"
              onClick={() => {
                setLogModalType("abilities");
                setShowLogModal(true);
              }}
              disabled={abilitiesMessages.length === 0}
              title="基础词条日志"
            >
              基础词条{" "}
              {abilitiesMessages.length > 0 && `(${abilitiesMessages.length})`}
            </button>
            <button
              className="weapon-log-btn"
              onClick={() => {
                setLogModalType("yellow");
                setShowLogModal(true);
              }}
              disabled={yellowMessages.length === 0}
              title="黄字日志"
            >
              黄字 {yellowMessages.length > 0 && `(${yellowMessages.length})`}
            </button>
            <button
              className="weapon-log-btn"
              onClick={() => {
                setLogModalType("orange");
                setShowLogModal(true);
              }}
              disabled={orangeMessages.length === 0}
              title="橙字日志"
            >
              橙字 {orangeMessages.length > 0 && `(${orangeMessages.length})`}
            </button>
            <button
              className="weapon-log-btn"
              onClick={() => {
                setLogModalType("wakeUp");
                setShowLogModal(true);
              }}
              disabled={wakeUpMessages.length === 0}
              title="技能唤醒日志"
            >
              技能唤醒{" "}
              {wakeUpMessages.length > 0 && `(${wakeUpMessages.length})`}
            </button>
            <button
              className="weapon-log-btn"
              onClick={() => {
                setLogModalType("attributeWakeUp");
                setShowLogModal(true);
              }}
              disabled={attributeWakeUpMessages.length === 0}
              title="属性唤醒日志"
            >
              属性唤醒{" "}
              {attributeWakeUpMessages.length > 0 &&
                `(${attributeWakeUpMessages.length})`}
            </button>
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="weapon-main-content">
          {/* 左侧：武器预览 */}
          <div className="weapon-preview-panel">
            <div className="weapon-preview-header">
              <h3 className="weapon-panel-title">武器预览</h3>
              {/* 武器选择框 */}
              <div className="weapon-select-item">
                <div
                  className={`weapon-select-slot ${
                    currentWeapon ? "has-weapon" : ""
                  }`}
                  title={currentWeapon ? "点击更换武器" : "点击选择武器"}
                  onClick={() => setShowWeaponSelectorModal(true)}
                  style={{ cursor: "pointer" }}
                >
                  {currentWeapon ? (
                    <img
                      src={currentWeapon.imgUrl}
                      alt={currentWeapon.name}
                      className="weapon-select-icon"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/img/items/default.png";
                      }}
                    />
                  ) : (
                    <div className="weapon-select-placeholder">选择武器</div>
                  )}
                </div>
              </div>
            </div>
            <div className="weapon-result">
              {currentWeapon ? (
                <div className="weapon-tooltip-container">
                  {/* 仿游戏Tooltip */}
                  <div className="weapon-tooltip">
                    <div className="weapon-tooltip-border-container">
                      {/* 头部：名称、强化、孔位 */}
                      <div className="weapon-header">
                        <div className="weapon-name">
                          <span className="name-text">
                            <span className="ultimate-badge">Ultimate</span>
                            {currentWeapon.name}{" "}
                            {currentStats.attributeWakeUp &&
                            currentStats.attributeWakeUp.length > 0
                              ? `${currentStats.attributeWakeUp[0].name}的 `
                              : ""}
                            {upgradeLevel > 0 ? `+${upgradeLevel} ` : ""}(10/10)
                          </span>
                        </div>
                        <div className="weapon-type">{currentWeapon.type}</div>
                      </div>

                      {/* 基础属性 (青色/白色) */}
                      <div className="weapon-stats-block">
                        <div className="stat-row cyan">
                          <span className="stat-row-label">攻击力:</span>{" "}
                          {(() => {
                            const upgradeData = ultimate190Data.upgrade_data.find(d => d.level === upgradeLevel);
                            const attackBonus = upgradeData ? parseFloat(upgradeData.weapon_attack.replace('%', '')) : 0;
                            const baseMin = currentWeapon.minAttack;
                            const baseMax = currentWeapon.maxAttack;
                            const bonusMin = Math.floor(baseMin * attackBonus / 100);
                            const bonusMax = Math.floor(baseMax * attackBonus / 100);
                            return `${baseMin + bonusMin} ~ ${baseMax + bonusMax}`;
                          })()}
                        </div>
                        <div className="stat-row white">
                          基础攻击力:{" "}
                          {Math.floor(currentWeapon.minAttack * 0.6)} ~{" "}
                          {Math.floor(currentWeapon.maxAttack * 0.6)}
                        </div>
                        <div className="stat-row white">
                          攻击速度: {currentWeapon.attackSpeed}
                        </div>
                        <div className="stat-row white">土+10</div>
                      </div>

                      {/* 固定属性 (浅黄字) - abilities */}
                      {currentStats.abilities.length > 0 && (
                        <div className="weapon-stats-block">
                          {currentStats.abilities.map((stat, idx) => (
                            <div
                              key={`fixed-${idx}`}
                              className="stat-row light-yellow"
                            >
                              {stat.display} {stat.range}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 随机属性 (深黄字) - yellowStats */}
                      {currentStats.yellowStats.length > 0 && (
                        <div className="weapon-stats-block">
                          {currentStats.yellowStats.map((stat, idx) => (
                            <div
                              key={`yellow-${idx}`}
                              className="stat-row deep-yellow"
                            >
                              {stat.display} {stat.range}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 橙字 (橙色) - orangeStats */}
                      {currentStats.orangeStats.length > 0 && (
                        <div className="weapon-stats-block">
                          {currentStats.orangeStats.map((stat, idx) => (
                            <div
                              key={`orange-${idx}`}
                              className="stat-row orange"
                            >
                              {stat.display} {stat.range}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 属性唤醒 (白色) - attributeWakeUp */}
                      {currentStats.attributeWakeUp &&
                        currentStats.attributeWakeUp.length > 0 && (
                          <div className="weapon-stats-block">
                            {currentStats.attributeWakeUp.map((stat, idx) => (
                              <div
                                key={`attr-${idx}`}
                                className="stat-row white"
                              >
                                {stat.name}
                                {stat.value}
                              </div>
                            ))}
                          </div>
                        )}

                      {/* 需求与品质 (白色/紫色) */}
                      <div className="weapon-stats-block">
                        <div className="stat-row white">
                          职业要求: {currentWeapon.job}
                        </div>
                        <div className="stat-row white">等级要求: 150</div>
                        <div className="stat-row purple">品质: Ultimate</div>
                      </div>

                      {/* 描述 (白色) */}
                      <div className="weapon-description-block">
                        {currentWeapon.description}
                      </div>

                      {/* 底部信息与技能唤醒 */}
                      <div className="weapon-footer-block">
                        <div className="stat-row red">无法出售给NPC。</div>

                        {/* 技能唤醒 (紫色/粉色) */}
                        {currentStats.wakeUp && (
                          <div className="skill-awakening-block">
                            <div className="stat-row red-text">
                              {currentStats.wakeUp.name}{" "}
                              {currentStats.wakeUp.name === "治疗"
                                ? "+"
                                : "造成伤害+"}
                              {currentStats.wakeUp.percentage}%
                            </div>
                            <div className="stat-row pink">技能伤害+10%</div>
                            <div className="stat-row pink">MP消耗降低+30%</div>
                            <div className="stat-row pink">FP消耗降低+30%</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="weapon-empty-state">请先选择一把武器</div>
              )}
            </div>
          </div>

          {/* 右侧：预设和操作区域 */}
          <div className="weapon-control-panel">
            <div className="weapon-control-header">
              <h3 className="weapon-panel-title">预设与操作</h3>
              <button
                className="weapon-reset-btn"
                onClick={() => {
                  // 重置除了武器之外的所有内容
                  // 重置当前统计
                  // 生成黄字（默认生成2条）
                  const yellowStats = currentWeapon
                    ? (() => {
                        const arr = [...currentWeapon.possibleRandomStats];
                        const value1 = arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
                        const value2 = arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
                        return [value1, value2].map((ability) =>
                          generateRandomAbility(ability)
                        );
                      })()
                    : [];
                  
                  setCurrentStats({
                    abilities: currentWeapon
                      ? currentWeapon.abilities.map((ability) =>
                          generateRandomAbility(ability)
                        )
                      : [],
                    yellowStats,
                    orangeStats: [],
                    attributeWakeUp: [],
                  });

                  // 重置预设值
                  setPresetAbilities(
                    currentWeapon
                      ? currentWeapon.abilities.map((ability) => ({
                          name: ability.name,
                          value: null,
                          tolerance: ability.fixed === 10 ? 0.1 : 1,
                        }))
                      : []
                  );
                  setPresetYellowStats([]);
                  setPresetOrangeStats([]);
                  setPresetWakeUp({ name: null, percentage: null });
                  setPresetAttributeWakeUp({ attributeIndex: 0, value: null }); // 默认选中智力

                  // 重置统计
                  setCleanNum(0);
                  setCleanUNum(0);
                  setCleanOrangeNum(0);
                  setWakeUpNum(0);
                  setAttributeWakeUpNum(0);

                  // 清空所有日志
                  setAbilitiesMessages([]);
                  setYellowMessages([]);
                  setOrangeMessages([]);
                  setWakeUpMessages([]);
                  setAttributeWakeUpMessages([]);
                  setUpgradeMessages([]);

                  // 重置强化相关
                  upgradeLevelRef.current = 0;
                  upgradeFailureCountRef.current = 0;
                  currentLevelTriesRef.current = 0;
                  setUpgradeLevel(0);
                  setTargetUpgradeLevel(10); // 默认目标等级为10
                  setUpgradeFailureCount(0);
                  setCurrentLevelTries(0);
                  setLevelSuccessTries({});
                  setUpgradeStats({
                    totalTries: 0,
                    totalSuccess: 0,
                    totalPenyaCost: 0,
                    totalBlueMineral: 0,
                    totalGreenMineral: 0,
                    totalXP: 0,
                    totalSunstone: 0,
                  });

                  // 停止所有自动洗练
                  if (autoCleanAbilitiesTimerRef.current) {
                    window.clearInterval(autoCleanAbilitiesTimerRef.current);
                    autoCleanAbilitiesTimerRef.current = null;
                  }
                  if (autoCleanYellowTimerRef.current) {
                    window.clearInterval(autoCleanYellowTimerRef.current);
                    autoCleanYellowTimerRef.current = null;
                  }
                  if (autoCleanOrangeTimerRef.current) {
                    window.clearInterval(autoCleanOrangeTimerRef.current);
                    autoCleanOrangeTimerRef.current = null;
                  }
                  if (autoCleanWakeUpTimerRef.current) {
                    window.clearInterval(autoCleanWakeUpTimerRef.current);
                    autoCleanWakeUpTimerRef.current = null;
                  }
                  if (autoCleanAttributeWakeUpTimerRef.current) {
                    window.clearInterval(
                      autoCleanAttributeWakeUpTimerRef.current
                    );
                    autoCleanAttributeWakeUpTimerRef.current = null;
                  }

                  setIsAutoCleaningAbilities(false);
                  setIsAutoCleaningYellow(false);
                  setIsAutoCleaningOrange(false);
                  setIsAutoCleaningWakeUp(false);
                  setIsAutoCleaningAttributeWakeUp(false);
      
      // 停止自动强化
      if (autoUpgradeTimerRef.current) {
        window.clearInterval(autoUpgradeTimerRef.current);
        autoUpgradeTimerRef.current = null;
      }
      setIsAutoUpgrading(false);
      autoUpgradeStopRef.current = false;
                }}
                disabled={!currentWeapon}
              >
                重置
              </button>
            </div>
            <div className="weapon-control-content">
              {currentWeapon ? (
                <div className="weapon-preset-list">
                  <PresetDisplay
                    title="基础词条"
                    items={presetAbilities.map((p) => ({
                      name: p.name,
                      value: p.value,
                      tolerance: p.tolerance,
                    }))}
                    onClick={() => {
                      // 如果预设值为空，设置为最大值
                      if (presetAbilities.every((p) => p.value === null)) {
                        const newPresets = currentWeapon.abilities.map(
                          (ability) => {
                            const maxValue = ability.fixed
                              ? ability.max / ability.fixed
                              : ability.max;
                            return {
                              name: ability.name,
                              value: maxValue,
                              tolerance: ability.fixed === 10 ? 0.1 : 1,
                            };
                          }
                        );
                        setPresetAbilities(newPresets);
                      }
                      setPresetModalType("abilities");
                      setShowPresetModal(true);
                    }}
                    actionButton={{
                      label: isAutoCleaningAbilities ? "停止" : "洗基础词条",
                      onClick: isAutoCleaningAbilities
                        ? stopAutoCleanAbilities
                        : autoCleanAbilities,
                      disabled: !currentWeapon,
                      count: cleanNum,
                    }}
                  />
                  <PresetDisplay
                    title="黄字"
                    items={presetYellowStats.map((p) => ({
                      name: p.name || "未选择",
                      value: p.value,
                      tolerance: p.tolerance,
                    }))}
                    onClick={() => {
                      // 如果预设值为空，设置为最大值
                      if (
                        presetYellowStats.length === 0 ||
                        presetYellowStats.every(
                          (p) => !p.name || p.value === null
                        )
                      ) {
                        const newPresets = currentWeapon.possibleRandomStats
                          .slice(0, 2)
                          .map((ability) => {
                            const maxValue = ability.fixed
                              ? ability.max / ability.fixed
                              : ability.max;
                            return {
                              name: ability.name,
                              value: maxValue,
                              tolerance: ability.fixed === 10 ? 0.1 : 1,
                            };
                          });
                        setPresetYellowStats(newPresets);
                      }
                      setPresetModalType("yellow");
                      setShowPresetModal(true);
                    }}
                    actionButton={{
                      label: isAutoCleaningYellow ? "停止" : "洗黄字",
                      onClick: isAutoCleaningYellow
                        ? stopAutoCleanYellow
                        : autoCleanYellowStats,
                      disabled: !currentWeapon,
                      count: cleanUNum,
                    }}
                  />
                  <PresetDisplay
                    title="橙字"
                    items={presetOrangeStats.map((p) => ({
                      name: p.name || "未选择",
                      value: p.value,
                      tolerance: p.tolerance,
                    }))}
                    onClick={() => {
                      // 检查强化等级
                      if (upgradeLevel < 6) {
                        addMessage("需要强化到+6才能设置橙字预设！", "warning", "orange");
                        return;
                      }
                      
                      // 如果预设值为空，设置为最大值
                      if (
                        presetOrangeStats.length === 0 ||
                        presetOrangeStats.every(
                          (p) => !p.name || p.value === null
                        )
                      ) {
                        // 根据强化等级决定预设值数量：6-9级1条，10级2条
                        const count = upgradeLevel >= 10 ? 2 : 1;
                        // 过滤掉"生命偷取"属性，橙字不包含此属性
                        const availableStats = currentWeapon.possibleRandomStats.filter(
                          (ability) => ability.name !== "生命偷取"
                        );
                        const newPresets = availableStats
                          .slice(0, count)
                          .map((ability) => {
                            const maxLimit = Math.floor(ability.max / 2);
                            const maxValue = ability.fixed
                              ? maxLimit / ability.fixed
                              : maxLimit;
                            return {
                              name: ability.name,
                              value: maxValue,
                              tolerance: ability.fixed === 10 ? 0.1 : 1,
                            };
                          });
                        setPresetOrangeStats(newPresets);
                      }
                      setPresetModalType("orange");
                      setShowPresetModal(true);
                    }}
                    actionButton={{
                      label: upgradeLevel < 6 
                        ? "先强化到+6" 
                        : (isAutoCleaningOrange ? "停止" : "洗橙字"),
                      onClick: isAutoCleaningOrange
                        ? stopAutoCleanOrange
                        : autoCleanOrangeStats,
                      disabled: !currentWeapon || upgradeLevel < 6,
                      count: cleanOrangeNum,
                    }}
                  />
                  {currentWeapon.wakeUpList &&
                    currentWeapon.wakeUpList.length > 0 && (
                      <PresetDisplay
                        title="技能唤醒"
                        items={[
                          {
                            name: presetWakeUp.name || "未选择",
                            value:
                              presetWakeUp.percentage !== null
                                ? `${presetWakeUp.percentage}%`
                                : null,
                          },
                        ]}
                        onClick={() => {
                          // 技能唤醒保持为空，不自动设置
                          setPresetModalType("wakeUp");
                          setShowPresetModal(true);
                        }}
                        actionButton={{
                          label: isAutoCleaningWakeUp ? "停止" : "洗技能唤醒",
                          onClick: isAutoCleaningWakeUp
                            ? stopAutoCleanWakeUp
                            : autoWakeUp,
                          disabled:
                            !currentWeapon ||
                            !currentWeapon?.wakeUpList ||
                            currentWeapon.wakeUpList.length === 0,
                          count: wakeUpNum,
                        }}
                      />
                    )}
                  <PresetDisplay
                    title="属性唤醒"
                    items={[
                      {
                        name:
                          presetAttributeWakeUp.attributeIndex !== null
                            ? attributeData[
                                presetAttributeWakeUp.attributeIndex
                              ].name
                            : "未选择",
                        value: presetAttributeWakeUp.value,
                      },
                    ]}
                    onClick={() => {
                      // 属性唤醒保持为空，不自动设置
                      setPresetModalType("attributeWakeUp");
                      setShowPresetModal(true);
                    }}
                    actionButton={{
                      label: isAutoCleaningAttributeWakeUp
                        ? "停止"
                        : "洗属性唤醒",
                      onClick: isAutoCleaningAttributeWakeUp
                        ? stopAutoCleanAttributeWakeUp
                        : autoAttributeWakeUp,
                      disabled: !currentWeapon,
                      count: attributeWakeUpNum,
                    }}
                  />
                  <PresetDisplay
                    title="武器强化"
                    items={[
                      {
                        name: `当前等级: +${upgradeLevel}`,
                        value: upgradeLevel < 10 ? `当前成功率: ${(() => {
                          const nextLevel = upgradeLevel + 1;
                          const upgradeData = ultimate190Data.upgrade_data.find(d => d.level === nextLevel);
                          if (!upgradeData || !upgradeData.upgrade_info.initial_chance_percent) return "-";
                          const initialChance = upgradeData.upgrade_info.initial_chance_percent / 100;
                          const currentChance = (upgradeFailureCount + 1) * initialChance;
                          return `${(currentChance * 100).toFixed(2)}%`;
                        })()}` : "已满级",
                      },
                    ]}
                    onClick={() => {
                      // 点击打开目标等级选择
                    }}
                    actionButton={{
                      label: isAutoUpgrading ? "停止" : "强化",
                      onClick: isAutoUpgrading ? stopAutoUpgrade : autoUpgrade,
                      disabled: !currentWeapon || upgradeLevel >= 10 || (targetUpgradeLevel === null && !isAutoUpgrading),
                      count: upgradeStats.totalSuccess,
                      totalCount: upgradeStats.totalTries,
                    }}
                    customContent={
                      <div className="weapon-upgrade-custom">
                        {upgradeLevel < 10 && (
                          <div className="upgrade-target-select">
                            <label>目标等级:</label>
                            <select
                              className="upgrade-level-select"
                              value={targetUpgradeLevel ?? ""}
                              onChange={(e) => {
                                const value = e.target.value === "" ? null : parseInt(e.target.value);
                                if (value !== null && value > upgradeLevel) {
                                  setTargetUpgradeLevel(value);
                                } else {
                                  setTargetUpgradeLevel(null);
                                }
                              }}
                            >
                              <option value="">选择目标等级</option>
                              {Array.from({ length: 10 - upgradeLevel }, (_, i) => upgradeLevel + i + 1).map(level => (
                                <option key={level} value={level}>
                                  +{level}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                        <div className="upgrade-stats-info">
                          <div className="upgrade-stat-row">
                            <span className="stat-label">当前成功率:</span>
                            <span className="stat-value">
                              {(() => {
                                const nextLevel = upgradeLevel + 1;
                                const upgradeData = ultimate190Data.upgrade_data.find(d => d.level === nextLevel);
                                if (!upgradeData || !upgradeData.upgrade_info.initial_chance_percent) return "-";
                                const initialChance = upgradeData.upgrade_info.initial_chance_percent / 100;
                                const currentChance = (upgradeFailureCount + 1) * initialChance;
                                return `${(currentChance * 100).toFixed(2)}%`;
                              })()}
                            </span>
                          </div>
                          <div className="upgrade-stat-row">
                            <span className="stat-label">总次数:</span>
                            <span className="stat-value">{upgradeStats.totalTries}</span>
                          </div>
                          <div className="upgrade-stat-row">
                            <span className="stat-label">当前等级次数:</span>
                            <span className="stat-value">{currentLevelTries}</span>
                          </div>
                          {Object.keys(levelSuccessTries).length > 0 && (
                            <div className="upgrade-level-success-list">
                              <span className="stat-label">每级成功次数:</span>
                              <div className="level-success-items">
                                {Object.entries(levelSuccessTries)
                                  .sort(([a], [b]) => parseInt(a) - parseInt(b))
                                  .map(([level, tries]) => (
                                    <span key={level} className="level-success-item">
                                      +{level}: {tries}次
                                    </span>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="upgrade-cost-display">
                          <div className="upgrade-cost-item">
                            <span className="cost-label">每次消耗:</span>
                            <div className="cost-icons">
                              {(() => {
                                const nextLevel = upgradeLevel + 1;
                                const upgradeData = ultimate190Data.upgrade_data.find(d => d.level === nextLevel);
                                if (!upgradeData) return null;
                                return (
                                  <>
                                    <span className="cost-icon-wrapper">
                                      <img src="https://flyforfun.oss-cn-beijing.aliyuncs.com/static_img/minera.png" alt="蓝矿" className="cost-icon" />
                                      <span className="cost-value">{upgradeData.upgrade_info.mineral_cost}</span>
                                    </span>
                                    <span className="cost-icon-wrapper">
                                      <img src="https://flyforfun.oss-cn-beijing.aliyuncs.com/static_img/erons.png" alt="绿矿" className="cost-icon" />
                                      <span className="cost-value">{upgradeData.upgrade_info.mineral_cost}</span>
                                    </span>
                                    <span className="cost-icon-wrapper">
                                      <img src="https://flyforfun.oss-cn-beijing.aliyuncs.com/static_img/xp.png" alt="XP" className="cost-icon" />
                                      <span className="cost-value">1</span>
                                    </span>
                                    <span className="cost-icon-wrapper">
                                      <img src="https://flyforfun.oss-cn-beijing.aliyuncs.com/static_img/sunstone.png" alt="太阳石" className="cost-icon" />
                                      <span className="cost-value">1</span>
                                    </span>
                                    <span className="cost-penya">{upgradeData.upgrade_info.penya_cost.toLocaleString()}</span>
                                  </>
                                );
                              })()}
                            </div>
                          </div>
                          <div className="upgrade-total-stats">
                            <div className="total-stats-item">
                              <span className="total-stats-label">总消耗:</span>
                              <div className="total-stats-icons">
                                <span className="cost-icon-wrapper">
                                  <img src="https://flyforfun.oss-cn-beijing.aliyuncs.com/static_img/minera.png" alt="蓝矿" className="cost-icon" />
                                  <span className="cost-value">{upgradeStats.totalBlueMineral}</span>
                                </span>
                                <span className="cost-icon-wrapper">
                                  <img src="https://flyforfun.oss-cn-beijing.aliyuncs.com/static_img/erons.png" alt="绿矿" className="cost-icon" />
                                  <span className="cost-value">{upgradeStats.totalGreenMineral}</span>
                                </span>
                                <span className="cost-icon-wrapper">
                                  <img src="https://flyforfun.oss-cn-beijing.aliyuncs.com/static_img/xp.png" alt="XP" className="cost-icon" />
                                  <span className="cost-value">{upgradeStats.totalXP}</span>
                                </span>
                                <span className="cost-icon-wrapper">
                                  <img src="https://flyforfun.oss-cn-beijing.aliyuncs.com/static_img/sunstone.png" alt="太阳石" className="cost-icon" />
                                  <span className="cost-value">{upgradeStats.totalSunstone}</span>
                                </span>
                                <span className="cost-penya">{upgradeStats.totalPenyaCost.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  />
                </div>
              ) : (
                <div className="weapon-control-empty">
                  <p>请先选择一把武器</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 武器选择器弹窗 */}
      {showWeaponSelectorModal && (
        <div
          className="weapon-log-modal-overlay"
          onClick={() => setShowWeaponSelectorModal(false)}
        >
          <div
            className="weapon-log-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="weapon-log-modal__header">
              <h4 className="weapon-log-modal__title">选择武器</h4>
              <button
                className="weapon-log-modal__close"
                onClick={() => setShowWeaponSelectorModal(false)}
              >
                ×
              </button>
            </div>
            <div className="weapon-log-modal__content">
              <div className="weapon-selector-grouped">
                {(() => {
                  // 按 type 分组武器
                  const groupedWeapons = weapons.reduce((acc, weapon) => {
                    const type = weapon.type || "其他";
                    if (!acc[type]) {
                      acc[type] = [];
                    }
                    acc[type].push(weapon);
                    return acc;
                  }, {} as Record<string, Weapon[]>);

                  // 按类型名称排序
                  const sortedTypes = Object.keys(groupedWeapons).sort();

                  return sortedTypes.map((type) => (
                    <div key={type} className="weapon-selector-group">
                      <div className="weapon-selector-group-title">{type}</div>
                      <div className="weapon-selector-grid-compact">
                        {groupedWeapons[type].map((weapon) => (
                          <div
                            key={weapon.id}
                            className={`weapon-selector-item-compact ${
                              selectedWeaponId === weapon.id
                                ? "is-selected"
                                : ""
                            }`}
                            onClick={() => {
                              setSelectedWeaponId(weapon.id);
                              setShowWeaponSelectorModal(false);
                            }}
                          >
                            <img
                              src={weapon.imgUrl}
                              alt={weapon.name}
                              className="weapon-selector-icon-compact"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/img/items/default.png";
                              }}
                            />
                            <span className="weapon-selector-name-compact">
                              {weapon.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 日志弹窗 */}
      {showLogModal && logModalType && (
        <div
          className="weapon-log-modal-overlay"
          onClick={() => {
            setShowLogModal(false);
            setLogModalType(null);
          }}
        >
          <div
            className="weapon-log-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="weapon-log-modal__header">
              <h4 className="weapon-log-modal__title">
                {logModalType === "abilities" && "基础词条日志"}
                {logModalType === "yellow" && "黄字日志"}
                {logModalType === "orange" && "橙字日志"}
                {logModalType === "wakeUp" && "技能唤醒日志"}
                {logModalType === "attributeWakeUp" && "属性唤醒日志"}
                {logModalType === "upgrade" && "强化日志"}
                {(() => {
                  let messages: WeaponMessage[] = [];
                  switch (logModalType) {
                    case "abilities":
                      messages = abilitiesMessages;
                      break;
                    case "yellow":
                      messages = yellowMessages;
                      break;
                    case "orange":
                      messages = orangeMessages;
                      break;
                    case "wakeUp":
                      messages = wakeUpMessages;
                      break;
                    case "attributeWakeUp":
                      messages = attributeWakeUpMessages;
                      break;
                    case "upgrade":
                      messages = upgradeMessages;
                      break;
                  }
                  return ` (${messages.length}条)`;
                })()}
              </h4>
              <button
                className="weapon-log-modal__close"
                onClick={() => {
                  setShowLogModal(false);
                  setLogModalType(null);
                }}
              >
                ×
              </button>
            </div>
            <div className="weapon-log-modal__content">
              {(() => {
                let messages: WeaponMessage[] = [];
                switch (logModalType) {
                  case "abilities":
                    messages = abilitiesMessages;
                    break;
                  case "yellow":
                    messages = yellowMessages;
                    break;
                  case "orange":
                    messages = orangeMessages;
                    break;
                  case "wakeUp":
                    messages = wakeUpMessages;
                    break;
                  case "attributeWakeUp":
                    messages = attributeWakeUpMessages;
                    break;
                  case "upgrade":
                    messages = upgradeMessages;
                    break;
                }
                return messages.length > 0 ? (
                  <div className="weapon-log-list">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`weapon-log-item weapon-log-item-${msg.type}`}
                      >
                        {msg.text}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="weapon-log-empty">暂无日志</div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* 预设值弹窗 */}
      {showPresetModal && presetModalType && currentWeapon && (
        <div
          className="weapon-log-modal-overlay"
          onClick={() => {
            setShowPresetModal(false);
            setPresetModalType(null);
          }}
        >
          <div
            className="weapon-log-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "600px" }}
          >
            <div className="weapon-log-modal__header">
              <h4 className="weapon-log-modal__title">
                {presetModalType === "abilities" && "基础词条预设"}
                {presetModalType === "yellow" && "黄字预设"}
                {presetModalType === "orange" && "橙字预设"}
                {presetModalType === "wakeUp" && "技能唤醒预设"}
                {presetModalType === "attributeWakeUp" && "属性唤醒预设"}
              </h4>
              <button
                className="weapon-log-modal__close"
                onClick={() => {
                  setShowPresetModal(false);
                  setPresetModalType(null);
                }}
              >
                ×
              </button>
            </div>
            <div className="weapon-log-modal__content">
              {presetModalType === "abilities" && (
                <div className="weapon-preset-modal-form">
                  {currentWeapon.abilities.map((ability, idx) => {
                    const preset = presetAbilities[idx];
                    const minDisplay = ability.fixed
                      ? ability.min / ability.fixed
                      : ability.min;
                    const maxDisplay = ability.fixed
                      ? ability.max / ability.fixed
                      : ability.max;
                    const step = ability.fixed === 10 ? 0.1 : 1;
                    return (
                      <div key={idx} className="weapon-preset-modal-item">
                        <label>{ability.name}:</label>
                        <div className="weapon-preset-modal-input-group">
                          <div className="weapon-preset-value-input">
                            <input
                              type="number"
                              step={step}
                              min={minDisplay}
                              max={maxDisplay}
                              value={preset?.value ?? ""}
                              placeholder={`${minDisplay}~${maxDisplay}`}
                              onChange={(e) => {
                                const value =
                                  e.target.value === ""
                                    ? null
                                    : parseFloat(e.target.value);
                                setPresetAbilities((prev) => {
                                  const newPresets = [...prev];
                                  const currentPreset = newPresets[idx] || {
                                    name: ability.name,
                                    value: null,
                                    tolerance: ability.fixed === 10 ? 0.1 : 1,
                                  };
                                  newPresets[idx] = {
                                    ...currentPreset,
                                    value,
                                  };
                                  return newPresets;
                                });
                              }}
                            />
                            <span className="weapon-preset-range">
                              ({minDisplay}~{maxDisplay})
                            </span>
                          </div>
                          <div className="weapon-preset-tolerance-input">
                            <label className="tolerance-label">误差范围:</label>
                            <input
                              type="number"
                              step={step}
                              min={0}
                              value={
                                preset?.tolerance ??
                                (ability.fixed === 10 ? 0.1 : 1)
                              }
                              onChange={(e) => {
                                const tolerance =
                                  parseFloat(e.target.value) || 0;
                                setPresetAbilities((prev) => {
                                  const newPresets = [...prev];
                                  const currentPreset = newPresets[idx] || {
                                    name: ability.name,
                                    value: null,
                                    tolerance: ability.fixed === 10 ? 0.1 : 1,
                                  };
                                  newPresets[idx] = {
                                    ...currentPreset,
                                    tolerance,
                                  };
                                  return newPresets;
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {presetModalType === "yellow" && (
                <div className="weapon-preset-modal-form">
                  {[0, 1].map((idx) => {
                    const preset = presetYellowStats[idx];
                    return (
                      <div key={idx} className="weapon-preset-modal-item">
                        <label>属性{idx + 1}:</label>
                        <div className="weapon-preset-modal-input-group">
                          <select
                            value={preset?.name ?? ""}
                            onChange={(e) => {
                              const name = e.target.value;
                              if (!name) {
                                setPresetYellowStats((prev) => {
                                  const newPresets = [...prev];
                                  newPresets[idx] = {
                                    name: "",
                                    value: null,
                                    tolerance: 1,
                                  };
                                  return newPresets;
                                });
                                return;
                              }
                              setPresetYellowStats((prev) => {
                                const newPresets = [...prev];
                                const ability =
                                  currentWeapon.possibleRandomStats.find(
                                    (a) => a.name === name
                                  );
                                newPresets[idx] = {
                                  name,
                                  value: null,
                                  tolerance: ability?.fixed === 10 ? 0.1 : 1,
                                };
                                return newPresets;
                              });
                            }}
                          >
                            <option value="">选择属性</option>
                            {currentWeapon.possibleRandomStats.map((a) => (
                              <option key={a.name} value={a.name}>
                                {a.name}
                              </option>
                            ))}
                          </select>
                          {preset?.name &&
                            (() => {
                              const ability =
                                currentWeapon.possibleRandomStats.find(
                                  (a) => a.name === preset.name
                                );
                              if (!ability) return null;
                              const minDisplay = ability.fixed
                                ? ability.min / ability.fixed
                                : ability.min;
                              const maxDisplay = ability.fixed
                                ? ability.max / ability.fixed
                                : ability.max;
                              const step = ability.fixed === 10 ? 0.1 : 1;
                              return (
                                <>
                                  <div className="weapon-preset-value-input">
                                    <input
                                      type="number"
                                      step={step}
                                      min={minDisplay}
                                      max={maxDisplay}
                                      value={preset.value ?? ""}
                                      placeholder="预设值"
                                      onChange={(e) => {
                                        const value =
                                          e.target.value === ""
                                            ? null
                                            : parseFloat(e.target.value);
                                        setPresetYellowStats((prev) => {
                                          const newPresets = [...prev];
                                          const currentPreset = newPresets[
                                            idx
                                          ] || {
                                            name: preset.name,
                                            value: null,
                                            tolerance:
                                              ability.fixed === 10 ? 0.1 : 1,
                                          };
                                          newPresets[idx] = {
                                            ...currentPreset,
                                            value,
                                          };
                                          return newPresets;
                                        });
                                      }}
                                    />
                                    <span className="weapon-preset-range">
                                      ({minDisplay}~{maxDisplay})
                                    </span>
                                  </div>
                                  <div className="weapon-preset-tolerance-input">
                                    <label className="tolerance-label">
                                      误差范围:
                                    </label>
                                    <input
                                      type="number"
                                      step={step}
                                      min={0}
                                      value={
                                        preset.tolerance ??
                                        (ability.fixed === 10 ? 0.1 : 1)
                                      }
                                      onChange={(e) => {
                                        const tolerance =
                                          parseFloat(e.target.value) || 0;
                                        setPresetYellowStats((prev) => {
                                          const newPresets = [...prev];
                                          const currentPreset = newPresets[
                                            idx
                                          ] || {
                                            name: preset.name,
                                            value: null,
                                            tolerance:
                                              ability.fixed === 10 ? 0.1 : 1,
                                          };
                                          newPresets[idx] = {
                                            ...currentPreset,
                                            tolerance,
                                          };
                                          return newPresets;
                                        });
                                      }}
                                    />
                                  </div>
                                </>
                              );
                            })()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {presetModalType === "orange" && (
                <div className="weapon-preset-modal-form">
                  {(() => {
                    // 根据强化等级决定显示几个属性输入框：6-9级1个，10级2个
                    const count = upgradeLevel >= 10 ? 2 : 1;
                    return Array.from({ length: count }, (_, i) => i);
                  })().map((idx) => {
                    const preset = presetOrangeStats[idx];
                    return (
                      <div key={idx} className="weapon-preset-modal-item">
                        <label>属性{idx + 1}:</label>
                        <div className="weapon-preset-modal-input-group">
                          <select
                            value={preset?.name ?? ""}
                            onChange={(e) => {
                              const name = e.target.value;
                              if (!name) {
                                setPresetOrangeStats((prev) => {
                                  const newPresets = [...prev];
                                  newPresets[idx] = {
                                    name: "",
                                    value: null,
                                    tolerance: 1,
                                  };
                                  return newPresets;
                                });
                                return;
                              }
                              setPresetOrangeStats((prev) => {
                                const newPresets = [...prev];
                                const ability =
                                  currentWeapon.possibleRandomStats.find(
                                    (a) => a.name === name
                                  );
                                newPresets[idx] = {
                                  name,
                                  value: null,
                                  tolerance: ability?.fixed === 10 ? 0.1 : 1,
                                };
                                return newPresets;
                              });
                            }}
                          >
                            <option value="">选择属性</option>
                            {currentWeapon.possibleRandomStats
                              .filter((a) => a.name !== "生命偷取") // 橙字不包含生命偷取属性
                              .map((a) => (
                                <option key={a.name} value={a.name}>
                                  {a.name}
                                </option>
                              ))}
                          </select>
                          {preset?.name &&
                            (() => {
                              const ability =
                                currentWeapon.possibleRandomStats.find(
                                  (a) => a.name === preset.name
                                );
                              if (!ability) return null;
                              const maxLimit = Math.floor(ability.max / 2);
                              const minDisplay = ability.fixed
                                ? ability.min / ability.fixed
                                : ability.min;
                              const maxDisplay = ability.fixed
                                ? maxLimit / ability.fixed
                                : maxLimit;
                              const step = ability.fixed === 10 ? 0.1 : 1;
                              return (
                                <>
                                  <div className="weapon-preset-value-input">
                                    <input
                                      type="number"
                                      step={step}
                                      min={minDisplay}
                                      max={maxDisplay}
                                      value={preset.value ?? ""}
                                      placeholder="预设值"
                                      onChange={(e) => {
                                        const value =
                                          e.target.value === ""
                                            ? null
                                            : parseFloat(e.target.value);
                                        setPresetOrangeStats((prev) => {
                                          const newPresets = [...prev];
                                          const currentPreset = newPresets[
                                            idx
                                          ] || {
                                            name: preset.name,
                                            value: null,
                                            tolerance:
                                              ability.fixed === 10 ? 0.1 : 1,
                                          };
                                          newPresets[idx] = {
                                            ...currentPreset,
                                            value,
                                          };
                                          return newPresets;
                                        });
                                      }}
                                    />
                                    <span className="weapon-preset-range">
                                      ({minDisplay}~{maxDisplay})
                                    </span>
                                  </div>
                                  <div className="weapon-preset-tolerance-input">
                                    <label className="tolerance-label">
                                      误差范围:
                                    </label>
                                    <input
                                      type="number"
                                      step={step}
                                      min={0}
                                      value={
                                        preset.tolerance ??
                                        (ability.fixed === 10 ? 0.1 : 1)
                                      }
                                      onChange={(e) => {
                                        const tolerance =
                                          parseFloat(e.target.value) || 0;
                                        setPresetOrangeStats((prev) => {
                                          const newPresets = [...prev];
                                          const currentPreset = newPresets[
                                            idx
                                          ] || {
                                            name: preset.name,
                                            value: null,
                                            tolerance:
                                              ability.fixed === 10 ? 0.1 : 1,
                                          };
                                          newPresets[idx] = {
                                            ...currentPreset,
                                            tolerance,
                                          };
                                          return newPresets;
                                        });
                                      }}
                                    />
                                  </div>
                                </>
                              );
                            })()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {presetModalType === "wakeUp" && (
                <div className="weapon-preset-modal-form">
                  <div className="weapon-preset-modal-item">
                    <label>技能:</label>
                    <select
                      value={presetWakeUp.name ?? ""}
                      onChange={(e) => {
                        setPresetWakeUp((prev) => ({
                          ...prev,
                          name: e.target.value || null,
                        }));
                      }}
                    >
                      <option value="">选择技能</option>
                      {currentWeapon.wakeUpList?.map((w) => (
                        <option key={w.name} value={w.name}>
                          {w.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {presetWakeUp.name && (
                    <div className="weapon-preset-modal-item">
                      <label>百分比:</label>
                      <select
                        value={presetWakeUp.percentage ?? ""}
                        onChange={(e) => {
                          setPresetWakeUp((prev) => ({
                            ...prev,
                            percentage:
                              e.target.value === ""
                                ? null
                                : parseInt(e.target.value),
                          }));
                        }}
                      >
                        <option value="">选择百分比</option>
                        {currentWeapon.wakeUpList
                          ?.find((w) => w.name === presetWakeUp.name)
                          ?.item.map((p) => (
                            <option key={p} value={p}>
                              {p}%
                            </option>
                          ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              {presetModalType === "attributeWakeUp" && (
                <div className="weapon-preset-modal-form">
                  <div className="weapon-preset-modal-item">
                    <label>属性:</label>
                    <select
                      value={
                        presetAttributeWakeUp.attributeIndex !== null
                          ? presetAttributeWakeUp.attributeIndex
                          : ""
                      }
                      onChange={(e) => {
                        setPresetAttributeWakeUp((prev) => ({
                          ...prev,
                          attributeIndex:
                            e.target.value === ""
                              ? null
                              : parseInt(e.target.value),
                          value: null,
                        }));
                      }}
                    >
                      <option value="">选择属性</option>
                      {attributeData.map((attr, idx) => (
                        <option key={idx} value={idx}>
                          {attr.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {presetAttributeWakeUp.attributeIndex !== null && (
                    <div className="weapon-preset-modal-item">
                      <label>数值:</label>
                      <select
                        value={presetAttributeWakeUp.value ?? ""}
                        onChange={(e) => {
                          setPresetAttributeWakeUp((prev) => ({
                            ...prev,
                            value: e.target.value || null,
                          }));
                        }}
                      >
                        <option value="">选择数值</option>
                        {attributeData[
                          presetAttributeWakeUp.attributeIndex!
                        ].list.map((item) => (
                          <option key={item.name} value={item.name}>
                            {item.name} ({(item.probability * 100).toFixed(2)}%)
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              <div className="weapon-preset-modal-footer">
                <button
                  className="weapon-preset-modal-btn"
                  onClick={() => {
                    setShowPresetModal(false);
                    setPresetModalType(null);
                  }}
                >
                  确定
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
