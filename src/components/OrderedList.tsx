import React from 'react';
import './OrderedList.less';

export interface OrderedListProps {
  /** 列表项内容数组 */
  items: string[];
  /** 自定义类名 */
  className?: string;
  /** 列表样式变体 */
  variant?: 'default' | 'spacious';
}

/**
 * 有序列表组件
 * 用于显示带序号的有序内容列表
 */
export const OrderedList: React.FC<OrderedListProps> = ({
  items,
  className = '',
  variant = 'default',
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  const baseClass = 'baike-ordered-list';
  const variantClass = `baike-ordered-list--${variant}`;
  const combinedClass = `${baseClass} ${variantClass} ${className}`.trim();

  return (
    <ol className={combinedClass}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ol>
  );
};
