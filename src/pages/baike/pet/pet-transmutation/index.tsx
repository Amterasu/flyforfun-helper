import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'
import './index.less'

interface PetTransmutationItem {
  name: string;
  nameEn?: string;
  url: string;
  periods: string[];
  image: string;
  imageAlt: string;
}

const petTransmutationData: PetTransmutationItem[] = [
  {
    name: "蒜头王八",
    url: "https://flyffipedia.com/items/details/9040",
    periods: ["2022-08-22 ~ 2022-09-21"],
    image: "/pet/transmutes/crystal_iphrine_shell.jpg",
    imageAlt: "crystal_iphrine_shell.jpg"
  },
  {
    name: "小恐龙",
    url: "https://flyffipedia.com/items/details/1127",
    periods: ["2022-09-22 ~ 2022-11-24"],
    image: "/pet/transmutes/primgon.jpg",
    imageAlt: "primgon.jpg"
  },
  {
    name: "小狐狸",
    url: "https://flyffipedia.com/items/details/14640",
    periods: ["2022-11-25 ~ 2023-02-01"],
    image: "/pet/transmutes/nine_tails.jpg",
    imageAlt: "nine_tails.jpg"
  },
  {
    name: "tonge",
    url: "https://flyffipedia.com/items/details/11407",
    periods: ["2023-02-02 ~ 2023-04-12"],
    image: "/pet/transmutes/tonge.jpg",
    imageAlt: "tonge.jpg"
  },
  {
    name: "小老虎",
    url: "https://flyffipedia.com/items/details/15854",
    periods: ["2023-04-13 ~ 2023-06-07"],
    image: "/pet/transmutes/hantiger.jpg",
    imageAlt: "hantiger.jpg"
  },
  {
    name: "滑冰猫",
    url: "https://flyffipedia.com/items/details/17941",
    periods: ["2023-06-08 ~ 2023-07-19"],
    image: "/pet/transmutes/skating_cat.jpg",
    imageAlt: "skating_cat.jpg"
  },
  {
    name: "走地鸡",
    url: "https://flyffipedia.com/items/details/2923",
    periods: ["2023-07-20 ~ 2024-05-08", "2025-06-12 ~"],
    image: "/pet/transmutes/draco.jpg",
    imageAlt: "draco.jpg"
  },
  {
    name: "狐灵",
    url: "https://flyffipedia.com/items/details/11025",
    periods: ["2024-05-09 ~ 2024-11-20"],
    image: "/pet/transmutes/fox_spirit.jpg",
    imageAlt: "fox_spirit.jpg"
  },
  {
    name: "白狮",
    url: "https://flyffipedia.com/items/details/10710",
    periods: ["2024-11-21 ~ 2025-05-14"],
    image: "/pet/transmutes/white_lion.jpg",
    imageAlt: "white_lion.jpg"
  },
  {
    name: "尿壶",
    url: "https://flyffipedia.com/items/details/15601",
    periods: ["2025-05-15 ~ 2025-06-11"],
    image: "/pet/transmutes/steambot.jpg",
    imageAlt: "steambot.jpg"
  }
];

export const PetTransmutation = () => {
  return (
    <div className="baike-content">
      <div className="baike-section">
        <h2 className="baike-section-title">宠物皮肤</h2>
        
        <div className="pet-transmutation-cards-grid">
          {petTransmutationData.map((pet, idx) => (
            <div key={idx} className="pet-transmutation-card">
              <div className="pet-transmutation-image">
                <BaikeImage 
                  src={pet.image} 
                  alt={pet.imageAlt} 
                  maxWidth="100%" 
                />
              </div>
              <div className="pet-transmutation-content">
                <h3 className="pet-transmutation-name">
                  <a 
                    href={pet.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="pet-transmutation-link"
                  >
                    {pet.name}
                  </a>
                </h3>
                <div className="pet-transmutation-periods">
                  {pet.periods.map((period, periodIdx) => (
                    <div key={periodIdx} className="pet-transmutation-period">
                      <code>{period}</code>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
