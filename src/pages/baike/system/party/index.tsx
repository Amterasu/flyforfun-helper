import React from "react";
import { BaikeImage } from "../../../../components/BaikeImage";
import "./index.less";

// 高亮文本组件
const HighlightText: React.FC<{ text: string; highlights: string[] }> = ({
  text,
  highlights,
}) => {
  if (highlights.length === 0) {
    return <>{text}</>;
  }

  const pattern = highlights
    .map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const regex = new RegExp(`(${pattern})`, "g");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, idx) => {
        const isHighlight = highlights.includes(part);
        return isHighlight ? (
          <span key={idx} className="highlight">
            {part}
          </span>
        ) : (
          <React.Fragment key={idx}>{part}</React.Fragment>
        );
      })}
    </>
  );
};

export const Party = () => {
  return (
    <div className="baike-content">
      <div className="baike-section">
        <h2 className="baike-section-title">队伍窗口</h2>
        <div className="baike-info-item">
          <p>经验奖励：队伍成员在周围环境中获得的额外经验。</p>
        </div>
        <div className="baike-info-item">
          <p>最低等级：获得经验并为队伍经验奖励做出贡献所需的最低等级。</p>
        </div>
        <div className="baike-info-item">
          <p>
            这对应于队伍中和周围环境中最高等级玩家的等级（减去
            <HighlightText
              text="19 / 9（大师或英雄任务）"
              highlights={["19", "9"]}
            />
            级）。
          </p>
        </div>
        <div className="baike-info-item">
          <p>如果玩家不符合条件，则文字为红色。</p>
        </div>
      </div>

      <div className="baike-section">
        <h2 className="baike-section-title">经验分享</h2>
        <div className="baike-info-item">
          <p>
            <strong>等级</strong>和<strong>贡献</strong>
            经验分享模式现在提供不同的经验奖励，并且经验分享的方式也有所不同。
          </p>
        </div>
        <div className="baike-info-item">
          <p>「等级」的经验将根据成员的等级进行分配。</p>
        </div>
        <div className="baike-info-item">
          <p>
            「贡献」的经验根据击杀怪物的参与度(对战斗的贡献)进行分配。贡献包括攻击、治疗和坦克。
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            无论何种分享模式，经验的加成部分总是会根据等级分配给周围的所有成员。
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            除了基于周边成员数量的基础奖励外，组建
            <HighlightText text="8" highlights={["8"]} />
            人满员队伍不再享有额外的专属奖励。
          </p>
        </div>
      </div>

      <div className="baike-section">
        <h2 className="baike-section-title">贡献度</h2>
        <div className="baike-info-item">
          <p>
            贡献经验现在由参与战斗的成员平均分配。
            <a
              href="https://universe.flyff.com/news/patchnotes103"
              target="_blank"
              rel="noopener noreferrer"
            >
              Game Version 1.0.3 Patch Notes
            </a>
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            <HighlightText text="神圣惩戒" highlights={["神圣惩戒"]} />
            和其他
            <HighlightText text="减益效果" highlights={["减益效果"]} />
            现在算是队伍贡献。
            <a
              href="https://universe.flyff.com/news/patchnotes103"
              target="_blank"
              rel="noopener noreferrer"
            >
              Game Version 1.0.3 Patch Notes
            </a>
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            调整了队伍贡献公式，使辅助技能不会从车头窃取经验。
            <a
              href="https://universe.flyff.com/news/patchnotes104"
              target="_blank"
              rel="noopener noreferrer"
            >
              Game Version 1.0.4 Patch Notes
            </a>
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            <HighlightText text="攻击" highlights={["攻击"]} />、
            <HighlightText text="承受伤害" highlights={["承受伤害"]} />和
            <HighlightText text="治疗" highlights={["治疗"]} />
            现在都算是贡献。以前只有攻击者才能获得大部分贡献经验。
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            现在
            <HighlightText text="3" highlights={["3"]} />
            名相同等级的玩家，
            <HighlightText text="1" highlights={["1"]} />
            车头，
            <HighlightText text="1" highlights={["1"]} />
            坦克（也可以攻击），
            <HighlightText text="1" highlights={["1"]} />
            守护（也可以攻击或坦克）应该获得大致相同的经验量。
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            <strong>
              贡献经验取决于最高等级的贡献者，因此如果最高贡献者对你正在战斗的怪物有经验惩罚，则该区域中的每个人都会受到相同的惩罚。
            </strong>
          </p>
        </div>
        <div className="baike-image-thumbnail">
          <BaikeImage
            src="/system/party/contribution_experience_penalty.png"
            alt="contribution_experience_penalty.png"
            maxWidth="600px"
          />
        </div>
      </div>

      <div className="baike-section">
        <h2 className="baike-section-title">经验加成</h2>
        <div className="baike-info-item">
          <p>
            要获得额外的队伍经验奖励，玩家等级差必须在
            <HighlightText text="19 / 9 (转生)" highlights={["19", "9"]} />
            级以内。
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            <strong>
              至少需要
              <HighlightText text="2" highlights={["2"]} />
              名成员才能启动经验奖励
            </strong>
            。
          </p>
        </div>
        <div className="bonus-cards">
          <div className="bonus-card">
            <div className="bonus-card-title">低于10级的团</div>
            <div className="bonus-card-content">
              <p>
                周围每位成员(相差
                <HighlightText text="19 / 9 (转生)" highlights={["19", "9"]} />
                级以内)提供
                <HighlightText text="4%" highlights={["4%"]} />
                + 每个在战斗中做出贡献的活跃成员提供
                <HighlightText text="13.5%" highlights={["13.5%"]} />。
              </p>
            </div>
          </div>
          <div className="bonus-card">
            <div className="bonus-card-title">等级经验分配（高级队伍）</div>
            <div className="bonus-card-content">
              <p>
                周围每位成员(相差
                <HighlightText text="19 / 9 (转生)" highlights={["19", "9"]} />
                级以内)提供
                <HighlightText text="7%" highlights={["7%"]} />
                + 每个在战斗中做出贡献的活跃成员提供
                <HighlightText text="13%" highlights={["13%"]} />。
              </p>
            </div>
          </div>
          <div className="bonus-card">
            <div className="bonus-card-title">贡献经验分配（高级队伍）</div>
            <div className="bonus-card-content">
              <p>
                周围每位成员(相差
                <HighlightText text="19 / 9 (转生)" highlights={["19", "9"]} />
                级以内)提供
                <HighlightText text="7%" highlights={["7%"]} />
                + 每个在战斗中做出贡献的活跃成员提供
                <HighlightText text="25%" highlights={["25%"]} />。
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="baike-section">
        <h2 className="baike-section-title">队伍经验</h2>
        <div className="baike-image-thumbnail">
          <BaikeImage
            src="/system/party/party_exp.png"
            alt="party_exp.png"
            maxWidth="600px"
          />
        </div>

        <div className="baike-info-item">
          <p>
            若周围成员的平均等级与怪物等级相比小于或等于
            <HighlightText text="5" highlights={["5"]} />
            ，队伍将获得经验。
          </p>
        </div>
      </div>

      <div className="baike-section">
        <h2 className="baike-section-title">队伍技能</h2>
        <div className="baike-image-thumbnail">
          <BaikeImage
            src="/system/party/lucky_drop.png"
            alt="lucky_drop.png"
            maxWidth="400px"
          />
        </div>

        <div className="baike-info-item">
          <p>幸运掉落：将稀有物品（地面上的红色物品）的掉落概率翻倍</p>
        </div>
        <div className="party-images-grid">
          <div className="baike-image-thumbnail">
            <BaikeImage
              src="/system/party/lucky_drop&gift_box1.png"
              alt="lucky_drop&gift_box1.png"
              maxWidth="400px"
            />
          </div>
          <div className="baike-image-thumbnail">
            <BaikeImage
              src="/system/party/lucky_drop&gift_box2.png"
              alt="lucky_drop&gift_box2.png"
              maxWidth="400px"
            />
          </div>
        </div>

        <div className="baike-info-item">
          <p>
            幕间抽奖:指定怪物的所有掉落列表增加一次额外循环（即所有掉落列表将额外执行一次）
          </p>
        </div>
      </div>
    </div>
  );
};
