import React from "react";
import "./PresetDisplay.less";

interface PresetDisplayProps {
  title: string;
  items: Array<{ name: string; value: string | number | null; tolerance?: number }>;
  onClick?: () => void;
  actionButton?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    count?: number;
    totalCount?: number;
  };
  customContent?: React.ReactNode;
}

export const PresetDisplay: React.FC<PresetDisplayProps> = ({
  title,
  items,
  onClick,
  actionButton,
  customContent,
}) => {
  const hasValue = items.some((item) => item.value !== null);

  return (
    <div className="preset-display-group">
      <div className="preset-display-title-row">
        <div
          className="preset-display-title"
          onClick={onClick}
          style={onClick ? { cursor: "pointer" } : undefined}
        >
          {title}
        </div>
        {actionButton && (
          <button
            className="flyff-button"
            onClick={actionButton.onClick}
            disabled={actionButton.disabled}
            title={actionButton.label}
          >
            {actionButton.label} {actionButton.totalCount !== undefined 
              ? `(${actionButton.count ?? 0}/${actionButton.totalCount})` 
              : `(${actionButton.count ?? 0})`}
          </button>
        )}
      </div>
      <div className="preset-display-content" onClick={onClick} style={onClick ? { cursor: "pointer" } : undefined}>
        {customContent ? (
          customContent
        ) : hasValue ? (
          items
            .filter((item) => item.value !== null)
            .map((item, idx) => (
              <div key={idx} className="preset-display-item">
                <span className="preset-display-label">{item.name}:</span>
                <span className="preset-display-value">
                  {item.value}
                  {item.tolerance !== undefined && item.tolerance !== null && (
                    <span className="preset-display-tolerance">【± {item.tolerance}】</span>
                  )}
                </span>
              </div>
            ))
        ) : (
          <div className="preset-display-empty">未设置</div>
        )}
      </div>
    </div>
  );
};

