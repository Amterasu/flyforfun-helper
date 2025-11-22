import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs } from 'antd';
import type { DocNode } from '../../types/doc';
import './index.less';

interface TertiaryNavTabsProps {
  currentChild?: DocNode;
  activeLeafId?: string;
}

export const TertiaryNavTabs = ({ currentChild, activeLeafId }: TertiaryNavTabsProps) => {
  const navigate = useNavigate();
  const params = useParams<{ sectionId?: string; childId?: string }>();

  const tabItems = useMemo(() => {
    if (!currentChild?.children || currentChild.children.length === 0) {
      return [];
    }

    return currentChild.children.map((child) => ({
      key: child.id,
      label: child.title,
    }));
  }, [currentChild]);

  const activeKey = useMemo(() => {
    return activeLeafId || (tabItems.length > 0 ? tabItems[0].key : undefined);
  }, [activeLeafId, tabItems]);

  const handleTabChange = (key: string) => {
    if (params.sectionId && params.childId) {
      navigate(`/baike/${params.sectionId}/${params.childId}/${key}`, { replace: true });
    }
  };

  if (tabItems.length === 0) {
    return null;
  }

  return (
    <div className="tertiary-nav-tabs">
      <Tabs
        className="tertiary-nav-tabs-content"
        activeKey={activeKey}
        onChange={handleTabChange}
        items={tabItems}
        size="large"
      />
    </div>
  );
};

