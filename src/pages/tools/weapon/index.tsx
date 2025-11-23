import React, { useState, useCallback, useRef, useMemo } from "react";
import weaponData from "../../../config/weapon.json";
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
  });
  const [messages, setMessages] = useState<WeaponMessage[]>([]);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showWeaponSelectorModal, setShowWeaponSelectorModal] = useState(false);

  // 统计次数
  const [cleanNum, setCleanNum] = useState(0); // 洗基础次数
  const [cleanUNum, setCleanUNum] = useState(0); // 洗黄字次数
  const [cleanOrangeNum, setCleanOrangeNum] = useState(0); // 洗橙字次数
  const [wakeUpNum, setWakeUpNum] = useState(0); // 技能唤醒次数
  const [attributeWakeUpNum, setAttributeWakeUpNum] = useState(0); // 属性唤醒次数

  const messageIdRef = useRef(0);

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
        addMessage("选择的武器不存在！", "warning");
        return;
      }

      setCurrentWeapon(weapon);

      // 初始化上词条
      const abilities = weapon.abilities.map((ability) =>
        generateRandomAbility(ability)
      );
      setCurrentStats({
        abilities,
        yellowStats: [],
        orangeStats: [],
      });

      // 重置统计
      setCleanNum(0);
      setCleanUNum(0);
      setCleanOrangeNum(0);
      setWakeUpNum(0);
      setAttributeWakeUpNum(0);
      setMessages([]);

      addMessage(`已选择${weapon.name}！`, "success");
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

  // 洗固定武器数值（上词条）
  const cleanAbilities = useCallback(() => {
    if (!currentWeapon) {
      addMessage("请先选择武器！", "warning");
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
    addMessage(`洗基础词条第${cleanNum + 1}次`, "info");
  }, [currentWeapon, cleanNum, generateRandomAbility, addMessage]);

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

  // 洗黄字
  const cleanYellowStats = useCallback(() => {
    if (!currentWeapon) {
      addMessage("请先选择武器！", "warning");
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
    addMessage(`洗黄字第${cleanUNum + 1}次`, "info");
  }, [currentWeapon, cleanUNum, generateRandomAbility, addMessage]);

  // 洗橙字（逻辑和洗黄字一样，但数值上限是黄字的一半）
  const cleanOrangeStats = useCallback(() => {
    if (!currentWeapon) {
      addMessage("请先选择武器！", "warning");
      return;
    }

    const arr = [...currentWeapon.possibleRandomStats];
    const value1 = arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
    const value2 = arr.splice(Math.floor(Math.random() * arr.length), 1)[0];

    const orangeStats = [value1, value2].map((ability) => {
      // 数值上限是黄字的一半
      const maxLimit = Math.floor(ability.max / 2);
      return generateRandomAbilityWithLimit(ability, maxLimit);
    });

    setCurrentStats((prev) => ({
      ...prev,
      orangeStats,
    }));

    setCleanOrangeNum((prev) => prev + 1);
    addMessage(`洗橙字第${cleanOrangeNum + 1}次`, "info");
  }, [
    currentWeapon,
    cleanOrangeNum,
    generateRandomAbilityWithLimit,
    addMessage,
  ]);

  // 洗唤醒
  const wakeUp = useCallback(() => {
    if (
      !currentWeapon ||
      !currentWeapon.wakeUpList ||
      currentWeapon.wakeUpList.length === 0
    ) {
      addMessage("该武器没有唤醒列表！", "warning");
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
        "success"
      );
    } else {
      addMessage(
        `技能唤醒第${wakeUpNum + 1}次：${wakeUp.name}${
          wakeUp.name === "治疗" ? "+" : "造成伤害+"
        }${percentage}%`,
        "info"
      );
    }
  }, [currentWeapon, wakeUpNum, addMessage]);

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
        addMessage("请先选择武器！", "warning");
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
          "success"
        );
      } else {
        addMessage(
          `属性唤醒第${attributeWakeUpNum + 1}次：${
            attribute.name
          }${selectedValue}`,
          "info"
        );
      }
    },
    [currentWeapon, attributeWakeUpNum, addMessage]
  );

  // 洗属性唤醒（多属性）
  const attributeWakeUpMultiple = useCallback(
    (attributeIndices: number[]) => {
      if (!currentWeapon) {
        addMessage("请先选择武器！", "warning");
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
        "info"
      );
    },
    [currentWeapon, attributeWakeUpNum, addMessage]
  );

  // 洗属性唤醒（随机）
  const attributeWakeUp = useCallback(() => {
    const myArray = [0, 1, 2, 3]; // 0:智力 1:体质 2:力量 3:敏捷
    const numList = getRandomValues(myArray, 2);
    if (numList.length === 2) {
      attributeWakeUpMultiple(numList);
    } else {
      attributeWakeUpSingle(numList[0]);
    }
  }, [getRandomValues, attributeWakeUpSingle, attributeWakeUpMultiple]);

  return (
    <div className="weapon-tool">
      <div className="weapon-tool-container">
        {/* 中间：武器信息和操作 */}
        <div className="weapon-tool-center">
          <div className="weapon-tool-section">
            <div className="weapon-tool-section-header">
              <h3 className="weapon-tool-section-title">武器信息</h3>
              <button
                className="weapon-log-btn"
                onClick={() => setShowLogModal(true)}
                disabled={messages.length === 0}
              >
                日志 {messages.length > 0 && `(${messages.length})`}
              </button>
            </div>
            <div className="weapon-result">
              {currentWeapon ? (
                <div className="weapon-tooltip-container">
                  {/* 武器图标展示 (放在Tooltip外部或顶部) */}
                  <div className="weapon-display-image">
                    <img
                      src={currentWeapon.imgUrl}
                      alt={currentWeapon.name}
                      className="weapon-preview-img"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/img/items/default.png";
                      }}
                    />
                  </div>

                  {/* 仿游戏Tooltip */}
                  <div className="weapon-tooltip">
                    <div className="weapon-tooltip-border-container">
                      {/* 头部：名称、强化、孔位 */}
                      <div className="weapon-header">
                        <div className="weapon-name">
                          <span className="name-text">
                            <span className="ultimate-badge">Ultimate</span>
                            {currentWeapon.name} 智力的 +10 (10/10)
                          </span>
                        </div>
                        <div className="weapon-type">{currentWeapon.type}</div>
                      </div>

                      {/* 基础属性 (青色/白色) */}
                      <div className="weapon-stats-block">
                        <div className="stat-row cyan">
                          <span className="stat-row-label">攻击力:</span>{" "}
                          {currentWeapon.minAttack} ~ {currentWeapon.maxAttack}
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

            {/* 操作按钮 */}
            <div className="weapon-actions-content">
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

              <div className="weapon-actions-grid">
                <button
                  className="weapon-action-btn"
                  onClick={cleanAbilities}
                  disabled={!currentWeapon}
                >
                  洗基础词条 ({cleanNum})
                </button>
                <button
                  className="weapon-action-btn"
                  onClick={cleanYellowStats}
                  disabled={!currentWeapon}
                >
                  洗黄字 ({cleanUNum})
                </button>
                <button
                  className="weapon-action-btn"
                  onClick={cleanOrangeStats}
                  disabled={!currentWeapon}
                >
                  洗橙字 ({cleanOrangeNum})
                </button>
                <button
                  className="weapon-action-btn"
                  onClick={wakeUp}
                  disabled={
                    !currentWeapon ||
                    !currentWeapon?.wakeUpList ||
                    currentWeapon.wakeUpList.length === 0
                  }
                >
                  洗唤醒 ({wakeUpNum})
                </button>
                <button
                  className="weapon-action-btn"
                  onClick={attributeWakeUp}
                  disabled={!currentWeapon}
                >
                  洗属性唤醒 ({attributeWakeUpNum})
                </button>
              </div>
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
              <div className="weapon-selector-grid-compact">
                {weapons.map((weapon) => (
                  <div
                    key={weapon.id}
                    className={`weapon-selector-item-compact ${
                      selectedWeaponId === weapon.id ? "is-selected" : ""
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
          </div>
        </div>
      )}

      {/* 日志弹窗 */}
      {showLogModal && (
        <div
          className="weapon-log-modal-overlay"
          onClick={() => setShowLogModal(false)}
        >
          <div
            className="weapon-log-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="weapon-log-modal__header">
              <h4 className="weapon-log-modal__title">
                操作日志 ({messages.length}条)
              </h4>
              <button
                className="weapon-log-modal__close"
                onClick={() => setShowLogModal(false)}
              >
                ×
              </button>
            </div>
            <div className="weapon-log-modal__content">
              {messages.length > 0 ? (
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
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
