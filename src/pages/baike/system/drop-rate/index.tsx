import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const DropRate = () => {
  return (
    <div className="baike-content">
    
    
    <p key={2}><strong>For more information please refer to <a href="https://gothante.wiki/?search=drop+rate" target="_blank" rel="noopener noreferrer">Gothante</a>.</strong></p>
    <blockquote key={4} className="baike-blockquote">
      <p key={0}>source:<a href="https://universe.flyff.com/news/qna-01-2023 &quot;Developers Q&amp;A December 2022 - January 2023&quot;" target="_blank" rel="noopener noreferrer">Developers Q&amp;A December 2022 - January 2023</a></p>
    </blockquote>
    <blockquote key={5} className="baike-blockquote">
      <p key={0}>source:<a href="https://wcdn-universe.flyff.com/site/qna_01_2023.pdf &quot;Flyff Universe Developer Q&amp;A December ‘22 - January ‘23 Questions&quot;" target="_blank" rel="noopener noreferrer">Flyff Universe Developer Q&amp;A December ‘22 - January ‘23 Questions</a></p>
    </blockquote>
    <h2 key={6}>基于等级的掉落率惩罚</h2>
    <div className="baike-image-container" key={7}>
      <BaikeImage key={0} src="/system/drop_rate.png" alt="drop_rate.png" maxWidth="100%" />
    </div>
    <ul key={8} className="baike-list">
        <li key={0}>When you fight monsters much lower than your level you have a reduced drop rate, and when de-leveling the game treats your character as your <strong>highest level</strong> from a drop penalty perspective.</li>
    </ul>
    <blockquote key={9} className="baike-blockquote">
      <p key={0}>當你與比你等級低得多的怪物戰鬥時，你的掉落率會降低，並且當降低等級時，從掉落懲罰的角度來看，遊戲會以角色的最高等級計算。</p>
    </blockquote>
    <p key={10}>If you&#39;re considering intentionally reducing your level to farm more efficiently, please remember that these mechanisms will affect your drop rates.</p>
    <blockquote key={11} className="baike-blockquote">
      <p key={0}>source:[@bluechromed @[Dev] Blukie (discord flyff universe)](https://discord.com/channels/778915844070834186/1000058902576119878/1124117122432380958 @bluechromed @[Dev] Blukie (discord flyff universe))</p>
    </blockquote>
    <ul key={12} className="baike-list">
        <li key={0}>Drop rate is based on the character with the <strong>highest level</strong> who is <strong>participating</strong>.</li>
    </ul>
    <blockquote key={13} className="baike-blockquote">
      <p key={0}>掉落率是基於參與貢獻的最高等級(包含降級)角色。</p>
    </blockquote>
    <p key={14}>例如，如果126级和140级玩家击杀一只远古猛犸象（139级），系统会考虑贡献最高等级的玩家。这意味着两名玩家的经验值都会减少20%，但两名玩家都将拥有完整的100%掉落率。</p>
    <blockquote key={15} className="baike-blockquote">
      <p key={0}>来源:[@bluechromed @[Dev] Blukie (discord flyff universe)](https://discord.com/channels/778915844070834186/1000058902576119878/1113470252257382550 @bluechromed @[Dev] Blukie (discord flyff universe))</p>
    </blockquote>
    <p key={16}><em>治疗和复活不被视为参与，但坦克、圣十字和任何造成伤害的攻击都被视为参与。</em></p>
    <p key={17}><em>如果怪物的HP尚未完全恢复，惩罚仍然适用，无论最高等级角色是否断开连接、切换到其他频道或世界，或死亡。</em></p>
    <p key={18}><em>高级玩家因受到巨人或紫罗兰怪物的特殊攻击伤害而不会对低级玩家的怪物掉落率产生负面影响。</em> 如果您受到的范围伤害来自您无法反击的怪物（不同队伍等），则不会影响掉落率。</p>
    <blockquote key={19} className="baike-blockquote">
      <p key={0}>来源:<a href="https://universe.flyff.com/news/minorfixesnov21 Minor Fixes after 11/21 Maintenance" target="_blank" rel="noopener noreferrer">Minor Fixes after 11/21 Maintenance</a></p>
    </blockquote>
    <ul key={20} className="baike-list">
        <li key={0}>玩家等级不会影响怪物幻化外观的掉落率；玩家在任何等级都可以有效刷出幻化外观。</li>
    </ul>
    <blockquote key={21} className="baike-blockquote">
      <p key={0}>玩家等级不会影响怪物幻化外观的掉落率，玩家在任何等级都可以有效刷出幻化外观。</p>
    </blockquote>
    <blockquote key={22} className="baike-blockquote">
      <p key={0}>来源:[@bluechromed @[Dev] Blukie (discord flyff universe)](https://discord.com/channels/778915844070834186/1000058902576119878/1092833498034880552 @bluechromed @[Dev] Blukie (discord flyff universe))</p>
    </blockquote>
    <h2 key={23}>可选的大师/英雄任务</h2>
    <ul key={24} className="baike-list">
        <li key={0}>如果任何参与者有活跃的可选大师/英雄任务，掉落率将减半（<strong>50%掉落率惩罚</strong>）。</li>
    </ul>
    <h2 key={25}>提升掉落率的角色buff</h2>
    <ul key={26} className="baike-list">
        <li key={0}>关于队伍技能（幸运掉落和礼盒）、住房buff、冒险家幸运瓶以及其他增加掉落率的角色buff：</li>
    </ul>
    <p key={27}>当怪物死亡时，掉落率会受到造成<strong>最大总伤害</strong>角色的buff影响，且掉落的物品将属于该角色，并忽略断线、切换到其他频道、世界或已死亡的玩家。</p>
    <blockquote key={28} className="baike-blockquote">
      <p key={0}>当怪物死亡时，掉落率会受到造成<strong>最大总伤害</strong>角色的buff影响，且掉落的物品将属于该角色，并忽略断线、切换到其他频道、世界或已死亡的玩家。</p>
    </blockquote>
    <p key={29}><em>最后一击<strong>仅</strong>用于计算怪物击杀计数，如任务、战斗通行证、成就等。</em></p>
    <p key={30}>如果有两个角色造成的总伤害相同，则最后开始攻击怪物的角色将影响掉落率（这不是关于最后一击，而是第一次攻击的顺序）。</p>
    <p key={31}>如果角色死亡后复活，该角色造成的总伤害<strong>不</strong>包括死亡前造成的伤害。</p>
    <h2 key={32}>掉落机制</h2>
    <ul key={33} className="baike-list">
        <li key={0}>掉落都是在单独的掉落组合中分别完成的，因此大的战利品表不会影响掉落某些东西的能力（例如卡牌，日光石，独特的武器等）</li>
    </ul>
    <blockquote key={34} className="baike-blockquote">
      <p key={0}>掉落都是在单独的掉落组合中分别完成的，因此大的战利品表不会影响掉落某些东西的能力（例如卡牌，日光石，独特的武器等）</p>
    </blockquote>
    <blockquote key={35} className="baike-blockquote">
      <p key={0}>来源:[@bluechromed @[Dev] Blukie (discord flyff universe)](https://discord.com/channels/778915844070834186/1172687169337430116/1172969789002616993 @bluechromed @[Dev] Blukie (discord flyff universe))</p>
    </blockquote>
    <ul key={36} className="baike-list">
        <li key={0}>每个怪物都有不同的掉落组合(组别、分区)，因此当怪物被杀死时，会根据掉落几率从每个组合(组别、分区)中掉落一定数量的物品。</li>
    </ul>
    <blockquote key={37} className="baike-blockquote">
      <p key={0}>每个怪物都有不同的掉落组合(组别、分区)，因此当怪物被杀死时，会根据掉落几率从每个组合(组别、分区)中掉落一定数量的物品。</p>
    </blockquote>
    <blockquote key={38} className="baike-blockquote">
      <p key={0}>来源:[@bluechromed @[Dev] Blukie (discord flyff universe)](https://discord.com/channels/778915844070834186/1076577555546656850/1171954949765222470 @bluechromed @[Dev] Blukie (discord flyff universe))</p>
    </blockquote>
    <ul key={39} className="baike-list">
        <li key={0}>例如：如果你在达肯3中杀死紫罗兰，它会检查卷轴组5次，并给你一个<code>spro low</code>、一个<code>spro</code>、一个<code>apro</code>或一个<code>gpro</code>，概率受掉落技能、等级等影响。</li>
    </ul>
    <blockquote key={40} className="baike-blockquote">
      <p key={0}>例如：如果你在达肯3中杀死紫罗兰，它会检查卷轴组5次，并给你一个<code>spro low</code>、一个<code>spro</code>、一个<code>apro</code>或一个<code>gpro</code>，概率受掉落技能、等级等影响。</p>
    </blockquote>
    <blockquote key={41} className="baike-blockquote">
      <p key={0}>来源:[@bluechromed @[Dev] Blukie (discord flyff universe)](https://discord.com/channels/778915844070834186/1076577555546656850/1171955221300252783 @bluechromed @[Dev] Blukie (discord flyff universe))</p>
    </blockquote>
    <ul key={42} className="baike-list">
        <li key={0}>当怪物死亡时，它总是按顺序检查掉落表，从<strong>概率最低</strong>的物品开始，这意味着最稀有的物品会首先被计算。</li>
    </ul>
    <h2 key={43}>1v1对AOE的劣势</h2>
    <ul key={44} className="baike-list">
        <li key={0}>我们收到了许多关于使用1对1玩法的玩家处于劣势的反馈。由于群攻玩家能够一次杀死更多怪物，他们升级和获取物品需要更多时间。</li>
    </ul>
    <p key={45}>因此，我们在游戏中引入了一个新机制：30级以上的低级怪物、普通怪物和队长怪物被<strong>单一目标攻击和技能造成的伤害至少80%</strong>击杀后，经验值和掉落率都会增加。</p>
    <ul key={46} className="baike-list">
        <li key={0}>目前，30级怪物的1对1经验和掉落率增加为<strong>20%</strong>，并逐渐上升到140级时的<strong>35%</strong>，141级时的<strong>90%</strong>到160级时的<strong>102%</strong>。</li>
    </ul>
    <ul key={47} className="baike-list">
        <li key={0}><strong>1对1经验和掉落率增加基于怪物等级</strong>，这意味着只要你足够强大，可以对抗141级及以上的怪物，你就可以利用这些增加。</li>
    </ul>
    <h2 key={48}>副本</h2>
    <ul key={49} className="baike-list">
        <li key={0}>当单人进入普通副本地下城（Big Muscle、Krrr、Mushmoot、Iblis Leanes、Clockworks War、Meteonyker、Red Meteonyker）时，将有-68%到-90%的掉落惩罚（仅适用于只有1名玩家的情况）。</li>
    </ul>
    <ul key={50} className="baike-list">
        <li key={0}>这<strong>6个新地下城</strong>（Leren Chasm、莱斯 Catacombs、Envy Depths、Guardian Sanctuary、Storm Peak、The Wilds）中的怪物没有等级。它们根据所需的进入等级进行平衡，但它们在等级差异惩罚方面与其他怪物的交互方式不同。</li>
    </ul>
    <p key={51}>这些怪物没有基于等级差异的伤害减少，因此它们的伤害完全不受你等级的影响。它们也没有基于等级差异的掉落惩罚，所以你是什么等级并不重要——如果你能进入地下城，你就拥有完整的掉落率潜力。</p>
    <ul key={52} className="baike-list">
        <li key={0}>一些地下城诅咒会为地下城中的所有怪物提供额外的掉落率，范围从低至1%到高至10%不等。</li>
    </ul>
    <ul key={53} className="baike-list">
        <li key={0}>如果你在地下城中找到并杀死<strong>金色爱比</strong>，最后一个超级怪物会变得慷慨，掉落率和经验值奖励将增加10%。</li>
    </ul>
    
    </div>
  )
}
