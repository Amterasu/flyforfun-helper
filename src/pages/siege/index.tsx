import React, { useState, useEffect } from 'react';
import { parseSiegeLog } from './utils';
import { SiegeDashboard } from './SiegeDashboard';
import { SiegeAnalysis } from './types';
import rawData from './data.txt?raw';
import { Spin, Empty } from 'antd';
import './index.less';

const SiegePage = () => {
  const [data, setData] = useState<SiegeAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async parsing or fetching
    const timer = setTimeout(() => {
      try {
        const parsed = parseSiegeLog(rawData);
        setData(parsed);
      } catch (e) {
        console.error('Failed to parse siege log', e);
      } finally {
        setLoading(false);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: 50 }}><Spin size="large" /></div>;
  }

  if (!data) {
    return <Empty description="无法加载会战数据" />;
  }

  return (
    <div className="siege-page">
       <div className="siege-header">
         <h1>🏰 公会战数据分析</h1>
         <p>数据来源: 2024-11-27 场次</p>
       </div>
       <SiegeDashboard data={data} />
    </div>
  );
};

export default SiegePage;

