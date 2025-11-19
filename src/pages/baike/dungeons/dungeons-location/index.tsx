import React from 'react'
import { BaikeImage } from '../../../../components/BaikeImage'

export const DungeonsLocation = () => {
  return (
    <div className="baike-content">
    
    
    <BaikeImage key={1} src="/dungeons/dungeons_location.png" alt="dungeons_location.png" maxWidth="100%" />
    <table key={2} className="baike-table">
      <tbody>
        <tr key={0}>
          <td key={0}>大陆</td>
          <td key={1}>普通副本</td>
          <td key={2}>高级副本</td>
        </tr>
      </tbody>
    </table>
    <table key={3} className="baike-table">
      <tbody>
        <tr key={0}>
          <td key={0}>:---:</td>
          <td key={1}>:---:</td>
          <td key={2}>:---:</td>
        </tr>
      </tbody>
    </table>
    <table key={4} className="baike-table">
      <tbody>
        <tr key={0}>
          <td key={0}>帕里</td>
          <td key={1}>蛇妖副本</td>
          <td key={2}>帕里洞</td>
        </tr>
      </tbody>
    </table>
    <table key={5} className="baike-table">
      <tbody>
        <tr key={0}>
          <td key={0}>晨光</td>
          <td key={1}>伊普利斯神殿</td>
          <td key={2}>无</td>
        </tr>
      </tbody>
    </table>
    <table key={6} className="baike-table">
      <tbody>
        <tr key={0}>
          <td key={0}>莱斯花园</td>
          <td key={1}>无</td>
          <td key={2}>莱斯地下墓穴</td>
        </tr>
      </tbody>
    </table>
    <table key={7} className="baike-table">
      <tbody>
        <tr key={0}>
          <td key={0}>达肯1&amp;2区</td>
          <td key={1}>矿洞</td>
          <td key={2}>嫉妒深渊</td>
        </tr>
      </tbody>
    </table>
    <table key={8} className="baike-table">
      <tbody>
        <tr key={0}>
          <td key={0}>达肯3区</td>
          <td key={1}>火龙洞</td>
          <td key={2}>圣堂</td>
        </tr>
      </tbody>
    </table>
    <table key={9} className="baike-table">
      <tbody>
        <tr key={0}>
          <td key={0}>阿兹利亚</td>
          <td key={1}>无</td>
          <td key={2}>风暴之巅</td>
        </tr>
      </tbody>
    </table>
    <table key={10} className="baike-table">
      <tbody>
        <tr key={0}>
          <td key={0}>珊瑚岛</td>
          <td key={1}>海洞</td>
          <td key={2}>荒野之地</td>
        </tr>
      </tbody>
    </table>
    
    </div>
  )
}
