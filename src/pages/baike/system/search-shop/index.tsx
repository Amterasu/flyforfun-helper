import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'
import './index.less'

export const SearchShop = () => {
  return (
    <div className="baike-content">
      <div className="baike-info-card">
        <p>
          <strong>
            更多信息请参考{' '}
            <a
              href="https://gothante.wiki/?search=search+shop"
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
              href="https://universe.flyff.com/news/ver141"
              target="_blank"
              rel="noopener noreferrer"
            >
              Madrigal之战扩展更新 (Flyff Universe版本 1.4.1)
            </a>
          </p>
        </div>
        <div className="search-shop-images-grid">
          <div className="baike-image-thumbnail">
            <BaikeImage
              src="/system/search_shop/search_shop.png"
              alt="search_shop.png"
              maxWidth="200px"
            />
          </div>
          <div className="baike-image-thumbnail">
            <BaikeImage
              src="/system/search_shop/search_shop_window.png"
              alt="search_shop_window.png"
              maxWidth="600px"
            />
          </div>
          <div className="baike-image-thumbnail">
            <BaikeImage
              src="/system/search_shop/search_shop_click.png"
              alt="search_shop_click.png"
              maxWidth="600px"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
