import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import demonData from "../../../config/bless/demon.json";
import goddessData from "../../../config/bless/godness.json";
import "./index.less";

type BlessingType = "demon" | "goddess";

interface StatOption {
  chancePercent: number;
  statValue: number | string;
}

interface StatType {
  statType: string;
  statName: string;
  stats: StatOption[];
}

interface RollResult {
  statType: string;
  statName: string;
  statValue: number | string;
  timestamp: number;
}

interface HistoryRecord {
  left: RollResult;
  right: RollResult;
  blessingType: BlessingType;
  timestamp: number;
}

const ROLL_FREQUENCY_OPTIONS = [50, 100, 200, 500]; // 每秒洗练次数选项
const DEFAULT_ROLL_FREQUENCY = 50; // 默认每秒洗练次数

export const Bless = () => {
  const [blessingType, setBlessingType] = useState<BlessingType>("goddess");
  const [isAutoRolling, setIsAutoRolling] = useState(false);
  const [leftResult, setLeftResult] = useState<RollResult | null>(null);
  const [rightResult, setRightResult] = useState<RollResult | null>(null);
  const [history, setHistory] = useState<HistoryRecord[]>([]); // 洗练历史不刷新一直保留
  const [target1, setTarget1] = useState<{
    statType: string;
    statValue: number | string;
  } | null>(null);
  const [target2, setTarget2] = useState<{
    statType: string;
    statValue: number | string;
  } | null>(null);
  const [rollCount, setRollCount] = useState(0);
  const [showTargetSelector, setShowTargetSelector] = useState<
    "target1" | "target2" | null
  >(null);
  const [rollFrequency, setRollFrequency] = useState<number>(DEFAULT_ROLL_FREQUENCY); // 洗练频率（每秒次数）
  const [targetRelation, setTargetRelation] = useState<"and" | "or">("and"); // 目标关系：and=同时满足，or=满足一个即可
  const [successMessage, setSuccessMessage] = useState<{
    show: boolean;
    count: number;
  }>({ show: false, count: 0 }); // 达成提示
  const [showHistoryModal, setShowHistoryModal] = useState(false); // 历史记录弹窗

  const autoRollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );
  const leftRollTokenRef = useRef(0);
  const rightRollTokenRef = useRef(0);
  // 临时存储结果，用于生成列表
  const tempLeftResultRef = useRef<RollResult | null>(null);
  const tempRightResultRef = useRef<RollResult | null>(null);

  const blessingData = useMemo(() => {
    return blessingType === "demon"
      ? demonData.blessingOfTheDemon
      : goddessData.blessingOfTheGoddess;
  }, [blessingType]);

  // 获取每个属性类型的最大值
  const getMaxStatValue = useCallback((statType: string): number | string | null => {
    const statTypeData = blessingData.find((st) => st.statType === statType);
    if (!statTypeData || statTypeData.stats.length === 0) return null;
    
    // 获取所有数值，处理字符串类型的数值（如 "0.5%"）
    const values = statTypeData.stats.map((stat) => {
      if (typeof stat.statValue === 'string') {
        // 提取数字部分
        const numMatch = stat.statValue.match(/[\d.]+/);
        return numMatch ? parseFloat(numMatch[0]) : 0;
      }
      return stat.statValue as number;
    });
    
    const maxValue = Math.max(...values);
    
    // 返回原始格式的最大值
    const maxStat = statTypeData.stats.find((stat) => {
      if (typeof stat.statValue === 'string') {
        const numMatch = stat.statValue.match(/[\d.]+/);
        return numMatch && parseFloat(numMatch[0]) === maxValue;
      }
      return stat.statValue === maxValue;
    });
    
    return maxStat ? maxStat.statValue : null;
  }, [blessingData]);

  // 检查结果是否为最大值
  const isMaxValue = useCallback((result: RollResult): boolean => {
    const maxValue = getMaxStatValue(result.statType);
    if (maxValue === null) return false;
    return result.statValue === maxValue;
  }, [getMaxStatValue]);

  // 根据概率表随机选择一个属性值
  // chancePercent 指的是出现此属性以及此属性下此数值的全局概率
  const rollStat = useCallback((): RollResult => {
    // 收集所有属性类型的所有属性值选项
    const allOptions: Array<{
      statType: string;
      statName: string;
      statValue: number | string;
      chancePercent: number;
    }> = [];

    blessingData.forEach((statType) => {
      statType.stats.forEach((stat) => {
        allOptions.push({
          statType: statType.statType,
          statName: statType.statName,
          statValue: stat.statValue,
          chancePercent: stat.chancePercent,
        });
      });
    });

    // 计算总概率（用于归一化）
    const totalChance = allOptions.reduce(
      (sum, option) => sum + option.chancePercent,
      0
    );

    // 生成随机数（0 到总概率之间）
    const random = Math.random() * totalChance;
    let cumulative = 0;

    // 根据概率选择
    for (const option of allOptions) {
      cumulative += option.chancePercent;
      if (random <= cumulative) {
        return {
          statType: option.statType,
          statName: option.statName,
          statValue: option.statValue,
          timestamp: Date.now(),
        };
      }
    }

    // 兜底：返回最后一个
    const lastOption = allOptions[allOptions.length - 1];
    return {
      statType: lastOption.statType,
      statName: lastOption.statName,
      statValue: lastOption.statValue,
      timestamp: Date.now(),
    };
  }, [blessingData]);

  // 执行一次洗练
  const performRoll = useCallback(() => {
    const left = rollStat();
    const right = rollStat();

    setLeftResult(left);
    setRightResult(right);
    setRollCount((prev) => prev + 1);

    // 记录历史（不刷新一直保留）
    const record: HistoryRecord = {
      left,
      right,
      blessingType,
      timestamp: Date.now(),
    };
    setHistory((prev) => [record, ...prev]); // 不限制数量，一直保留

    return { left, right };
  }, [blessingType, rollStat]);

  // 生成所有可能的属性选项列表（用于显示）
  const generateAllStatsList = useCallback(() => {
    const items: Array<{
      label: string;
      value: number | string;
      statType: string;
    }> = [];

    // 按属性类型分组，每个属性类型只显示一次（显示属性名，不显示具体值）
    blessingData.forEach((statType) => {
      // 每个属性类型只添加一次，显示属性名
      items.push({
        label: statType.statName,
        value: "", // 值在底部结果条中显示
        statType: statType.statType,
      });
    });

    return items;
  }, [blessingData]);

  // 随机选择一个属性类型（仅用于显示滚动列表，不用于实际洗练）
  const getRandomStatType = useCallback((): StatType => {
    const randomIndex = Math.floor(Math.random() * blessingData.length);
    return blessingData[randomIndex];
  }, [blessingData]);

  // 生成以结果为中心的列表（结果在中间，上下填充）
  const generateRollList = useCallback(
    (result: RollResult | null) => {
      const items: Array<{
        label: string;
        value: number | string;
        statType: string;
        isTarget: boolean;
      }> = [];

      if (!result) {
        // 如果没有结果，返回完整列表
        blessingData.forEach((statType) => {
        items.push({
            label: statType.statName,
            value: "",
            statType: statType.statType,
            isTarget: false,
          });
        });
        return items;
      }

      // 计算需要显示的项数（假设显示区域高度为 200px，每个项高度为 20px）
      // 为了确保上下都有足够的填充，我们生成更多项
      const visibleItems = 15; // 可见区域大约能显示 10 个项，我们生成 15 个确保有足够填充
      const itemsAbove = Math.floor(visibleItems / 2); // 结果上方需要的项数
      const itemsBelow = Math.ceil(visibleItems / 2); // 结果下方需要的项数

      // 先生成一个足够长的随机项池（用于填充）
      const itemPool: Array<{
        label: string;
        value: number | string;
        statType: string;
        isTarget: boolean;
      }> = [];
      
      // 生成足够多的随机项（至少是需要的两倍，确保有足够的项可以填充）
      const poolSize = Math.max(itemsAbove + itemsBelow, 20);
      for (let i = 0; i < poolSize; i++) {
        const randomStat = getRandomStatType();
        itemPool.push({
          label: randomStat.statName,
          value: "",
          statType: randomStat.statType,
          isTarget: false,
        });
      }

      // 从池中取项填充上方
      const aboveItems = itemPool.slice(0, itemsAbove);
      
      // 从池中取项填充下方（从池的末尾开始取，确保与上方不重复）
      const belowItems = itemPool.slice(-itemsBelow);

      // 如果上方项不够，从下方倒数的项中取来填补
      if (aboveItems.length < itemsAbove) {
        const needed = itemsAbove - aboveItems.length;
        // 从下方列表的末尾取项，倒序添加到上方
        const fillFromBelow = belowItems.slice(-needed).reverse();
        aboveItems.unshift(...fillFromBelow);
        // 从下方列表中移除已使用的项
        belowItems.splice(-needed);
      }

      // 如果下方项不够，从上方倒数的项中取来填补
      if (belowItems.length < itemsBelow) {
        const needed = itemsBelow - belowItems.length;
        // 从上方列表的末尾取项，倒序添加到下方
        const fillFromAbove = aboveItems.slice(-needed).reverse();
        belowItems.push(...fillFromAbove);
        // 从上方列表中移除已使用的项
        aboveItems.splice(-needed);
      }

      // 如果填充后还是不够，从池中补充
      while (aboveItems.length < itemsAbove) {
        const randomStat = getRandomStatType();
        aboveItems.unshift({
          label: randomStat.statName,
          value: "",
          statType: randomStat.statType,
          isTarget: false,
        });
      }

      while (belowItems.length < itemsBelow) {
        const randomStat = getRandomStatType();
        belowItems.push({
          label: randomStat.statName,
          value: "",
          statType: randomStat.statType,
          isTarget: false,
        });
      }

      // 组合列表：上方项 + 结果项 + 下方项
      items.push(...aboveItems);
        items.push({
          label: result.statName,
          value: result.statValue,
          statType: result.statType,
          isTarget: true,
        });
      items.push(...belowItems);

      return items;
    },
    [blessingData, getRandomStatType]
  );

  // 手动洗练
  const handleStartRoll = () => {
    if (isAutoRolling) return;

    // 产生结果
    const left = rollStat();
    const right = rollStat();

    // 更新token触发重新渲染（生成新的列表，包含结果）
    leftRollTokenRef.current += 1;
    rightRollTokenRef.current += 1;

    // 使用 ref 临时存储结果，用于生成列表
    tempLeftResultRef.current = left;
    tempRightResultRef.current = right;

    // 立即更新state显示结果（无滚动动画）
        setLeftResult(left);
        setRightResult(right);
        setRollCount((prev) => prev + 1);
        
        // 记录历史
        const record: HistoryRecord = {
          left,
          right,
          blessingType,
          timestamp: Date.now(),
        };
        setHistory((prev) => [record, ...prev].slice(0, 50));

    // 等待DOM更新后，滚动到结果位置（居中显示）
    setTimeout(() => {
      const leftReel = document.querySelector(
        '.stat-column[data-side="left"] .stat-column__reel'
      ) as HTMLElement;
      const rightReel = document.querySelector(
        '.stat-column[data-side="right"] .stat-column__reel'
      ) as HTMLElement;

      if (leftReel && left) {
        // 计算结果在列表中的索引（应该在中间位置）
        const resultIndex = Math.floor((generateRollList(left).length - 1) / 2);
        const itemHeight = 20;
              const reelHeight = leftReel.clientHeight;
              const targetScrollTop =
                resultIndex * itemHeight - reelHeight / 2 + itemHeight / 2;

        // 立即滚动到结果位置（无动画）
        leftReel.scrollTop = Math.max(0, targetScrollTop);
      }

      if (rightReel && right) {
        const resultIndex = Math.floor((generateRollList(right).length - 1) / 2);
              const itemHeight = 20;
              const reelHeight = rightReel.clientHeight;
              const targetScrollTop =
                resultIndex * itemHeight - reelHeight / 2 + itemHeight / 2;

        rightReel.scrollTop = Math.max(0, targetScrollTop);
      }

      // 清空临时结果
      tempLeftResultRef.current = null;
      tempRightResultRef.current = null;
    }, 50);
  };

  // 自动洗练
  useEffect(() => {
    if (!isAutoRolling) {
      if (autoRollIntervalRef.current) {
        clearInterval(autoRollIntervalRef.current);
        autoRollIntervalRef.current = null;
      }
      return;
    }

    const checkTargets = () => {
      // 如果两个都为空，不限制，继续洗练（但不会自动停止）
      // 只有在有至少一个目标时才检查
      if (!target1 && !target2) {
        // 没有目标时，只执行一次洗练
        performRoll();
        return;
      }

      const { left, right } = performRoll();

      // 更新token触发重新渲染（生成新的列表，包含结果）
      leftRollTokenRef.current += 1;
      rightRollTokenRef.current += 1;
      
      // 临时存储结果，用于生成列表
      tempLeftResultRef.current = left;
      tempRightResultRef.current = right;

      // 检查结果中是否包含目标属性（不区分左右）
      const checkMatch = (result: RollResult, target: { statType: string; statValue: number | string }): boolean => {
        return result.statType === target.statType && result.statValue === target.statValue;
      };

      const leftMatchesTarget1 = target1 ? checkMatch(left, target1) : false;
      const leftMatchesTarget2 = target2 ? checkMatch(left, target2) : false;
      const rightMatchesTarget1 = target1 ? checkMatch(right, target1) : false;
      const rightMatchesTarget2 = target2 ? checkMatch(right, target2) : false;

      // 根据目标关系判断是否达成
      let targetAchieved = false;
      if (targetRelation === "and") {
        // 同时满足：结果中必须同时包含属性1和属性2（不管左右顺序）
        if (target1 && target2) {
          // 左1右2 或 左2右1
          targetAchieved = (leftMatchesTarget1 && rightMatchesTarget2) || 
                          (leftMatchesTarget2 && rightMatchesTarget1);
        } else if (target1) {
          // 只有属性1，只需满足属性1（在左边或右边都可以）
          targetAchieved = leftMatchesTarget1 || rightMatchesTarget1;
        } else if (target2) {
          // 只有属性2，只需满足属性2（在左边或右边都可以）
          targetAchieved = leftMatchesTarget2 || rightMatchesTarget2;
        }
      } else {
        // 满足一个即可：结果中出现属性1或属性2中的任意一个即可（不管左右）
        if (target1 && target2) {
          targetAchieved = leftMatchesTarget1 || leftMatchesTarget2 || 
                          rightMatchesTarget1 || rightMatchesTarget2;
        } else if (target1) {
          // 只有属性1，只需满足属性1（在左边或右边都可以）
          targetAchieved = leftMatchesTarget1 || rightMatchesTarget1;
        } else if (target2) {
          // 只有属性2，只需满足属性2（在左边或右边都可以）
          targetAchieved = leftMatchesTarget2 || rightMatchesTarget2;
        }
      }

      if (targetAchieved) {
        // 达到目标，停止自动洗练
          setIsAutoRolling(false);
        
        // 显示成功提示
        setSuccessMessage({
          show: true,
          count: rollCount + 1,
        });
        
        // 等待DOM更新后，滚动到结果位置（居中显示）
        setTimeout(() => {
          const leftReel = document.querySelector(
            '.stat-column[data-side="left"] .stat-column__reel'
          ) as HTMLElement;
          const rightReel = document.querySelector(
            '.stat-column[data-side="right"] .stat-column__reel'
          ) as HTMLElement;

          if (leftReel && left) {
            // 结果在列表中间位置
            const resultIndex = Math.floor((generateRollList(left).length - 1) / 2);
                  const itemHeight = 20;
                  const reelHeight = leftReel.clientHeight;
                  const targetScrollTop =
                    resultIndex * itemHeight - reelHeight / 2 + itemHeight / 2;

            // 立即滚动到结果位置（无动画）
            leftReel.scrollTop = Math.max(0, targetScrollTop);
          }

          if (rightReel && right) {
            const resultIndex = Math.floor((generateRollList(right).length - 1) / 2);
                  const itemHeight = 20;
                  const reelHeight = rightReel.clientHeight;
                  const targetScrollTop =
                    resultIndex * itemHeight - reelHeight / 2 + itemHeight / 2;

            rightReel.scrollTop = Math.max(0, targetScrollTop);
          }
          
          // 清空临时结果
          tempLeftResultRef.current = null;
          tempRightResultRef.current = null;
        }, 50);
      }
    };

    // 立即执行一次
    checkTargets();

    const rollInterval = 1000 / rollFrequency; // 根据频率计算间隔
    autoRollIntervalRef.current = setInterval(checkTargets, rollInterval);

    return () => {
      if (autoRollIntervalRef.current) {
        clearInterval(autoRollIntervalRef.current);
      }
    };
  }, [isAutoRolling, target1, target2, targetRelation, rollFrequency, performRoll, generateRollList, rollCount]);

  // 设置目标
  const handleSetTarget = (
    side: "target1" | "target2",
    statType: string,
    statValue: number | string
  ) => {
    if (side === "target1") {
      setTarget1(
        target1?.statType === statType && target1?.statValue === statValue
          ? null
          : { statType, statValue }
      );
    } else {
      setTarget2(
        target2?.statType === statType &&
          target2?.statValue === statValue
          ? null
          : { statType, statValue }
      );
    }
    setShowTargetSelector(null);
  };

  // 开始自动洗练（如果有预设属性则一直洗练直到达到目标）
  const handleStartAutoRoll = () => {
    if (isAutoRolling) return;
    if (!target1 && !target2) {
      alert("请至少选择一个目标属性");
      return;
    }
    setIsAutoRolling(true);
    setRollCount(0);
    setSuccessMessage({ show: false, count: 0 }); // 重置成功提示
  };

  // 开始洗练（如果有预设属性则自动开始自动洗练，否则只执行一次）
  const handleStartRollWithPreset = () => {
    if (isAutoRolling) return;
    
    // 如果有预设属性，直接开始自动洗练
    if (target1 || target2) {
      handleStartAutoRoll();
    } else {
      // 没有预设属性时，只执行单次洗练（频率默认为1次）
      handleStartRoll();
    }
  };

  // 停止自动洗练
  const handleStopAutoRoll = () => {
    setIsAutoRolling(false);
  };

  // 用于显示的完整属性列表（始终显示所有选项）
  const allStatsList = useMemo(
    () => generateAllStatsList(),
    [generateAllStatsList]
  );

  // 用于显示的列表（有结果时使用以结果为中心的列表）
  // 使用 leftRollTokenRef 来触发重新计算（当 token 变化时，说明有新的结果）
  const leftRollList = useMemo(() => {
    const result = tempLeftResultRef.current || leftResult;
    return generateRollList(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftResult, generateRollList, leftRollTokenRef.current]);
  const rightRollList = useMemo(() => {
    const result = tempRightResultRef.current || rightResult;
    return generateRollList(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rightResult, generateRollList, rightRollTokenRef.current]);

  // 当前显示的列表：有结果时使用以结果为中心的列表，否则使用完整列表
  const leftStatList = useMemo(() => {
    return leftResult ? leftRollList : allStatsList;
  }, [leftResult, leftRollList, allStatsList]);

  const rightStatList = useMemo(() => {
    return rightResult ? rightRollList : allStatsList;
  }, [rightResult, rightRollList, allStatsList]);

  // 禁用手动滚动
  useEffect(() => {
    const leftReel = document.querySelector(
      '.stat-column[data-side="left"] .stat-column__reel'
    ) as HTMLElement;
    const rightReel = document.querySelector(
      '.stat-column[data-side="right"] .stat-column__reel'
    ) as HTMLElement;

    const preventScroll = (e: WheelEvent | TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    if (leftReel) {
      leftReel.addEventListener("wheel", preventScroll, { passive: false });
      leftReel.addEventListener("touchmove", preventScroll, { passive: false });
    }
    if (rightReel) {
      rightReel.addEventListener("wheel", preventScroll, { passive: false });
      rightReel.addEventListener("touchmove", preventScroll, {
        passive: false,
      });
    }

    return () => {
      if (leftReel) {
        leftReel.removeEventListener("wheel", preventScroll);
        leftReel.removeEventListener("touchmove", preventScroll);
      }
      if (rightReel) {
        rightReel.removeEventListener("wheel", preventScroll);
        rightReel.removeEventListener("touchmove", preventScroll);
      }
    };
  }, []);

  // 当结果更新时，滚动到结果位置（结果在列表中间）
  useEffect(() => {
    if (!isAutoRolling && leftResult) {
      const leftReel = document.querySelector(
        '.stat-column[data-side="left"] .stat-column__reel'
      ) as HTMLElement;
      if (leftReel) {
        // 结果在列表中间位置
        const resultIndex = Math.floor((generateRollList(leftResult).length - 1) / 2);
          requestAnimationFrame(() => {
            const itemHeight = 20;
            const reelHeight = leftReel.clientHeight;
            const targetScrollTop =
              resultIndex * itemHeight - reelHeight / 2 + itemHeight / 2;

          // 立即滚动到结果位置（无动画）
          leftReel.scrollTop = Math.max(0, targetScrollTop);
          });
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftResult, isAutoRolling]);

  useEffect(() => {
    if (!isAutoRolling && rightResult) {
      const rightReel = document.querySelector(
        '.stat-column[data-side="right"] .stat-column__reel'
      ) as HTMLElement;
      if (rightReel) {
        // 结果在列表中间位置
        const resultIndex = Math.floor((generateRollList(rightResult).length - 1) / 2);
          requestAnimationFrame(() => {
            const itemHeight = 20;
            const reelHeight = rightReel.clientHeight;
            const targetScrollTop =
              resultIndex * itemHeight - reelHeight / 2 + itemHeight / 2;

          // 立即滚动到结果位置（无动画）
          rightReel.scrollTop = Math.max(0, targetScrollTop);
          });
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rightResult, isAutoRolling]);

  // 格式化属性显示文本，去掉属性名中的"(%)"
  const formatStatDisplay = useCallback((statName: string, statValue: number | string): string => {
    // 去掉属性名中的"(%)"，保留其他内容
    const cleanedStatName = statName.replace(/\(%\)/g, '');
    return `${cleanedStatName}+${statValue}`;
  }, []);

  return (
    <div className="bless">
      {/* 洗练类型选择 */}
      <div className="bless__type-selector">
        <button
          className={`type-btn ${
            blessingType === "goddess" ? "is-active" : ""
          }`}
          onClick={() => {
            if (blessingType !== "goddess") {
              // 切换时清空预设属性
              setTarget1(null);
              setTarget2(null);
              setLeftResult(null);
              setRightResult(null);
              setSuccessMessage({ show: false, count: 0 });
            }
            setBlessingType("goddess");
          }}
          disabled={isAutoRolling}
        >
          <span className="type-btn__icon">✨</span>
          <span className="type-btn__label">女神的祝福</span>
        </button>
        <button
          className={`type-btn ${blessingType === "demon" ? "is-active" : ""}`}
          onClick={() => {
            if (blessingType !== "demon") {
              // 切换时清空预设属性
              setTarget1(null);
              setTarget2(null);
              setLeftResult(null);
              setRightResult(null);
              setSuccessMessage({ show: false, count: 0 });
            }
            setBlessingType("demon");
          }}
          disabled={isAutoRolling}
        >
          <span className="type-btn__icon">🔥</span>
          <span className="type-btn__label">恶魔的祝福</span>
        </button>
      </div>

      <div className="bless__container">
      <div className="bless__board">
        {/* 标题栏 */}
        <div className="bless__header">
          <div className="bless__header-content">
            <h3 className="bless__title">
              {blessingType === "goddess" ? "女神的祝福" : "恶魔的祝福"}
            </h3>
            <span className="bless__subtitle">Item to awake</span>
          </div>
        </div>

        <div className="bless__item-slot">
          <div className="bless__item-wrapper">
            <img
              src="https://madrigalinside.com/wp-content/plugins/project-m/images/item/fclospysuit.png"
              alt="awakening preview"
            />
          </div>
        </div>

        <div className="bless__stats">
          {/* 左侧属性 */}
          <div
            data-side="left"
            key={`left-${leftRollTokenRef.current}`}
            className={`stat-column ${
              isAutoRolling ? "is-auto-rolling" : ""
            }`}
          >
            <div className="stat-column__title">Stat 1</div>
            <div className="stat-column__reel">
              <div className="stat-column__track">
                {leftStatList.map((item, idx) => {
                  const isCurrentResult =
                    leftResult && 
                    item.statType === leftResult.statType && 
                    'isTarget' in item && 
                    (item as { isTarget: boolean }).isTarget;
                  return (
                    <div
                      key={`left-${idx}-${
                        leftResult
                          ? leftRollTokenRef.current
                          : "static"
                      }`}
                      className={`stat-column__item ${
                        isCurrentResult ? "is-current" : ""
                      }`}
                    >
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={`stat-column__result ${leftResult && isMaxValue(leftResult) ? "is-max" : ""}`}>
              {leftResult
                ? formatStatDisplay(leftResult.statName, leftResult.statValue)
                : "0"}
              {leftResult && isMaxValue(leftResult) && (
                <span className="max-badge">MAX</span>
              )}
            </div>
          </div>

          {/* 右侧属性 */}
          <div
            data-side="right"
            key={`right-${rightRollTokenRef.current}`}
            className={`stat-column ${
              isAutoRolling ? "is-auto-rolling" : ""
            }`}
          >
            <div className="stat-column__title">Stat 2</div>
            <div className="stat-column__reel">
              <div className="stat-column__track">
                {rightStatList.map((item, idx) => {
                  const isCurrentResult =
                    rightResult && 
                    item.statType === rightResult.statType && 
                    'isTarget' in item && 
                    (item as { isTarget: boolean }).isTarget;
                  return (
                    <div
                      key={`right-${idx}-${
                        rightResult
                          ? rightRollTokenRef.current
                          : "static"
                      }`}
                      className={`stat-column__item ${
                        isCurrentResult ? "is-current" : ""
                      }`}
                    >
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={`stat-column__result ${rightResult && isMaxValue(rightResult) ? "is-max" : ""}`}>
              {rightResult
                ? formatStatDisplay(rightResult.statName, rightResult.statValue)
                : "0"}
              {rightResult && isMaxValue(rightResult) && (
                <span className="max-badge">MAX</span>
              )}
            </div>
          </div>
        </div>

        <div className="bless__actions">
          <div className="bless__actions-content">
            <div className="actions-main">
            <button
              className="flyff-button"
                onClick={handleStartRollWithPreset}
                disabled={isAutoRolling}
            >
                {target1 || target2 ? "开始洗练" : "开始"}
            </button>
              {isAutoRolling && (target1 || target2) && (
              <button
                  className="bless__stop-btn"
                  onClick={handleStopAutoRoll}
              >
                  停止 ({rollCount}次)
              </button>
            )}
            </div>
          </div>
        </div>
      </div>

        {/* 预设属性选择 */}
        <div className="bless__preset">
          <h4 className="preset-title">预设属性</h4>
          {/* 成功提示 */}
          {successMessage.show && (
            <div className="success-message">
              <span className="success-text">
                达成目标！共洗练 {successMessage.count} 次
              </span>
              <button
                className="success-close-btn"
                onClick={() => setSuccessMessage({ show: false, count: 0 })}
              >
                ×
              </button>
            </div>
          )}
          <div className="preset-options">
            <div className="preset-option">
              <div className="preset-label">属性1</div>
              <button
                className="preset-btn"
                onClick={() => setShowTargetSelector("target1")}
                disabled={isAutoRolling}
              >
                {target1
                  ? formatStatDisplay(
                      blessingData.find((st) => st.statType === target1.statType)?.statName || "",
                      target1.statValue
                    )
                  : "点击选择"}
              </button>
              {target1 && (
                <button
                  className="preset-clear-btn"
                  onClick={() => setTarget1(null)}
                  disabled={isAutoRolling}
                >
                  ×
                </button>
              )}
            </div>
            <div className="preset-option">
              <div className="preset-label">属性2</div>
              <button
                className="preset-btn"
                onClick={() => setShowTargetSelector("target2")}
                disabled={isAutoRolling}
              >
                {target2
                  ? formatStatDisplay(
                      blessingData.find((st) => st.statType === target2.statType)?.statName || "",
                      target2.statValue
                    )
                  : "点击选择"}
              </button>
              {target2 && (
                <button
                  className="preset-clear-btn"
                  onClick={() => setTarget2(null)}
                  disabled={isAutoRolling}
                >
                  ×
                </button>
              )}
            </div>
            {/* 目标关系选择 */}
            {(target1 || target2) && (
              <div className="preset-option">
                <div className="preset-label">目标关系</div>
                <div className="preset-relation">
                  <button
                    className={`preset-relation-btn ${targetRelation === "and" ? "is-active" : ""}`}
                    onClick={() => setTargetRelation("and")}
                    disabled={isAutoRolling}
                  >
                    同时满足
                  </button>
                  <button
                    className={`preset-relation-btn ${targetRelation === "or" ? "is-active" : ""}`}
                    onClick={() => setTargetRelation("or")}
                    disabled={isAutoRolling}
                  >
                    满足一个
                  </button>
                </div>
              </div>
            )}
            {/* 洗练频率选择 - 只有在有预设属性时才显示 */}
            {(target1 || target2) && (
              <div className="preset-option">
                <div className="preset-label">洗练频率</div>
                <div className="preset-frequency">
                  {ROLL_FREQUENCY_OPTIONS.map((freq) => (
                    <button
                      key={freq}
                      className={`preset-frequency-btn ${rollFrequency === freq ? "is-active" : ""}`}
                      onClick={() => setRollFrequency(freq)}
                      disabled={isAutoRolling}
                    >
                      {freq}次/秒
                    </button>
                  ))}
                </div>
              </div>
            )}
            {/* 洗练历史按钮 */}
            <div className="preset-option">
              <button
                className="bless__history-btn"
                onClick={() => setShowHistoryModal(true)}
                disabled={history.length === 0}
              >
                洗练历史 {history.length > 0 && `(${history.length})`}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 洗练历史弹窗 */}
      {showHistoryModal && (
        <div
          className="history-modal-overlay"
          onClick={() => setShowHistoryModal(false)}
        >
          <div className="history-modal" onClick={(e) => e.stopPropagation()}>
            <div className="history-modal__header">
              <h4 className="history-modal__title">洗练历史 ({history.length}条)</h4>
              <button
                className="history-modal__close"
                onClick={() => setShowHistoryModal(false)}
              >
                ×
              </button>
            </div>
            <div className="history-modal__content">
              {history.length > 0 ? (
                <div className="history-list">
                  {history.map((record, idx) => {
                    const leftIsMax = isMaxValue(record.left);
                    const rightIsMax = isMaxValue(record.right);
                    return (
                      <div key={idx} className="history-item">
                        <div className="history-item__time">
                          {new Date(record.timestamp).toLocaleTimeString()}
                        </div>
                        <div className="history-item__stats">
                          <span className={`history-stat ${leftIsMax ? "is-max" : ""}`}>
                            {formatStatDisplay(record.left.statName, record.left.statValue)}
                            {leftIsMax && <span className="max-badge">MAX</span>}
                          </span>
                          <span className="history-separator"> + </span>
                          <span className={`history-stat ${rightIsMax ? "is-max" : ""}`}>
                            {formatStatDisplay(record.right.statName, record.right.statValue)}
                            {rightIsMax && <span className="max-badge">MAX</span>}
                          </span>
                        </div>
                        <div className="history-item__type">
                          {record.blessingType === "goddess" ? "✨ 天使" : "🔥 恶魔"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="history-empty">暂无洗练历史</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 属性选择器弹窗 */}
      {showTargetSelector && (
        <div
          className="target-selector-overlay"
          onClick={() => setShowTargetSelector(null)}
        >
          <div className="target-selector" onClick={(e) => e.stopPropagation()}>
            <div className="target-selector__header">
              <h4 className="target-selector__title">选择目标属性</h4>
              <button
                className="target-selector__close"
                onClick={() => setShowTargetSelector(null)}
              >
                ×
              </button>
            </div>
            <div className="target-selector__content">
              {blessingData.map((statType) => (
                <div key={statType.statType} className="target-selector__group">
                  <div className="target-selector__group-title">
                    {statType.statName}
                  </div>
                  <div className="target-selector__options">
                    {statType.stats.map((stat, idx) => {
                      const isSelected =
                        showTargetSelector === "target1"
                          ? target1?.statType === statType.statType &&
                            target1?.statValue === stat.statValue
                          : target2?.statType === statType.statType &&
                            target2?.statValue === stat.statValue;
                      return (
                        <button
                          key={idx}
                          className={`target-selector__option ${
                            isSelected ? "is-selected" : ""
                          }`}
                          onClick={() =>
                            handleSetTarget(
                              showTargetSelector,
                              statType.statType,
                              stat.statValue
                            )
                          }
                        >
                          {stat.statValue}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
