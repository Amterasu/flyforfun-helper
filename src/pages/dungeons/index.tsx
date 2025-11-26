import { useState, useMemo } from 'react'
import dungeonsData from '../../config/dungeons/index.json'
import './index.less'

type DungeonData = {
  dungeonWorld: {
    id: number
    name: {
      cns: string
      en: string
    }
    type: number
    width: number
    height: number
    tileName: string
    tileSize: number
    flying: boolean
    pk: boolean
    inDoor: boolean
  }
  monsterList: any[]
  id: number
  name: {
    cns: string
    en: string
  }
  type: number
  image: string
  world: number
  difficulty: number
  minLevel: number
  maxLevel: number
  cooldownSecs: number
  monsters: number[]
  monsterMods?: any[]
  curseSkills?: Array<{
    id: number
    name: {
      cns: string
      en: string
    }
    description?: {
      cns: string
      en: string
    }
    icon: string
    [key: string]: any
  }>
}

const ICON_BASE_URL = 'https://flyffipedia.com/Icons/Dungeons'
const CURSE_SKILL_ICON_BASE_URL = 'https://flyffipedia.com/Icons/Skills/colored'

export const DungeonsPage = () => {
  const [selectedDungeonId, setSelectedDungeonId] = useState<number | null>(
    dungeonsData[0]?.id || null
  )

  const selectedDungeon = useMemo<DungeonData | null>(() => {
    return (
      (dungeonsData as DungeonData[]).find((d) => d.id === selectedDungeonId) ||
      null
    )
  }, [selectedDungeonId])

  const formatCooldown = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) {
      return `${hours}小时${minutes}分钟`
    }
    return `${minutes}分钟`
  }

  return (
    <div className="dungeons-page">
      {/* 顶部副本导航栏 */}
      <div className="dungeons-nav-bar">
        {(dungeonsData as DungeonData[]).map((dungeon) => (
          <div
            key={dungeon.id}
            className={`dungeon-nav-item ${
              selectedDungeonId === dungeon.id ? 'active' : ''
            }`}
            onClick={() => setSelectedDungeonId(dungeon.id)}
          >
            <div className="dungeon-nav-image">
              <img
                src={`${ICON_BASE_URL}/${dungeon.image}`}
                alt={dungeon.name.cns}
                onError={(e) => {
                  e.currentTarget.src = `${ICON_BASE_URL}/${dungeon.image?.replace('.png', '.jpg') || 'default.png'}`
                }}
              />
            </div>
            <div className="dungeon-nav-name">{dungeon.name.cns}</div>
          </div>
        ))}
      </div>

      {/* 主内容区 */}
      {selectedDungeon && (
        <>
          {/* 副本标题和基本信息 */}
          <div className="dungeon-header-section">
            <div className="dungeon-header">
              <h2 className="dungeon-title">{selectedDungeon.name.cns}</h2>
              <div className="dungeon-subtitle">{selectedDungeon.name.en}</div>
            </div>
            <div className="dungeon-header-content">
              <div className="dungeon-info-grid">
                <div className="info-item">
                  <span className="info-label">难度:</span>
                  <span className="info-value">
                    {'★'.repeat(selectedDungeon.difficulty || 1)}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">等级:</span>
                  <span className="info-value">
                    {selectedDungeon.minLevel}-{selectedDungeon.maxLevel}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">冷却:</span>
                  <span className="info-value">
                    {formatCooldown(selectedDungeon.cooldownSecs)}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">类型:</span>
                  <span className="info-value">
                    {selectedDungeon.type === 3 ? '副本' : '其他'}
                  </span>
                </div>
              </div>
              
              {/* 诅咒技能 - 移到基础信息区域 */}
              {selectedDungeon.curseSkills && selectedDungeon.curseSkills.length > 0 && (
                <div className="dungeon-curse-skills-inline">
                  <h4 className="curse-skills-inline-title">诅咒技能:</h4>
                  <div className="curse-skills-list-inline">
                    {selectedDungeon.curseSkills.map((skill) => (
                      <div key={skill.id} className="curse-skill-item-inline">
                        <div className="curse-skill-icon-inline">
                          <img
                            src={`${CURSE_SKILL_ICON_BASE_URL}/${skill.icon}`}
                            alt={skill.name.cns}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        </div>
                        <div className="curse-skill-name-inline">{skill.name.cns}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 上方信息区：世界信息、地图 */}
          <div className="dungeons-top-section">
            {/* 副本世界信息 */}
            {selectedDungeon.dungeonWorld && (
              <div className="dungeon-world-info">
                <h3 className="section-title">世界信息</h3>
                <div className="world-info-list">
                  <div className="world-info-item">
                    <span className="world-info-label">世界ID:</span>
                    <span className="world-info-value">{selectedDungeon.dungeonWorld.id}</span>
                  </div>
                  <div className="world-info-item">
                    <span className="world-info-label">尺寸:</span>
                    <span className="world-info-value">
                      {selectedDungeon.dungeonWorld.width} × {selectedDungeon.dungeonWorld.height}
                    </span>
                  </div>
                  <div className="world-info-item">
                    <span className="world-info-label">允许飞行:</span>
                    <span className="world-info-value">
                      {selectedDungeon.dungeonWorld.flying ? '是' : '否'}
                    </span>
                  </div>
                  <div className="world-info-item">
                    <span className="world-info-label">允许PK:</span>
                    <span className="world-info-value">
                      {selectedDungeon.dungeonWorld.pk ? '是' : '否'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 地图区域 */}
            <div className="dungeon-map-container">
              {selectedDungeon.dungeonWorld && (
                <div className="dungeon-map">
                  <div className="map-placeholder">
                    <p>地图加载中...</p>
                    <p className="map-info">
                      {selectedDungeon.dungeonWorld.name.cns} ({selectedDungeon.dungeonWorld.width} × {selectedDungeon.dungeonWorld.height})
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 怪物修改器 */}
          {selectedDungeon.monsterMods && selectedDungeon.monsterMods.length > 0 && (
            <div className="dungeon-mods-section">
              <h3 className="section-title">怪物修改器</h3>
              <div className="mods-list">
                {selectedDungeon.monsterMods.map((mod, idx) => (
                  <div key={idx} className="mod-item">
                    <span className="mod-label">
                      {mod.parameterLocalization?.cns || mod.parameterLocalization?.en || '未知'}:
                    </span>
                    <span className={`mod-value ${mod.value >= 0 ? 'positive' : 'negative'}`}>
                      {mod.value > 0 ? '+' : ''}{mod.value}%
                      {mod.maxPlayerCount && ` (最多${mod.maxPlayerCount}人)`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 下方：怪物卡片列表 */}
          <div className="dungeons-monsters-section">
            <h3 className="section-title">怪物列表</h3>
            <div className="monsters-grid">
              {selectedDungeon.monsterList && selectedDungeon.monsterList.length > 0 ? (
                selectedDungeon.monsterList.map((monster, idx) => (
                      <div key={idx} className="monster-item">
                        <div className="monster-icon">
                          <img
                            src={`https://flyffipedia.com/Icons/Monsters/${monster.icon || 'default.png'}`}
                            alt={monster.name?.cns || monster.name?.en}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        </div>
                        <div className="monster-info">
                          <div className="monster-name">
                            {monster.name?.cns || monster.name?.en || '未知'}
                          </div>
                          <div className="monster-stats">
                            <span>Lv.{monster.level || '?'}</span>
                            <span>Rank {monster.rank || '?'}</span>
                            {monster.element !== undefined && (
                              <span className="monster-element">
                                {monster.element === 9 ? '无属性' :
                                 monster.element === 0 ? '🔥 火' :
                                 monster.element === 1 ? '💧 水' :
                                 monster.element === 2 ? '⚡ 电' :
                                 monster.element === 3 ? '🌪️ 风' :
                                 monster.element === 4 ? '🌍 土' : '未知'}
                              </span>
                            )}
                          </div>
                          <div className="monster-stats-detail">
                            <span>HP: {monster.hp?.toLocaleString() || '?'}</span>
                            <span>攻击: {monster.minAttack || '?'}-{monster.maxAttack || '?'}</span>
                            <span>防御: {monster.defense || '?'}</span>
                            {monster.magicDefense !== undefined && (
                              <span>魔防: {monster.magicDefense}</span>
                            )}
                          </div>
                          {monster.resistFire !== undefined && (
                            <div className="monster-resist">
                              🔥 火抗: {(monster.resistFire * 100).toFixed(0)}%
                            </div>
                          )}
                          {monster.resistWater !== undefined && (
                            <div className="monster-resist">
                              💧 水抗: {(monster.resistWater * 100).toFixed(0)}%
                            </div>
                          )}
                          {monster.resistElectricity !== undefined && (
                            <div className="monster-resist">
                              ⚡ 电抗: {(monster.resistElectricity * 100).toFixed(0)}%
                            </div>
                          )}
                          {monster.resistWind !== undefined && (
                            <div className="monster-resist">
                              🌪️ 风抗: {(monster.resistWind * 100).toFixed(0)}%
                            </div>
                          )}
                          {monster.resistEarth !== undefined && (
                            <div className="monster-resist">
                              🌍 土抗: {(monster.resistEarth * 100).toFixed(0)}%
                            </div>
                          )}
                          {monster.attacks && monster.attacks.length > 0 && (
                            <div className="monster-attacks">
                              <span className="attacks-label">攻击方式:</span>
                              <span>{monster.attacks.length} 种</span>
                            </div>
                          )}
                          {monster.location && (
                            <div className="monster-location">
                              位置: ({monster.location.x.toFixed(1)}, {monster.location.z.toFixed(1)})
                            </div>
                          )}
                          {monster.spawns && monster.spawns.length > 0 && (
                            <div className="monster-spawns">
                              刷新点: {monster.spawns.length} 个
                            </div>
                          )}
                          {monster.minDropGold && monster.maxDropGold && (
                            <div className="monster-gold">
                              金币: {monster.minDropGold.toLocaleString()}-{monster.maxDropGold.toLocaleString()}
                            </div>
                          )}
                          {monster.appliedSkills && monster.appliedSkills.length > 0 && (
                            <div className="monster-skills">
                              技能: {monster.appliedSkills.length} 个
                            </div>
                          )}
                          {monster.summoned && monster.summoned.length > 0 && (
                            <div className="monster-summoned">
                              召唤: {monster.summoned.length} 种
                            </div>
                          )}
                          {monster.berserkThresholdHP !== undefined && (
                            <div className="monster-berserk">
                              狂暴: HP ≤ {monster.berserkThresholdHP}% (+{monster.berserkAttackPower || 0}% 攻击)
                            </div>
                          )}
                          {(monster.sta !== undefined || monster.str !== undefined || monster.dex !== undefined || monster.int !== undefined) && (
                            <div className="monster-attributes">
                              属性: {monster.sta !== undefined && `体${monster.sta}`} {monster.str !== undefined && `力${monster.str}`} {monster.dex !== undefined && `敏${monster.dex}`} {monster.int !== undefined && `智${monster.int}`}
                            </div>
                          )}
                          {(monster.hitRate !== undefined || monster.parry !== undefined) && (
                            <div className="monster-combat">
                              {monster.hitRate !== undefined && `命中: ${monster.hitRate}`} {monster.parry !== undefined && `格挡: ${monster.parry}`}
                            </div>
                          )}
                          {monster.speed !== undefined && (
                            <div className="monster-speed">
                              速度: {monster.speed}
                            </div>
                          )}
                          {monster.experience !== undefined && (
                            <div className="monster-exp">
                              经验: {(monster.experience * 100).toFixed(2)}%
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-monsters">暂无怪物数据</div>
                  )}
                </div>
            </div>
        </>
      )}
    </div>
  )
}

