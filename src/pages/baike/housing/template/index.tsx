import React from 'react'
import './index.less'

export const Template = () => {
  const templates = [
    { templateCn: '空白世界', sizeCn: '小', priceCn: '💲1亿金币' },
    { templateCn: '空白世界', sizeCn: '中', priceCn: '💲2亿金币' },
    { templateCn: '空白世界', sizeCn: '大', priceCn: '💲22.5亿金币' },
    { templateCn: '空白世界', sizeCn: '超大', priceCn: '💲40亿金币' },
    { templateCn: '海滩世界', sizeCn: '小', priceCn: '💲4亿金币' },
    {
      templateCn: '黑暗世界\n森林世界\n火山世界\n雪地世界\n秋季世界',
      sizeCn: '小',
      priceCn: '💲1亿金币',
    },
    {
      templateCn: '海滩世界\n黑暗世界\n森林世界\n火山世界\n雪地世界\n秋季世界',
      sizeCn: '中',
      priceCn: '💎1600 fCoins',
    },
    {
      templateCn: '海滩世界\n黑暗世界\n森林世界\n火山世界\n雪地世界\n秋季世界',
      sizeCn: '大',
      priceCn: '💎3600 fCoins',
    },
    {
      templateCn: '海滩世界\n黑暗世界\n森林世界\n火山世界\n雪地世界\n秋季世界',
      sizeCn: '超大',
      priceCn: '💎6400 fCoins',
    },
  ]

  return (
    <div className="baike-content">
      <div className="template-cards-grid">
        {templates.map((item, index) => (
          <div key={index} className="template-card">
            <div className="template-card-name">
              {item.templateCn.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < item.templateCn.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
            <div className="template-card-info">
              <div className="template-card-size">
                <span className="template-card-label">尺寸：</span>
                <span className="template-card-value">{item.sizeCn}</span>
              </div>
              <div className="template-card-price">
                <span className="template-card-label">价格：</span>
                <span className="template-card-value">{item.priceCn}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
