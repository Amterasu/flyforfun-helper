import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const DungeonsDrops = () => {
  return (
    <div className="baike-content">
    
    <ul key={4} className="baike-list">
        <li key={0}>新增了可重复完成的任务，当击杀一定数量的副本最终boss后，会奖励武器穿洞卡片选择盒。<strong><a href="https://universe.flyff.com/news/patchnotes122 Game Version 1.2.3 Patch Notes" target="_blank" rel="noopener noreferrer">版本 1.2.2</a></strong></li>
    </ul>
    <ul key={7} className="baike-list">
        <li key={0}>为所有副本副本添加了宝箱，其中可能包含必需品盒、元素攻击盒、药丸盒和彩虹棉花糖。<strong><a href="https://universe.flyff.com/news/patchnotes123 Game Version 1.2.3 Patch Notes" target="_blank" rel="noopener noreferrer">版本 1.2.3</a></strong></li>
    </ul>
    <ul key={9} className="baike-list">
        <li key={0}>金色蝙蝠现在成为永久性的，其生成概率比活动期间低。<strong><a href="https://universe.flyff.com/news/patchnotes124 Game Version 1.2.4 Patch Notes" target="_blank" rel="noopener noreferrer">版本 1.2.4</a></strong></li>
    </ul>
    <ul key={11} className="baike-list">
        <li className="baike-nested-item" key={0}>如果在副本中击杀<a href="https://flyffipedia.com/monsters/details/2630" target="_blank" rel="noopener noreferrer">金色蝙蝠</a>，最后的超级怪物将获得<a href="https://flyffipedia.com/skills/details/110" target="_blank" rel="noopener noreferrer">慷慨馈赠</a>效果。</li>
    </ul>
    <div className="baike-image-container" key={12}>
      <BaikeImage key={0} src="/dungeons/feeling_generous.png" alt="feeling_generous.png" maxWidth="100%" />
    </div>
    <ul key={13} className="baike-list">
        <li className="baike-nested-item" key={0}>提高掉落率的增益效果适用于所有掉落物。</li>
    </ul>
    <ul key={14} className="baike-list">
        <li className="baike-nested-item" key={0}>它总是先滚动概率较低的物品，这意味着<strong>最稀有</strong>的物品会先被滚动，并且它们的掉落概率会略高一些。</li>
    </ul>
    <div className="baike-image-container" key={16}>
      <BaikeImage key={0} src="/dungeons/feeling_generous_bonus.png" alt="feeling_generous_bonus.png" maxWidth="100%" />
    </div>
    <ul key={17} className="baike-list">
        <li key={0}>玩家等级不会影响怪物幻化外观的掉落率，玩家在任何等级都能有效地刷取幻化外观。</li>
    </ul>
    <ul key={19} className="baike-list">
        <li key={0}>由于怪物的等级缩放特性，副本副本（特别是重生副本）中的怪物没有基于等级的掉落惩罚。</li>
    </ul>
    <ul key={21} className="baike-list">
        <li className="baike-nested-item" key={0}>例如，126级和140级的玩家在风暴之巅击败怪物时，掉落率是相同的。</li>
    </ul>
    <ul key={25} className="baike-list">
        <li key={0}>实际上，正如API中所显示的，副本怪物有等级，但所有惩罚都从副本怪物中移除了。因此，基于等级的因素不会对掉落等产生影响。</li>
    </ul>
    <div className="baike-image-container" key={28}>
      <BaikeImage key={0} src="/dungeons/dungeons_drops.png" alt="dungeons_drops.png" maxWidth="100%" />
    </div>
    <div className="baike-image-container" key={29}>
      <BaikeImage key={0} src="/dungeons/cursed_jewelry_fragment_drop_in_dungeons.png" alt="cursed_jewelry_fragment_drop_in_dungeons.png" maxWidth="100%" />
    </div>
    <ul key={30} className="baike-list">
        <li key={0}>副本中的诅咒首饰碎片掉落：</li>
    </ul>
    <ul key={32} className="baike-list">
        <li key={0}>在诅咒副本中获得的碎片没有灵魂绑定，但它们是不可交易的。队伍中的每个人都可以获得这些碎片，一旦获得，碎片会直接进入他们的背包。</li>
    </ul>
    
    </div>
  )
}
