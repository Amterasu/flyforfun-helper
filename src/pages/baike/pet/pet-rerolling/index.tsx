import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const PetRerolling = () => {
  return (
    <div className="baike-content">
    
    <ul key={2} className="baike-list">
        <li key={0}>通过使用<a href="https://flyffipedia.com/items/details/21526 Pet Reroll Scroll&quot;" target="_blank" rel="noopener noreferrer">宠物重洗卷轴</a>，你可以将养成的宠物放入宠物槽中选择一个等级进行重洗，无需献祭宠物。此功能不影响在宠物训练师处使用献祭宠物进行的常规重洗。</li>
    </ul>
    <ul key={3} className="baike-list">
        <li key={0}>请注意，一旦你选择了一个等级进行重洗，这将是你今后使用此功能对该宠物进行重洗的唯一等级。重洗的概率与献祭同等级宠物进行重洗的概率相同。</li>
    </ul>
    <ul key={4} className="baike-list">
        <li key={0}>重洗一个等级所需的卷轴数量取决于你选择的等级。</li>
    </ul>
    <ul key={5} className="baike-list">
        <li key={0}>当你按下重洗按钮时，会显示（N为重洗后的新等级）：所选等级已重洗至<strong>N</strong>。</li>
    </ul>
    <div className="baike-image-container" key={6}>
      <BaikeImage key={0} src="/pet/pet_rerolling.png" alt="pet_rerolling.png" maxWidth="100%" />
    </div>
    
    </div>
  )
}
