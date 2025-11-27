import React from 'react'
import jewelry190Data from '../../config/upgrade/jewelry190.json'
import ultimate190Data from '../../config/upgrade/ulimate190.json'
import './index.less'

// 属性名称英文到中文的映射
const attributeNameMap: Record<string, string> = {
  'Stat Increase': '属性增加',
  'Critical Damage %': '暴击伤害',
  'HP %': '生命值',
  'MATK %': '魔法攻击力',
  'Max HP': '最大生命值',
  'HP Restoration': '生命恢复',
  'Max MP': '最大魔法值',
  'Decreased MP Consumption': '降低蓝耗',
  'MP Recovery After Kill': '击杀回蓝',
  'Max FP': '最大FP',
  'FP Recovery Auto Attack': 'FP恢复',
  'Damage': '伤害',
  'Defense': '防御',
  'Magic Defense': '魔法防御',
}

// 翻译属性名称
const translateAttributeName = (name: string): string => {
  return attributeNameMap[name.trim()] || name
}

// 格式化装备属性值，将数值与属性名称对应
const formatEquipmentStats = (statsValue: string, attributes: string): string[] => {
  if (!statsValue || statsValue === '-') return ['-']
  
  // 如果没有属性定义，直接返回原值
  if (!attributes) return [statsValue]
  
  // 分割属性名称和数值
  const attributeNames = attributes.split(' / ').map(name => name.trim())
  const statValues = statsValue.split('/').map(val => val.trim())
  
  // 如果属性数量和数值数量不匹配，返回原值
  if (attributeNames.length !== statValues.length) {
    return [statsValue]
  }
  
  // 组合显示：属性名(中文): 数值（不使用分隔符，每个属性单独显示）
  return attributeNames.map((attr, index) => {
    const chineseName = translateAttributeName(attr)
    return `${chineseName}: ${statValues[index]}`
  })
}

export const NewVersionPage = () => {
  return (
    <div className="new-version-page">
      <div className="new-version-header">
        <h1 className="new-version-title">新版本内容</h1>
      </div>

      <div className="new-version-content">
        {/* 终极首饰升级表 */}
        <section className="version-section">
          <h2 className="version-section-title">
            {jewelry190Data.table_info.name_cn}
          </h2>
          <p className="version-section-desc">
            {jewelry190Data.table_info.description_cn}
          </p>
          <div className="version-table-container">
            <h3 className="version-subtitle">装备属性随等级变化表</h3>
            <div className="table-wrapper">
              <table className="version-table equipment-stats-table">
                <thead>
                  <tr>
                    <th>装备名称</th>
                    {jewelry190Data.upgrade_data.map((data) => (
                      <th key={data.level}>+{data.level}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {jewelry190Data.equipment_definitions.map((equipment) => (
                    <tr key={equipment.id}>
                      <td className="equipment-name-cell">
                        <div className="equipment-name-inline">{equipment.name_cn}</div>
                        <div className="equipment-type-inline">{equipment.type}</div>
                      </td>
                      {jewelry190Data.upgrade_data.map((data) => {
                        const statValue = data.stats[equipment.id as keyof typeof data.stats] || '-'
                        const formattedValue = formatEquipmentStats(
                          typeof statValue === 'string' ? statValue : String(statValue),
                          equipment.attributes
                        )
                        // 解析格式化后的值，用于样式化显示
                        const parts = Array.isArray(formattedValue) 
                          ? formattedValue.map(part => {
                              const [name, ...valueParts] = part.split(':')
                              return {
                                name: name?.trim() || '',
                                value: valueParts.join(':').trim()
                              }
                            })
                          : []
                        return (
                          <td key={data.level} className="equipment-stat-cell" title={Array.isArray(formattedValue) ? formattedValue.join(' / ') : formattedValue}>
                            <div className="stat-value-formatted">
                              {parts.map((part, idx) => (
                                <div key={idx} className="stat-item">
                                  <span className="stat-name">{part.name}:</span>
                                  <span className="stat-number">{part.value}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="version-table-container">
            <h3 className="version-subtitle">升级数据表</h3>
            <div className="table-wrapper">
              <table className="version-table">
                <thead>
                  <tr>
                    <th>等级</th>
                    <th>所需等级</th>
                    <th>平均成功率</th>
                    <th>初始成功率</th>
                    <th className="highlight-column">平均尝试次数</th>
                    <th>必成次数</th>
                    <th>游戏币消耗</th>
                    <th>平均游戏币消耗</th>
                  </tr>
                </thead>
                <tbody>
                  {jewelry190Data.upgrade_data.map((data) => (
                    <tr key={data.level}>
                      <td>+{data.level}</td>
                      <td>{data.required_level || '-'}</td>
                      <td>{data.upgrade_info.average_chance_percent ? `${data.upgrade_info.average_chance_percent}%` : '-'}</td>
                      <td>{data.upgrade_info.initial_chance_percent ? `${data.upgrade_info.initial_chance_percent.toFixed(6)}%` : '-'}</td>
                      <td className="highlight-column">{data.upgrade_info.average_tries ? data.upgrade_info.average_tries.toFixed(2) : '-'}</td>
                      <td>{data.upgrade_info.reach_100_percent_tries ? Math.ceil(data.upgrade_info.reach_100_percent_tries) : '-'}</td>
                      <td>{data.upgrade_info.penya_cost ? data.upgrade_info.penya_cost.toLocaleString() : '-'}</td>
                      <td>{data.upgrade_info.average_penya_cost ? data.upgrade_info.average_penya_cost.toLocaleString() : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 终极武器升级表 */}
        <section className="version-section">
          <h2 className="version-section-title">
            {ultimate190Data.table_info.name_cn}
          </h2>
          <p className="version-section-desc">
            {ultimate190Data.table_info.description_cn}
          </p>

          <div className="version-table-container">
            <h3 className="version-subtitle">升级数据表</h3>
            <div className="table-wrapper">
              <table className="version-table">
                <thead>
                  <tr>
                    <th>等级</th>
                    <th>武器攻击力</th>
                    <th>平均成功率</th>
                    <th>初始成功率</th>
                    <th className="highlight-column">平均尝试次数</th>
                    <th>必成次数</th>
                    <th>矿物消耗</th>
                    <th>游戏币消耗</th>
                    <th>平均游戏币消耗</th>
                  </tr>
                </thead>
                <tbody>
                  {ultimate190Data.upgrade_data.map((data) => (
                    <tr key={data.level}>
                      <td>+{data.level}</td>
                      <td>{data.weapon_attack}</td>
                      <td>{data.upgrade_info.average_chance_percent ? `${data.upgrade_info.average_chance_percent}%` : '-'}</td>
                      <td>{data.upgrade_info.initial_chance_percent ? `${data.upgrade_info.initial_chance_percent.toFixed(6)}%` : '-'}</td>
                      <td className="highlight-column">{data.upgrade_info.average_tries ? data.upgrade_info.average_tries.toFixed(2) : '-'}</td>
                      <td>{data.upgrade_info.reach_100_percent_tries ? Math.ceil(data.upgrade_info.reach_100_percent_tries) : '-'}</td>
                      <td>{data.upgrade_info.mineral_cost || '-'}</td>
                      <td>{data.upgrade_info.penya_cost ? data.upgrade_info.penya_cost.toLocaleString() : '-'}</td>
                      <td>{data.upgrade_info.average_penya_cost ? data.upgrade_info.average_penya_cost.toLocaleString() : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

