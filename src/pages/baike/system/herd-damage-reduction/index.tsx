import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const HerdDamageReduction = () => {
  return (
    <div className="baike-content">
    
    
    <p key={2}><strong>For more information please refer to <a href="https://gothante.wiki/?search=herd+damage+reduction" target="_blank" rel="noopener noreferrer">Gothante</a>.</strong></p>
    <div className="baike-image-container" key={4}>
      <BaikeImage key={0} src="/system/herd_damage_reduction.png" alt="herd_damage_reduction.png" width={800} maxWidth="100%" />
    </div>
    <p key={5}>当同一技能攻击的怪物数量大于8时，第n只怪物将受到伤害会减少</p>
    <ul key={6} className="baike-list">
        <li key={0}>例如：</li>
    </ul>
    <ul key={7} className="baike-list">
        <li className="baike-nested-item" key={0}>第1到第8只怪物将受到100%伤害。</li>
    </ul>
    <ul key={8} className="baike-list">
        <li className="baike-nested-item" key={0}>第9只怪物将受到90%伤害。</li>
    </ul>
    <ul key={9} className="baike-list">
        <li className="baike-nested-item" key={0}>第10只怪物将受到81%伤害。</li>
    </ul>
    <ul key={10} className="baike-list">
        <li className="baike-nested-item" key={0}>第11只怪物将受到72.9%伤害。</li>
    </ul>
    <ul key={11} className="baike-list">
        <li className="baike-nested-item" key={0}>第12只怪物将受到65.61%伤害。</li>
    </ul>
    <ul key={12} className="baike-list">
        <li className="baike-nested-item" key={0}>第13只怪物将受到59.05%伤害。</li>
    </ul>
    <ul key={13} className="baike-list">
        <li className="baike-nested-item" key={0}>第14只怪物将受到53.14%伤害。</li>
    </ul>
    <ul key={14} className="baike-list">
        <li className="baike-nested-item" key={0}>第15只怪物将受到47.83%伤害。</li>
    </ul>
    <ul key={15} className="baike-list">
        <li className="baike-nested-item" key={0}>第16只怪物将受到43.05%伤害。</li>
    </ul>
    <ul key={16} className="baike-list">
        <li className="baike-nested-item" key={0}>第17只怪物将受到38.74%伤害。</li>
    </ul>
    <ul key={17} className="baike-list">
        <li className="baike-nested-item" key={0}>第18只怪物将受到34.87%伤害。</li>
    </ul>
    <ul key={18} className="baike-list">
        <li className="baike-nested-item" key={0}>第19只怪物将受到31.38%伤害。</li>
    </ul>
    <ul key={19} className="baike-list">
        <li className="baike-nested-item" key={0}>第20只怪物将受到28.24%伤害。</li>
    </ul>
    
    </div>
  )
}
