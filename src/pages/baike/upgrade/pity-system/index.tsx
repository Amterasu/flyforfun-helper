import React from "react";

export const PitySystem = () => {
  return (
    <div className="baike-content">
      <h2 className="baike-section-title">保底机制</h2>
      升级的数学概率（或
      “数学层面的升级率”）保持不变，但你遭遇极端不幸、失败次数远超理论平均尝试次数的概率，现在已大幅降低。
      该机制基于简单的马尔可夫链原理，核心是显著缩小了成功所需尝试次数的标准差：怜悯系统下，成功的标准差仅为
      ±17 次升级尝试，而旧系统的标准差为 ±49 次。
    </div>
  );
};
