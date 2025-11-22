import React from 'react'
import { getRarityColor } from '../../../../constants/rarityColors'
import './index.less'

interface RarityItem {
  rarity_en: string
  rarity_cn: string
  description?: string
}

const rarityList: RarityItem[] = [
  {
    rarity_en: 'Common',
    rarity_cn: '普通',
    description: '最常见的物品品质',
  },
  {
    rarity_en: 'Uncommon',
    rarity_cn: '不常见',
    description: '较为稀有的物品品质',
  },
  {
    rarity_en: 'Rare',
    rarity_cn: '稀有',
    description: '稀有物品品质',
  },
  {
    rarity_en: 'Very Rare',
    rarity_cn: '非常稀有',
    description: '非常稀有的物品品质',
  },
  {
    rarity_en: 'Unique',
    rarity_cn: '独特',
    description: '独特的物品品质',
  },
  {
    rarity_en: 'Unique-yellow',
    rarity_cn: '独特（黄色）',
    description: '特殊的独特物品品质',
  },
  {
    rarity_en: 'Ultimate',
    rarity_cn: '终极',
    description: '最高级的物品品质',
  },
]

export const ItemRarity = () => {
  return (
    <div className="baike-content">
      <div className="rarity-container">
        {rarityList.map((item, index) => {
          const color = getRarityColor(item.rarity_en)
          return (
            <div key={index} className="rarity-item">
              <div
                className="rarity-color-bar"
                style={{ backgroundColor: color }}
              />
              <div className="rarity-content">
                <div className="rarity-header">
                  <span
                    className="rarity-name"
                    style={{ color: color }}
                  >
                    {item.rarity_cn}
                  </span>
                  <span className="rarity-name-en">{item.rarity_en}</span>
                </div>
                {item.description && (
                  <div className="rarity-description">{item.description}</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
