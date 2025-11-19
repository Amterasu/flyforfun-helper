import { DocNode, MainNav } from '../types/doc'

export const mainNavTabs: MainNav[] = ['飞飞百科', '助手', '新闻', '社区']

export const docTree: DocNode[] = [
  {
    id: 'system',
    title: '⚙️ 系统',
    description: '系统玩法、地图、工会与各类活动资讯',
    children: [
      { id: 'updates', title: '📢 更新' },
      { id: 'all-server-contents-time', title: '📅 全服内容时间' },
      { id: 'time', title: '🕙 时间' },
      { id: 'map', title: '🗺️ 地图' },
      { id: 'pixel-perfect-cursor-precision', title: '🖱️ 像素级光标精度' },
      { id: 'provisional-damage-hp', title: '❤️ 临时伤害与生命值' },
      { id: 'theme', title: '🎨 主题' },
      { id: 'chatting-filter', title: '💬 聊天过滤' },
      { id: 'commands', title: '👩🏻‍💻 指令' },
      { id: 'transmute', title: '💫 转化' },
      { id: 'guild-level', title: '🏰 工会等级' },
      { id: 'couple', title: '👩🏻‍❤️‍👨🏻 情侣' },
      { id: 'party', title: '🤝 队伍' },
      { id: '1v1-bonus', title: '🎯 单点加成' },
      { id: 'level-gap', title: '🥇 等级差距' },
      { id: 'drop-rate', title: '🎁 掉落率' },
      { id: 'item-rarity', title: '📦 物品稀有度' },
      { id: 'extended-battle-pass', title: '💳 扩展战斗通行证' },
      { id: 'trade', title: '⚖️ 交易' },
      { id: 'search-shop', title: '🛒 商店搜索' },
      { id: 'fitting-room', title: '👕 试衣间' },
      { id: 'costume-collection', title: '👗 往期时装' },
      { id: 'monster-focus-timer', title: '⏳ 怪物仇恨' },
      { id: 'herd-damage-reduction', title: '🐑 群体伤害减免' },
      { id: 'skill-point', title: '🧠 技能点' },
      { id: 'buff-scale', title: '💪 Buff强度' },
      { id: 'office-quest', title: '❓ 事务所任务' },
      { id: 'level-reach-rewards', title: '💯 等级达成奖励' },
      { id: 'masterhero-quests', title: '👑 大师&英雄任务' }
    ]
  },
  {
    id: 'formula',
    title: '🧪 公式',
    description: '核心计算公式'
  },
  {
    id: 'upgrade',
    title: '🚀 强化',
    description: '装备强化、终极武器与附魔系统',
    children: [
      { id: 'power-dice', title: '🎲 力量骰子' },
      { id: 'catcher', title: '🧤 矿' },
      { id: 'pity-system', title: '🥺 保底机制' },
      { id: 'weaponarmor-upgrade', title: '🏹 武器&防具强化' },
      { id: 'ultimate', title: '⚜️终极武器和首饰' },
      { id: 'new-horizon-equipment-sets', title: '🦾 150PVE' },
      { id: 'battle-for-madrigal-ultimate-jewels', title: '💎 符文宝石' },
      { id: 'jewelry-upgrade', title: '💍 首饰强化' },
      { id: 'element-upgrade', title: '🔥 元素强化' },
      { id: 'glowswinging', title: '✨ 发光&摆动' },
      { id: 'piercing', title: '✂️ 穿洞' },
      { id: 'craft', title: '🛠️  crafting（制作）' },
      { id: 'blessing', title: '🙌 祝福' },
      { id: 'stat-scroll', title: '📜 属性卷轴' },
      { id: 'awake', title: '📜 觉醒' }
    ]
  },
  {
    id: 'pet',
    title: '🐶 宠物',
    description: '宠物、糖果与异化玩法集合',
    children: [
      { id: 'raised-pet', title: '🦮 养成宠物' },
      { id: 'grace-effect', title: '🕊️ 恩典效果' },
      { id: 'pet-candy-recipes', title: '🍭 宠物糖果配方' },
      { id: 'pet-defect-recycling', title: '🐾 宠物献祭' },
      { id: 'pet-rerolling', title: '🐾 宠物重铸' },
      { id: 'berry-map', title: '🌿 浆果地图' },
      { id: 'pet-transmutation', title: '💫 宠物转化' }
    ]
  },
  {
    id: 'dungeons',
    title: '🐉 副本',
    description: '副本机制、掉落与限时活动',
    children: [
      { id: 'dungeons-location', title: '📌 副本位置' },
      { id: 'dungeons-difficulties', title: '🚩 副本难度' },
      { id: 'story-dungeons', title: '📚 故事模式' },
      { id: 'dungeon-checkpoints', title: '📍 副本传送点' },
      { id: 'cooldown', title: '⏳ 冷却时间' },
      { id: 'pet-cages', title: '🥅 宠物笼子' },
      { id: 'dungeons-curses', title: '💥 副本诅咒' },
      { id: 'dungeons-drops', title: '💎 副本掉落' },
      { id: 'forsaken-tower', title: '🗼 每日任务' },
      { id: 'guild-siege', title: '🏆 工会战' },
      { id: 'kalgas-assault', title: '🏆 卡尔加斯突袭' }
    ]
  },
  {
    id: 'housing',
    title: '🏠 房屋',
    description: '房屋模板与 NPC 配置',
    children: [
      { id: 'template', title: '📍 模板' },
      { id: 'npc', title: '🗿 NPC' }
    ]
  }
]