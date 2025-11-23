import React, { useMemo } from 'react'
import petSkinData from '../../../../config/petSkin.json'
import './index.less'

interface PetSkinItem {
  id: number;
  name: {
    en: string;
    cns: string;
  };
  icon: string;
  limited?: boolean;
}

interface PetSkinData {
  items: PetSkinItem[];
}

interface GroupedSkins {
  limited: PetSkinItem[];
  byName: Record<string, PetSkinItem[]>;
}

export const PetTransmutation = () => {
  const skinData = petSkinData as unknown as PetSkinData;

  // 分组：稀有皮肤一组，其他按名字分组
  const groupedSkins = useMemo(() => {
    const skins = skinData.items || [];
    const result: GroupedSkins = {
      limited: [],
      byName: {},
    };

    skins.forEach((skin) => {
      if (skin.limited) {
        result.limited.push(skin);
      } else {
        const name = skin.name.cns;
        if (!result.byName[name]) {
          result.byName[name] = [];
        }
        result.byName[name].push(skin);
      }
    });

    // 对稀有皮肤按ID排序
    result.limited.sort((a, b) => a.id - b.id);
    
    // 对按名字分组的皮肤按ID排序
    Object.keys(result.byName).forEach((name) => {
      result.byName[name].sort((a, b) => a.id - b.id);
    });

    return result;
  }, [skinData]);

  const renderSkinCard = (skin: PetSkinItem) => (
    <div 
      key={skin.id} 
      className={`pet-transmutation-card ${skin.limited ? 'pet-transmutation-card-limited' : ''}`}
    >
      <div className="pet-transmutation-image">
        <img
          src={`https://flyffipedia.com/Icons/Items/${skin.icon}`}
          alt={skin.name.cns}
          className="pet-transmutation-icon"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/img/items/petegg.png";
          }}
        />
        {skin.limited && (
          <div className="pet-transmutation-limited-badge">稀有</div>
        )}
      </div>
      <div className="pet-transmutation-content">
        <h3 className="pet-transmutation-name">
          <a
            href={`https://flyffipedia.com/items/details/${skin.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="pet-transmutation-link"
          >
            {skin.name.cns}
          </a>
        </h3>
        <div className="pet-transmutation-name-en">
          {skin.name.en}
        </div>
      </div>
    </div>
  );

  return (
    <div className="baike-content">
      <div className="baike-section">
        <h2 className="baike-section-title">宠物皮肤</h2>
        
        {/* 稀有皮肤组 */}
        {groupedSkins.limited.length > 0 && (
          <div className="pet-transmutation-group">
            <h3 className="pet-transmutation-group-title">稀有皮肤</h3>
            <div className="pet-transmutation-cards-grid">
              {groupedSkins.limited.map(renderSkinCard)}
            </div>
          </div>
        )}

        {/* 按名字分组的皮肤 */}
        {Object.keys(groupedSkins.byName).length > 0 && (
          <div className="pet-transmutation-group">
            <h3 className="pet-transmutation-group-title">普通皮肤</h3>
            {Object.entries(groupedSkins.byName)
              .sort(([a], [b]) => a.localeCompare(b, 'zh-CN'))
              .map(([name, skinList]) => (
                <div key={name} className="pet-transmutation-name-group">
                  <h4 className="pet-transmutation-name-group-title">{name}</h4>
                  <div className="pet-transmutation-cards-grid">
                    {skinList.map(renderSkinCard)}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
