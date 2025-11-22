import React from "react";
import "./index.less";

type BuffData = {
  int: number;
  beefUp: number;
  heapUp: number;
  cannonBall: number;
  mentalSign: number;
  quickStep: number;
  hasteAtkSpd: number;
  hasteDct: number;
  catsReflex: number;
  patience: number;
  accuracy: number;
  protect: number;
  geburahTiphreth: number;
  spiritFortune: number;
  isHighlighted?: boolean;
  isMaxLevel?: boolean;
};

export const BuffScale = () => {
  // 定义每个buff的最大值
  const buffMaxValues = {
    beefUp: 20,
    heapUp: 20,
    cannonBall: 20,
    mentalSign: 20,
    quickStep: 20,
    hasteAtkSpd: 10,
    hasteDct: 10,
    catsReflex: 10,
    patience: 10,
    accuracy: 10,
    protect: 10,
    geburahTiphreth: 10,
    spiritFortune: 200,
  };

  // 检查buff是否达到最大值
  const isMaxValue = (
    buffKey: keyof typeof buffMaxValues,
    value: number
  ): boolean => {
    return value === buffMaxValues[buffKey];
  };

  const buffData: BuffData[] = [
    {
      int: 476,
      beefUp: 19,
      heapUp: 19,
      cannonBall: 19,
      mentalSign: 19,
      quickStep: 19,
      hasteAtkSpd: 9,
      hasteDct: 9,
      catsReflex: 9,
      patience: 9,
      accuracy: 9,
      protect: 9,
      geburahTiphreth: 9,
      spiritFortune: 190,
    },
    {
      int: 477,
      beefUp: 19,
      heapUp: 19,
      cannonBall: 19,
      mentalSign: 19,
      quickStep: 19,
      hasteAtkSpd: 9,
      hasteDct: 9,
      catsReflex: 9,
      patience: 9,
      accuracy: 9,
      protect: 9,
      geburahTiphreth: 9,
      spiritFortune: 191,
    },
    {
      int: 478,
      beefUp: 19,
      heapUp: 19,
      cannonBall: 19,
      mentalSign: 19,
      quickStep: 19,
      hasteAtkSpd: 9,
      hasteDct: 9,
      catsReflex: 9,
      patience: 9,
      accuracy: 9,
      protect: 9,
      geburahTiphreth: 9,
      spiritFortune: 191,
    },
    {
      int: 479,
      beefUp: 20,
      heapUp: 20,
      cannonBall: 20,
      mentalSign: 20,
      quickStep: 20,
      hasteAtkSpd: 9,
      hasteDct: 9,
      catsReflex: 9,
      patience: 9,
      accuracy: 9,
      protect: 9,
      geburahTiphreth: 9,
      spiritFortune: 191,
      isHighlighted: true,
    },
    {
      int: 480,
      beefUp: 20,
      heapUp: 20,
      cannonBall: 20,
      mentalSign: 20,
      quickStep: 20,
      hasteAtkSpd: 9,
      hasteDct: 9,
      catsReflex: 9,
      patience: 9,
      accuracy: 9,
      protect: 9,
      geburahTiphreth: 9,
      spiritFortune: 192,
    },
    {
      int: 481,
      beefUp: 20,
      heapUp: 20,
      cannonBall: 20,
      mentalSign: 20,
      quickStep: 20,
      hasteAtkSpd: 9,
      hasteDct: 10,
      catsReflex: 10,
      patience: 10,
      accuracy: 10,
      protect: 10,
      geburahTiphreth: 10,
      spiritFortune: 192,
      isHighlighted: true,
    },
    {
      int: 482,
      beefUp: 20,
      heapUp: 20,
      cannonBall: 20,
      mentalSign: 20,
      quickStep: 20,
      hasteAtkSpd: 9,
      hasteDct: 10,
      catsReflex: 10,
      patience: 10,
      accuracy: 10,
      protect: 10,
      geburahTiphreth: 10,
      spiritFortune: 193,
    },
    {
      int: 483,
      beefUp: 20,
      heapUp: 20,
      cannonBall: 20,
      mentalSign: 20,
      quickStep: 20,
      hasteAtkSpd: 9,
      hasteDct: 10,
      catsReflex: 10,
      patience: 10,
      accuracy: 10,
      protect: 10,
      geburahTiphreth: 10,
      spiritFortune: 193,
    },
    {
      int: 484,
      beefUp: 20,
      heapUp: 20,
      cannonBall: 20,
      mentalSign: 20,
      quickStep: 20,
      hasteAtkSpd: 9,
      hasteDct: 10,
      catsReflex: 10,
      patience: 10,
      accuracy: 10,
      protect: 10,
      geburahTiphreth: 10,
      spiritFortune: 193,
    },
    {
      int: 485,
      beefUp: 20,
      heapUp: 20,
      cannonBall: 20,
      mentalSign: 20,
      quickStep: 20,
      hasteAtkSpd: 9,
      hasteDct: 10,
      catsReflex: 10,
      patience: 10,
      accuracy: 10,
      protect: 10,
      geburahTiphreth: 10,
      spiritFortune: 194,
    },
    {
      int: 486,
      beefUp: 20,
      heapUp: 20,
      cannonBall: 20,
      mentalSign: 20,
      quickStep: 20,
      hasteAtkSpd: 9,
      hasteDct: 10,
      catsReflex: 10,
      patience: 10,
      accuracy: 10,
      protect: 10,
      geburahTiphreth: 10,
      spiritFortune: 194,
    },
    {
      int: 487,
      beefUp: 20,
      heapUp: 20,
      cannonBall: 20,
      mentalSign: 20,
      quickStep: 20,
      hasteAtkSpd: 9,
      hasteDct: 10,
      catsReflex: 10,
      patience: 10,
      accuracy: 10,
      protect: 10,
      geburahTiphreth: 10,
      spiritFortune: 195,
    },
    {
      int: 488,
      beefUp: 20,
      heapUp: 20,
      cannonBall: 20,
      mentalSign: 20,
      quickStep: 20,
      hasteAtkSpd: 9,
      hasteDct: 10,
      catsReflex: 10,
      patience: 10,
      accuracy: 10,
      protect: 10,
      geburahTiphreth: 10,
      spiritFortune: 195,
    },
    {
      int: 489,
      beefUp: 20,
      heapUp: 20,
      cannonBall: 20,
      mentalSign: 20,
      quickStep: 20,
      hasteAtkSpd: 9,
      hasteDct: 10,
      catsReflex: 10,
      patience: 10,
      accuracy: 10,
      protect: 10,
      geburahTiphreth: 10,
      spiritFortune: 195,
    },
    {
      int: 490,
      beefUp: 20,
      heapUp: 20,
      cannonBall: 20,
      mentalSign: 20,
      quickStep: 20,
      hasteAtkSpd: 9,
      hasteDct: 10,
      catsReflex: 10,
      patience: 10,
      accuracy: 10,
      protect: 10,
      geburahTiphreth: 10,
      spiritFortune: 196,
    },
    {
      int: 491,
      beefUp: 20,
      heapUp: 20,
      cannonBall: 20,
      mentalSign: 20,
      quickStep: 20,
      hasteAtkSpd: 9,
      hasteDct: 10,
      catsReflex: 10,
      patience: 10,
      accuracy: 10,
      protect: 10,
      geburahTiphreth: 10,
      spiritFortune: 196,
    },
    {
      int: 492,
      beefUp: 20,
      heapUp: 20,
      cannonBall: 20,
      mentalSign: 20,
      quickStep: 20,
      hasteAtkSpd: 9,
      hasteDct: 10,
      catsReflex: 10,
      patience: 10,
      accuracy: 10,
      protect: 10,
      geburahTiphreth: 10,
      spiritFortune: 197,
    },
    {
      int: 493,
      beefUp: 20,
      heapUp: 20,
      cannonBall: 20,
      mentalSign: 20,
      quickStep: 20,
      hasteAtkSpd: 9,
      hasteDct: 10,
      catsReflex: 10,
      patience: 10,
      accuracy: 10,
      protect: 10,
      geburahTiphreth: 10,
      spiritFortune: 197,
    },
    {
      int: 494,
      beefUp: 20,
      heapUp: 20,
      cannonBall: 20,
      mentalSign: 20,
      quickStep: 20,
      hasteAtkSpd: 9,
      hasteDct: 10,
      catsReflex: 10,
      patience: 10,
      accuracy: 10,
      protect: 10,
      geburahTiphreth: 10,
      spiritFortune: 197,
    },
    {
      int: 495,
      beefUp: 20,
      heapUp: 20,
      cannonBall: 20,
      mentalSign: 20,
      quickStep: 20,
      hasteAtkSpd: 9,
      hasteDct: 10,
      catsReflex: 10,
      patience: 10,
      accuracy: 10,
      protect: 10,
      geburahTiphreth: 10,
      spiritFortune: 198,
    },
    {
      int: 496,
      beefUp: 20,
      heapUp: 20,
      cannonBall: 20,
      mentalSign: 20,
      quickStep: 20,
      hasteAtkSpd: 10,
      hasteDct: 10,
      catsReflex: 10,
      patience: 10,
      accuracy: 10,
      protect: 10,
      geburahTiphreth: 10,
      spiritFortune: 198,
      isHighlighted: true,
    },
    {
      int: 497,
      beefUp: 20,
      heapUp: 20,
      cannonBall: 20,
      mentalSign: 20,
      quickStep: 20,
      hasteAtkSpd: 10,
      hasteDct: 10,
      catsReflex: 10,
      patience: 10,
      accuracy: 10,
      protect: 10,
      geburahTiphreth: 10,
      spiritFortune: 199,
    },
    {
      int: 498,
      beefUp: 20,
      heapUp: 20,
      cannonBall: 20,
      mentalSign: 20,
      quickStep: 20,
      hasteAtkSpd: 10,
      hasteDct: 10,
      catsReflex: 10,
      patience: 10,
      accuracy: 10,
      protect: 10,
      geburahTiphreth: 10,
      spiritFortune: 199,
    },
    {
      int: 499,
      beefUp: 20,
      heapUp: 20,
      cannonBall: 20,
      mentalSign: 20,
      quickStep: 20,
      hasteAtkSpd: 10,
      hasteDct: 10,
      catsReflex: 10,
      patience: 10,
      accuracy: 10,
      protect: 10,
      geburahTiphreth: 10,
      spiritFortune: 199,
    },
    {
      int: 500,
      beefUp: 20,
      heapUp: 20,
      cannonBall: 20,
      mentalSign: 20,
      quickStep: 20,
      hasteAtkSpd: 10,
      hasteDct: 10,
      catsReflex: 10,
      patience: 10,
      accuracy: 10,
      protect: 10,
      geburahTiphreth: 10,
      spiritFortune: 200,
      isHighlighted: true,
      isMaxLevel: true,
    },
  ];

  return (
    <div className="baike-content">
      <div className="buff-scale-table-container">
        <table className="baike-table buff-scale-table">
        <thead>
          <tr>
            <th>智力数</th>
            <th>力量术</th>
            <th>体质术</th>
            <th>敏捷术</th>
            <th>智力术</th>
            <th>天马</th>
            <th colSpan={2}>高效术</th>
            <th>躲避术</th>
            <th>生命源泉</th>
            <th>命中术</th>
            <th>守护术</th>
            <th>战歌</th>
            <th>攻击强化</th>
          </tr>
          <tr className="sub-header">
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>攻速</th>
            <th>释放</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {buffData.map((row, index) => (
            <tr key={index}>
              <td className="int-value">{row.int}</td>
              <td
                className={
                  isMaxValue("beefUp", row.beefUp) ? "buff-max" : "buff-not-max"
                }
              >
                {row.beefUp}
              </td>
              <td
                className={
                  isMaxValue("heapUp", row.heapUp) ? "buff-max" : "buff-not-max"
                }
              >
                {row.heapUp}
              </td>
              <td
                className={
                  isMaxValue("cannonBall", row.cannonBall)
                    ? "buff-max"
                    : "buff-not-max"
                }
              >
                {row.cannonBall}
              </td>
              <td
                className={
                  isMaxValue("mentalSign", row.mentalSign)
                    ? "buff-max"
                    : "buff-not-max"
                }
              >
                {row.mentalSign}
              </td>
              <td
                className={
                  isMaxValue("quickStep", row.quickStep)
                    ? "buff-max"
                    : "buff-not-max"
                }
              >
                {row.quickStep}
              </td>
              <td
                className={
                  isMaxValue("hasteAtkSpd", row.hasteAtkSpd)
                    ? "buff-max"
                    : "buff-not-max"
                }
              >
                {row.hasteAtkSpd}
              </td>
              <td
                className={
                  isMaxValue("hasteDct", row.hasteDct)
                    ? "buff-max"
                    : "buff-not-max"
                }
              >
                {row.hasteDct}
              </td>
              <td
                className={
                  isMaxValue("catsReflex", row.catsReflex)
                    ? "buff-max"
                    : "buff-not-max"
                }
              >
                {row.catsReflex}
              </td>
              <td
                className={
                  isMaxValue("patience", row.patience)
                    ? "buff-max"
                    : "buff-not-max"
                }
              >
                {row.patience}
              </td>
              <td
                className={
                  isMaxValue("accuracy", row.accuracy)
                    ? "buff-max"
                    : "buff-not-max"
                }
              >
                {row.accuracy}
              </td>
              <td
                className={
                  isMaxValue("protect", row.protect)
                    ? "buff-max"
                    : "buff-not-max"
                }
              >
                {row.protect}
              </td>
              <td
                className={
                  isMaxValue("geburahTiphreth", row.geburahTiphreth)
                    ? "buff-max"
                    : "buff-not-max"
                }
              >
                {row.geburahTiphreth}
              </td>
              <td
                className={
                  isMaxValue("spiritFortune", row.spiritFortune)
                    ? "buff-max"
                    : "buff-not-max"
                }
              >
                {row.spiritFortune}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};
