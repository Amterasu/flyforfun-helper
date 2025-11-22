import React from "react";
import { CoupleLevels } from "./components/CoupleLevels";
import { CoupleSkills } from "./components/CoupleSkills";
import { CoupleRing } from "./components/CoupleRing";
import { CoupleDailyQuests } from "./components/CoupleDailyQuests";
import { CoupleAnniversaryRewards } from "./components/CoupleAnniversaryRewards";
import "./index.less";

const coupleSections = [
  {
    id: "levels",
    title: "情侣等级",
    titleEn: "Couple Levels",
    component: <CoupleLevels />,
  },
  {
    id: "skills",
    title: "情侣技能",
    titleEn: "Couple Skills",
    component: <CoupleSkills />,
  },
  {
    id: "ring",
    title: "情侣戒指",
    titleEn: "Couple Ring",
    component: <CoupleRing />,
  },
  {
    id: "daily-quests",
    title: "情侣日常任务",
    titleEn: "Couple Daily Quests",
    component: <CoupleDailyQuests />,
  },
  {
    id: "anniversary",
    title: "情侣周年奖励",
    titleEn: "Couple Anniversary Rewards",
    component: <CoupleAnniversaryRewards />,
  },
];

export const Couple = () => {
  return (
    <div className="baike-content">
      {coupleSections.map((section) => (
        <div key={section.id} className="couple-section-wrapper">
          <div className="couple-section-header">
            <h2 className="couple-section-title">{section.title}</h2>
            <span className="couple-section-title-en">{section.titleEn}</span>
          </div>
          {section.component}
        </div>
      ))}
    </div>
  );
};
