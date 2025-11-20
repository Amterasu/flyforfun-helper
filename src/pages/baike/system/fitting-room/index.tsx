import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'
import './index.less'

export const FittingRoom = () => {
  return (
    <div className="baike-content">
      <div className="baike-info-card">
        <p>
          <strong>
            更多信息请参考{' '}
            <a
              href="https://gothante.wiki/?search=fitting+room"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gothante
            </a>
            。
          </strong>
        </p>
      </div>

      <div className="baike-section">
        <div className="baike-source">
          <p>
            来源:
            <a
              href="https://universe.flyff.com/news/patchnotes127"
              target="_blank"
              rel="noopener noreferrer"
            >
              游戏版本1.2.7更新说明
            </a>
          </p>
        </div>
        <div className="baike-info-item">
          <p>新增了一个窗口，玩家可以通过开始菜单→助手→试衣间访问。此窗口允许玩家在角色上预览物品、查看物品属性以及尝试动画。</p>
        </div>
        <div className="baike-info-item">
          <p>
            在试衣间添加了重置装备按钮。
            <a
              href="https://universe.flyff.com/news/minorfixesmarch14"
              target="_blank"
              rel="noopener noreferrer"
            >
              3月14日维护后的小修复
            </a>
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            在试衣间为双刀武器添加了装备（左）按钮。
            <a
              href="https://universe.flyff.com/news/minorfixesmarch14"
              target="_blank"
              rel="noopener noreferrer"
            >
              3月14日维护后的小修复
            </a>
          </p>
        </div>
      </div>

      <div className="fitting-room-images-grid">
        <div className="baike-image-thumbnail">
          <BaikeImage
            src="/system/fitting_room/fitting_room.png"
            alt="fitting_room.png"
            maxWidth="400px"
          />
        </div>
        <div className="baike-image-thumbnail">
          <BaikeImage
            src="/system/fitting_room/fitting_room_window.png"
            alt="fitting_room_window.png"
            maxWidth="500px"
          />
        </div>
      </div>
    </div>
  )
}
