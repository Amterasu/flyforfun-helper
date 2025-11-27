import { useState } from "react";
import "./index.less";

export const Hero = () => {
  const [copied, setCopied] = useState(false);
  const groupNumber = "564385722";

  const handleCopyGroupNumber = async () => {
    try {
      await navigator.clipboard.writeText(groupNumber);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

  return (
    <section className="hero">
      <div>
        <p className="eyebrow">Flyff Universe · 资料中枢</p>
        <h1>飞飞百科</h1>
        <p className="lede">即点即用的攻略、系统说明与版本资讯。</p>
        <div className="hero-actions">
          <div className="hero-info">
            <div className="hero-info-item">
              <span className="hero-info-label">作者</span>
              <span className="hero-info-value">一区月月</span>
            </div>
            <div className="hero-info-item">
              <span className="hero-info-label">交流群</span>
              <span
                className="hero-info-value hero-info-value-copyable"
                onClick={handleCopyGroupNumber}
                title="点击复制群号"
              >
                {groupNumber}
                <span className="copy-icon">📋</span>
                {copied && <span className="copy-tooltip">已复制!</span>}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
