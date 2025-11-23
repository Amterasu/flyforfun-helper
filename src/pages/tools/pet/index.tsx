import React, { useState, useCallback, useRef, useMemo } from "react";
import raisedPetData from "../../../config/pet/raisedPet.json";
import petDefectRecyclingData from "../../../config/petDefectRecycling.json";
import "./index.less";

interface RaisedPetData {
  pets: Array<{
    item: {
      name: {
        cns: string;
      };
      icon: string;
    };
    values: number[];
    parameterLocalization: {
      cns: string;
    };
    rate: boolean;
  }>;
}

interface PetDefectRecyclingData {
  pet_defect_recycling: {
    recycling_data: Array<{
      target_pet_tier: string;
      sacrificed_pets: Array<{
        tier: string;
        probabilities: Record<string, string>;
      }>;
    }>;
  };
}

// 等级映射
const tierMap: Record<string, string> = {
  F级: "F",
  E级: "E",
  D级: "D",
  C级: "C",
  B级: "B",
  A级: "A",
  S级: "S",
};

const nextLevelMap: Record<string, string> = {
  F级: "E级",
  E级: "D级",
  D级: "C级",
  C级: "B级",
  B级: "A级",
  A级: "S级",
};

// 每个等级的最大数值（根据概率表确定）
const maxLevelByTier: Record<string, number> = {
  E级: 2,
  D级: 3,
  C级: 4,
  B级: 5,
  A级: 7,
  S级: 9,
};

interface PetInfo {
  id: string;
  name: string;
  attributeStr: string;
  value_list: number[];
  cur: string;
  icon: string;
}

interface Message {
  id: number;
  text: string;
  type: "info" | "success" | "warning";
}

export const PetTool = () => {
  const data = raisedPetData as unknown as RaisedPetData;
  const recyclingData =
    petDefectRecyclingData as unknown as PetDefectRecyclingData;

  // 转换 raisedPet 数据为宠物格式
  const availablePets = useMemo(() => {
    return data.pets
      .filter((pet) => pet && pet.item && pet.values && pet.values.length > 0)
      .map((pet) => {
        const cur = pet.rate ? "%" : "";
        const attributeStr = pet.parameterLocalization?.cns || "属性";

        return {
          id: pet.item.icon,
          name: pet.item.name.cns,
          attributeStr,
          value_list: pet.values,
          cur,
          icon: pet.item.icon,
        };
      });
  }, [data]);

  // 构建概率映射表：targetTier -> sacrificedTier -> level -> probability
  const probabilityMap = useMemo(() => {
    const map: Record<
      string,
      Record<string, Array<{ level: number; probability: number }>>
    > = {};

    recyclingData.pet_defect_recycling.recycling_data.forEach((item) => {
      const targetTier = item.target_pet_tier;
      map[targetTier] = {};

      item.sacrificed_pets.forEach((sacrificed) => {
        const sacrificedTier = sacrificed.tier;
        map[targetTier][sacrificedTier] = [];

        // 解析概率字符串（如 "70%" -> 0.7）
        Object.entries(sacrificed.probabilities).forEach(([lvKey, probStr]) => {
          const level = parseInt(lvKey.replace("Lv", ""));
          const probability = parseFloat(probStr.replace("%", "")) / 100;
          map[targetTier][sacrificedTier].push({ level, probability });
        });

        // 按level排序
        map[targetTier][sacrificedTier].sort((a, b) => a.level - b.level);
      });
    });

    return map;
  }, [recyclingData]);

  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [nowPet, setNowPet] = useState<PetInfo | null>(null);
  const [petTier, setPetTier] = useState<string>("F级"); // 当前正在献祭的等级
  const [currentLevel, setCurrentLevel] = useState<number>(1); // 当前等级的数值等级（1-9）
  const [tierLevels, setTierLevels] = useState<Record<string, number>>({}); // 记录每个等级（F-S）的数值等级
  const [totalSacrificeCount, setTotalSacrificeCount] = useState<number>(0);
  const [tierSacrificeCount, setTierSacrificeCount] = useState<
    Record<string, number>
  >({});
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSacrificing, setIsSacrificing] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);

  const messageIdRef = useRef(0);
  const processingRef = useRef(false);
  const stateRef = useRef({ petTier: "F级", currentLevel: 1 });

  // 根据概率表计算献祭结果（只考虑同等级献祭）
  const calculateSacrificeResult = useCallback(
    (tier: string): number | null => {
      if (tier === "F级") return null;

      const tierCode = tierMap[tier];
      if (!tierCode) return null;

      const tierProbs = probabilityMap[tierCode]?.[tierCode];
      if (!tierProbs || tierProbs.length === 0) return null;

      const random = Math.random();
      let cumulativeProb = 0;

      for (const probItem of tierProbs) {
        cumulativeProb += probItem.probability;
        if (random < cumulativeProb) {
          return probItem.level;
        }
      }

      // 如果随机数超出范围，返回最后一个等级
      return tierProbs[tierProbs.length - 1].level;
    },
    [probabilityMap]
  );

  // 添加消息
  const addMessage = useCallback(
    (text: string, type: "info" | "success" | "warning" = "info") => {
      setMessages((prev) => [
        { id: messageIdRef.current++, text, type },
        ...prev,
      ]);
    },
    []
  );

  // 初始化宠物（选择宠物时自动调用）
  const initializePet = useCallback(
    (petId: string) => {
      const pet = availablePets.find((p) => p.id === petId);
      if (!pet) {
        addMessage("选择的宠物不存在！", "warning");
        return;
      }

      setNowPet(pet);
      setPetTier("F级");
      setCurrentLevel(1);
      setTierLevels({ F级: 1 }); // F级初始数值等级为1
      setTotalSacrificeCount(0);
      setTierSacrificeCount({});
      setMessages([]);
      stateRef.current = { petTier: "F级", currentLevel: 1 };
      addMessage(`已选择${pet.name}！初始等级：F级，数值等级：1`, "success");
    },
    [availablePets, addMessage]
  );

  // 选择宠物时自动初始化
  React.useEffect(() => {
    if (selectedPetId) {
      const pet = availablePets.find((p) => p.id === selectedPetId);
      if (pet && (!nowPet || nowPet.id !== selectedPetId)) {
        initializePet(selectedPetId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPetId]);

  // 执行一次献祭（使用ref获取最新状态）
  const performSacrifice = useCallback(() => {
    const { petTier: latestTier, currentLevel: latestLevel } = stateRef.current;

    if (!nowPet || latestTier === "F级") {
      return { upgraded: false, newLevel: latestLevel };
    }

    const resultLevel = calculateSacrificeResult(latestTier);
    if (resultLevel === null) {
      addMessage("无法计算献祭结果！", "warning");
      return { upgraded: false, newLevel: latestLevel };
    }

    // 如果结果等级小于等于当前等级，不更新（根据需求说明）
    if (resultLevel <= latestLevel) {
      setTotalSacrificeCount((prev) => prev + 1);
      setTierSacrificeCount((prev) => {
        const newCount = (prev[latestTier] || 0) + 1;
        addMessage(
          `${latestTier}献祭第${newCount}次：获得数值等级${resultLevel}（未提升，当前为${latestLevel}）`,
          "info"
        );
        return {
          ...prev,
          [latestTier]: newCount,
        };
      });
      return { upgraded: false, newLevel: latestLevel };
    }

    // 更新等级
    stateRef.current.currentLevel = resultLevel;
    setCurrentLevel(resultLevel);
    setTierLevels((prev) => ({ ...prev, [latestTier]: resultLevel })); // 更新该等级的数值等级
    setTotalSacrificeCount((prev) => prev + 1);
    setTierSacrificeCount((prev) => {
      const newCount = (prev[latestTier] || 0) + 1;
      const actualValue = nowPet.value_list[resultLevel - 1];
      addMessage(
        `${latestTier}献祭第${newCount}次：数值等级提升到${resultLevel}，增加值：${actualValue}${nowPet.cur}`,
        "success"
      );
      return {
        ...prev,
        [latestTier]: newCount,
      };
    });

    return { upgraded: true, newLevel: resultLevel };
  }, [nowPet, calculateSacrificeResult, addMessage]);

  // 开始自动献祭流程
  const startSacrifice = useCallback(async () => {
    if (processingRef.current) return;

    if (!nowPet) {
      addMessage("请先孵化一只宠物！", "warning");
      return;
    }

    // 更新ref状态
    stateRef.current = { petTier, currentLevel };

    // 如果是F级，自动升级到E级
    if (petTier === "F级") {
      const nextTier = "E级";
      stateRef.current.petTier = nextTier;
      stateRef.current.currentLevel = 1;
      setPetTier(nextTier);
      setCurrentLevel(1);
      setTierLevels((prev) => ({ ...prev, [nextTier]: 1 })); // E级初始数值等级为1
      addMessage(`宠物自动升级到${nextTier}！`, "success");
      // 等待状态更新
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // 如果已经是S级且达到最大值，不允许献祭
    if (petTier === "S级" && currentLevel >= maxLevelByTier["S级"]) {
      addMessage("S级宠物已达到最大值，无法继续献祭！", "warning");
      return;
    }

    processingRef.current = true;
    setIsProcessing(true);
    setIsSacrificing(true);

    try {
      while (processingRef.current) {
        const { petTier: latestTier, currentLevel: latestLevel } =
          stateRef.current;

        // 检查是否达到当前等级的最大值
        const maxLevel = maxLevelByTier[latestTier];
        if (latestLevel >= maxLevel) {
          // 尝试升级到下一级
          const nextTier = nextLevelMap[latestTier];
          if (!nextTier) {
            // 已经是S级，无法继续
            addMessage("已达到S级最大值，献祭完成！", "success");
            break;
          }

          // 升级
          stateRef.current.petTier = nextTier;
          stateRef.current.currentLevel = 1;
          setPetTier(nextTier);
          setCurrentLevel(1);
          setTierLevels((prev) => ({ ...prev, [nextTier]: 1 })); // 新等级初始数值等级为1
          addMessage(`宠物升级到${nextTier}！`, "success");

          // 等待状态更新
          await new Promise((resolve) => setTimeout(resolve, 100));

          // 升级后自动用同等宠物献祭一次
          const resultLevel = calculateSacrificeResult(nextTier);
          if (resultLevel !== null && resultLevel > 1) {
            stateRef.current.currentLevel = resultLevel;
            setCurrentLevel(resultLevel);
            setTierLevels((prev) => ({ ...prev, [nextTier]: resultLevel })); // 更新该等级的数值等级
            setTotalSacrificeCount((prev) => prev + 1);
            setTierSacrificeCount((prev) => {
              const newCount = 1;
              const actualValue = nowPet.value_list[resultLevel - 1];
              addMessage(
                `${nextTier}献祭第${newCount}次：数值等级提升到${resultLevel}，增加值：${actualValue}${nowPet.cur}`,
                "success"
              );
              return {
                ...prev,
                [nextTier]: newCount,
              };
            });
          } else {
            setTotalSacrificeCount((prev) => prev + 1);
            setTierSacrificeCount((prev) => {
              const newCount = 1;
              addMessage(
                `${nextTier}献祭第${newCount}次：获得数值等级${
                  resultLevel || 1
                }（未提升）`,
                "info"
              );
              return {
                ...prev,
                [nextTier]: newCount,
              };
            });
          }

          await new Promise((resolve) => setTimeout(resolve, 100));
          continue;
        }

        // 执行献祭
        await new Promise((resolve) => setTimeout(resolve, 100));
        performSacrifice();

        // 等待状态更新
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    } catch (error) {
      console.error("献祭过程出错：", error);
      addMessage("献祭过程出错！", "warning");
    } finally {
      processingRef.current = false;
      setIsProcessing(false);
      setIsSacrificing(false);
    }
  }, [
    nowPet,
    petTier,
    currentLevel,
    calculateSacrificeResult,
    performSacrifice,
    addMessage,
  ]);

  // 计算当前属性总值（所有等级增加值的总和）
  const totalValue = useMemo(() => {
    if (!nowPet) return 0;

    // 累加所有等级（F、E、D、C、B、A、S）的增加值
    let total = 0;
    const allTiers = ["F级", "E级", "D级", "C级", "B级", "A级", "S级"];

    allTiers.forEach((tier) => {
      const level = tierLevels[tier] || 0;
      if (level > 0) {
        // values数组索引从0开始，level从1开始，所以需要减1
        const value = nowPet.value_list[level - 1] || 0;
        total += value;
      }
    });

    return total;
  }, [nowPet, tierLevels]);

  return (
    <div className="pet-tool">
      <div className="pet-tool-container">
        {/* 左侧：选择宠物 */}
        <div className="pet-tool-left">
          <div className="pet-tool-section">
            <h3 className="pet-tool-section-title">选择宠物</h3>
            <div className="pet-selector">
              <div className="pet-selector-grid">
                {availablePets.map((pet) => (
                  <button
                    key={pet.id}
                    className={`pet-selector-item ${
                      selectedPetId === pet.id ? "is-selected" : ""
                    }`}
                    onClick={() => setSelectedPetId(pet.id)}
                    disabled={isProcessing}
                  >
                    <img
                      src={`https://flyffipedia.com/Icons/Items/${pet.icon}`}
                      alt={pet.name}
                      className="pet-selector-icon"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/img/items/petegg.png";
                      }}
                    />
                    <span className="pet-selector-name">{pet.name}</span>
                    <span className="pet-selector-attr">
                      {pet.attributeStr}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 中间：宠物信息 */}
        <div className="pet-tool-center">
          <div className="pet-tool-section">
            <div className="pet-tool-section-header">
              <h3 className="pet-tool-section-title">宠物信息</h3>
              <button
                className="pet-log-btn"
                onClick={() => setShowLogModal(true)}
                disabled={messages.length === 0}
              >
                日志 {messages.length > 0 && `(${messages.length})`}
              </button>
            </div>
            <div className="pet-result">
              {nowPet ? (
                <div className="pet-info-card">
                  <div className="pet-info-card-content">
                    <div className="pet-info-title">{nowPet.name}</div>
                    <div className="pet-info-content">
                      <div className="pet-image-container">
                        <img
                          src={`https://flyffipedia.com/Icons/Items/${nowPet.icon}`}
                          alt={nowPet.name}
                          className="pet-image"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/img/items/petegg.png";
                          }}
                        />
                      </div>
                      <div className="pet-stats">
                        <div className="pet-stat-row">
                          <span className="pet-stat-label">等级</span>
                          <span className="pet-stat-value">{petTier}</span>
                        </div>
                        <div className="pet-stat-row">
                          <span className="pet-stat-label">属性</span>
                          <span className="pet-stat-value">
                            {nowPet.attributeStr}+
                            <span className="pet-stat-number">
                              {totalValue}
                            </span>
                          </span>
                        </div>
                        <div className="pet-stat-row">
                          <span className="pet-stat-label">能量</span>
                          <div className="pet-progress-bar pet-progress-energy">
                            <div
                              className="pet-progress-fill"
                              style={{ width: "97.22%" }}
                            ></div>
                            <span className="pet-progress-text">350 / 360</span>
                          </div>
                        </div>
                        <div className="pet-stat-row">
                          <span className="pet-stat-label">Exp</span>
                          <div className="pet-progress-bar pet-progress-exp">
                            <div
                              className="pet-progress-fill"
                              style={{ width: "99.99%" }}
                            ></div>
                            <span className="pet-progress-text">99.99%</span>
                          </div>
                        </div>
                        <div className="pet-stat-row">
                          <span className="pet-stat-label">祝福</span>
                          <div className="pet-progress-bar pet-progress-blessing">
                            <div
                              className="pet-progress-fill"
                              style={{ width: "4.17%" }}
                            ></div>
                            <span className="pet-progress-text">5 / 120</span>
                          </div>
                        </div>
                        <div className="pet-tier-indicators">
                          {[
                            "F级",
                            "E级",
                            "D级",
                            "C级",
                            "B级",
                            "A级",
                            "S级",
                          ].map((tier) => {
                            const level = tierLevels[tier] || 0;
                            const isActive = tier === petTier;

                            let tierType = "red";
                            if (tier === "B级") tierType = "green";
                            else if (tier === "A级") tierType = "gold";
                            else if (
                              ["F级", "E级", "D级", "C级", "S级"].includes(tier)
                            )
                              tierType = "red";

                            // 提取字母 (F级 -> F)
                            const tierLetter = tier.replace("级", "");

                            return (
                              <div
                                key={tier}
                                className={`pet-tier-indicator ${
                                  isActive ? "pet-tier-indicator-active" : ""
                                } ${
                                  level > 0
                                    ? "pet-tier-indicator-has-level"
                                    : ""
                                }`}
                                title={`${tier}: ${
                                  level > 0 ? `数值等级${level}` : "未设置"
                                }`}
                                data-tier-type={tierType}
                                data-tier-letter={tierLetter}
                              >
                                {level > 0 ? (
                                  <>
                                    <img
                                      src={`/petnumber/${level}.png`}
                                      alt={`${level}`}
                                      className="pet-tier-indicator-level"
                                    />
                                  </>
                                ) : (
                                  <span className="pet-tier-indicator-empty">
                                    -
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="pet-empty-state">请先选择一只宠物</div>
              )}
            </div>
            <div className="pet-actions-content">
              <div className="pet-sacrifice-item">
                <div className="pet-sacrifice-slot" title="消耗品">
                  <img
                    src="/yaozi.jpg"
                    alt="腰子"
                    className="pet-sacrifice-icon"
                  />
                </div>
              </div>
              <div className="actions-main">
                <button
                  className="pet-start-btn"
                  onClick={startSacrifice}
                  disabled={isProcessing || !nowPet || !selectedPetId}
                >
                  {isSacrificing ? "献祭中..." : "开始献祭"}
                </button>
                {isSacrificing && (
                  <button
                    className="pet-stop-btn"
                    onClick={() => {
                      processingRef.current = false;
                      setIsProcessing(false);
                      setIsSacrificing(false);
                    }}
                  >
                    停止
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 日志弹窗 */}
      {showLogModal && (
        <div
          className="pet-log-modal-overlay"
          onClick={() => setShowLogModal(false)}
        >
          <div className="pet-log-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pet-log-modal__header">
              <h4 className="pet-log-modal__title">
                献祭日志 ({messages.length}条)
                {totalSacrificeCount > 0 && ` - 总次数: ${totalSacrificeCount}`}
              </h4>
              <button
                className="pet-log-modal__close"
                onClick={() => setShowLogModal(false)}
              >
                ×
              </button>
            </div>
            <div className="pet-log-modal__content">
              {messages.length > 0 ? (
                <>
                  {Object.keys(tierSacrificeCount).length > 0 && (
                    <div className="pet-log-summary">
                      <div className="pet-log-summary-title">
                        各等级献祭次数：
                      </div>
                      {Object.entries(tierSacrificeCount).map(
                        ([tier, count]) => (
                          <div key={tier} className="pet-log-summary-item">
                            {tier}: {count}次
                          </div>
                        )
                      )}
                    </div>
                  )}
                  <div className="pet-log-list">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`pet-log-item pet-log-item-${msg.type}`}
                      >
                        {msg.text}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="pet-log-empty">暂无日志</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
