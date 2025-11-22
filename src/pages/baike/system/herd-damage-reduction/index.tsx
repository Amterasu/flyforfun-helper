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

const damageData = [
  { monster: "第1到第8只", damage: "100%", value: 100, position: 4 },
  { monster: "第9只", damage: "90%", value: 90, position: 9 },
  { monster: "第10只", damage: "81%", value: 81, position: 10 },
  { monster: "第11只", damage: "72.9%", value: 72.9, position: 11 },
  { monster: "第12只", damage: "65.61%", value: 65.61, position: 12 },
  { monster: "第13只", damage: "59.05%", value: 59.05, position: 13 },
  { monster: "第14只", damage: "53.14%", value: 53.14, position: 14 },
  { monster: "第15只", damage: "47.83%", value: 47.83, position: 15 },
  { monster: "第16只", damage: "43.05%", value: 43.05, position: 16 },
  { monster: "第17只", damage: "38.74%", value: 38.74, position: 17 },
  { monster: "第18只", damage: "34.87%", value: 34.87, position: 18 },
  { monster: "第19只", damage: "31.38%", value: 31.38, position: 19 },
  { monster: "第20只", damage: "28.24%", value: 28.24, position: 20 },
];

export const HerdDamageReduction = () => {
  // 生成图表数据：前8只为100%，之后按0.9^(n-8)计算
  const chartData = useMemo(() => {
    const xAxisData: string[] = [];
    const seriesData: number[] = [];

    for (let i = 1; i <= 20; i++) {
      xAxisData.push(`第${i}只`);
      if (i <= 8) {
        seriesData.push(100);
      } else {
        seriesData.push(100 * Math.pow(0.9, i - 8));
      }
    }

    return { xAxisData, seriesData };
  }, []);

  const option: EChartsOption = useMemo(
    () => ({
      backgroundColor: "transparent",
      textStyle: {
        color: "rgba(255, 255, 255, 0.85)",
        fontSize: 14,
      },
      title: {
        text: "群体伤害减少",
        left: "center",
        textStyle: {
          fontSize: 18,
          fontWeight: "bold",
          color: "rgba(255, 255, 255, 0.9)",
        },
      },
      tooltip: {
        trigger: "axis",
        formatter: (params) => {
          const param = Array.isArray(params) ? params[0] : params;
          if (
            param &&
            typeof param === "object" &&
            "name" in param &&
            "value" in param
          ) {
            const value = param.value as number;
            return `${param.name}<br/>伤害: ${value.toFixed(2)}%`;
          }
          return "";
        },
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderColor: "rgba(255, 217, 77, 0.5)",
        borderWidth: 1,
        textStyle: { color: "#fff" },
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
        data: chartData.xAxisData,
        axisLabel: {
          interval: 0,
          fontSize: 11,
          color: "rgba(255, 255, 255, 0.7)",
          rotate: 45,
        },
        axisLine: { show: true, lineStyle: { color: "#4a90e2" } },
        name: "怪物序号",
        nameLocation: "middle",
        nameGap: 30,
        nameTextStyle: { color: "rgba(255, 255, 255, 0.8)" },
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 100,
        interval: 10,
        axisLabel: {
          formatter: "{value}%",
          fontSize: 11,
          color: "rgba(255, 255, 255, 0.7)",
        },
        name: "伤害百分比",
        nameLocation: "middle",
        nameGap: 50,
        axisLine: { show: true, lineStyle: { color: "#4a90e2" } },
        nameTextStyle: { color: "rgba(255, 255, 255, 0.8)" },
        splitLine: {
          lineStyle: { color: "rgba(255, 255, 255, 0.1)", type: "dashed" },
        },
      },
      series: [
        {
          name: "伤害百分比",
          type: "line",
          data: chartData.seriesData,
          symbol: "circle",
          symbolSize: 6,
          lineStyle: { width: 2, color: "#4a90e2" },
          itemStyle: { color: "#4a90e2", borderColor: "#fff", borderWidth: 1 },
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
          markLine: {
            data: [
              {
                xAxis: 7.5,
                lineStyle: { type: "dashed", color: "#ff7875", width: 2 },
              },
            ],
            label: {
              show: true,
              position: "insideEndTop",
              formatter: "前8只: 100%",
              color: "#ff7875",
              fontSize: 11,
            },
          },
        },
      ],
    }),
    [chartData]
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

      <div className="baike-section">
        <div className="baike-info-item">
          <p>
            群怪时会跳出“herd”的一个伤害提示
          </p>
        </div>
      </div>
      <div className="baike-section">
        <div className="baike-info-item">
          <p>
            当同一技能攻击的怪物数量大于
            <HighlightText text="8" highlights={["8"]} />
            时，第n只怪物将受到伤害会减少
          </p>
        </div>

        <div className="damage-reduction-grid">
          {damageData.map((item, idx) => (
            <div key={idx} className="damage-item-card">
              <div className="damage-monster">{item.monster}</div>
              <div className="damage-value">
                <HighlightText text={item.damage} highlights={[item.damage]} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
