import React from "react";
import { couponDataTyped } from "../../../../../config/coupon/coupon";
import type { CoupleLevel } from "../../../../../config/coupon/coupon";
import "./CoupleLevels.less";

const coupleLevels: CoupleLevel[] = couponDataTyped.coupleLevels;

export const CoupleLevels = () => {
  return (
    <div className="couple-levels">
      <div className="couple-table-wrapper">
        <table className="baike-table couple-table">
          <thead>
            <tr>
              <th>等级</th>
              <th>最大技能点</th>
              <th>技能点奖励</th>
              <th>情侣仓库槽位奖励</th>
              <th>基础鼓励次数</th>
            </tr>
          </thead>
          <tbody>
            {coupleLevels.map((level) => (
              <tr key={level.level}>
                <td className="level-cell">{level.level}</td>
                <td className="skill-points-cell">{level.maxSkillPoints}</td>
                <td className={level.skillPointsReward > 0 ? "reward-cell" : ""}>
                  {level.skillPointsReward > 0 ? `+${level.skillPointsReward}` : "-"}
                </td>
                <td className={level.bankSlotsReward > 0 ? "reward-cell" : ""}>
                  {level.bankSlotsReward > 0 ? `+${level.bankSlotsReward}` : "-"}
                </td>
                <td className={level.baseCheers > 0 ? "reward-cell" : ""}>
                  {level.baseCheers > 0 ? `+${level.baseCheers}` : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

