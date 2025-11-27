import React from "react";
import "./index.less";

export const PitySystem = () => {
  return (
    <div className="baike-content">
      <h2 className="baike-section-title">保底机制</h2>

      <section className="pity-section">
        <h3 className="pity-subtitle">一、通俗机制表达（一句话总结 + 分步拆解）</h3>
        <div className="pity-summary">
          <p className="pity-summary-text">
            <strong>一句话总结：</strong>
            强化的初始成功率是 <code>c</code>，每用 spro/apro/gpro 道具失败一次，下次成功率就按「累计失败次数 × 初始概率 c」递增，直到成功（成功后累计失败次数清零，重新从 c 开始）。
          </p>
        </div>
        <div className="pity-breakdown">
          <h4 className="pity-breakdown-title">分步拆解：</h4>
          <ul className="pity-list">
            <li>
              <strong>初始状态：</strong>
              第一次强化时，累计失败次数 <code>n=0</code>，成功率 = 初始概率 <code>c</code>（比如 <code>c=0.050293%</code>，第一次成功率就是 0.050293%）；
            </li>
            <li>
              <strong>失败累积：</strong>
              如果用 spro/apro/gpro 强化失败，<code>n</code> 就加 1（比如第一次失败，<code>n=1</code>；第二次再失败，<code>n=2</code>，以此类推）；
            </li>
            <li>
              <strong>成功率递增：</strong>
              下一次强化的成功率 = 累计失败次数 <code>n</code> × 初始概率 <code>c</code>（比如 <code>n=3</code> 时，成功率就是 <code>3×c</code>）；
            </li>
            <li>
              <strong>成功重置：</strong>
              一旦强化成功，<code>n</code> 立刻清零，下一次强化又回到初始成功率 <code>c</code>；
            </li>
            <li>
              <strong>必成条件：</strong>
              当 <code>n×c ≥ 100%</code> 时，下一次强化必成（比如 <code>c=0.050293%</code> 时，<code>n≈1988</code> 时，<code>1988×0.050293%≈100%</code>，第 1989 次必成）。
            </li>
          </ul>
        </div>
      </section>

      <section className="pity-section">
        <h3 className="pity-subtitle">二、核心公式（含符号定义 + 案例演示）</h3>
        
        <div className="pity-formula-group">
          <h4 className="pity-formula-title">1. 符号定义</h4>
          <table className="pity-table">
            <thead>
              <tr>
                <th>符号</th>
                <th>含义</th>
                <th>单位 / 格式</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>c</code></td>
                <td>强化的初始成功率（固定值，由强化等级决定）</td>
                <td>小数形式（如 0.050293% = 0.00050293）</td>
              </tr>
              <tr>
                <td><code>n</code></td>
                <td>累计失败次数（仅统计 spro/apro/gpro 道具的失败，成功后重置为 0）</td>
                <td>整数（0,1,2,...）</td>
              </tr>
              <tr>
                <td><code>P(n)</code></td>
                <td>第 n+1 次强化的成功率（因为 n 是前 n 次的失败次数）</td>
                <td>小数形式（如 3×0.00050293 = 0.00150879，即 0.150879%）</td>
              </tr>
              <tr>
                <td><code>k</code></td>
                <td>必成次数（下一次强化必成时的「累计失败次数 + 1」）</td>
                <td>整数（如 1988+1=1989 次）</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pity-formula-group">
          <h4 className="pity-formula-title">2. 核心公式</h4>
          <table className="pity-table">
            <thead>
              <tr>
                <th>公式用途</th>
                <th>公式表达式</th>
                <th>示例（c=0.050293%=0.00050293）</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>单次成功率计算</td>
                <td><code>P(n) = n × c</code>（n 为累计失败次数）</td>
                <td><code>n=10</code> 时，<code>P(10)=10×0.00050293=0.0050293</code>（即 0.50293%）</td>
              </tr>
              <tr>
                <td>必成次数计算</td>
                <td><code>k = 向上取整(1 ÷ c)</code>（当 n×c ≥ 1 时，第 n+1 次必成）</td>
                <td><code>1÷0.00050293≈1988.36</code>，向上取整为 1989 次（第 1989 次必成）</td>
              </tr>
              <tr>
                <td>累计失败次数重置规则</td>
                <td>成功后，<code>n = 0</code>；失败后，<code>n = n + 1</code></td>
                <td>第 5 次成功 → <code>n=0</code>；第 5 次失败 → <code>n=5</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pity-formula-group">
          <h4 className="pity-formula-title">3. 公式使用步骤（实操演示）</h4>
          <div className="pity-example">
            <p>比如你要计算「+10 强化（c=0.050293%）失败 50 次后，下一次的成功率」：</p>
            <ol className="pity-steps">
              <li>确定已知条件：<code>c=0.00050293</code>，累计失败次数 <code>n=50</code>；</li>
              <li>代入单次成功率公式：<code>P(50)=50×0.00050293=0.0251465</code>；</li>
              <li>转换为百分比：<code>0.0251465×100%≈2.51465%</code> → 下一次成功率约 <strong>2.51%</strong>。</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="pity-section">
        <h3 className="pity-subtitle">三、关键提醒（避免误解）</h3>
        <ul className="pity-reminders">
          <li>
            <code>n</code> 仅统计 spro/apro/gpro 道具的失败，用其他道具（如普通强化石）失败不算；
          </li>
          <li>
            成功率是「线性递增」的，失败次数越多，成功率涨得越明显（比如 <code>n=100</code> 时成功率 5.0293%，<code>n=1000</code> 时 50.293%）；
          </li>
          <li>
必成次数是「理论保底」，实际可能在之前就成功（比如 1989 次必成，但可能 1500 次就成功了）。
          </li>
        </ul>
      </section>
    </div>
  );
};
