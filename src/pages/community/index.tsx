import React from 'react'
import './index.less'

// 直接定义为包含 url, cn, en 的对象数组
const linksData = [
  {
    url: "https://universe.flyff.com/",
    en: "Flyff Universe",
    cn: "官方网站。"
  },
  {
    url: "https://galalab.helpshift.com/hc/en/12-flyff-universe/contact-us/",
    en: "Galalab Support (helpshift)",
    cn: "客户支持。"
  },
  {
    url: "https://discord.com/invite/flyffuniverse",
    en: "Flyff Universe Discord",
    cn: "官方Discord。"
  },
  {
    url: "https://api.flyff.com/",
    en: "Flyff Universe API",
    cn: "Flyff Universe公共API。"
  },
  {
    url: "https://drive.google.com/drive/folders/12jQHkPvKXZrDZ9h_SNS7scf2mGUKSuKl",
    en: "Flyff Official Fansite Kit",
    cn: "包含高质量Flyff资源的粉丝网站工具包。"
  },
  {
    url: "https://gothante.wiki/",
    en: "Gothante",
    cn: "来了解Gothante，这是一款Flyff Universe的综合搜索工具！"
  },
  {
    url: "https://flyffulator.com/",
    en: "Frostiae/Flyffulator",
    cn: "适用于Flyff Universe的功能丰富的角色模拟器和伤害计算器。"
  },
  {
    url: "https://translation.sniegu.fr/projects/flyff/",
    en: "Sniegu Translation Platform",
    cn: ""
  },
  {
    url: "https://flyffipedia.com/",
    en: "swaight/Flyffipedia",
    cn: "一个包含各种游戏数据静态信息的维基页面。"
  },
  {
    url: "https://madrigalinside.com/",
    en: "tacota0158/Madrigalinside",
    cn: "一个包含各种游戏数据静态信息的维基页面。"
  },
  {
    url: "https://skillulator.lol/",
    en: "nulfrost/Skillulator | FlyFF Universe Skill Calculator",
    cn: "Skillulator帮助你优化并分享你的FlyFF技能配置。"
  },
  {
    url: "https://flyffskillsimulator.vercel.app/",
    en: "guysuvijak/Flyff - Skill Simulator",
    cn: "Flyff技能模拟器是一个使用Next.js和React Flow技术开发的开源项目。"
  },
  {
    url: "https://siegestats.cc/",
    en: "ShynoX/SiegeStats",
    cn: "SiegeStats专注于Flyff的玩家对战方面。它旨在整理和可视化Flyff的战斗日志格式，以便对其进行查看和分析。"
  },
  {
    url: "https://github.com/toffeegg/FlyffU-Launcher/releases",
    en: "toffeegg/FlyffU-Launcher",
    cn: "Flyff Universe的多账号启动器。"
  },
  {
    url: "https://flyff-calculators.com/",
    en: "Stellar/Flyff Calculators",
    cn: "计算Flyff Universe中装备、首饰、穿洞、终极等的升级成本！"
  },
  {
    url: "https://housing-yuzaro.netlify.app/",
    en: "Housing help by Yuzaro",
    cn: "一个简单的房屋家具预览网站。"
  },
  {
    url: "https://flyffuniversemodelviewer.com/cs-viewer",
    en: "i9hdkills Flyff Universe resources",
    cn: "一系列用于Flyff Universe的不同工具和资源。"
  },
  {
    url: "https://flyffmodelviewer.com/",
    en: "MonkeyZero/Flyff Model Viewer | flyffmodelviewer.com",
    cn: "通往奇妙的Fly For Fun世界的终极门户！"
  }
];

const FlyffCommunityLinks = () => {
  return (
    <div className="community-links">
      <ol className="community-links-list">
        {linksData.map((link, index) => (
          <li key={index} className="community-link-item">
            <a 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              title={link.en}
              className="community-link"
            >
              {link.en}
            </a>
            {link.cn && <span className="community-link-desc">： {link.cn}</span>}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default FlyffCommunityLinks