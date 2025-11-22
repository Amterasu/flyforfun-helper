import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'
import './index.less'

export const SearchShop = () => {
  return (
    <div className="baike-content">
      <div className="baike-section">
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
