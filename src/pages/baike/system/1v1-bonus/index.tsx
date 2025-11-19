import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import { OrderedList } from "../../../../components/OrderedList";
import "./index.less";

export const OneV1Bonus = () => {
  const listItems = [
    "等级 30 及以上的低阶怪物、普通怪物和队长怪物，被单一目标的攻击或技能造成至少 80% 的击杀伤害后，其经验值与掉落率将获得提升。",
    "目前 30 级怪物的经验与掉落率提升幅度为 20%，并随怪物等级递增，在怪物等级 120~140 区间时提升至 35%。",
    "新增 单点 模式下的经验值与掉落奖励等级机制。此前该奖励固定为 35%，现调整为从 141 级时的 90.4423% 逐步提升至 160 级时的 102.5%（161 级及以上时保持 102.5%）。",
    "单点 模式的经验与掉落奖励基于怪物等级。这意味着，只要您的实力足以挑战 141 级及以上的怪物，即可享受该经验加成。",
  ];

  const option: EChartsOption = useMemo(
    () => ({
      title: {
        text: "1v1 经验值与掉落率加成",
        left: "center",
        textStyle: { fontSize: 18, fontWeight: "bold" },
      },
      tooltip: {
        trigger: "axis",
        formatter: (params) => {
          const param = Array.isArray(params) ? params[0] : params;
          if (param && typeof param === 'object' && 'name' in param && 'value' in param) {
            return `等级: ${param.name}<br/>倍率: ${param.value}`;
          }
          return '';
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
        axisLabel: { interval: 0, fontSize: 12 },
        axisLine: { show: true, lineStyle: { color: "#4a90e2" } },
        name: "怪物等级",
        nameLocation: "middle",
        nameGap: 30,
      },
      yAxis: {
        type: "value",
        min: 1.2,
        max: 2.1,
        interval: 0.2,
        axisLabel: { formatter: "{value}" },
        name: "倍率",
        nameLocation: "middle",
        nameGap: 50,
        axisLine: { show: true, lineStyle: { color: "#4a90e2" } },
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
      <div className="baike-chart-container">
        <ReactECharts
          option={option}
          style={{ height: "500px", width: "100%" }}
          opts={{ renderer: "canvas" }}
        />
      </div>
      <OrderedList items={listItems} variant="spacious" />
    </div>
  );
};
