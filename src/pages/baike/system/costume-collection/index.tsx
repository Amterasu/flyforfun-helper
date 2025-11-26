import { BaikeImage } from "../../../../components/BaikeImage";
import costumeCollectionList from "../../../../config/costumeCollection.json";
import "./index.less";
import { useMemo } from "react";

export const CostumeCollection = () => {
  // 分离 activity_box 类型和其他套装
  const { regularCostumes, activityBoxes } = useMemo(() => {
    const regular: typeof costumeCollectionList = [];
    const activity: typeof costumeCollectionList = [];

    costumeCollectionList.forEach((item) => {
      if (item.type === "activity_box") {
        activity.push(item);
      } else {
        regular.push(item);
      }
    });

    // 普通套装倒序展示
    return {
      regularCostumes: [...regular].reverse(),
      activityBoxes: activity,
    };
  }, []);

  // 获取原始数组中最后一个普通套装（倒序后第一个）
  const lastRegularIndex = regularCostumes.length > 0 ? 0 : -1;

  return (
    <div className="baike-content">
      <div className="baike-section">
        <h2 className="baike-section-title">往期时装</h2>
        <div className="costume-gallery">
          {regularCostumes.map((item, idx) => (
            <div key={idx} className="costume-gallery-item">
              <div className="costume-name">
                <div className="costume-name-row">
                  <div className="costume-name-cn">{item.name_cn || item.name}</div>
                  {idx === lastRegularIndex && (
                    <span className="costume-sale-badge">【售卖中】</span>
                  )}
                </div>
                <div className="costume-name-en">{item.name}</div>
              </div>
              <div className="baike-image-thumbnail">
                <BaikeImage
                  src={
                    "https://flyforfun.oss-cn-beijing.aliyuncs.com/public" +
                    item.src
                  }
                  alt={item.name}
                  maxWidth="200px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {activityBoxes.length > 0 && (
        <div className="baike-section">
          <h2 className="baike-section-title">🎲 随机套装</h2>
          <div className="costume-gallery">
            {activityBoxes.map((item, idx) => (
              <div key={idx} className="costume-gallery-item">
                <div className="costume-name">
                  <div className="costume-name-row">
                    <div className="costume-name-cn">{item.name_cn || item.name}</div>
                  </div>
                  <div className="costume-name-en">{item.name}</div>
                </div>
                <div className="baike-image-thumbnail">
                  <BaikeImage
                    src={
                      "https://flyforfun.oss-cn-beijing.aliyuncs.com/public" +
                      item.src
                    }
                    alt={item.name}
                    maxWidth="200px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
