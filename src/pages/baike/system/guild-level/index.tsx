import React, { useMemo, useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import "./index.less";
import lvl from "../../../../config/guildLevel/lvl.json";
import donationExpData from "../../../../config/guildLevel/donationExpData.json";

interface ItemIcon {
  id: number;
  name: {
    en: string;
    [key: string]: string;
  };
  icon: string;
  [key: string]: unknown;
}

interface ItemsApiResponse {
  items: ItemIcon[];
  allItemsCount: number;
}

interface GuildLevelData {
  level: number;
  exp: number;
  penya: number;
  totalExp: number;
  totalPenya: number;
  memberCapacity: number;
  color: string;
  colorName: string;
}

// 工会等级数据
const guildLevelData: GuildLevelData[] = lvl

// 捐赠战利品为工会提供经验数据
const donationExpDataList = donationExpData

export const GuildLevel = () => {
  // 图标映射状态 (questItem_en -> icon URL)
  const [iconMap, setIconMap] = useState<Record<string, string>>({});
  const [iconsLoading, setIconsLoading] = useState(true);

  // 获取物品图标数据
  useEffect(() => {
    const fetchItemIcons = async () => {
      try {
        setIconsLoading(true);
        const response = await fetch("https://flyffipedia.com/api/static/items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lang: 0,
            page: 0,
            pageSize: 2000,
            sortLabel: null,
            sortDirection: "None",
            searchString: "",
            classes: null,
            categories: ["Booty"],
            subcategories: null,
            rarities: null,
            consumables: null,
            abilities: null,
            premiums: null,
            twoHandeds: null,
            sexs: null,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }

        const data: ItemsApiResponse = await response.json();
        
        // 创建 questItem_en -> icon URL 的映射
        const map: Record<string, string> = {};
        data.items.forEach((item) => {
          if (item.name?.en && item.icon) {
            const iconUrl = `https://flyffipedia.com/Icons/Items/${item.icon}`;
            map[item.name.en] = iconUrl;
          }
        });

        setIconMap(map);
      } catch (error) {
        console.error("Failed to fetch item icons:", error);
      } finally {
        setIconsLoading(false);
      }
    };

    fetchItemIcons();
  }, []);

  // 当前等级所需经验和金币图表配置
  const expPenyaOption: EChartsOption = useMemo(
    () => ({
      backgroundColor: "transparent",
      textStyle: {
        color: "rgba(255, 255, 255, 0.85)",
        fontSize: 14,
      },
      title: {
        text: "工会升级每级所需经验和金币",
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
          if (Array.isArray(params) && params[0]) {
            const level = parseInt(params[0].name as string, 10);
            const data = guildLevelData[level - 1];
            let result = `<span style="color: rgba(255, 217, 77, 0.9); font-weight: bold;">等级: ${level}</span><br/>`;
            params.forEach((param) => {
              if (
                param &&
                typeof param === "object" &&
                "seriesName" in param &&
                "value" in param
              ) {
                if (param.seriesName === "经验 (Exp)") {
                  result += `${param.marker} <span style="color: rgba(255, 255, 255, 0.85);">${
                    param.seriesName
                  }: ${(param.value as number).toLocaleString()}</span><br/>`;
                } else if (param.seriesName === "金币 (Penya)") {
                  result += `${param.marker} <span style="color: rgba(255, 255, 255, 0.85);">${
                    param.seriesName
                  }: ${(param.value as number).toLocaleString()}</span><br/>`;
                }
              }
            });
            result += `<span style="color: rgba(255, 255, 255, 0.85);">颜色: ${data.colorName} (${data.color})</span><br/>`;
            result += `<span style="color: rgba(255, 255, 255, 0.85);">成员容量: ${data.memberCapacity}</span>`;
            return result;
          }
          return "";
        },
      },
      legend: {
        data: ["经验 (Exp)", "金币 (Penya)"],
        top: 40,
        textStyle: {
          color: "rgba(255, 255, 255, 0.85)",
        },
      },
      grid: {
        left: "10%",
        right: "8%",
        bottom: "15%",
        top: "20%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: guildLevelData.map((d) => d.level.toString()),
        axisLabel: {
          interval: 9, // 每10个显示一个标签
          fontSize: 12,
          rotate: 45,
          color: "rgba(255, 255, 255, 0.7)",
        },
        axisLine: { show: true, lineStyle: { color: "rgba(255, 255, 255, 0.3)", width: 2 } },
        axisTick: { show: true, lineStyle: { color: "rgba(255, 255, 255, 0.3)" } },
        name: "工会等级",
        nameLocation: "middle",
        nameGap: 40,
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.9)",
          fontSize: 14,
          fontWeight: "bold",
        },
      },
      yAxis: [
        {
          type: "value",
          name: "经验 (Exp)",
          nameLocation: "middle",
          nameGap: 60,
          axisLine: { show: true, lineStyle: { color: "#4a90e2", width: 2 } },
          axisTick: { show: true, lineStyle: { color: "#4a90e2" } },
          axisLabel: {
            color: "rgba(255, 255, 255, 0.7)",
            formatter: (value: number) => {
              if (value >= 1e9) return (value / 1e9).toFixed(1) + "B";
              if (value >= 1e6) return (value / 1e6).toFixed(1) + "M";
              if (value >= 1e3) return (value / 1e3).toFixed(1) + "K";
              return value.toString();
            },
          },
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
        {
          type: "value",
          name: "金币 (Penya)",
          nameLocation: "middle",
          nameGap: 60,
          position: "right",
          axisLine: { show: true, lineStyle: { color: "#ff6b6b", width: 2 } },
          axisTick: { show: true, lineStyle: { color: "#ff6b6b" } },
          axisLabel: {
            color: "rgba(255, 255, 255, 0.7)",
            formatter: (value: number) => {
              if (value >= 1e9) return (value / 1e9).toFixed(1) + "B";
              if (value >= 1e6) return (value / 1e6).toFixed(1) + "M";
              if (value >= 1e3) return (value / 1e3).toFixed(1) + "K";
              return value.toString();
            },
          },
          nameTextStyle: {
            color: "#ff6b6b",
            fontSize: 14,
            fontWeight: "bold",
          },
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: "经验 (Exp)",
          type: "line",
          yAxisIndex: 0,
          data: guildLevelData.map((d) => d.exp),
          symbol: "circle",
          symbolSize: 4,
          lineStyle: { width: 2, color: "#4a90e2" },
          itemStyle: { color: "#4a90e2" },
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
        },
        {
          name: "金币 (Penya)",
          type: "line",
          yAxisIndex: 1,
          data: guildLevelData.map((d) => d.penya),
          symbol: "circle",
          symbolSize: 4,
          lineStyle: { width: 2, color: "#ff6b6b" },
          itemStyle: { color: "#ff6b6b" },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "rgba(255, 107, 107, 0.3)" },
                { offset: 1, color: "rgba(255, 107, 107, 0.05)" },
              ],
            },
          },
        },
      ],
      dataZoom: [
        {
          type: "slider",
          show: true,
          xAxisIndex: [0],
          start: 0,
          end: 100,
          bottom: 10,
          textStyle: {
            color: "rgba(255, 255, 255, 0.7)",
          },
          borderColor: "rgba(255, 255, 255, 0.2)",
          fillerColor: "rgba(74, 144, 226, 0.3)",
          handleStyle: {
            color: "#4a90e2",
          },
          dataBackground: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.3)",
            },
            areaStyle: {
              color: "rgba(255, 255, 255, 0.05)",
            },
          },
        },
        {
          type: "inside",
          xAxisIndex: [0],
        },
      ],
    }),
    []
  );

  // 累计经验和金币图表配置
  const totalExpPenyaOption: EChartsOption = useMemo(
    () => ({
      backgroundColor: "transparent",
      textStyle: {
        color: "rgba(255, 255, 255, 0.85)",
        fontSize: 14,
      },
      title: {
        text: "升级累计经验和金币",
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
          if (Array.isArray(params) && params[0]) {
            const level = parseInt(params[0].name as string, 10);
            const data = guildLevelData[level - 1];
            let result = `<span style="color: rgba(255, 217, 77, 0.9); font-weight: bold;">等级: ${level}</span><br/>`;
            params.forEach((param) => {
              if (
                param &&
                typeof param === "object" &&
                "seriesName" in param &&
                "value" in param
              ) {
                if (param.seriesName === "累计经验 (Total Exp)") {
                  result += `${param.marker} <span style="color: rgba(255, 255, 255, 0.85);">${
                    param.seriesName
                  }: ${(param.value as number).toLocaleString()}</span><br/>`;
                } else if (param.seriesName === "累计金币 (Total Penya)") {
                  result += `${param.marker} <span style="color: rgba(255, 255, 255, 0.85);">${
                    param.seriesName
                  }: ${(param.value as number).toLocaleString()}</span><br/>`;
                }
              }
            });
            result += `<span style="color: rgba(255, 255, 255, 0.85);">颜色: ${data.colorName} (${data.color})</span><br/>`;
            result += `<span style="color: rgba(255, 255, 255, 0.85);">成员容量: ${data.memberCapacity}</span>`;
            return result;
          }
          return "";
        },
      },
      legend: {
        data: ["累计经验 (Total Exp)", "累计金币 (Total Penya)"],
        top: 40,
        textStyle: {
          color: "rgba(255, 255, 255, 0.85)",
        },
      },
      grid: {
        left: "10%",
        right: "8%",
        bottom: "15%",
        top: "20%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: guildLevelData.map((d) => d.level.toString()),
        axisLabel: {
          interval: 9,
          fontSize: 12,
          rotate: 45,
          color: "rgba(255, 255, 255, 0.7)",
        },
        axisLine: { show: true, lineStyle: { color: "rgba(255, 255, 255, 0.3)", width: 2 } },
        axisTick: { show: true, lineStyle: { color: "rgba(255, 255, 255, 0.3)" } },
        name: "工会等级",
        nameLocation: "middle",
        nameGap: 40,
        nameTextStyle: {
          color: "rgba(255, 255, 255, 0.9)",
          fontSize: 14,
          fontWeight: "bold",
        },
      },
      yAxis: [
        {
          type: "value",
          name: "累计经验 (Total Exp)",
          nameLocation: "middle",
          nameGap: 60,
          axisLine: { show: true, lineStyle: { color: "#4a90e2", width: 2 } },
          axisTick: { show: true, lineStyle: { color: "#4a90e2" } },
          axisLabel: {
            color: "rgba(255, 255, 255, 0.7)",
            formatter: (value: number) => {
              if (value >= 1e9) return (value / 1e9).toFixed(1) + "B";
              if (value >= 1e6) return (value / 1e6).toFixed(1) + "M";
              if (value >= 1e3) return (value / 1e3).toFixed(1) + "K";
              return value.toString();
            },
          },
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
        {
          type: "value",
          name: "累计金币 (Total Penya)",
          nameLocation: "middle",
          nameGap: 60,
          position: "right",
          axisLine: { show: true, lineStyle: { color: "#ff6b6b", width: 2 } },
          axisTick: { show: true, lineStyle: { color: "#ff6b6b" } },
          axisLabel: {
            color: "rgba(255, 255, 255, 0.7)",
            formatter: (value: number) => {
              if (value >= 1e9) return (value / 1e9).toFixed(1) + "B";
              if (value >= 1e6) return (value / 1e6).toFixed(1) + "M";
              if (value >= 1e3) return (value / 1e3).toFixed(1) + "K";
              return value.toString();
            },
          },
          nameTextStyle: {
            color: "#ff6b6b",
            fontSize: 14,
            fontWeight: "bold",
          },
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: "累计经验 (Total Exp)",
          type: "line",
          yAxisIndex: 0,
          data: guildLevelData.map((d) => d.totalExp),
          symbol: "circle",
          symbolSize: 4,
          lineStyle: { width: 2, color: "#4a90e2" },
          itemStyle: { color: "#4a90e2" },
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
        },
        {
          name: "累计金币 (Total Penya)",
          type: "line",
          yAxisIndex: 1,
          data: guildLevelData.map((d) => d.totalPenya),
          symbol: "circle",
          symbolSize: 4,
          lineStyle: { width: 2, color: "#ff6b6b" },
          itemStyle: { color: "#ff6b6b" },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "rgba(255, 107, 107, 0.3)" },
                { offset: 1, color: "rgba(255, 107, 107, 0.05)" },
              ],
            },
          },
        },
      ],
      dataZoom: [
        {
          type: "slider",
          show: true,
          xAxisIndex: [0],
          start: 0,
          end: 100,
          bottom: 10,
          textStyle: {
            color: "rgba(255, 255, 255, 0.7)",
          },
          borderColor: "rgba(255, 255, 255, 0.2)",
          fillerColor: "rgba(74, 144, 226, 0.3)",
          handleStyle: {
            color: "#4a90e2",
          },
          dataBackground: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.3)",
            },
            areaStyle: {
              color: "rgba(255, 255, 255, 0.05)",
            },
          },
        },
        {
          type: "inside",
          xAxisIndex: [0],
        },
      ],
    }),
    []
  );

  // 颜色区间说明
  const colorRanges = [
    { color: "#FFFFFF", name: "白色", range: "1-10级" },
    { color: "#FFCC33", name: "浅黄色", range: "11-20级" },
    { color: "#AB27A4", name: "紫色", range: "21-30级" },
    { color: "#339933", name: "绿色", range: "31-40级" },
    { color: "#3366FD", name: "蓝色", range: "41-49级" },
    { color: "#FF3333", name: "红色", range: "50-59级" },
    { color: "#3BA4B3", name: "蓝绿色", range: "60-69级" },
    { color: "#BA38BC", name: "热紫色", range: "70-79级" },
    { color: "#FFAFCC", name: "粉色", range: "80-89级" },
    { color: "#FA824C", name: "珊瑚色", range: "90-99级" },
    { color: "#0DF7F6", name: "霓虹蓝", range: "100级" },
  ];

  return (
    <div className="baike-content">
      {/* 颜色区间说明 */}
      <div className="baike-info-card">
        <h3
          style={{
            marginTop: 0,
            marginBottom: "16px",
            color: "rgba(255, 255, 255, 0.9)",
          }}
        >
          工会名称颜色说明
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {colorRanges.map((item) => (
            <div
              key={item.color}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "8px",
                background: "rgba(255, 255, 255, 0.02)",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              <span
                style={{
                  color: item.color,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  textShadow: item.color === "#FFFFFF" ? "0 0 2px rgba(0, 0, 0, 0.8)" : "0 0 4px rgba(0, 0, 0, 0.3)",
                }}
              >
                Koala
              </span>
              <span
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "0.85rem",
                }}
              >
                {item.name} ({item.range})
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="baike-chart-container">
        <ReactECharts
          option={expPenyaOption}
          style={{ height: "500px", width: "100%" }}
          opts={{ renderer: "canvas" }}
        />
      </div>

      <div className="baike-chart-container">
        <ReactECharts
          option={totalExpPenyaOption}
          style={{ height: "500px", width: "100%" }}
          opts={{ renderer: "canvas" }}
        />
      </div>

      {/* 工会仓库说明 */}
      <div className="baike-info-card">
        <h3
          style={{
            marginTop: 0,
            marginBottom: "20px",
            color: "rgba(255, 255, 255, 0.9)",
          }}
        >
          工会仓库说明
        </h3>
        
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          {/* 基础容量说明 */}
          <div
            style={{
              padding: "16px",
              background: "rgba(255, 255, 255, 0.02)",
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <h4
              style={{
                margin: "0 0 12px 0",
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              基础容量
            </h4>
            <ul
              style={{
                margin: 0,
                paddingLeft: "20px",
                color: "rgba(255, 255, 255, 0.85)",
                lineHeight: 1.8,
                fontSize: "0.9rem",
              }}
            >
              <li>等级 1：<strong style={{ color: "rgba(255, 217, 77, 0.9)" }}>43</strong> 个槽位</li>
              <li>每提升 1 级：<strong style={{ color: "rgba(255, 217, 77, 0.9)" }}>+1</strong> 个槽位</li>
              <li>最大基础容量：<strong style={{ color: "rgba(255, 217, 77, 0.9)" }}>190</strong> 个槽位</li>
            </ul>
            <div
              style={{
                marginTop: "12px",
                padding: "8px 12px",
                background: "rgba(74, 144, 226, 0.1)",
                borderRadius: "6px",
                fontSize: "0.85rem",
                color: "rgba(255, 255, 255, 0.75)",
                borderLeft: "3px solid rgba(74, 144, 226, 0.6)",
              }}
            >
              <strong>计算公式：</strong>43 + (等级 - 1) = 当前槽位
            </div>
          </div>

          {/* 额外容量说明 */}
          <div
            style={{
              padding: "16px",
              background: "rgba(255, 255, 255, 0.02)",
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <h4
              style={{
                margin: "0 0 12px 0",
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              额外容量
            </h4>
            <div
              style={{
                color: "rgba(255, 255, 255, 0.85)",
                lineHeight: 1.8,
                fontSize: "0.9rem",
              }}
            >
              <p style={{ margin: "0 0 8px 0" }}>
                使用 <strong style={{ color: "rgba(255, 217, 77, 0.9)" }}>&ldquo;工会额外背包&rdquo;</strong> 道具可解锁额外槽位：
              </p>
              <ul
                style={{
                  margin: "8px 0",
                  paddingLeft: "20px",
                  lineHeight: 1.8,
                }}
              >
                <li>每组：<strong style={{ color: "rgba(255, 217, 77, 0.9)" }}>24</strong> 个槽位</li>
                <li>最多解锁：<strong style={{ color: "rgba(255, 217, 77, 0.9)" }}>2</strong> 组</li>
                <li>额外容量总计：<strong style={{ color: "rgba(255, 217, 77, 0.9)" }}>48</strong> 个槽位</li>
              </ul>
            </div>
            <div
              style={{
                marginTop: "12px",
                padding: "8px 12px",
                background: "rgba(255, 107, 107, 0.1)",
                borderRadius: "6px",
                fontSize: "0.85rem",
                color: "rgba(255, 255, 255, 0.75)",
                borderLeft: "3px solid rgba(255, 107, 107, 0.6)",
              }}
            >
              <strong>最大总容量：</strong>190 + 48 = <strong style={{ color: "rgba(255, 217, 77, 0.9)" }}>238</strong> 个槽位
            </div>
          </div>
        </div>
      </div>

      {/* 捐赠战利品为工会提供经验数据 */}
      <div className="baike-section">
        <div className="donation-exp-table-wrapper">
          <h3
            style={{
              marginTop: 0,
              marginBottom: "16px",
              color: "rgba(255, 255, 255, 0.9)",
            }}
          >
            捐赠战利品为工会提供经验数据（机翻名称，见谅）
          </h3>
          <div className="donation-exp-table-container">
            <table className="baike-table donation-exp-table">
              <thead>
                <tr>
                  <th className="icon-column">图标</th>
                  <th>物品名称</th>
                  <th>掉落怪物</th>
                  <th>怪物等级</th>
                  <th>NPC售价</th>
                  <th>工会贡献</th>
                </tr>
              </thead>
              <tbody>
                {donationExpDataList.map((item, index) => {
                  const iconUrl = iconMap[item.questItem_en];
                  // 获取怪物图标名称（如果有空格，只取第一个单词）
                  const monsterIconName = item.droppedByMonster_en.split(" ")[0].toLowerCase();
                  return (
                    <tr key={index}>
                      <td className="icon-column">
                        <div className="item-icon-wrapper">
                          {iconsLoading ? (
                            <div className="item-icon-placeholder loading">加载中...</div>
                          ) : iconUrl ? (
                            <>
                              <img
                                src={iconUrl}
                                alt={item.questItem_en}
                                className="item-icon"
                                onError={(e) => {
                                  // 如果图片加载失败，隐藏图片并显示占位符
                                  const target = e.currentTarget;
                                  target.style.display = "none";
                                  const placeholder = target.nextElementSibling as HTMLElement;
                                  if (placeholder) {
                                    placeholder.classList.remove("hidden");
                                  }
                                }}
                              />
                              <div className="item-icon-placeholder hidden">-</div>
                            </>
                          ) : (
                            <div className="item-icon-placeholder">-</div>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="item-name-cell">
                          <span className="item-name-en">{item.questItem_en}</span>
                          <span className="item-name-cn">{item.questItem_cn}</span>
                        </div>
                      </td>
                      <td>
                        <div className="monster-cell">
                          <div className="monster-icon-wrapper">
                            <img
                              src={`https://flyffipedia.com/Icons/Monsters/${monsterIconName}.png`}
                              alt={item.droppedByMonster_en}
                              className="monster-icon"
                              onError={(e) => {
                                // 如果图片加载失败，隐藏图片并显示占位符
                                const target = e.currentTarget;
                                target.style.display = "none";
                                const placeholder = target.nextElementSibling as HTMLElement;
                                if (placeholder) {
                                  placeholder.classList.remove("hidden");
                                }
                              }}
                            />
                            <div className="monster-icon-placeholder hidden">-</div>
                          </div>
                          <div className="monster-name-cell">
                            <span className="monster-name-en">{item.droppedByMonster_en}</span>
                            <span className="monster-name-cn">{item.droppedByMonster_cn}</span>
                          </div>
                        </div>
                      </td>
                      <td>{item.monsterLevel}</td>
                      <td>💲{item.npcSellingPrice.toLocaleString()}</td>
                      <td className="guild-contribution-cell">{item.guildContribution}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
