import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'
import './index.less'

export const GuildLevel = () => {
  return (
    <div className="baike-content">
      <div className="baike-info-card">
        <p>
          <strong>
            更多信息请参考{' '}
            <a
              href="https://gothante.wiki/?search=guild+level"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gothante
            </a>
            。
          </strong>
        </p>
      </div>

      <div className="baike-section">
        <div className="baike-source">
          <p>
            来源:
            <a
              href="https://discord.com/channels/778915844070834186/1000058902576119878/1173045738230521926"
              target="_blank"
              rel="noopener noreferrer"
            >
              @bluechromed @[开发者] Blukie（Flyff Universe官方 Discord）
            </a>
          </p>
        </div>
        <div className="baike-image-thumbnail">
          <BaikeImage src="/system/guild/guild_level.png" alt="guild_level.png" maxWidth="600px" />
        </div>
      </div>

      <div className="baike-section">
        <div className="baike-source">
          <p>
            来源:
            <a
              href="https://discord.com/channels/778915844070834186/1000058902576119878/1342035456627310613"
              target="_blank"
              rel="noopener noreferrer"
            >
              @cysotiso @cysotiso（Flyff Universe官方 Discord）
            </a>
          </p>
        </div>
        <div className="baike-image-thumbnail">
          <BaikeImage
            src="/system/guild/quest_items_guild_exp.png"
            alt="quest_items_guild_exp.png"
            maxWidth="600px"
          />
        </div>
      </div>
    </div>
  )
}
