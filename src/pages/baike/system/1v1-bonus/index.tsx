import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import "./index.less";

// 高亮文本组件
const HighlightText: React.FC<{ text: string; highlights: string[] }> = ({
  text,
  highlights,
}) => {
  if (highlights.length === 0) {
    return <>{text}</>;
  }

  const pattern = highlights
    .map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const regex = new RegExp(`(${pattern})`, "g");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, idx) => {
        const isHighlight = highlights.includes(part);
        return isHighlight ? (
          <span key={idx} className="highlight">
            {part}
          </span>
        ) : (
          <React.Fragment key={idx}>{part}</React.Fragment>
        );
      })}
    </>
  );
};

export const OneV1Bonus = () => {

  const option: EChartsOption = useMemo(
    () => ({
      backgroundColor: "transparent",
      textStyle: {
        color: "rgba(255, 255, 255, 0.85)",
        fontSize: 14,
      },
      title: {
        text: "1v1 经验值与掉落率加成",
        left: "center",
        textStyle: {
          fontSize: 18,
          fontWeight: "bold",
          color: "rgba(255, 255, 255, 0.9)",
        },
      },
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(15, 18, 28, 0.95)",
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 1,
        textStyle: {
          color: "rgba(255, 255, 255, 0.85)",
        },
        formatter: (params) => {
          const param = Array.isArray(params) ? params[0] : params;
          if (param && typeof param === "object" && "name" in param && "value" in param) {
            return `<span style="color: rgba(255, 217, 77, 0.9); font-weight: bold;">等级: ${param.name}</span><br/><span style="color: rgba(74, 144, 226, 0.9);">倍率: ${param.value}x</span>`;
          }
          return "";
        },
      },
      grid: {
        left: "10%",
        right: "8%",
        bottom: "10%",
        top: "15%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: ["lv30", "40", "60", "80", "100", "120", "141", "160", "165"],
        axisLabel: {
          interval: 0,
          fontSize: 12,
          color: "rgba(255, 255, 255, 0.7)",
        },
        axisLine: { show: true, lineStyle: { color: "rgba(255, 255, 255, 0.3)", width: 2 } },
        axisTick: { show: true, lineStyle: { color: "rgba(255, 255, 255, 0.3)" } },
        name: "怪物等级",
        nameLocation: "middle",
        nameGap: 30,
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.9)",
          fontSize: 14,
          fontWeight: "bold",
        },
      },
      yAxis: {
        type: "value",
        min: 1.2,
        max: 2.1,
        interval: 0.2,
        axisLabel: {
          formatter: "{value}x",
          color: "rgba(255, 255, 255, 0.7)",
        },
        name: "倍率",
        nameLocation: "middle",
        nameGap: 50,
        axisLine: { show: true, lineStyle: { color: "#4a90e2", width: 2 } },
        axisTick: { show: true, lineStyle: { color: "#4a90e2" } },
        nameTextStyle: {
          color: "#4a90e2",
          fontSize: 14,
          fontWeight: "bold",
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(255, 255, 255, 0.1)",
            type: "dashed",
          },
        },
      },
      series: [
        {
          name: "倍率",
          type: "line",
          data: [1.2, 1.23, 1.26, 1.29, 1.32, 1.35, 1.904423, 2.025, 2.025],
          symbol: "circle",
          symbolSize: 8,
          lineStyle: { width: 3, color: "#4a90e2" },
          itemStyle: { color: "#4a90e2", borderColor: "#fff", borderWidth: 2 },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "rgba(74, 144, 226, 0.3)" },
                { offset: 1, color: "rgba(74, 144, 226, 0.05)" },
              ],
            },
          },
          markPoint: {
            data: [
              { name: "1.2", value: "1.2", xAxis: 0, yAxis: 1.2 },
              { name: "1.35", value: "1.35", xAxis: 5, yAxis: 1.35 },
              { name: "1.904", value: "1.904", xAxis: 6, yAxis: 1.904423 },
              { name: "2.025", value: "2.025", xAxis: 7, yAxis: 2.025 },
            ],
            label: { show: true, position: "top", fontSize: 11 },
            itemStyle: { color: "#4a90e2" },
          },
          markLine: {
            data: [
              { xAxis: 0, lineStyle: { type: "dashed", color: "#ff7875", width: 1 } },
              { xAxis: 5, lineStyle: { type: "dashed", color: "#ffa940", width: 1 } },
              { xAxis: 6, lineStyle: { type: "dashed", color: "#ffa940", width: 1 } },
              { xAxis: 7, lineStyle: { type: "dashed", color: "#52c41a", width: 1 } },
              { xAxis: 8, lineStyle: { type: "dashed", color: "#faad14", width: 1 } },
            ],
          },
        },
      ],
    }),
    []
  );

  return (
    <div className="baike-content">
      <div className="baike-info-card">
        <h3 style={{ marginTop: 0, marginBottom: "16px", color: "rgba(255, 255, 255, 0.9)" }}>
          单点加成说明
        </h3>
        <p style={{ color: "rgba(255, 255, 255, 0.85)", lineHeight: 1.7, marginBottom: "16px" }}>
          当玩家使用单一目标攻击或技能对怪物造成至少
          <HighlightText text="80%" highlights={["80%"]} />
          的击杀伤害时，可以获得额外的经验值与掉落率加成。
        </p>
      </div>

      <div className="baike-chart-container">
        <ReactECharts
          option={option}
          style={{ height: "500px", width: "100%" }}
          opts={{ renderer: "canvas" }}
        />
      </div>

      <div className="baike-info-card">
        <h3 style={{ marginTop: 0, marginBottom: "16px", color: "rgba(255, 255, 255, 0.9)" }}>
          加成规则
        </h3>
        <div className="info-items">
          <div className="info-item">
            <p>
              等级 <HighlightText text="30" highlights={["30"]} />
               {" "}及以上的低阶怪物、普通怪物和队长怪物，被单一目标的攻击或技能造成至少{" "}
              <HighlightText text="80%" highlights={["80%"]} />
              {" "}的击杀伤害后，其经验值与掉落率将获得提升。
            </p>
          </div>
          <div className="info-item">
            <p>
              目前 <HighlightText text="30" highlights={["30"]} />
              {" "}级怪物的经验与掉落率提升幅度为{" "}
              <HighlightText text="20%" highlights={["20%"]} />
              ，并随怪物等级递增，在怪物等级{" "}
              <HighlightText text="120~140" highlights={["120", "140"]} />
              {" "}区间时提升至 <HighlightText text="35%" highlights={["35%"]} />。
            </p>
          </div>
          <div className="info-item">
            <p>
              新增 <strong>单点</strong> 模式下的经验值与掉落奖励等级机制。此前该奖励固定为{" "}
              <HighlightText text="35%" highlights={["35%"]} />
              ，现调整为从 <HighlightText text="141" highlights={["141"]} />
              {" "}级时的 <HighlightText text="90.4423%" highlights={["90.4423%"]} />
              {" "}逐步提升至 <HighlightText text="160" highlights={["160"]} />
              {" "}级时的 <HighlightText text="102.5%" highlights={["102.5%"]} />
              （<HighlightText text="161" highlights={["161"]} />
              {" "}级及以上时保持 <HighlightText text="102.5%" highlights={["102.5%"]} />）。
            </p>
          </div>
          <div className="info-item">
            <p>
              <strong>单点</strong> 模式的经验与掉落奖励基于怪物等级。这意味着，只要您的实力足以挑战{" "}
              <HighlightText text="141" highlights={["141"]} />
              {" "}级及以上的怪物，即可享受该经验加成。
            </p>
          </div>
        </div>
      </div>

      <div className="key-points-card">
        <h3 style={{ marginTop: 0, marginBottom: "16px", color: "rgba(255, 255, 255, 0.9)" }}>
          关键数值
        </h3>
        <div className="key-points-grid">
          <div className="key-point-item">
            <div className="key-point-label">起始等级</div>
            <div className="key-point-value">
              <HighlightText text="30级" highlights={["30"]} />
            </div>
            <div className="key-point-desc">加成生效的最低怪物等级</div>
          </div>
          <div className="key-point-item">
            <div className="key-point-label">起始倍率</div>
            <div className="key-point-value">
              <HighlightText text="1.2x" highlights={["1.2"]} />
            </div>
            <div className="key-point-desc">30级怪物的加成倍率</div>
          </div>
          <div className="key-point-item">
            <div className="key-point-label">常规上限</div>
            <div className="key-point-value">
              <HighlightText text="1.35x" highlights={["1.35"]} />
            </div>
            <div className="key-point-desc">120~140级的加成倍率</div>
          </div>
          <div className="key-point-item">
            <div className="key-point-label">单点起始</div>
            <div className="key-point-value">
              <HighlightText text="1.904x" highlights={["1.904"]} />
            </div>
            <div className="key-point-desc">141级单点模式起始倍率</div>
          </div>
          <div className="key-point-item">
            <div className="key-point-label">单点上限</div>
            <div className="key-point-value">
              <HighlightText text="2.025x" highlights={["2.025"]} />
            </div>
            <div className="key-point-desc">160级及以上的最大倍率</div>
          </div>
        </div>
      </div>
    </div>
  );
};
