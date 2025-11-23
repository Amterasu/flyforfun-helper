import React from "react"
import { BaikeImage } from '../../../../../components/BaikeImage';
import './index.less'

export const PersonalHouseNpc = () => {
  const npcs = [
    { name: 'BB狼', price: '💲700万金币', effect: '跳跃高度+30（7天）', status: 'available' },
    { name: '帽匠', price: '💎70（7天）/💎140（15天）', effect: 'PvE伤害+3%', status: 'available' },
    { name: '爱丽丝', price: '💎70（7天）/💎140（15天）', effect: 'PvE伤害减免+3%', status: 'available' },
    { name: '鲁鲁', price: '💎70（7天）/💎140（15天）', effect: '经验损失减少+3%（已从3%降至2.91%）', status: 'available' },
    { name: '蒂诺', price: '💎70（7天）/💎140（15天）', effect: '增加 vendor 商店天数+1', status: 'available' },
    { name: '卡萨诺瓦', price: '💎70（7天）/💎140（15天）', effect: '怪物经验值+5%', status: 'available' },
    { name: '米顺', price: '💎70（7天）/💎140（15天）', effect: '物品掉落率+5%', status: 'available' },
    { name: '特马斯', price: '💎70（7天）/💎140（15天）', effect: '速度+5%', status: 'available' },
    { name: '查查', price: '💎70（7天）/💎140（15天）', effect: '飞行速度+5%', status: 'available' },
    { name: '胖', price: '💎70（7天）/💎140（15天）', effect: '2级 buff 仅限120级及以下角色使用', status: 'available' },
    { name: '克洛克', price: '💎70（7天）/💎140（15天）', effect: '有30%的几率获得该宝石或移除终极宝石', status: 'available' },
    { name: '麦克（A级）', price: '💎70（7天）/💎140（15天）', effect: '宠物训练（宠物糖果A）', status: 'available' },
    { name: '麦克（B级）', price: '💎70（7天）/💎140（15天）', effect: '宠物训练（宠物糖果B）', status: 'available' },
    { name: '麦克（C级）', price: '💎70（7天）/💎140（15天）', effect: '宠物训练（宠物糖果C）', status: 'available' },
    { name: '麦克（D级）', price: '💎70（7天）/💎140（15天）', effect: '宠物训练（宠物糖果D）', status: 'available' },
    { name: '麦克（E级）', price: '💎70（7天）/💎140（15天）', effect: '宠物训练（宠物糖果E）', status: 'available' },
    { name: '麦克（F级）', price: '💎70（7天）/💎140（15天）', effect: '宠物训练（宠物糖果F）', status: 'available' },
  ]

  const pangBuffs = [
    { skill: 'haste', level: '8级', effect: '攻击速度+19%（9+10），施法速度+13%（4+9）' },
    { skill: 'Heap Up', level: '7级', effect: 'STA+26（7+19）' },
    { skill: 'Quick Step', level: '8级', effect: '速度+27%（8+19）' },
    { skill: 'Accuracy', level: '7级', effect: '命中率+16%（7+9）' },
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
            </div>
            <div className="npc-card-price">{npc.price}</div>
            <div className="npc-card-effect">{npc.effect}</div>
          </div>
        ))}
      </div>

      <div className="npc-special-section">
        <div className="npc-special-card">
          <div className="npc-special-header">
            <div className="npc-special-name">胖（2级 buff）</div>
            <div className="npc-special-note">仅限120级及以下角色使用</div>
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

        <div className="npc-special-card">
          <div className="npc-special-header">
            <div className="npc-special-name">克洛克</div>
          </div>
          <div className="npc-special-effect">
            终极珠宝制造、合成成功率提高
          </div>
        </div>
      </div>
    </>
  );
};
