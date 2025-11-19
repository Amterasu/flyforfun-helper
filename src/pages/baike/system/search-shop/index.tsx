import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const SearchShop = () => {
  return (
    <div className="baike-content">
    
    
    <p key={2}><strong>更多信息请参考 <a href="https://gothante.wiki/?search=search+shop" target="_blank" rel="noopener noreferrer">Gothante</a>。</strong></p>
    <blockquote key={4} className="baike-blockquote">
      <p key={0}>来源:<a href="https://universe.flyff.com/news/ver141 Madrigal之战扩展更新 (Flyff Universe版本 1.4.1" target="_blank" rel="noopener noreferrer">Madrigal之战扩展更新 (Flyff Universe版本 1.4.1)</a>)</p>
    </blockquote>
    <div className="baike-image-container" key={5}>
      <BaikeImage key={0} src="/system/search_shop/search_shop.png" alt="search_shop.png" width={200} maxWidth="100%" />
    </div>
    <div className="baike-image-container" key={6}>
      <BaikeImage key={0} src="/system/search_shop/search_shop_window.png" alt="search_shop_window.png" width={600} maxWidth="100%" />
    </div>
    <div className="baike-image-container" key={7}>
      <BaikeImage key={0} src="/system/search_shop/search_shop_click.png" alt="search_shop_click.png" maxWidth="100%" />
    </div>
    
    </div>
  )
}
