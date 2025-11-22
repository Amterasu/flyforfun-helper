import React from "react";
import { couponDataTyped } from "../../../../../config/coupon/coupon";
import type { QuestGroup } from "../../../../../config/coupon/coupon";
import "./CoupleDailyQuests.less";

const questGroups: QuestGroup[] = couponDataTyped.coupleDailyQuests;

export const CoupleDailyQuests = () => {
  return (
    <div className="couple-daily-quests">
      {questGroups.map((group, groupIdx) => (
        <div key={groupIdx} className="quest-group-wrapper">
          <h4 className="quest-group-title">{group.group_description}</h4>
          
          <div className="quests-table-wrapper">
            <table className="baike-table quests-table">
              <thead>
                <tr>
                  <th>任务名称</th>
                  <th>目标/描述</th>
                  <th>需要物品</th>
                </tr>
              </thead>
              <tbody>
                {group.quests.map((quest, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="quest-name-cell">
                        <span className="quest-name-cn">{quest.questName_cn}</span>
                        <span className="quest-name-en">{quest.questName_en}</span>
                      </div>
                    </td>
                    <td>
                      {quest.objective_cn || quest.questName_cn}
                    </td>
                    <td>{quest.neededItem_cn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="xp-reward-table-wrapper">
            <table className="baike-table xp-reward-table">
              <thead>
                <tr>
                  <th>情侣等级</th>
                  {Object.entries(group.xp_reward_table).map(([level]) => (
                    <th key={level} className="level-header">
                      Lv{parseInt(level) + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="reward-label">经验值奖励</td>
                  {Object.entries(group.xp_reward_table).map(([level, percentage]) => (
                    <td key={level} className="reward-percentage">
                      {percentage}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

