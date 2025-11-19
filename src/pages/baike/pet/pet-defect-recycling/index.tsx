import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const PetDefectRecycling = () => {
  return (
    <div className="baike-content">
    
    <blockquote key={1} className="baike-blockquote">
      <p key={0}>来源：<a href="https://universe.flyff.com/news/qna-11-2022 &quot;Developers Q&amp;A October-November 2022" target="_blank" rel="noopener noreferrer">2022年10-11月开发者问答</a></p>
    </blockquote>
    <blockquote key={2} className="baike-blockquote">
      <p key={0}>来源：<a href="https://wcdn-universe.flyff.com/site/qna_11_2022.pdf Flyff Universe Developer Q&amp;A October - November 2022 Questions" target="_blank" rel="noopener noreferrer">Flyff Universe 2022年10-11月开发者问答问题</a></p>
    </blockquote>
    <blockquote key={3} className="baike-blockquote">
      <p key={0}>来源：<a href="https://universe.flyff.com/news/patchnotes125 Game Version 1.2.5 Patch Notes&quot;" target="_blank" rel="noopener noreferrer">游戏1.2.5版本更新说明</a></p>
    </blockquote>
    <div className="baike-image-container" key={4}>
      <BaikeImage key={0} src="/pet/pet_defect_recycling.png" alt="pet_defect_recycling.png" maxWidth="100%" />
    </div>
    <ul key={5} className="baike-list">
        <li key={0}>如果成功（绿色文字）：你的宠物获得了新的、更高的等级！</li>
    </ul>
    <ul key={6} className="baike-list">
        <li key={0}>如果失败（红色文字）：你摇到了相同或更低的等级，所以没有任何变化。</li>
    </ul>
    
    </div>
  )
}
