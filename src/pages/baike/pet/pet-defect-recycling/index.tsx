import React from 'react';
import petDefectRecyclingData from "../../../../config/petDefectRecycling.json";
import "./index.less";

// 等级表头颜色配置（保留原有颜色，因为它们有特定含义）
const LEVEL_COLORS: Record<number, string> = {
  1: '#C04647', // Red
  2: '#D48D46', // Orange
  3: '#97BA56', // Light Green
  4: '#63B558', // Green
  5: '#53A3B3', // Cyan
  6: '#567ABF', // Blue
  7: '#6358B6', // Indigo
  8: '#974AAD', // Purple
  9: '#D0AB3D', // Gold
};

export const PetDefectRecycling: React.FC = () => {
  // 从导入的 JSON 中获取核心数组
  const data = petDefectRecyclingData.pet_defect_recycling.recycling_data;
  const notes = petDefectRecyclingData.pet_defect_recycling.notes;

  return (
    <div className="pet-defect-recycling-container">
      <h2 className="pet-defect-recycling-title">{petDefectRecyclingData.pet_defect_recycling.title}</h2>

      {/* 主布局：左侧文字 + 表格 + 右侧文字 */}
      <div className="pet-defect-recycling-flex-wrapper">
        
        {/* 1. 左侧竖排文字 */}
        <div className="pet-defect-recycling-side-label-box">
          <span className="pet-defect-recycling-side-label-left">raised pet (目标宠物)</span>
        </div>

        {/* 2. 中间 Grid 表格 */}
        <div className="pet-defect-recycling-grid-table">
          
          {/* === 顶部表头 === */}
          {/* 左上角空白 */}
          <div className="pet-defect-recycling-header-corner" />
          
          {/* Lv1 - Lv9 */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((lv) => (
            <div 
              key={`header-${lv}`} 
              className="pet-defect-recycling-level-header"
              style={{ background: LEVEL_COLORS[lv] }}
            >
              <span className="pet-defect-recycling-lv-small">Lv</span>{lv}
            </div>
          ))}
          
          {/* 右上角空白 */}
          <div className="pet-defect-recycling-header-corner" />


          {/* === 数据区域 === */}
          {data.map((group) => (
            <React.Fragment key={group.target_pet_tier}>
              
              {/* 左侧：目标阶级 (Target Tier) */}
              <div 
                className="pet-defect-recycling-target-tier-cell"
                style={{ gridRow: `span ${group.sacrificed_pets.length}` }}
              >
                <div className="pet-defect-recycling-tier-badge">{group.target_pet_tier}</div>
              </div>

              {/* 遍历该目标阶级下的所有祭品组合 */}
              {group.sacrificed_pets.map((item) => (
                <React.Fragment key={`${group.target_pet_tier}-${item.tier}`}>
                  
                  {/* 中间：9个等级的概率 */}
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((lv) => {
                    const key = `Lv${lv}` as keyof typeof item.probabilities;
                    const prob = item.probabilities[key];
                    
                    return (
                      <div key={lv} className="pet-defect-recycling-rate-cell">
                        {prob || ''}
                      </div>
                    );
                  })}

                  {/* 右侧：祭品阶级 (Sacrificed Tier) */}
                  <div className="pet-defect-recycling-sacrifice-tier-cell">
                    {item.tier}
                  </div>

                </React.Fragment>
              ))}

            </React.Fragment>
          ))}


          {/* === 底部表头 === */}
          {/* 左下角空白 */}
          <div className="pet-defect-recycling-header-corner" />
          
          {/* Lv1 - Lv9 */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((lv) => (
            <div 
              key={`footer-${lv}`} 
              className="pet-defect-recycling-level-header"
              style={{ background: LEVEL_COLORS[lv] }}
            >
              <span className="pet-defect-recycling-lv-small">Lv</span>{lv}
            </div>
          ))}
          
          {/* 右下角空白 */}
          <div className="pet-defect-recycling-header-corner" />

        </div>

        {/* 3. 右侧竖排文字 */}
        <div className="pet-defect-recycling-side-label-box">
          <span className="pet-defect-recycling-side-label-right">sacrificed pet (献祭宠物)</span>
        </div>

      </div>

      {/* 底部注释 */}
      <div className="pet-defect-recycling-notes-container">
        {notes.map((note, idx) => (
          <p key={idx} className="pet-defect-recycling-note-item">※ {note}</p>
        ))}
      </div>
    </div>
  );
};
