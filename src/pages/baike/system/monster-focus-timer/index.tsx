import React from 'react'

export const MonsterFocusTimer = () => {
  return (
    <div className="baike-content">
    
    <blockquote key={1} className="baike-blockquote">
      <p key={0}>来源:<a href="https://universe.flyff.com/news/patchnotes106 游戏版本1.0.6更新说明" target="_blank" rel="noopener noreferrer">游戏版本1.0.6更新说明</a></p>
    </blockquote>
    <ul key={2} className="baike-list">
        <li key={0}>怪物仇恨计时器（它们在未命中的情况下追逐你的时间）现在基于同时关注同一玩家的怪物数量：</li>
    </ul>
    <ul key={3} className="baike-list">
        <li className="baike-nested-item" key={0}>少于4只怪物时为3分钟</li>
    </ul>
    <ul key={4} className="baike-list">
        <li className="baike-nested-item" key={0}>4-6只怪物时为80秒</li>
    </ul>
    <ul key={5} className="baike-list">
        <li className="baike-nested-item" key={0}>8-12只怪物时为50秒</li>
    </ul>
    <ul key={6} className="baike-list">
        <li className="baike-nested-item" key={0}>14只及以上怪物时为28秒</li>
    </ul>
    
    </div>
  )
}
