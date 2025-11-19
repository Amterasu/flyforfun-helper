import { useEffect, useState } from 'react'
import { marked } from 'marked'
import './CoachingCard.less'

export type CoachingItem = {
  id: string
  name: string
  cover: string
  contact: string
  description: string
}

type CoachingCardProps = {
  item: CoachingItem
}

export const CoachingCard = ({ item }: CoachingCardProps) => {
  const [htmlContent, setHtmlContent] = useState<string>('')

  useEffect(() => {
    // 配置 marked 选项
    marked.setOptions({
      breaks: true,
      gfm: true
    })

    // 渲染 Markdown 为 HTML
    const html = marked.parse(item.description)
    setHtmlContent(html as string)
  }, [item.description])

  return (
    <div className="coaching-card">
      <div className="coaching-card-cover">
        <img src={item.cover} alt={item.name} loading="lazy" />
      </div>
      <div className="coaching-card-content">
        <h3 className="coaching-card-name">{item.name}</h3>
        <div className="coaching-card-contact">
          <span className="contact-label">联系方式：</span>
          <span className="contact-value">{item.contact}</span>
        </div>
        <div 
          className="coaching-card-description"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  )
}

