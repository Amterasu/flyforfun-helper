import React from 'react'
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

const events = [
  {
    date: '2022-05-17 ~ 2022-05-31 07:00 UTC',
    title: '服务器团购活动',
    link: 'https://universe.flyff.com/news/grouppurchase',
    nested: false,
  },
  {
    date: '2022-05-18 ~ 2022-06-28 14:00 UTC',
    title: '首次充值活动（双倍奖励）。',
    nested: false,
  },
  {
    date: '2022-05-31 ~ 2022-06-02',
    title: '抢先体验用户答谢活动',
    link: 'https://m.facebook.com/uflyff/photos/a.113466831296755/132532422723529/',
    nested: false,
    children: [
      '充值将额外获得30%的fCoins！每个充值选项仅可领取一次该奖励。',
      '30%充值奖励活动不适用于"首次充值（双倍）"活动。',
    ],
  },
  {
    date: '2022-07-05 ~ 2022-07-12',
    title: 'fCoins消费活动',
    link: 'https://universe.flyff.com/news/fcoinsspending05072022',
    nested: false,
  },
  {
    date: '2022-07-31 00:00 UTC ~ 2022-08-02 23:59 UTC',
    title: '充值30%折扣活动',
    link: 'https://universe.flyff.com/news/topup30aug',
    nested: false,
  },
  {
    date: '2022-09-30 00:00 UTC ~ 2022-10-02 23:59 UTC',
    title: '充值活动（9月30日-10月2日）',
    link: 'https://universe.flyff.com/news/topupevent220930',
    nested: false,
  },
  {
    date: '2022-11-11 00:00（服务器时间）~ 2022-11-13 23:59（服务器时间）',
    title: '购买活动',
    link: 'https://universe.flyff.com/news/purchaseevent221110',
    nested: false,
  },
  {
    date: '2022-11-24 ~ 2022-11-27 23:59 UTC',
    title: '黑色星期五特别促销',
    link: 'https://universe.flyff.com/news/blackfridaysales',
    nested: true,
    highlight: '买一送一',
  },
  {
    date: '2022-12-27 ~ 2023-01-12 23:59 UTC',
    title: '幸运轮盘活动',
    link: 'https://universe.flyff.com/news/luckyroulette',
    nested: false,
  },
  {
    date: '2023-03-02 07:00 UTC ~ 2023-03-08 07:00 UTC',
    title: '特别"1+1"分类，享20%折扣。',
    nested: true,
    highlight: '买一送一',
  },
  {
    date: '2023-03-13 ~ 2023-04-02 23:59 UTC',
    title: 'Stripe支付特别活动',
    link: 'https://universe.flyff.com/news/stripepayment',
    nested: false,
  },
  {
    date: '2023-05-18 07:00 UTC ~ 2023-05-25 06:59 UTC',
    title: '道具商店特别折扣，享20%优惠。',
    nested: false,
  },
]

export const TopUpEvent = () => {
  return (
    <div className="baike-content">
      <div className="events-list">
        {events.map((event, idx) => (
          <div key={idx} className="event-card">
            <div className="event-header">
              <div className="event-date">
                <HighlightText text={event.date} highlights={['2022', '2023', 'UTC']} />
              </div>
              {event.nested && event.highlight && (
                <div className="event-badge">
                  <HighlightText text={event.highlight} highlights={[event.highlight]} />
                </div>
              )}
            </div>
            <div className="event-content">
              {event.link ? (
                <a href={event.link} target="_blank" rel="noopener noreferrer" className="event-title">
                  {event.title}
                </a>
              ) : (
                <div className="event-title">{event.title}</div>
              )}
              {event.children && (
                <div className="event-children">
                  {event.children.map((child, childIdx) => (
                    <div key={childIdx} className="event-child">
                      <HighlightText text={child} highlights={['30%', '双倍']} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
