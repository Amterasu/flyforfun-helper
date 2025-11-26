import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 元素映射：9=无属性, 2=电, 4=土, 0=火, 1=水, 3=风
const ELEMENT_MAP = {
  9: 'none',
  2: 'electricity',
  4: 'earth',
  0: 'fire',
  1: 'water',
  3: 'wind'
}

const RESISTANCE_MAP = {
  0: 'resistFire',
  1: 'resistWater',
  2: 'resistElectricity',
  3: 'resistWind',
  4: 'resistEarth'
}

// 递归删除null值
function removeNull(obj) {
  if (obj === null || obj === undefined) {
    return undefined
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => removeNull(item)).filter(item => item !== undefined)
  }
  
  if (typeof obj === 'object') {
    const cleaned = {}
    for (const [key, value] of Object.entries(obj)) {
      const cleanedValue = removeNull(value)
      if (cleanedValue !== undefined) {
        cleaned[key] = cleanedValue
      }
    }
    return cleaned
  }
  
  return obj
}

// 清理name字段，只保留cns和en
function cleanNameField(nameObj) {
  if (!nameObj || typeof nameObj !== 'object') {
    return nameObj
  }
  
  const cleaned = {}
  if (nameObj.cns !== undefined) {
    cleaned.cns = nameObj.cns
  }
  if (nameObj.en !== undefined) {
    cleaned.en = nameObj.en
  }
  return cleaned
}

// 处理怪物数据
function processMonster(monster) {
  if (!monster || typeof monster !== 'object') {
    return monster
  }
  
  const processed = { ...monster }
  
  // 清理name字段
  if (processed.name) {
    processed.name = cleanNameField(processed.name)
  }
  
  // 去掉drops字段
  delete processed.drops
  
  // 处理element和抗性
  if (processed.element !== undefined) {
    const element = processed.element
    
    // 先保存所有抗性值
    const resistFire = processed.resistFire
    const resistWater = processed.resistWater
    const resistWind = processed.resistWind
    const resistEarth = processed.resistEarth
    const resistElectricity = processed.resistElectricity
    
    // 删除所有抗性字段
    delete processed.resistFire
    delete processed.resistWater
    delete processed.resistWind
    delete processed.resistEarth
    delete processed.resistElectricity
    
    // 如果怪物有属性（element !== 9），根据element保留对应的抗性
    if (element !== 9 && element !== undefined) {
      const resistanceKey = RESISTANCE_MAP[element]
      if (resistanceKey) {
        // 根据element获取对应的抗性值
        let resistanceValue
        switch (element) {
          case 0: // 火
            resistanceValue = resistFire
            break
          case 1: // 水
            resistanceValue = resistWater
            break
          case 2: // 电
            resistanceValue = resistElectricity
            break
          case 3: // 风
            resistanceValue = resistWind
            break
          case 4: // 土
            resistanceValue = resistEarth
            break
        }
        
        // 如果抗性值不为undefined，添加对应的抗性字段
        if (resistanceValue !== undefined) {
          processed[resistanceKey] = resistanceValue
        }
      }
    }
    // element === 9 为无属性，不需要添加任何抗性字段
  }
  
  // 递归处理嵌套对象
  return removeNull(processed)
}

// 处理诅咒技能
function processCurseSkill(skill) {
  if (!skill || typeof skill !== 'object') {
    return skill
  }
  
  const processed = { ...skill }
  
  // 清理name和description字段
  if (processed.name) {
    processed.name = cleanNameField(processed.name)
  }
  if (processed.description) {
    processed.description = cleanNameField(processed.description)
  }
  
  // 递归处理其他字段
  return removeNull(processed)
}

// 处理副本数据
function processDungeon(dungeon) {
  if (!dungeon || typeof dungeon !== 'object') {
    return dungeon
  }
  
  const processed = { ...dungeon }
  
  // 清理dungeonWorld的name字段
  if (processed.dungeonWorld && processed.dungeonWorld.name) {
    processed.dungeonWorld.name = cleanNameField(processed.dungeonWorld.name)
  }
  
  // 清理副本的name字段
  if (processed.name) {
    processed.name = cleanNameField(processed.name)
  }
  
  // 处理怪物列表
  if (Array.isArray(processed.monsterList)) {
    processed.monsterList = processed.monsterList.map(processMonster)
  }
  
  // 处理诅咒技能列表
  if (Array.isArray(processed.curseSkills)) {
    processed.curseSkills = processed.curseSkills.map(processCurseSkill)
  }
  
  // 递归删除null值
  return removeNull(processed)
}

// 主函数
function main() {
  const inputPath = path.join(__dirname, '../src/config/dungeons/index.json')
  const outputPath = inputPath // 直接覆盖原文件
  
  console.log('开始处理副本数据...')
  
  try {
    // 读取JSON文件
    const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'))
    
    console.log(`读取到 ${data.length} 个副本`)
    
    // 处理每个副本
    const processedData = data.map((dungeon, index) => {
      if (index % 100 === 0) {
        console.log(`处理进度: ${index + 1}/${data.length}`)
      }
      return processDungeon(dungeon)
    })
    
    console.log('处理完成，正在保存...')
    
    // 保存处理后的数据
    fs.writeFileSync(outputPath, JSON.stringify(processedData, null, 2), 'utf8')
    
    console.log('✅ 数据清理完成！')
    console.log(`✅ 已保存到: ${outputPath}`)
    
  } catch (error) {
    console.error('❌ 处理失败:', error.message)
    process.exit(1)
  }
}

main()

