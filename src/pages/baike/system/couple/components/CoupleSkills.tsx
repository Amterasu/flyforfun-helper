import React from "react";
import { couponDataTyped } from "../../../../../config/coupon/coupon";
import type { CoupleSkill } from "../../../../../config/coupon/coupon";
import "./CoupleSkills.less";

const coupleSkills: CoupleSkill[] = couponDataTyped.coupleSkills;

export const CoupleSkills = () => {
  return (
    <div className="couple-skills">
      <div className="baike-info-card">
        <h3 style={{ marginTop: 0, marginBottom: "16px", color: "rgba(255, 255, 255, 0.9)" }}>
          情侣技能说明
        </h3>
        <p style={{ color: "rgba(255, 255, 255, 0.85)", lineHeight: 1.7, marginBottom: "16px" }}>
          随着情侣等级的提升，可以解锁各种情侣技能。这些技能可以增强你和伴侣之间的互动和游戏体验。使用技能会消耗技能点。
        </p>
      </div>

      <div className="skills-grid">
        {coupleSkills.map((skill, idx) => {
          // 处理图标名称：去除空格并转小写
          const iconName = `couple${skill.name_en.replace(/\s+/g, "").toLowerCase()}`;
          const iconUrl = `https://flyffipedia.com/Icons/Skills/colored/${iconName}.png`;
          
          return (
            <div key={idx} className="skill-card">
              <div className="skill-header">
                <div className="skill-icon-wrapper">
                  <img
                    src={iconUrl}
                    alt={skill.name_en}
                    className="skill-icon"
                    onError={(e) => {
                      // 如果图片加载失败，隐藏图片并显示占位符
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const placeholder = target.nextElementSibling as HTMLElement;
                      if (placeholder) {
                        placeholder.classList.remove("hidden");
                      }
                    }}
                  />
                  <div className="skill-icon-placeholder hidden">📖</div>
                </div>
                <div className="skill-title-wrapper">
                  <h4 className="skill-name">{skill.name_cn}</h4>
                  <span className="skill-name-en">{skill.name_en}</span>
                </div>
              </div>
              <div className="skill-content">
              <p className="skill-description">{skill.description_cn}</p>
              <div className="skill-details">
                <div className="skill-detail-item">
                  <span className="detail-label">需要等级：</span>
                  <span className="detail-value">{skill.requiredLevel}</span>
                </div>
                <div className="skill-detail-item">
                  <span className="detail-label">消耗技能点：</span>
                  <span className="detail-value">{skill.consumedPoints}</span>
                </div>
                {skill.duration_cn !== "--" && (
                  <div className="skill-detail-item">
                    <span className="detail-label">持续时间：</span>
                    <span className="detail-value">{skill.duration_cn}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
};

