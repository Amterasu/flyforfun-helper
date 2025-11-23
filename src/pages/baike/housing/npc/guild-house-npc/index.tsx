import React from 'react'
import { BaikeImage } from '../../../../../components/BaikeImage'
import './index.less'

export const GuildHouseNpc = () => {
  const npcs = [
    { name: '福巴', price: '💲700万金币', effect: '公会神器生命值恢复+10%', status: 'available' },
    { name: '多尔菲', price: '💲700万金币', effect: '公会神器防御力+10%', status: 'available' },
    { name: '威克', price: '💲700万金币', effect: '神器附近（10米内）的友方角色攻击力+3%', status: 'available' },
    { name: '皮奇', price: '💲700万金币', effect: '神器附近（10米内）的友方角色攻击速度+5%', status: 'available' },
    { name: '巴科', price: '💲700万金币', effect: '神器附近（10米内）的友方角色生命值+500', status: 'available' },
    { name: '维娜', price: '💲700万金币', effect: '神器附近（10米内）的友方角色防御力+3%', status: 'available' },
    { name: '凯奇', price: '💲700万金币', effect: '神器附近（10米内）的友方角色施法速度+5%', status: 'available' },
    { name: '阿萨', price: '💎350（7天）/💎700（15天）', effect: '允许你传送到你选择的地点', status: 'available' },
    { name: 'chord', price: '💎350（7天）/💎700（15天）', effect: 'PvP伤害+3%', status: 'available' },
    { name: '阿努拉', price: '💎350（7天）/💎700（15天）', effect: 'PvP伤害减免+3%', status: 'available' },
    { name: '纳索', price: '💎350（7天）/💎700（15天）', effect: 'PvP暴击率+3%', status: 'available' },
    { name: '努索', price: '💎350（7天）/💎700（15天）', effect: 'PvP暴击伤害+3%', status: 'available' },
    { name: '索兹', price: '💎350（7天）/💎700（15天）', effect: 'PvP格挡穿透+3%', status: 'available' },
    { name: '维克尔', price: '💎350（7天）/💎700（15天）', effect: 'PvP近战/远程格挡+3%', status: 'available' },
    { name: '夸特', price: '💎350（7天）/💎700（15天）', effect: '生命值增加+10%', status: 'available' },
    { name: '沙姆', price: '💎350（7天）/💎700（15天）', effect: '魔法值增加+10%', status: 'removed' },
    { name: '拉梅乌', price: '💎350（7天）/💎700（15天）', effect: 'FP增加+10%', status: 'available' },
    { name: '吉拉', price: '💎350（7天）/💎700（15天）', effect: '魔法值消耗减少+10%', status: 'available' },
    { name: '阿费', price: '💎350（7天）/💎700（15天）', effect: 'FP消耗减少+10%', status: 'available' },
    { name: '科鲍', price: '💎350（7天）/💎700（15天）', effect: '治疗效果+3%', status: 'available' },
    { name: '爱宝', price: '💎350（7天）/💎700（15天）', effect: '魔法抗性+3%', status: 'available' },
    { name: '南科', price: '💎350（7天）/💎700（15天）', effect: '暴击抵抗+3%', status: 'available' },
    { name: '胖', price: '💎350（7天）/💎700（15天）', effect: '4级 buff 仅限140级及以下角色使用', status: 'available' },
    { name: '艾琳', price: '💎350（7天）/💎700（15天）', effect: '武器/防具升级概率+3%', status: 'available' },
    { name: 'Duron', price: '-', effect: 'Guild Artifact Max HP +10%', status: 'not_released' },
  ]

  const pangBuffs = [
    { skill: 'haste', level: '10级', effect: '攻击速度+20%（10+10），施法速度+13%（4+9）' },
    { skill: 'Heap Up', level: '9级', effect: 'STA+28（9+19）' },
    { skill: 'Quick Step', level: '10级', effect: '速度+29%（10+19）' },
    { skill: 'Accuracy', level: '9级', effect: '命中率+18%（9+9）' },
  ]

  return (
    <>
      <div className="npc-cards-grid">
        {npcs.map((npc, index) => (
          <div key={index} className="npc-card">
            <div className="npc-card-header">
              <div className="npc-card-name">{npc.name}</div>
              {npc.status === 'not_released' && (
                <span className="npc-status-badge npc-status-not-released">未发布</span>
              )}
              {npc.status === 'removed' && (
                <span className="npc-status-badge npc-status-removed">已移除</span>
              )}
            </div>
            <div className="npc-card-price">{npc.price}</div>
            <div className="npc-card-effect">
              {npc.status === 'not_released' && <span className="npc-status-not-released">Not released yet </span>}
              {npc.status === 'removed' && (
                <>
                  <del>{npc.effect}</del>{' '}
                  <strong>
                    已移除{' '}
                    <a
                      href="https://universe.flyff.com/news/minorfixesfebruary28"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      2024年2月28日维护后的小修复
                    </a>
                  </strong>
                </>
              )}
              {npc.status === 'available' && npc.effect}
            </div>
          </div>
        ))}
      </div>

      <div className="npc-special-section">
        <div className="npc-special-card">
          <div className="npc-special-header">
            <div className="npc-special-name">胖（4级 buff）</div>
            <div className="npc-special-note">仅限140级及以下角色使用</div>
          </div>
          <div className="npc-special-image">
            <BaikeImage src="/system/buff_pang.png" alt="buff_pang.png" maxWidth="100%" />
          </div>
          <div className="npc-buff-list">
            {pangBuffs.map((buff, index) => (
              <div key={index} className="npc-buff-item">
                <span className="npc-buff-skill">{buff.skill}</span>
                <span className="npc-buff-level">{buff.level}</span>
                <span className="npc-buff-effect">{buff.effect}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
