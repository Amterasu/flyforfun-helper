import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'
import './index.less'

const costumeImages = [
  { src: '//costume_collection//2nd_Anniversary_Costume_Box.png', alt: '2nd_Anniversary_Costume_Box.png' },
  { src: '//costume_collection//03.Elf.jpg', alt: '03.Elf.jpg' },
  { src: '//costume_collection//04.Music%20Beat.jpg', alt: '04.Music Beat.jpg' },
  { src: '//costume_collection//05.Alien%20Octopus.jpg', alt: '05.Alien Octopus.jpg' },
  { src: '//costume_collection//06.Rider.jpg', alt: '06.Rider.jpg' },
  { src: '//costume_collection//07.Baby%20Shark.jpg', alt: '07.Baby Shark.jpg' },
  { src: '//costume_collection//08.Shade%20Child.jpg', alt: '08.Shade Child.jpg' },
  { src: '//costume_collection//09.Menhera%20Kei.jpg', alt: '09.Menhera Kei.jpg' },
  { src: '//costume_collection//10.Gummy%20Bear.jpg', alt: '10.Gummy Bear.jpg' },
  { src: '//costume_collection//11.Autumn.jpg', alt: '11.Autumn.jpg' },
  { src: '//costume_collection//12.Halloween%20Bat.jpg', alt: '12.Halloween Bat.jpg' },
  { src: '//costume_collection//13.Sport%20Pop.jpg', alt: '13.Sport Pop.jpg' },
  { src: '//costume_collection//14.Disco.jpg', alt: '14.Disco.jpg' },
  { src: '//costume_collection//15.jpg', alt: '15.jpg' },
  { src: '//costume_collection//16.Winter%20Wizard.jpg', alt: '16.Winter Wizard.jpg' },
  { src: '//costume_collection//17.Winter%20Casual.jpg', alt: '17.Winter Casual.jpg' },
  { src: '//costume_collection//18.Foxy.jpg', alt: '18.Foxy.jpg' },
  { src: '//costume_collection//19.Valentine%E2%80%99s%20Rabbit.jpg', alt: "19.Valentine's Rabbit.jpg" },
  { src: '//costume_collection//20.Cacti.jpg', alt: '20.Cacti.jpg' },
  { src: '//costume_collection//21.Modern%20Sportswear.jpg', alt: '21.Modern Sportswear.jpg' },
  { src: '//costume_collection//22.Future%20Runner.jpg', alt: '22.Future Runner.jpg' },
  { src: '//costume_collection//23.Easter%20Gambler.jpg', alt: '23.Easter Gambler.jpg' },
  { src: '//costume_collection//24.Easter%20Magic.jpg', alt: '24.Easter Magic.jpg' },
  { src: '//costume_collection//25.White%20Stripes.jpg', alt: '25.White Stripes.jpg' },
  { src: '//costume_collection//26.Japanese%20Uniform.jpg', alt: '26.Japanese Uniform.jpg' },
  { src: '//costume_collection//27.Madrigal%20Guardians.jpg', alt: '27.Madrigal Guardians.jpg' },
  { src: '//costume_collection//28.Neo.jpg', alt: '28.Neo.jpg' },
  { src: '//costume_collection//29.Idol.jpg', alt: '29.Idol.jpg' },
  { src: '//costume_collection//30.AI%20Frog.jpg', alt: '30.AI Frog.jpg' },
  { src: '//costume_collection//31.Cake%20Kingdom.jpg', alt: '31.Cake Kingdom.jpg' },
  { src: '//costume_collection//32.AI%20Casual.jpg', alt: '32.AI Casual.jpg' },
  { src: '//costume_collection//33.AI%20Yukata.jpg', alt: '33.AI Yukata.jpg' },
  { src: '//costume_collection//34.Police.jpg', alt: '34.Police.jpg' },
  { src: '//costume_collection//35.2023%20Summer.jpg', alt: '35.2023 Summer.jpg' },
  { src: '//costume_collection//36.Star.jpg', alt: '36.Star.jpg' },
  { src: '//costume_collection//37.Oni.jpg', alt: '37.Oni.jpg' },
  { src: '//costume_collection//38.Exorcist.jpg', alt: '38.Exorcist.jpg' },
  { src: '//costume_collection//39.Modern%20Halloween.jpg', alt: '39.Modern Halloween.jpg' },
  { src: '//costume_collection//40.Military%202023.jpg', alt: '40.Military 2023.jpg' },
  { src: '//costume_collection//41.Thanks_Giving_Costume.jpg', alt: '41.Thanks_Giving_Costume.jpg' },
  { src: '//costume_collection//42.Carnival_Traveler.jpg', alt: '42.Carnival_Traveler.jpg' },
  { src: '//costume_collection//43.Candy_Cane.jpg', alt: '43.Candy_Cane.jpg' },
  { src: '//costume_collection//44.Artificial.jpg', alt: '44.Artificial.jpg' },
  { src: '//costume_collection//45.Emerald_Explorer.jpg', alt: '45.Emerald_Explorer.jpg' },
  { src: '//costume_collection//46.Snowy.jpg', alt: '46.Snowy.jpg' },
  { src: '//costume_collection//47.Valentine_2024.jpg', alt: '47.Valentine_2024.jpg' },
  { src: '//costume_collection//48.Teddy_Bear_2024.jpg', alt: '48.Teddy_Bear_2024.jpg' },
  { src: '//costume_collection//49.Glitch_Pop.jpg', alt: '49.Glitch_Pop.jpg' },
  { src: '//costume_collection//50.Tiger_Stripes.jpg', alt: '50.Tiger_Stripes.jpg' },
  { src: '//costume_collection//51.Tuxedo_Luxury.jpg', alt: '51.Tuxedo_Luxury.jpg' },
  { src: '//costume_collection//52.Future_Easter.jpg', alt: '52.Future_Easter.jpg' },
  { src: '//costume_collection//53.Shadow_Hunter.jpg', alt: '53.Shadow_Hunter.jpg' },
  { src: '//costume_collection//54.Safari_Explorer.jpg', alt: '54.Safari_Explorer.jpg' },
  { src: '//costume_collection//55.Spring_Bunny_2024.jpg', alt: '55.Spring_Bunny_2024.jpg' },
  { src: '//costume_collection//56.Anniversary_2024.jpg', alt: '56.Anniversary_2024.jpg' },
  { src: '//costume_collection//57.2024_School_Uniform.jpg', alt: '57.2024_School_Uniform.jpg' },
  { src: '//costume_collection//58.Spring_Qipao.jpg', alt: '58.Spring_Qipao.jpg' },
  { src: '//costume_collection//59.Magical_Kid.jpg', alt: '59.Magical_Kid.jpg' },
  { src: '//costume_collection//60.Big_Wave_Surfing.jpg', alt: '60.Big_Wave_Surfing.jpg' },
  { src: '//costume_collection//61.Space_Engineer.jpg', alt: '61.Space_Engineer.jpg' },
  { src: '//costume_collection//62.Steampunk_Wizard.jpg', alt: '62.Steampunk_Wizard.jpg' },
  { src: '//costume_collection//63.Little_Butterflies.jpg', alt: '63.Little_Butterflies.jpg' },
  { src: '//costume_collection//64.Eastern_Warrior.jpg', alt: '64.Eastern_Warrior.jpg' },
  { src: '//costume_collection//65.Overalls.jpg', alt: '65.Overalls.jpg' },
  { src: '//costume_collection//66.Banana_Hero.jpg', alt: '66.Banana_Hero.jpg' },
  { src: '//costume_collection//67.Navy_2024.jpg', alt: '67.Navy_2024.jpg' },
  { src: '//costume_collection//68.Persian_Warrior.jpg', alt: '68.Persian_Warrior.jpg' },
  { src: '//costume_collection//69.Necromancer.jpg', alt: '69.Necromancer.jpg' },
  { src: '//costume_collection//70.Wickedstein.jpg', alt: '70.Wickedstein.jpg' },
  { src: '//costume_collection//71.Medieval_Knight.jpg', alt: '71.Medieval_Knight.jpg' },
  { src: '//costume_collection//72.Turkeylicious.jpg', alt: '72.Turkeylicious.jpg' },
  { src: '//costume_collection//73.Xmas_2024_White_Edition.jpg', alt: '73.Xmas_2024_White_Edition.jpg' },
  { src: '//costume_collection//74.Christmas_Star.jpg', alt: '74.Christmas_Star.jpg' },
  { src: '//costume_collection//75.Northern_Warrior.jpg', alt: '75.Northern_Warrior.jpg' },
  { src: '//costume_collection//76.Snake_Samurai.jpg', alt: '76.Snake_Samurai.jpg' },
  { src: '//costume_collection//77.Luxury_Winter.jpg', alt: '77.Luxury_Winter.jpg' },
  { src: '//costume_collection//78.Neon_Valentine.jpg', alt: '78.Neon_Valentine.jpg' },
  { src: '//costume_collection//79.Hanbok_2025.jpg', alt: '79.Hanbok_2025.jpg' },
  { src: '//costume_collection//80.Cyberpunk_2025.jpg', alt: '80.Cyberpunk_2025.jpg' },
  { src: '//costume_collection//81.Spring_Picnic.jpg', alt: '81.Spring_Picnic.jpg' },
  { src: '//costume_collection//82.Easter_Rabbit_2025.jpg', alt: '82.Easter_Rabbit_2025.jpg' },
  { src: '//costume_collection//83.Easter_Bunny_2025.jpg', alt: '83.Easter_Bunny_2025.jpg' },
  { src: '//costume_collection//84.Pastel.jpg', alt: '84.Pastel.jpg' },
  { src: '//costume_collection//85.3rd_Anniversary_Mecha.jpg', alt: '85.3rd_Anniversary_Mecha.jpg' },
  { src: '//costume_collection//86.Ruby_Yukata.jpg', alt: '86.Ruby_Yukata.jpg' },
  { src: '//costume_collection//87.Modern_Alien.jpg', alt: '87.Modern_Alien.jpg' },
  { src: '//costume_collection//88.Forest_Spirit.jpg', alt: '88.Forest_Spirit.jpg' },
  { src: '//costume_collection//89.2025_Swimsuit.jpg', alt: '89.2025_Swimsuit.jpg' },
  { src: '//costume_collection//90.Fantasy_Guardian.jpg', alt: '90.Fantasy_Guardian.jpg' },
  { src: '//costume_collection//91.Botanist_Musician.jpg', alt: '91.Botanist_Musician.jpg' },
  { src: '//costume_collection//92.Nobility.jpg', alt: '92.Nobility.jpg' },
  { src: '//costume_collection//93.Obsidian_Flame.jpg', alt: '93.Obsidian_Flame.jpg' },
  { src: '//costume_collection//94.FireFighter.jpg', alt: '94.FireFighter.jpg' },
  { src: '//costume_collection//95.Aero_Streetwear.jpg', alt: '95.Aero_Streetwear.jpg' },
  { src: '//costume_collection//96.Knotty_Scarecrow.jpg', alt: '96.Knotty_Scarecrow.jpg' },
  { src: '//costume_collection//97.Sewn_Demon.jpg', alt: '97.Sewn_Demon.jpg' },
  { src: '//costume_collection//Casual_Costume_Box.png', alt: 'Casual_Costume_Box.png' },
  { src: '//costume_collection//Cute_Costume_Box.png', alt: 'Cute_Costume_Box.png' },
  { src: '//costume_collection//Fantasy_Costume_Box.png', alt: 'Fantasy_Costume_Box.png' },
  { src: '//costume_collection//Memorial_Summer_F.png', alt: 'Memorial_Summer_F.png' },
  { src: '//costume_collection//Memorial_Summer_M.png', alt: 'Memorial_Summer_M.png' },
  { src: '//costume_collection//School_Life_Costume_Box.png', alt: 'School_Life_Costume_Box.png' },
  { src: '//costume_collection//Summer_Costume_Box.png', alt: 'Summer_Costume_Box.png' },
  { src: '//costume_collection//black_friday_special_sales_2023.png', alt: 'black_friday_special_sales_2023.png' },
  { src: '//costume_collection//black_friday_special_sales_2024.png', alt: 'black_friday_special_sales_2024.png' },
  { src: '//costume_collection//fashionsale_20240321.png', alt: 'fashionsale_20240321.png' },
]

export const CostumeCollection = () => {
  return (
    <div className="baike-content">
      <div className="baike-info-card">
        <p>
          <strong>
            更多信息请参考{' '}
            <a
              href="https://gothante.wiki/?search=costume+collection"
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
        <h2 className="baike-section-title">👗 服装收藏详情</h2>
        <div className="costume-gallery">
          {costumeImages.map((item, idx) => (
            <div key={idx} className="costume-gallery-item">
              <div className="baike-image-thumbnail">
                <BaikeImage src={item.src} alt={item.alt} maxWidth="200px" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
