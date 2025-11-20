import React from 'react'
import './index.less'

// 服务器变更数据
const serverChanges = [
  {
    server: 'LAWOLF',
    changes: [
      { content: '彩虹竞速（道具）', current: '周六 18:00', new: '周六 19:00' },
      { content: '马德里加尔锦标赛', current: '每日 21:00', new: '每日 20:00' },
    ],
  },
  {
    server: 'MIA',
    changes: [
      { content: '彩虹竞速（道具）', current: '周六 18:00', new: '周六 19:00' },
      { content: '马德里加尔锦标赛', current: '每日 21:00', new: '每日 20:00' },
    ],
  },
  {
    server: 'GLAPHAN',
    changes: [
      { content: '彩虹竞速（道具）', current: '周六 18:00', new: '周六 19:00' },
      { content: '马德里加尔锦标赛', current: '每日 21:00', new: '每日 20:00' },
    ],
  },
  {
    server: 'TOTEMIA',
    changes: [
      { content: 'Lv80 工会战', current: '周三 21:00', new: '周三 20:00' },
      { content: '彩虹竞速（道具）', current: '周六 18:00', new: '周六 19:00' },
    ],
  },
  {
    server: 'BURUDENG',
    changes: [
      { content: 'Lv80 工会战', current: '周三 21:00', new: '周三 20:00' },
      { content: '彩虹竞速（道具）', current: '周六 18:00', new: '周六 19:00' },
    ],
  },
  {
    server: 'FLARINE',
    changes: [
      { content: '彩虹竞速（道具）', current: '周六 18:00', new: '周六 19:00' },
      { content: '马德里加尔锦标赛', current: '每日 21:00', new: '每日 20:00' },
    ],
  },
  {
    server: 'リシス',
    changes: [
      { content: '彩虹竞速（道具）', current: '周六 18:00', new: '周六 17:00' },
      { content: '马德里加尔锦标赛', current: '每日 21:00', new: '每日 20:00' },
    ],
  },
  {
    server: '獨眼蝙蝠',
    changes: [
      { content: '彩虹竞速（道具）', current: '周六 18:00', new: '周六 17:00' },
      { content: '马德里加尔锦标赛', current: '每日 21:00', new: '每日 20:00' },
    ],
  },
  {
    server: 'GENESE',
    changes: [
      { content: '马德里加尔锦标赛', current: '每日 21:00', new: '每日 20:00' },
    ],
  },
]

// 所有服务器时间表数据
const allServerSchedule = {
  servers: ['LAWOLF', 'MIA', 'GLAPHAN', 'RHISIS', 'MUSHPOIE', 'TOTEMIA', 'BURUDENG', 'GENESE', 'FLARINE', 'リシス', '獨眼蝙蝠'],
  contents: [
    {
      name: '工会战',
      times: {
        LAWOLF: '周六 21:00',
        MIA: '周六 21:00',
        GLAPHAN: '周六 21:00',
        RHISIS: '周六 20:00',
        MUSHPOIE: '周六 18:00',
        TOTEMIA: '周日 19:00',
        BURUDENG: '周日 20:00',
        GENESE: '周三 21:00',
        FLARINE: '周六 21:00',
        'リシス': '周六 21:00',
        '獨眼蝙蝠': '周六 21:00',
      },
    },
    {
      name: 'Lv60 工会战',
      times: {
        LAWOLF: '周三 21:00',
        MIA: '周三 21:00',
        GLAPHAN: '周日 19:00',
        RHISIS: '周三 20:00',
        MUSHPOIE: '周三 18:00',
        TOTEMIA: '周三 19:00',
        BURUDENG: '周三 19:00',
        GENESE: '周三 19:00',
        FLARINE: '周日 19:00',
        'リシス': '周六 19:00',
        '獨眼蝙蝠': '周六 19:00',
      },
    },
    {
      name: 'Lv80 工会战',
      times: {
        LAWOLF: '周日 21:00',
        MIA: '周日 21:00',
        GLAPHAN: '周日 21:00',
        RHISIS: '周五 20:00',
        MUSHPOIE: '周五 18:00',
        TOTEMIA: '周三 20:00',
        BURUDENG: '周三 20:00',
        GENESE: '周六 16:00',
        FLARINE: '周日 17:00',
        'リシス': '周日 21:00',
        '獨眼蝙蝠': '周日 21:00',
      },
      highlighted: ['TOTEMIA', 'BURUDENG'],
    },
    {
      name: '彩虹竞速（道具）',
      times: {
        LAWOLF: '周六 19:00',
        MIA: '周六 19:00',
        GLAPHAN: '周六 19:00',
        RHISIS: '周日 20:00',
        MUSHPOIE: '周六 21:00',
        TOTEMIA: '周六 19:00',
        BURUDENG: '周六 19:00',
        GENESE: '周六 18:00',
        FLARINE: '周六 19:00',
        'リシス': '周六 17:00',
        '獨眼蝙蝠': '周六 17:00',
      },
      highlighted: true, // 所有时间都高亮
    },
    {
      name: '彩虹竞速（速度）',
      times: {
        LAWOLF: '周日 18:00',
        MIA: '周日 18:00',
        GLAPHAN: '周日 18:00',
        RHISIS: '周一 20:00',
        MUSHPOIE: '周日 21:00',
        TOTEMIA: '周日 18:00',
        BURUDENG: '周日 18:00',
        GENESE: '周日 18:00',
        FLARINE: '周日 18:00',
        'リシス': '周日 18:00',
        '獨眼蝙蝠': '周日 18:00',
      },
    },
    {
      name: '卡尔加斯突袭',
      times: {
        LAWOLF: '周日 17:00',
        MIA: '周日 17:00',
        GLAPHAN: '周日 17:00',
        RHISIS: '周日 17:00',
        MUSHPOIE: '周日 17:00',
        TOTEMIA: '周日 17:00',
        BURUDENG: '周日 17:00',
        GENESE: '周日 17:00',
        FLARINE: '周日 15:00',
        'リシス': '周日 17:00',
        '獨眼蝙蝠': '周日 17:00',
      },
    },
    {
      name: '神器争夺战',
      times: {
        LAWOLF: '周六 18:00',
        MIA: '周六 18:00',
        GLAPHAN: '周六 18:00',
        RHISIS: '周六 18:00',
        MUSHPOIE: '周六 17:00',
        TOTEMIA: '周六 18:00',
        BURUDENG: '周六 18:00',
        GENESE: '周六 21:00',
        FLARINE: '周六 18:00',
        'リシス': '周六 18:00',
        '獨眼蝙蝠': '周六 18:00',
      },
    },
    {
      name: '马德里加尔锦标赛',
      times: {
        LAWOLF: '每日 20:00',
        MIA: '每日 20:00',
        GLAPHAN: '每日 20:00',
        RHISIS: '每日 21:00',
        MUSHPOIE: '每日 20:00',
        TOTEMIA: '每日 21:00',
        BURUDENG: '每日 21:00',
        GENESE: '每日 20:00',
        FLARINE: '每日 20:00',
        'リシス': '每日 20:00',
        '獨眼蝙蝠': '每日 20:00',
      },
      highlighted: true, // 所有时间都高亮
    },
  ],
}

export const AllServerContentsTime = () => {
  return (
    <div className="baike-content">
      <div className="server-changes-section">
        <h2>服务器时间变更</h2>
        <div className="server-changes-grid">
          {serverChanges.map((server, idx) => (
            <div key={idx} className="server-change-card">
              <h3>{server.server}</h3>
              <div className="change-list">
                {server.changes.map((change, changeIdx) => (
                  <div key={changeIdx} className="change-item">
                    <div className="change-content">{change.content}</div>
                    <div className="change-times">
                      <span className="current-time">{change.current}</span>
                      <span className="arrow">→</span>
                      <span className="new-time">{change.new}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="all-server-schedule-section">
        <h2 className="schedule-title">全服内容时间表</h2>
        <div className="schedule-table-wrapper">
          <table className="baike-table all-server-table">
            <thead>
              <tr>
                <th>服务器</th>
                {allServerSchedule.contents.map((content, idx) => (
                  <th key={idx}>{content.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allServerSchedule.servers.map((server, serverIdx) => (
                <tr key={serverIdx}>
                  <td className="server-name">{server}</td>
                  {allServerSchedule.contents.map((content, contentIdx) => {
                    const time = content.times[server as keyof typeof content.times] || '-'
                    const isHighlighted =
                      content.highlighted === true ||
                      (Array.isArray(content.highlighted) && content.highlighted.includes(server))
                    return (
                      <td key={contentIdx} className={isHighlighted ? 'highlighted' : ''}>
                        {time}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
