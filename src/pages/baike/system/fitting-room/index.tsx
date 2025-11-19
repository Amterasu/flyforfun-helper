import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const FittingRoom = () => {
  return (
    <div className="baike-content">
    
    
    <p key={2}><strong>更多信息请参考 <a href="https://gothante.wiki/?search=fitting+room" target="_blank" rel="noopener noreferrer">Gothante</a>。</strong></p>
    <blockquote key={4} className="baike-blockquote">
      <p key={0}>来源:<a href="https://universe.flyff.com/news/patchnotes127 游戏版本1.2.7更新说明" target="_blank" rel="noopener noreferrer">游戏版本1.2.7更新说明</a></p>
    </blockquote>
    <ul key={5} className="baike-list">
        <li key={0}>新增了一个窗口，玩家可以通过开始菜单→助手→试衣间访问。此窗口允许玩家在角色上预览物品、查看物品属性以及尝试动画。</li>
    </ul>
    <ul key={6} className="baike-list">
        <li key={0}>在试衣间添加了重置装备按钮。<strong><a href="https://universe.flyff.com/news/minorfixesmarch14 3月14日维护后的小修复" target="_blank" rel="noopener noreferrer">3月14日维护后的小修复</a></strong></li>
    </ul>
    <ul key={7} className="baike-list">
        <li key={0}>在试衣间为双刀武器添加了装备（左）按钮。<strong><a href="https://universe.flyff.com/news/minorfixesmarch14 3月14日维护后的小修复" target="_blank" rel="noopener noreferrer">3月14日维护后的小修复</a></strong></li>
    </ul>
    <div className="baike-image-container" key={8}>
      <BaikeImage key={0} src="/system/fitting_room/fitting_room.png" alt="fitting_room.png" width={400} maxWidth="100%" />
    </div>
    <div className="baike-image-container" key={9}>
      <BaikeImage key={0} src="/system/fitting_room/fitting_room_window.png" alt="fitting_room_window.png" width={500} maxWidth="100%" />
    </div>
    
    </div>
  )
}
