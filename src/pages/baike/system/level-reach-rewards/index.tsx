import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'
import './index.less'

// 高亮文本组件
const HighlightText: React.FC<{ text: string; highlights: string[] }> = ({ text, highlights }) => {
  if (highlights.length === 0) {
    return <>{text}</>
  }

  const pattern = highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
  const regex = new RegExp(`(${pattern})`, 'g')
  const parts = text.split(regex)

  return (
    <>
      {parts.map((part, idx) => {
        const isHighlight = highlights.includes(part)
        return isHighlight ? (
          <span key={idx} className="highlight">
            {part}
          </span>
        ) : (
          <React.Fragment key={idx}>{part}</React.Fragment>
        )
      })}
    </>
  )
}

interface RewardItem {
  name: string
  url: string
  quantity: string
}

interface LevelReward {
  level: string
  limit?: string
  items: RewardItem[]
}

const rewards: LevelReward[] = [
  {
    level: '20',
    limit: '2000',
    items: [
      { name: '必需品盒II', url: 'https://flyffipedia.com/items/details/2942', quantity: 'x1' },
      { name: '冲刺卷轴', url: 'https://flyffipedia.com/items/details/7364', quantity: 'x3' },
      { name: '火焰效果（7天）', url: 'https://flyffipedia.com/items/details/2803', quantity: 'x1' },
    ],
  },
  {
    level: '40',
    limit: '1500',
    items: [
      { name: '必需品盒III', url: 'https://flyffipedia.com/items/details/851', quantity: 'x1' },
      { name: '额外背包（15天）', url: 'https://flyffipedia.com/items/details/624', quantity: 'x1' },
      { name: '神圣卷轴', url: 'https://flyffipedia.com/items/details/3456', quantity: 'x2' },
      { name: '麦德加传送翅膀', url: 'https://flyffipedia.com/items/details/7684', quantity: 'x2' },
    ],
  },
  {
    level: '60',
    limit: '1000',
    items: [
      { name: '必需品盒IV', url: 'https://flyffipedia.com/items/details/5441', quantity: 'x1' },
      { name: '公共银行15', url: 'https://flyffipedia.com/items/details/8007', quantity: 'x1' },
      { name: '麦德加传送翅膀', url: 'https://flyffipedia.com/items/details/7684', quantity: 'x2' },
      { name: '祝福卷轴', url: 'https://flyffipedia.com/items/details/7594', quantity: 'x2' },
    ],
  },
  {
    level: '80',
    limit: '500',
    items: [
      { name: '必需品盒V', url: 'https://flyffipedia.com/items/details/4859', quantity: 'x1' },
      { name: '坐骑云（浅粉色）30天', url: 'https://flyffipedia.com/items/details/435', quantity: 'x1' },
      { name: '防具保护卷轴', url: 'https://flyffipedia.com/items/details/2527', quantity: 'x3' },
    ],
  },
  {
    level: '100',
    limit: '300',
    items: [
      { name: '必需品盒V', url: 'https://flyffipedia.com/items/details/4859', quantity: 'x1' },
      { name: '婴儿机器人30天', url: 'https://flyffipedia.com/items/details/1612', quantity: 'x1' },
      { name: '武器强化卷轴', url: 'https://flyffipedia.com/items/details/6201', quantity: 'x1' },
    ],
  },
  {
    level: '120',
    limit: '100',
    items: [
      { name: '必需品盒VI', url: 'https://flyffipedia.com/items/details/8744', quantity: 'x1' },
      {
        name: '间谍套装（男）',
        url: 'https://flyffipedia.com/items/details/9920',
        quantity: 'x1',
      },
      {
        name: '间谍套装（女）',
        url: 'https://flyffipedia.com/items/details/5838',
        quantity: 'x1',
      },
      { name: '武器强化卷轴', url: 'https://flyffipedia.com/items/details/6201', quantity: 'x3' },
    ],
  },
  {
    level: '125',
    items: [
      { name: '增幅卷轴ES', url: 'https://flyffipedia.com/items/details/6106', quantity: 'x5' },
      { name: '生命药水X或提神饮料', url: 'https://flyffipedia.com/items/details/3237', quantity: 'x5' },
      { name: '升级石', url: 'https://flyffipedia.com/items/details/8691', quantity: 'x5' },
      { name: '防御升级石', url: 'https://flyffipedia.com/items/details/2551', quantity: 'x5' },
      { name: '激活药水', url: 'https://flyffipedia.com/items/details/7833', quantity: 'x5' },
    ],
  },
  {
    level: '126',
    limit: '1000',
    items: [
      { name: '防具保护卷轴', url: 'https://flyffipedia.com/items/details/2527', quantity: 'x15' },
      { name: '宠物变形药水', url: 'https://flyffipedia.com/items/details/8898', quantity: 'x3' },
    ],
  },
  {
    level: '130',
    items: [
      { name: '发条+1戒指盒', url: 'https://flyffipedia.com/items/details/7288', quantity: 'x1' },
      { name: '生命药水X或提神饮料', url: 'https://flyffipedia.com/items/details/3237', quantity: 'x5' },
      { name: '升级石', url: 'https://flyffipedia.com/items/details/8691', quantity: 'x5' },
      { name: '增幅卷轴ES', url: 'https://flyffipedia.com/items/details/6106', quantity: 'x5' },
      { name: '公牛仓鼠', url: 'https://flyffipedia.com/items/details/3393', quantity: 'x5' },
    ],
  },
  {
    level: '131',
    limit: '500',
    items: [
      { name: '发条+2戒指盒', url: 'https://flyffipedia.com/items/details/5349', quantity: 'x1' },
      { name: '宠物变形药水', url: 'https://flyffipedia.com/items/details/8898', quantity: 'x4' },
    ],
  },
  {
    level: '135',
    items: [
      { name: '增幅卷轴ES', url: 'https://flyffipedia.com/items/details/6106', quantity: 'x5' },
      { name: '生命药水X或提神饮料', url: 'https://flyffipedia.com/items/details/3237', quantity: 'x5' },
      { name: '升级石', url: 'https://flyffipedia.com/items/details/8691', quantity: 'x5' },
      { name: '烤鳗鱼', url: 'https://flyffipedia.com/items/details/6049', quantity: 'x5' },
      { name: '复活卷轴', url: 'https://flyffipedia.com/items/details/6525', quantity: 'x5' },
    ],
  },
  {
    level: '136',
    limit: '500',
    items: [
      { name: '武器保护卷轴', url: 'https://flyffipedia.com/items/details/1683', quantity: 'x15' },
      { name: '武器强化卷轴', url: 'https://flyffipedia.com/items/details/6201', quantity: 'x2' },
    ],
  },
  {
    level: '139',
    items: [
      {
        name: '雪人套装（男）',
        url: 'https://flyffipedia.com/items/details/937',
        quantity: 'x1',
      },
      {
        name: '雪人套装（女）',
        url: 'https://flyffipedia.com/items/details/3549',
        quantity: 'x1',
      },
    ],
  },
  {
    level: '140',
    limit: '300',
    items: [
      { name: '婴儿雪人', url: 'https://flyffipedia.com/items/details/3683', quantity: 'x1' },
      { name: '武器强化卷轴', url: 'https://flyffipedia.com/items/details/6201', quantity: 'x10' },
    ],
  },
  {
    level: '141',
    items: [
      { name: 'Smelting Scroll Box', url: 'https://flyffipedia.com/items/details/15944', quantity: 'x2' },
      { name: 'Activition', url: 'https://flyffipedia.com/items/details/7833', quantity: 'x5' },
      { name: '增幅卷轴ES', url: 'https://flyffipedia.com/items/details/6106', quantity: 'x5' },
    ],
  },
  {
    level: '143',
    items: [
      { name: '熔炼卷轴盒', url: 'https://flyffipedia.com/items/details/15944', quantity: 'x3' },
      { name: '升级石', url: 'https://flyffipedia.com/items/details/8691', quantity: 'x5' },
      { name: 'Grilled Eel', url: 'https://flyffipedia.com/items/details/6049', quantity: 'x5' },
    ],
  },
  {
    level: '145',
    limit: '1000',
    items: [
      { name: '生命药水X或提神饮料', url: 'https://flyffipedia.com/items/details/3237', quantity: 'x10' },
      { name: '激活药水', url: 'https://flyffipedia.com/items/details/7833', quantity: 'x10' },
      { name: '熔炼卷轴盒', url: 'https://flyffipedia.com/items/details/15944', quantity: 'x10' },
    ],
  },
  {
    level: '147',
    items: [
      { name: 'Smelting Scroll Box', url: 'https://flyffipedia.com/items/details/15944', quantity: 'x3' },
      { name: 'X保护卷轴', url: 'https://flyffipedia.com/items/details/14737', quantity: 'x5' },
      { name: '太阳石', url: 'https://flyffipedia.com/items/details/15403', quantity: 'x5' },
    ],
  },
  {
    level: '149',
    items: [
      { name: '珊瑚披风', url: 'https://flyffipedia.com/items/details/19985', quantity: 'x1' },
      { name: '终极宝珠', url: 'https://flyffipedia.com/items/details/15012', quantity: 'x3' },
    ],
  },
  {
    level: '150',
    limit: '500',
    items: [
      { name: 'Scroll of Xprotect', url: 'https://flyffipedia.com/items/details/14737', quantity: 'x10' },
      { name: '太阳石', url: 'https://flyffipedia.com/items/details/15403', quantity: 'x10' },
    ],
  },
  {
    level: '152',
    items: [
      { name: '熔炼卷轴盒', url: 'https://flyffipedia.com/items/details/15944', quantity: 'x5' },
      { name: 'Upcut Stone', url: 'https://flyffipedia.com/items/details/8691', quantity: 'x10' },
      { name: '烤鳗鱼', url: 'https://flyffipedia.com/items/details/6049', quantity: 'x10' },
    ],
  },
  {
    level: '154',
    items: [
      { name: '熔炼卷轴盒', url: 'https://flyffipedia.com/items/details/15944', quantity: 'x5' },
      { name: 'Shining Oricalkum', url: 'https://flyffipedia.com/items/details/12908', quantity: 'x1' },
      { name: '增幅卷轴ES', url: 'https://flyffipedia.com/items/details/6106', quantity: 'x10' },
    ],
  },
  {
    level: '156',
    limit: '300',
    items: [
      { name: 'Smelting Scroll Box', url: 'https://flyffipedia.com/items/details/15944', quantity: 'x5' },
      { name: 'X保护卷轴', url: 'https://flyffipedia.com/items/details/14737', quantity: 'x15' },
      { name: 'Sunstone', url: 'https://flyffipedia.com/items/details/15403', quantity: 'x10' },
    ],
  },
  {
    level: '158',
    items: [
      { name: '婴儿轮子（30天）', url: 'https://flyffipedia.com/items/details/19969', quantity: 'x1' },
    ],
  },
  {
    level: '160',
    items: [
      {
        name: '光明王子/公主套装',
        url: 'https://flyffipedia.com/items/details/14548',
        quantity: 'x1',
      },
    ],
  },
  {
    level: '160',
    limit: '100',
    items: [
      { name: 'Meteo Bike (Silver)', url: 'https://flyffipedia.com/items/details/13605', quantity: 'x1' },
    ],
  },
  {
    level: '161',
    items: [
      { name: 'Scroll of Amplification ES', url: 'https://flyffipedia.com/items/details/6106', quantity: 'x4' },
      { name: 'Activition', url: 'https://flyffipedia.com/items/details/7833', quantity: 'x5' },
      { name: 'X保护卷轴', url: 'https://flyffipedia.com/items/details/14737', quantity: 'x4' },
    ],
  },
  {
    level: '162',
    items: [
      { name: 'Scroll of Amplification ES', url: 'https://flyffipedia.com/items/details/6106', quantity: 'x8' },
      { name: 'Flip Jump 2 Motion', url: 'https://flyffipedia.com/items/details/22206', quantity: 'x1' },
    ],
  },
  {
    level: '162',
    limit: '500',
    items: [
      { name: '5级宝石选择盒', url: 'https://flyffipedia.com/items/details/23000', quantity: 'x5' },
    ],
  },
  {
    level: '163',
    items: [
      { name: '生命药水X或提神饮料', url: 'https://flyffipedia.com/items/details/3237', quantity: 'x4' },
      { name: 'Scroll of Xprotect', url: 'https://flyffipedia.com/items/details/14737', quantity: 'x4' },
    ],
  },
  {
    level: '163',
    limit: '300',
    items: [
      { name: '终极珠宝盒', url: 'https://flyffipedia.com/items/details/17866', quantity: 'x10' },
    ],
  },
  {
    level: '164',
    items: [
      { name: '婴儿炸弹携带者（30天）', url: 'https://flyffipedia.com/items/details/18276', quantity: 'x1' },
      { name: '增幅卷轴ES', url: 'https://flyffipedia.com/items/details/6106', quantity: 'x12' },
    ],
  },
  {
    level: '164',
    limit: '200',
    items: [
      { name: 'A级穿刺卡幸运盒', url: 'https://flyffipedia.com/items/details/19978', quantity: 'x1' },
    ],
  },
  {
    level: '165',
    items: [
      { name: 'Scroll of Xprotect', url: 'https://flyffipedia.com/items/details/14737', quantity: 'x10' },
      { name: 'Nightmare Set', url: 'https://flyffipedia.com/items/details/24944', quantity: 'x1' },
    ],
  },
  {
    level: '165',
    limit: '100',
    items: [
      { name: 'Archangel White Weapon Set', url: 'https://flyffipedia.com/items/details/27322', quantity: 'x1' },
    ],
  },
]

export const LevelReachRewards = () => {
  return (
    <div className="baike-content">
      <div className="baike-image-thumbnail">
        <BaikeImage
          src="/system/level_reach_rewards.png"
          alt="level_reach_rewards.png"
          maxWidth="350px"
        />
      </div>

      <div className="rewards-grid">
        {rewards.map((reward, idx) => (
          <div key={idx} className="reward-card">
            <div className="reward-header">
              <div className="reward-level">
                等级<HighlightText text={reward.level} highlights={[reward.level]} />
              </div>
              {reward.limit && (
                <div className="reward-limit">
                  数量限制：
                  <HighlightText text={reward.limit} highlights={[reward.limit]} />
                </div>
              )}
            </div>
            <div className="reward-items">
              {reward.items.map((item, itemIdx) => (
                <div key={itemIdx} className="reward-item">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="reward-item-name">
                    {item.name}
                  </a>
                  <span className="reward-item-quantity">{item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
