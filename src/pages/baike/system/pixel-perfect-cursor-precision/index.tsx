import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const PixelPerfectCursorPrecision = () => {
  return (
    <div className="baike-content">
    
    <blockquote key={1} className="baike-blockquote">
      <p key={0}>来源:<a href="https://universe.flyff.com/news/patchnotes1212minor Game Version 1.2.12 Minor Patch Notes" target="_blank" rel="noopener noreferrer">游戏版本1.2.12小型更新说明</a></p>
    </blockquote>
    <div className="baike-image-container" key={2}>
      <BaikeImage key={0} src="/system/pixel_perfect_cursor_precision1.gif" alt="pixel_perfect_cursor_precision1" maxWidth="100%" />
      <BaikeImage key={1} src="/system/pixel_perfect_cursor_precision2.gif" alt="pixel_perfect_cursor_precision2" maxWidth="100%" />
    </div>
    <ul key={3} className="baike-list">
        <li key={0}>像素完美光标选择功能允许精确的像素级选择，并确保在UI元素的边界和角落进行准确选择，适合那些希望更精确地瞄准对象的玩家。</li>
    </ul>
    
    </div>
  )
}
