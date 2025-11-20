/**
 * 百科页面组件映射
 * 根据路由参数（sectionId, childId, leafId）映射到对应的 TSX 组件
 */

import React, { lazy } from 'react'

// 动态导入组件（按需加载）
const Updates = lazy(() => import('./system/updates').then(m => ({ default: m.Updates })))
const TopUpEvent = lazy(() => import('./system/updates/top-up-event').then(m => ({ default: m.TopUpEvent })))
const AllServerContentsTime = lazy(() => import('./system/all-server-contents-time').then(m => ({ default: m.AllServerContentsTime })))
const Time = lazy(() => import('./system/time').then(m => ({ default: m.Time })))
const Map = lazy(() => import('./system/map').then(m => ({ default: m.Map })))
const MadrigalMinimumLevelLimit = lazy(() => import('./system/map/madrigal-minimum-level-limit').then(m => ({ default: m.MadrigalMinimumLevelLimit })))
const Wdmadrigal = lazy(() => import('./system/map/wdmadrigal').then(m => ({ default: m.Wdmadrigal })))
const CoralIslandMonster = lazy(() => import('./system/map/coral-island-monster').then(m => ({ default: m.CoralIslandMonster })))
const HerneosMonster = lazy(() => import('./system/map/herneos-monster').then(m => ({ default: m.HerneosMonster })))
const PixelPerfectCursorPrecision = lazy(() => import('./system/pixel-perfect-cursor-precision').then(m => ({ default: m.PixelPerfectCursorPrecision })))
const ProvisionalDamageHp = lazy(() => import('./system/provisional-damage-hp').then(m => ({ default: m.ProvisionalDamageHp })))
const Theme = lazy(() => import('./system/theme').then(m => ({ default: m.Theme })))
const ChattingFilter = lazy(() => import('./system/chatting-filter').then(m => ({ default: m.ChattingFilter })))
const Commands = lazy(() => import('./system/commands').then(m => ({ default: m.Commands })))
const Transmute = lazy(() => import('./system/transmute').then(m => ({ default: m.Transmute })))
const GuildLevel = lazy(() => import('./system/guild-level').then(m => ({ default: m.GuildLevel })))
const OneV1Bonus = lazy(() => import('./system/1v1-bonus').then(m => ({ default: m.OneV1Bonus })))
const LevelGap = lazy(() => import('./system/level-gap').then(m => ({ default: m.LevelGap })))
const ItemRarity = lazy(() => import('./system/item-rarity').then(m => ({ default: m.ItemRarity })))
const Trade = lazy(() => import('./system/trade').then(m => ({ default: m.Trade })))
const SearchShop = lazy(() => import('./system/search-shop').then(m => ({ default: m.SearchShop })))
const FittingRoom = lazy(() => import('./system/fitting-room').then(m => ({ default: m.FittingRoom })))
const SkillPoint = lazy(() => import('./system/skill-point').then(m => ({ default: m.SkillPoint })))
const BuffScale = lazy(() => import('./system/buff-scale').then(m => ({ default: m.BuffScale })))
const OfficeQuest = lazy(() => import('./system/office-quest').then(m => ({ default: m.OfficeQuest })))
const Couple = lazy(() => import('./system/couple').then(m => ({ default: m.Couple })))
const Party = lazy(() => import('./system/party').then(m => ({ default: m.Party })))
const DropRate = lazy(() => import('./system/drop-rate').then(m => ({ default: m.DropRate })))
const CostumeCollection = lazy(() => import('./system/costume-collection').then(m => ({ default: m.CostumeCollection })))
const CostumeCollectionDetails = lazy(() => import('./system/costume-collection/costume-collection-details').then(m => ({ default: m.CostumeCollectionDetails })))
const MasterheroQuests = lazy(() => import('./system/masterhero-quests').then(m => ({ default: m.MasterheroQuests })))
const MasterCloak = lazy(() => import('./system/masterhero-quests/master-cloak').then(m => ({ default: m.MasterCloak })))
const HeroReward = lazy(() => import('./system/masterhero-quests/hero-reward').then(m => ({ default: m.HeroReward })))
const LevelReachRewards = lazy(() => import('./system/level-reach-rewards').then(m => ({ default: m.LevelReachRewards })))
const MonsterFocusTimer = lazy(() => import('./system/monster-focus-timer').then(m => ({ default: m.MonsterFocusTimer })))
const HerdDamageReduction = lazy(() => import('./system/herd-damage-reduction').then(m => ({ default: m.HerdDamageReduction })))
const ExtendedBattlePass = lazy(() => import('./system/extended-battle-pass').then(m => ({ default: m.ExtendedBattlePass })))
const Formula = lazy(() => import('./formula').then(m => ({ default: m.Formula })))
const Upgrade = lazy(() => import('./upgrade').then(m => ({ default: m.Upgrade })))
const PowerDice = lazy(() => import('./upgrade/power-dice').then(m => ({ default: m.PowerDice })))
const Catcher = lazy(() => import('./upgrade/catcher').then(m => ({ default: m.Catcher })))
const PitySystem = lazy(() => import('./upgrade/pity-system').then(m => ({ default: m.PitySystem })))
const WeaponarmorUpgrade = lazy(() => import('./upgrade/weaponarmor-upgrade').then(m => ({ default: m.WeaponarmorUpgrade })))
const Event = lazy(() => import('./upgrade/weaponarmor-upgrade/event').then(m => ({ default: m.Event })))
const UpgradeLevelBonus = lazy(() => import('./upgrade/weaponarmor-upgrade/upgrade-level-bonus').then(m => ({ default: m.UpgradeLevelBonus })))
const Ultimate = lazy(() => import('./upgrade/ultimate').then(m => ({ default: m.Ultimate })))
const UltimateWeapon = lazy(() => import('./upgrade/ultimate/ultimate-weapon').then(m => ({ default: m.UltimateWeapon })))
const UltimateWeaponEvent = lazy(() => import('./upgrade/ultimate/ultimate-weapon-event').then(m => ({ default: m.UltimateWeaponEvent })))
const RegularWeapon = lazy(() => import('./upgrade/ultimate/regular-weapon').then(m => ({ default: m.RegularWeapon })))
const Fwc2025GoldenWeapon = lazy(() => import('./upgrade/ultimate/fwc-2025-golden-weapon').then(m => ({ default: m.Fwc2025GoldenWeapon })))
const RerollWeapons = lazy(() => import('./upgrade/ultimate/reroll-weapons').then(m => ({ default: m.RerollWeapons })))
const UltimateJewelry = lazy(() => import('./upgrade/ultimate/ultimate-jewelry').then(m => ({ default: m.UltimateJewelry })))
const UltimateJewelryEvent = lazy(() => import('./upgrade/ultimate/ultimate-jewelry-event').then(m => ({ default: m.UltimateJewelryEvent })))
const NewHorizonEquipmentSets = lazy(() => import('./upgrade/new-horizon-equipment-sets').then(m => ({ default: m.NewHorizonEquipmentSets })))
const BattleForMadrigalUltimateJewels = lazy(() => import('./upgrade/battle-for-madrigal-ultimate-jewels').then(m => ({ default: m.BattleForMadrigalUltimateJewels })))
const JewelryUpgrade = lazy(() => import('./upgrade/jewelry-upgrade').then(m => ({ default: m.JewelryUpgrade })))
const ElementUpgrade = lazy(() => import('./upgrade/element-upgrade').then(m => ({ default: m.ElementUpgrade })))
const Glowswinging = lazy(() => import('./upgrade/glowswinging').then(m => ({ default: m.Glowswinging })))
const WeaponGlow = lazy(() => import('./upgrade/glowswinging/weapon-glow').then(m => ({ default: m.WeaponGlow })))
const ArmorGlow = lazy(() => import('./upgrade/glowswinging/armor-glow').then(m => ({ default: m.ArmorGlow })))
const Swinging = lazy(() => import('./upgrade/glowswinging/swinging').then(m => ({ default: m.Swinging })))
const Piercing = lazy(() => import('./upgrade/piercing').then(m => ({ default: m.Piercing })))
const Event1 = lazy(() => import('./upgrade/piercing/event-1').then(m => ({ default: m.Event1 })))
const Craft = lazy(() => import('./upgrade/craft').then(m => ({ default: m.Craft })))
const Blessing = lazy(() => import('./upgrade/blessing').then(m => ({ default: m.Blessing })))
const StatScroll = lazy(() => import('./upgrade/stat-scroll').then(m => ({ default: m.StatScroll })))
const Awake = lazy(() => import('./upgrade/awake').then(m => ({ default: m.Awake })))
const Pet = lazy(() => import('./pet').then(m => ({ default: m.Pet })))
const RaisedPet = lazy(() => import('./pet/raised-pet').then(m => ({ default: m.RaisedPet })))
const GraceEffect = lazy(() => import('./pet/grace-effect').then(m => ({ default: m.GraceEffect })))
const PetCandyRecipes = lazy(() => import('./pet/pet-candy-recipes').then(m => ({ default: m.PetCandyRecipes })))
const PetDefectRecycling = lazy(() => import('./pet/pet-defect-recycling').then(m => ({ default: m.PetDefectRecycling })))
const PetRerolling = lazy(() => import('./pet/pet-rerolling').then(m => ({ default: m.PetRerolling })))
const BerryMap = lazy(() => import('./pet/berry-map').then(m => ({ default: m.BerryMap })))
const PetTransmutation = lazy(() => import('./pet/pet-transmutation').then(m => ({ default: m.PetTransmutation })))
const Dungeons = lazy(() => import('./dungeons').then(m => ({ default: m.Dungeons })))
const DungeonsLocation = lazy(() => import('./dungeons/dungeons-location').then(m => ({ default: m.DungeonsLocation })))
const DungeonsDifficulties = lazy(() => import('./dungeons/dungeons-difficulties').then(m => ({ default: m.DungeonsDifficulties })))
const StoryDungeons = lazy(() => import('./dungeons/story-dungeons').then(m => ({ default: m.StoryDungeons })))
const DungeonCheckpoints = lazy(() => import('./dungeons/dungeon-checkpoints').then(m => ({ default: m.DungeonCheckpoints })))
const Cooldown = lazy(() => import('./dungeons/cooldown').then(m => ({ default: m.Cooldown })))
const PetCages = lazy(() => import('./dungeons/pet-cages').then(m => ({ default: m.PetCages })))
const DungeonsCurses = lazy(() => import('./dungeons/dungeons-curses').then(m => ({ default: m.DungeonsCurses })))
const TheWilds = lazy(() => import('./dungeons/dungeons-curses/the-wilds').then(m => ({ default: m.TheWilds })))
const DungeonsDrops = lazy(() => import('./dungeons/dungeons-drops').then(m => ({ default: m.DungeonsDrops })))
const ForsakenTower = lazy(() => import('./dungeons/forsaken-tower').then(m => ({ default: m.ForsakenTower })))
const GuildSiege = lazy(() => import('./dungeons/guild-siege').then(m => ({ default: m.GuildSiege })))
const RedChip = lazy(() => import('./dungeons/guild-siege/red-chip').then(m => ({ default: m.RedChip })))
const Maps = lazy(() => import('./dungeons/guild-siege/maps').then(m => ({ default: m.Maps })))
const KalgasAssault = lazy(() => import('./dungeons/kalgas-assault').then(m => ({ default: m.KalgasAssault })))
const Housing = lazy(() => import('./housing').then(m => ({ default: m.Housing })))
const Template = lazy(() => import('./housing/template').then(m => ({ default: m.Template })))
const Npc = lazy(() => import('./housing/npc').then(m => ({ default: m.Npc })))
const PersonalHouseNpc = lazy(() => import('./housing/npc/personal-house-npc').then(m => ({ default: m.PersonalHouseNpc })))
const GuildHouseNpc = lazy(() => import('./housing/npc/guild-house-npc').then(m => ({ default: m.GuildHouseNpc })))

// 组件映射表
const componentMap: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  'updates': Updates,
  'top-up-event': TopUpEvent,
  'all-server-contents-time': AllServerContentsTime,
  'time': Time,
  'map': Map,
  'madrigal-minimum-level-limit': MadrigalMinimumLevelLimit,
  'wdmadrigal': Wdmadrigal,
  'coral-island-monster': CoralIslandMonster,
  'herneos-monster': HerneosMonster,
  'pixel-perfect-cursor-precision': PixelPerfectCursorPrecision,
  'provisional-damage-hp': ProvisionalDamageHp,
  'theme': Theme,
  'chatting-filter': ChattingFilter,
  'commands': Commands,
  'transmute': Transmute,
  'guild-level': GuildLevel,
  '1v1-bonus': OneV1Bonus,
  'level-gap': LevelGap,
  'item-rarity': ItemRarity,
  'trade': Trade,
  'search-shop': SearchShop,
  'fitting-room': FittingRoom,
  'skill-point': SkillPoint,
  'buff-scale': BuffScale,
  'office-quest': OfficeQuest,
  'couple': Couple,
  'party': Party,
  'drop-rate': DropRate,
  'costume-collection': CostumeCollection,
  'costume-collection-details': CostumeCollectionDetails,
  'masterhero-quests': MasterheroQuests,
  'master-cloak': MasterCloak,
  'hero-reward': HeroReward,
  'level-reach-rewards': LevelReachRewards,
  'monster-focus-timer': MonsterFocusTimer,
  'herd-damage-reduction': HerdDamageReduction,
  'extended-battle-pass': ExtendedBattlePass,
  'formula': Formula,
  'upgrade': Upgrade,
  'power-dice': PowerDice,
  'catcher': Catcher,
  'pity-system': PitySystem,
  'weaponarmor-upgrade': WeaponarmorUpgrade,
  'event': Event,
  'upgrade-level-bonus': UpgradeLevelBonus,
  'ultimate': Ultimate,
  'ultimate-weapon': UltimateWeapon,
  'ultimate-weapon-event': UltimateWeaponEvent,
  'regular-weapon': RegularWeapon,
  'fwc-2025-golden-weapon': Fwc2025GoldenWeapon,
  'reroll-weapons': RerollWeapons,
  'ultimate-jewelry': UltimateJewelry,
  'ultimate-jewelry-event': UltimateJewelryEvent,
  'new-horizon-equipment-sets': NewHorizonEquipmentSets,
  'battle-for-madrigal-ultimate-jewels': BattleForMadrigalUltimateJewels,
  'jewelry-upgrade': JewelryUpgrade,
  'element-upgrade': ElementUpgrade,
  'glowswinging': Glowswinging,
  'weapon-glow': WeaponGlow,
  'armor-glow': ArmorGlow,
  'swinging': Swinging,
  'piercing': Piercing,
  'event-1': Event1,
  'craft': Craft,
  'blessing': Blessing,
  'stat-scroll': StatScroll,
  'awake': Awake,
  'pet': Pet,
  'raised-pet': RaisedPet,
  'grace-effect': GraceEffect,
  'pet-candy-recipes': PetCandyRecipes,
  'pet-defect-recycling': PetDefectRecycling,
  'pet-rerolling': PetRerolling,
  'berry-map': BerryMap,
  'pet-transmutation': PetTransmutation,
  'dungeons': Dungeons,
  'dungeons-location': DungeonsLocation,
  'dungeons-difficulties': DungeonsDifficulties,
  'story-dungeons': StoryDungeons,
  'dungeon-checkpoints': DungeonCheckpoints,
  'cooldown': Cooldown,
  'pet-cages': PetCages,
  'dungeons-curses': DungeonsCurses,
  'the-wilds': TheWilds,
  'dungeons-drops': DungeonsDrops,
  'forsaken-tower': ForsakenTower,
  'guild-siege': GuildSiege,
  'red-chip': RedChip,
  'maps': Maps,
  'kalgas-assault': KalgasAssault,
  'housing': Housing,
  'template': Template,
  'npc': Npc,
  'personal-house-npc': PersonalHouseNpc,
  'guild-house-npc': GuildHouseNpc,
}

/**
 * 根据路由参数获取对应的组件
 * 优先级：leafId > childId > sectionId
 */
export function getBaikeComponentByRoute(
  sectionId?: string,
  childId?: string,
  leafId?: string
): React.LazyExoticComponent<React.ComponentType> | null {
  // 优先匹配 leafId
  if (leafId) {
    const Component = componentMap[leafId]
    if (Component) return Component
  }
  
  // 其次匹配 childId
  if (childId) {
    const Component = componentMap[childId]
    if (Component) return Component
  }
  
  // 最后匹配 sectionId
  if (sectionId) {
    const Component = componentMap[sectionId]
    if (Component) return Component
  }
  
  return null
}

