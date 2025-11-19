import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const Commands = () => {
  return (
    <div className="baike-content">
    
    
    <p key={2}><strong>更多信息请参考 <a href="https://gothante.wiki/?search=commands" target="_blank" rel="noopener noreferrer">Gothante</a>。</strong></p>
    <blockquote key={4} className="baike-blockquote">
      <p key={0}>来源:<a href="https://universe.flyff.com/news/patchnotes132 Game Version 1.3.2 Patch Notes" target="_blank" rel="noopener noreferrer">游戏版本1.3.2更新说明</a></p>
    </blockquote>
    <ul key={5} className="baike-list">
        <li key={0}>添加了聊天命令 <code>/lockedslots</code> 来显示所有解锁库存槽位的未完成任务和成就。</li>
    </ul>
    <blockquote key={6} className="baike-blockquote">
      <p key={0}>来源:<a href="https://universe.flyff.com/news/patchnotemarch6 &quot;Game Version 1.4.3 Patch Notes (March 6" target="_blank" rel="noopener noreferrer">游戏版本1.4.3更新说明（3月6日）</a>")</p>
    </blockquote>
    <ul key={7} className="baike-list">
        <li key={0}>现在你可以使用 <code>/spectate </code> 在公会战地图内观战玩家，但有一些限制。</li>
    </ul>
    <div className="baike-image-container" key={8}>
      <BaikeImage key={0} src="/system/commands.png" alt="commands.png" width={600} maxWidth="100%" />
    </div>
    
    </div>
  )
}
