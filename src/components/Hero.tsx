import "./Hero.less";

export const Hero = () => {
  const handleJoinQQGroup = () => {
    const qqGroupNumber = "564385722";
    // 使用 QQ 群链接，支持 PC 和移动端
    const qqGroupUrl = `https://qm.qq.com/q/${qqGroupNumber}`;
    window.open(qqGroupUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="hero">
      <div>
        <p className="eyebrow">Flyff Universe · 资料中枢</p>
        <h1>飞飞百科</h1>
        <p className="lede">即点即用的攻略、系统说明与版本资讯。</p>
        <div className="hero-actions">
          <button className="solid-btn" onClick={handleJoinQQGroup}>
            <a
              style={{ textDecoration: "none", color: "inherit" }}
              target="_blank"
              href="https://qm.qq.com/cgi-bin/qm/qr?k=BBJpZeKOSiY45OPv4sVCZjoKX0yuuim_&jump_from=webapi&authKey=teAIRv+hxx8SmAnknRBNwRODb060pxV2foiB3qyOTnLhOMg7V2fmWKukTMt/EJOt"
            >
              点击加群
            </a>
          </button>
        </div>
      </div>
    </section>
  );
};
