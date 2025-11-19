import React from "react"
import { BaikeImage } from '../../../../components/BaikeImage';

export const ChattingFilter = () => {
  return (
    <div className="baike-content">
      <p>
        <strong>
          更多信息请参考{" "}
          <a
            href="https://gothante.wiki/?search=chat"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gothante
          </a>
          。
        </strong>
      </p>

      <blockquote className="baike-blockquote">
        <p>
          来源：
          <a
            href="https://universe.flyff.com/news/patchnotes133"
            target="_blank"
            rel="noopener noreferrer"
          >
            游戏版本1.3.3更新说明
          </a>
        </p>
      </blockquote>

      <ul className="baike-list">
        <li>在聊天选项窗口中添加了聊天颜色自定义选项。</li>
      </ul>

      <div className="baike-image-container">
        <BaikeImage src="/system/chatting_filter/chatting_filter.png" alt="聊天过滤" width={300} maxWidth="100%" />
      </div>

      <div className="baike-image-container">
        <BaikeImage src="/system/chatting_filter/chatting_filter_window.png" alt="聊天过滤窗口" width={400} maxWidth="100%" />
      </div>
    </div>
  );
};
