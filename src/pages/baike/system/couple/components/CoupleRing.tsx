import React from "react";
import { couponDataTyped } from "../../../../../config/coupon/coupon";
import type { CoupleRing as CoupleRingType } from "../../../../../config/coupon/coupon";
import { getRarityColor } from "../../../../../constants/rarityColors";
import "./CoupleRing.less";

const coupleRings: CoupleRingType[] = couponDataTyped.coupleRings;

export const CoupleRing = () => {
  return (
    <div className="couple-ring">
      <div className="baike-info-card">
        <h3 style={{ marginTop: 0, marginBottom: "16px", color: "rgba(255, 255, 255, 0.9)" }}>
          情侣戒指说明
        </h3>
        <p style={{ color: "rgba(255, 255, 255, 0.85)", lineHeight: 1.7, marginBottom: "16px" }}>
          情侣戒指是情侣系统的核心装备，提供了传送次数、鼓励次数和情侣仓库槽位等属性。不同稀有度的戒指属性也不同。
        </p>
      </div>

      <div className="rings-table-wrapper">
        <table className="baike-table rings-table">
          <thead>
            <tr>
              <th>戒指名称</th>
              <th>稀有度</th>
              <th>传送次数</th>
              <th>鼓励次数</th>
              <th>情侣仓库槽位</th>
              <th>价格</th>
            </tr>
          </thead>
          <tbody>
            {coupleRings.map((ring, idx) => {
              const rarityColor = getRarityColor(ring.rarity_en);
              const iconUrl = `https://flyffipedia.com/Icons/Items/couplering${ring.icon}.png`;
              return (
                <tr key={idx}>
                  <td>
                    <div className="ring-name-cell">
                      <div className="ring-icon-wrapper">
                        <img
                          src={iconUrl}
                          alt={ring.name_en}
                          className="ring-icon"
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
                        <div className="ring-icon-placeholder hidden">💍</div>
                      </div>
                      <div className="ring-name-text">
                        <span className="ring-name-cn">{ring.name_cn}</span>
                        <span className="ring-name-en">{ring.name_en}</span>
                      </div>
                    </div>
                  </td>
                  <td 
                    className="rarity-cell" 
                    style={{ color: rarityColor, fontWeight: 600 }}
                  >
                    {ring.rarity_cn}
                  </td>
                  <td className="attribute-cell">{ring.teleports}</td>
                  <td className="attribute-cell">{ring.cheers > 0 ? ring.cheers : "-"}</td>
                  <td className="attribute-cell">{ring.bankSlots > 0 ? `+${ring.bankSlots}` : "-"}</td>
                  <td className="price-cell">{ring.price || "无法购买"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

