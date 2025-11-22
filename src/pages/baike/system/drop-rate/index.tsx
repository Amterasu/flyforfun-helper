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

export const DropRate = () => {
  return (
    <div className="baike-content">
      <div className="baike-section">
        <h2 className="baike-section-title">基于等级的掉落率惩罚</h2>
        <div className="baike-image-thumbnail">
          <BaikeImage
            src="/system/drop_rate.png"
            alt="drop_rate.png"
            maxWidth="600px"
          />
        </div>
        <div className="baike-info-item">
          <p>
            当你与等级比你低很多的怪物战斗时，你的掉落率会降低，而且当降低等级时，从掉落惩罚的角度来看，游戏会以角色的最高等级来计算。
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            如果你正考虑为了更高效地刷取资源而故意降低自身等级，还请留意这些机制会对你的物品掉落率产生影响。
          </p>
        </div>
        <div className="baike-info-item">
          <p>掉落率基于参与贡献的角色中最高等级（含已降级角色）来计算</p>
        </div>
        <div className="baike-info-item">
          <p>
            例如，如果
            <HighlightText text="126" highlights={["126"]} />
            级和
            <HighlightText text="140" highlights={["140"]} />
            级玩家击杀一只远古猛犸象（
            <HighlightText text="139" highlights={["139"]} />
            级），系统会考虑贡献最高等级的玩家。这意味着两名玩家的经验值都会减少
            <HighlightText text="20%" highlights={["20%"]} />
            ，但两名玩家都将拥有完整的
            <HighlightText text="100%" highlights={["100%"]} />
            掉落率。
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            <em>
              治疗和复活不被视为参与，但承受伤害、神圣惩戒和任何造成伤害的攻击都被视为参与。
            </em>
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            <em>
              如果怪物的HP尚未完全恢复，惩罚仍然适用，无论最高等级角色是否断开连接、切换到其他频道或世界，或死亡。
            </em>
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            <em>
              高级玩家因受到Boss或紫圈怪物的特殊攻击伤害而不会对低级玩家的怪物掉落率产生负面影响。
            </em>
            如果您受到的范围伤害来自您无法反击的怪物（不同队伍等），则不会影响掉落率。
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            玩家等级不会影响怪物幻化外观的掉落率；玩家在任何等级都可以有效刷出幻化外观。
          </p>
        </div>
      </div>

      <div className="baike-section">
        <h2 className="baike-section-title">可选的大师/英雄任务</h2>
        <div className="baike-info-item">
          <p>
            转生任务，掉落率将减半（
            <HighlightText text="50%掉落率惩罚" highlights={["50%"]} />
            ）。
          </p>
        </div>
      </div>

      <div className="baike-section">
        <h2 className="baike-section-title">提升掉落率的角色buff</h2>
        <div className="baike-info-item">
          <p>
            队伍技能（幸运掉落和幕间抽奖）、住房buff、冒险家幸运瓶以及其他增加掉落率的角色buff：
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            当怪物死亡时，掉落率会受到造成<strong>最大总伤害</strong>
            角色的buff影响，且掉落的物品将属于该角色，并忽略断线、切换到其他频道、世界或已死亡的玩家。
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            <em>
              最后一击<strong>仅</strong>
              用于计算怪物击杀计数，如任务、战斗通行证、成就等。
            </em>
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            如果有两个角色造成的总伤害相同，则最后开始攻击怪物的角色将影响掉落率（不是最后一击，而是第一次攻击的顺序）。
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            如果角色死亡后复活，该角色造成的总伤害<strong>不</strong>
            包括死亡前造成的伤害。
          </p>
        </div>
      </div>

      <div className="baike-section">
        <h2 className="baike-section-title">掉落机制</h2>
        <div className="baike-info-item">
          <p>
            掉落都是在单独的掉落组合中分别完成的，因此大的战利品表不会影响掉落某些东西的能力（例如卡牌，日光石，独特的武器等）
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            每个怪物都有不同的掉落组合(组别、分区)，因此当怪物被杀死时，会根据掉落几率从每个组合(组别、分区)中掉落一定数量的物品。
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            例如：如果你在达肯3中杀死紫罗兰，它会检查卷轴组
            <HighlightText text="5" highlights={["5"]} />
            次，并给你一个<code>spro low</code>、一个<code>spro</code>、一个
            <code>apro</code>或一个
            <code>gpro</code>，概率受掉落技能、等级等影响。
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            当怪物死亡时，它总是按顺序检查掉落表，从<strong>概率最低</strong>
            的物品开始，这意味着最稀有的物品会首先被计算。
          </p>
        </div>
      </div>

      <div className="baike-section">
        <h2 className="baike-section-title">单点对AOE的劣势</h2>
        <div className="baike-info-item">
          <p>
            由于群攻玩家能够一次杀死更多怪物，他们升级和获取物品需要更多时间。
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            因此，游戏中引入了一个新机制：
            <HighlightText text="30" highlights={["30"]} />
            级以上的低级怪物、普通怪物和队长怪物被
            <strong>
              单一目标攻击和技能造成的伤害至少
              <HighlightText text="80%" highlights={["80%"]} />
            </strong>
            击杀后，经验值和掉落率都会增加。
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            目前，
            <HighlightText text="30" highlights={["30"]} />
            级怪物的单点经验和掉落率增加为
            <HighlightText text="20%" highlights={["20%"]} />
            ，并逐渐上升到
            <HighlightText text="140" highlights={["140"]} />
            级时的
            <HighlightText text="35%" highlights={["35%"]} />
            ，
            <HighlightText text="141" highlights={["141"]} />
            级时的
            <HighlightText text="90%" highlights={["90%"]} />
            到
            <HighlightText text="160" highlights={["160"]} />
            级时的
            <HighlightText text="102%" highlights={["102%"]} />。
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            <strong>单点经验和掉落率增加基于怪物等级</strong>
            ，这意味着只要你足够强大，可以对抗
            <HighlightText text="141" highlights={["141"]} />
            级及以上的怪物，你就可以利用这些增加经验倍率和掉率。
          </p>
        </div>
      </div>

      <div className="baike-section">
        <h2 className="baike-section-title">副本</h2>
        <div className="baike-info-item">
          <p>
            当单人进入普通副本（Big Muscle、Krrr、Mushmoot、Iblis
            Leanes、Clockworks War、Meteonyker、Red Meteonyker）时，将有
            <HighlightText text="-68%" highlights={["-68%"]} />
            到
            <HighlightText text="-90%" highlights={["-90%"]} />
            的掉落惩罚（仅适用于只有
            <HighlightText text="1" highlights={["1"]} />
            名玩家的情况）。
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            这
            <strong>
              <HighlightText text="6" highlights={["6"]} />
              个新副本
            </strong>
            （Leren Chasm、莱斯 Catacombs、Envy Depths、Guardian
            Sanctuary、Storm Peak、The
            Wilds）中的怪物没有等级。它们根据所需的进入等级进行平衡，但它们在等级差异惩罚方面与其他怪物的交互方式不同。
          </p>
        </div>
        <div className="baike-info-card">
          <div className="baike-info-item">
            <p>
            这些怪物不存在基于等级差异的伤害减免机制，因此它们的伤害输出完全不受你的等级影响。同时，它们也没有因等级差异产生的掉落惩罚，所以你的等级高低并不重要——只要你能进入副本，就能完全发挥出掉落率的潜力。
            </p>
          </div>
          <div className="baike-info-item">
            <p>
              一些副本诅咒会为副本中的所有怪物提供额外的掉落率，范围从低至
              <HighlightText text="1%" highlights={["1%"]} />
              到高至
              <HighlightText text="10%" highlights={["10%"]} />
              不等。
            </p>
          </div>
          <div className="baike-info-item">
            <p>
              如果你在副本中找到并杀死<strong>金色独眼蝙蝠</strong>
              ，最后的BOSS掉落率和经验值奖励将增加
              <HighlightText text="10%" highlights={["10%"]} />。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
