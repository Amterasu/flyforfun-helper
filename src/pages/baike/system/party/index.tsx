import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'
import './index.less'

// 高亮文本组件
const HighlightText: React.FC<{ text: string; highlights: string[] }> = ({ text, highlights }) => {
  if (highlights.length === 0) {
    return <>{text}</>
  }

  const pattern = highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
  const regex = new RegExp(`(${pattern})`, 'g')
  const parts = text.split(regex)

  return (
    <>
      {parts.map((part, idx) => {
        const isHighlight = highlights.includes(part)
        return isHighlight ? (
          <span key={idx} className="highlight">
            {part}
          </span>
        ) : (
          <React.Fragment key={idx}>{part}</React.Fragment>
        )
      })}
    </>
  )
}

export const Party = () => {
  return (
    <div className="baike-content">
      <div className="baike-sources">
        <div className="baike-source">
          <p>
            来源:
            <a
              href="https://universe.flyff.com/news/patchnotes103"
              target="_blank"
              rel="noopener noreferrer"
            >
              游戏版本1.0.3更新说明
            </a>
          </p>
        </div>
        <div className="baike-source">
          <p>
            来源:
            <a
              href="https://universe.flyff.com/news/patchnotes104"
              target="_blank"
              rel="noopener noreferrer"
            >
              游戏版本1.0.4更新说明
            </a>
          </p>
        </div>
      </div>

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
            <HighlightText text="19 / 9（大师或英雄任务）" highlights={['19', '9']} />
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
          <p>「等級」的經驗將根據成員的等級進行分配。</p>
        </div>
        <div className="baike-info-item">
          <p>
            「貢獻」的經驗根據擊殺怪物的參與度(對戰鬥的貢獻)進行分配。貢獻包括攻擊、治療和坦克。
          </p>
        </div>
        <div className="baike-info-item">
          <p>無論何種分享模式，經驗的加成部分總是會根據等級分配給周圍的所有成員。</p>
        </div>
        <div className="baike-info-item">
          <p>
            除了取決於周圍成員數量的基本獎勵之外，組滿
            <HighlightText text="8" highlights={['8']} />
            名成員的劇團沒有更具體的獎勵。
          </p>
        </div>
      </div>

      <div className="baike-section">
        <h2 className="baike-section-title">贡献度</h2>
        <div className="baike-info-item">
          <p>
            貢獻經驗現在由參與戰鬥的成員平均分配。
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
            神圣惩戒和和其他減益效果現在算是劇團貢獻。
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
            調整了隊伍貢獻公式，使支持者不會從攻擊者那裡竊取經驗。
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
          <p>攻擊、坦克和治療現在都算是貢獻。以前只有攻擊者才能獲得大部分貢獻經驗。</p>
        </div>
        <div className="baike-info-item">
          <p>
            現在
            <HighlightText text="3" highlights={['3']} />
            名相同等級的玩家，
            <HighlightText text="1" highlights={['1']} />
            名攻擊者，
            <HighlightText text="1" highlights={['1']} />
            名坦克手（也可以攻擊），
            <HighlightText text="1" highlights={['1']} />
            名治療者（也可以攻擊或坦克）應該獲得大致相同的經驗量。
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            <strong>
              貢獻經驗取決於最高等級的貢獻者，因此如果最高貢獻者對你正在戰鬥的怪物有經驗懲罰，則該區域中的每個人都會受到相同的懲罰。
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
        <div className="baike-source">
          <p>
            source:
            <a
              href="https://discord.com/channels/778915844070834186/1000058902576119878/1007441765206343680"
              target="_blank"
              rel="noopener noreferrer"
            >
              @bluechromed @[Dev] Blukie (discord flyff universe)
            </a>
          </p>
        </div>
      </div>

      <div className="baike-section">
        <h2 className="baike-section-title">经验加成</h2>
        <div className="baike-info-item">
          <p>
            要獲得額外的劇團經驗獎勵，玩家等級必須在
            <HighlightText text="19 / 9 (master or hero quest)" highlights={['19', '9']} />
            級以內。
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            <strong>
              至少需要
              <HighlightText text="2" highlights={['2']} />
              名成員才能啟動經驗獎勵
            </strong>
            。
          </p>
        </div>
        <div className="bonus-cards">
          <div className="bonus-card">
            <div className="bonus-card-title">非高级队伍（低于10级）</div>
            <div className="bonus-card-content">
              <p>
                周圍每位成員(相差
                <HighlightText text="19 / 9 (master or hero quest)" highlights={['19', '9']} />
                級以內)提供
                <HighlightText text="4%" highlights={['4%']} />
                + 每個在戰鬥中做出貢獻的活躍成員提供
                <HighlightText text="13.5%" highlights={['13.5%']} />
                。
              </p>
            </div>
          </div>
          <div className="bonus-card">
            <div className="bonus-card-title">等级经验分配（高级队伍）</div>
            <div className="bonus-card-content">
              <p>
                周圍每位成員(相差
                <HighlightText text="19 / 9 (master or hero quest)" highlights={['19', '9']} />
                級以內)提供
                <HighlightText text="7%" highlights={['7%']} />
                + 每個在戰鬥中做出貢獻的活躍成員提供
                <HighlightText text="13%" highlights={['13%']} />
                。
              </p>
            </div>
          </div>
          <div className="bonus-card">
            <div className="bonus-card-title">贡献经验分配（高级队伍）</div>
            <div className="bonus-card-content">
              <p>
                周圍每位成員(相差
                <HighlightText text="19 / 9 (master or hero quest)" highlights={['19', '9']} />
                級以內)提供
                <HighlightText text="7%" highlights={['7%']} />
                + 每個在戰鬥中做出貢獻的活躍成員提供
                <HighlightText text="25%" highlights={['25%']} />
                。
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="baike-section">
        <h2 className="baike-section-title">队伍经验</h2>
        <div className="baike-image-thumbnail">
          <BaikeImage src="/system/party/party_exp.png" alt="party_exp.png" maxWidth="600px" />
        </div>
        <div className="baike-source">
          <p>
            source:
            <a
              href="https://discord.com/channels/778915844070834186/1097267183945515100/1100935602746171522"
              target="_blank"
              rel="noopener noreferrer"
            >
              @bluechromed @[Dev] Blukie (discord flyff universe)
            </a>
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            若周圍成員的平均等級與怪物等級相比小於或等於
            <HighlightText text="5" highlights={['5']} />
            ，劇團將獲得經驗。
          </p>
        </div>
      </div>

      <div className="baike-section">
        <h2 className="baike-section-title">队伍技能</h2>
        <div className="baike-image-thumbnail">
          <BaikeImage src="/system/party/lucky_drop.png" alt="lucky_drop.png" maxWidth="400px" />
        </div>
        <div className="baike-source">
          <p>
            source:
            <a
              href="https://discord.com/channels/778915844070834186/1000058902576119878/1075631574864896010"
              target="_blank"
              rel="noopener noreferrer"
            >
              @frostiae @[Dev] Frostiae (discord flyff universe)
            </a>
          </p>
        </div>
        <div className="baike-info-item">
          <p>Lucky Drop: Doubles the drop rate of rare items (red items on the ground).</p>
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
        <div className="baike-source">
          <p>
            source:
            <a
              href="https://discord.com/channels/778915844070834186/1000058902576119878/1096164375313797150"
              target="_blank"
              rel="noopener noreferrer"
            >
              @bluechromed @[Dev] Blukie (discord flyff universe)
            </a>
          </p>
        </div>
        <div className="baike-info-item">
          <p>
            Gift Box: Adds a loop for all drop tables for a given monster (will run all drop
            tables 1 more time).
          </p>
        </div>
      </div>
    </div>
  )
}
