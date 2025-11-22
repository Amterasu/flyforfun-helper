import React from "react";
import { couponDataTyped } from "../../../../../config/coupon/coupon";
import type { AnniversaryReward } from "../../../../../config/coupon/coupon";
import "./CoupleAnniversaryRewards.less";

const anniversaryRewards: AnniversaryReward[] =
  couponDataTyped.coupleAnniversaryRewards;

export const CoupleAnniversaryRewards = () => {
  return (
    <div className="couple-anniversary-rewards">
      <div className="baike-info-card">
        <h3
          style={{
            marginTop: 0,
            marginBottom: "16px",
            color: "rgba(255, 255, 255, 0.9)",
          }}
        >
          情侣周年奖励说明
        </h3>
        <p
          style={{
            color: "rgba(255, 255, 255, 0.85)",
            lineHeight: 1.7,
            marginBottom: "16px",
          }}
        >
          情侣系统将自动记录你们的相伴天数，在特定纪念日当天，可解锁丰厚专属奖励，涵盖限定道具与特殊物品。部分标注了重复周期的奖励，将按周期定期重复发放。
        </p>
      </div>

      <div className="anniversary-rewards-grid">
        {anniversaryRewards.map((reward, idx) => (
          <div key={idx} className="anniversary-card">
            <div className="anniversary-header">
              <h4 className="anniversary-title">{reward.rewardName_cn}</h4>
              <div className="anniversary-days">
                <span className="days-label">天数：</span>
                <span className="days-value">{reward.days} 天</span>
                {reward.repeatDays && (
                  <span className="repeat-label">
                    （每 {reward.repeatDays} 天重复）
                  </span>
                )}
              </div>
            </div>
            <div className="anniversary-rewards-list">
              <div className="rewards-label">奖励内容：</div>
              <ul className="rewards-items">
                {reward.contents.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <span className="reward-icon">🎁</span>
                    <span className="reward-item-cn">{item.item_cn}</span>
                    <span className="reward-item-en">{item.item_en}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
