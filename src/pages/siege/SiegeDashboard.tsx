import React, { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { Table, Card, Row, Col, Tag, Tabs, Avatar, Popover, Empty, Tooltip, Drawer, List, Typography } from 'antd';
import { AimOutlined, StopOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { SiegeAnalysis, PlayerStats, GuildStats, SiegeLogEntry } from './types';
import { getPlayerJob, UNKNOWN_JOB_ICON } from './constants';
import './index.less';

const { Text, Title } = Typography;

interface Props {
  data: SiegeAnalysis;
}

// 玩家生命详情接口
interface PlayerLife {
  lifeNumber: number;
  kills: Array<{
    name: string;
    guild: string;
    points: number;
    timestamp: string;
  }>;
  killedBy: {
    name: string;
    guild: string;
    timestamp: string;
  } | null;
  totalPoints: number;
  totalKills: number;
  startTime: string;
  endTime: string;
}

// 计算玩家的生命详情
const calculatePlayerLives = (playerName: string, entries: SiegeLogEntry[]): PlayerLife[] => {
  const lives: PlayerLife[] = [];
  let currentLife: PlayerLife | null = null;
  let lifeNumber = 1;

  // 找到所有涉及该玩家的条目
  const playerEntries = entries.filter(e => e.attackerName === playerName || e.targetName === playerName);
  
  // 按时间排序
  playerEntries.sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  playerEntries.forEach(entry => {
    if (entry.attackerName === playerName) {
      // 该玩家击杀别人
      if (!currentLife) {
        // 开始新的一条命（可能是在战斗开始时）
        currentLife = {
          lifeNumber,
          kills: [],
          killedBy: null,
          totalPoints: 0,
          totalKills: 0,
          startTime: entry.timestamp,
          endTime: entry.timestamp
        };
      }
      
      currentLife.kills.push({
        name: entry.targetName,
        guild: entry.targetGuild,
        points: entry.points,
        timestamp: entry.timestamp
      });
      currentLife.totalPoints += entry.points;
      currentLife.totalKills += 1;
      currentLife.endTime = entry.timestamp;
    } else if (entry.targetName === playerName) {
      // 该玩家被击杀
      if (currentLife) {
        // 结束当前生命
        currentLife.killedBy = {
          name: entry.attackerName,
          guild: entry.attackerGuild,
          timestamp: entry.timestamp
        };
        currentLife.endTime = entry.timestamp;
        lives.push(currentLife);
        currentLife = null;
        lifeNumber++;
      } else {
        // 在开始前就被击杀（不太可能，但处理一下）
        const life: PlayerLife = {
          lifeNumber,
          kills: [],
          killedBy: {
            name: entry.attackerName,
            guild: entry.attackerGuild,
            timestamp: entry.timestamp
          },
          totalPoints: 0,
          totalKills: 0,
          startTime: entry.timestamp,
          endTime: entry.timestamp
        };
        lives.push(life);
        lifeNumber++;
      }
    }
  });

  // 如果还有未结束的生命，添加它
  if (currentLife) {
    lives.push(currentLife);
  }

  return lives;
};

// 玩家详情抽屉组件
const PlayerLifeDrawer: React.FC<{
  playerName: string;
  playerStats: PlayerStats | null;
  lives: PlayerLife[];
  visible: boolean;
  onClose: () => void;
}> = ({ playerName, playerStats, lives, visible, onClose }) => {
  const PlayerNameWithJob = ({ name, guild }: { name: string; guild?: string }) => {
    const jobInfo = getPlayerJob(name);
    const iconUrl = jobInfo ? jobInfo.icon : UNKNOWN_JOB_ICON;
    const jobName = jobInfo ? jobInfo.name : '未知';

    return (
      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Tooltip title={jobName}>
          <img 
            src={iconUrl} 
            alt={jobName}
            style={{ 
              width: 20, 
              height: 20, 
              flexShrink: 0,
              objectFit: 'contain',
              imageRendering: 'crisp-edges'
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== UNKNOWN_JOB_ICON) {
                target.src = UNKNOWN_JOB_ICON;
              }
            }}
          />
        </Tooltip>
        <span>{name}</span>
        {guild && <Tag color="default" style={{ marginLeft: 4, fontSize: '12px' }}>{guild}</Tag>}
      </span>
    );
  };

  return (
    <Drawer
      title={
        <div>
          <Title level={4} style={{ margin: 0, color: 'rgba(255, 255, 255, 0.9)' }}>
            {playerName}
          </Title>
          {playerStats && (
            <div style={{ marginTop: 8, color: 'rgba(255, 255, 255, 0.6)', fontSize: 14 }}>
              <Text>工会: {playerStats.guild}</Text>
              <span style={{ margin: '0 12px' }}>|</span>
              <Text>总积分: {playerStats.score}</Text>
              <span style={{ margin: '0 12px' }}>|</span>
              <Text>击杀: {playerStats.kills}</Text>
              <span style={{ margin: '0 12px' }}>|</span>
              <Text>死亡: {playerStats.deaths}</Text>
            </div>
          )}
        </div>
      }
      placement="right"
      width={700}
      onClose={onClose}
      visible={visible}
      className="player-life-drawer"
    >
      <List
        dataSource={lives}
        renderItem={(life) => (
          <List.Item key={life.lifeNumber}>
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <Title level={5} style={{ margin: 0, color: 'rgba(255, 255, 255, 0.9)' }}>
                  第 {life.lifeNumber} 条命
                </Title>
                <div>
                  <Tag color="gold">{life.totalPoints} 分</Tag>
                  <Tag color="cyan">{life.totalKills} 击杀</Tag>
                </div>
              </div>
              
              {life.kills.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <Text strong style={{ color: 'rgba(255, 255, 255, 0.85)', display: 'block', marginBottom: 8 }}>
                    击杀列表:
                  </Text>
                  <div style={{ 
                    background: 'rgba(0, 0, 0, 0.2)', 
                    padding: '8px 12px', 
                    borderRadius: 4,
                    maxHeight: 200,
                    overflowY: 'auto'
                  }}>
                    {life.kills.map((kill, idx) => (
                      <div key={idx} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '4px 0',
                        borderBottom: idx < life.kills.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'
                      }}>
                        <PlayerNameWithJob name={kill.name} guild={kill.guild} />
                        <Tag color="gold" style={{ fontSize: '12px' }}>+{kill.points}</Tag>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {life.killedBy ? (
                <div>
                  <Text strong style={{ color: 'rgba(255, 255, 255, 0.85)', display: 'block', marginBottom: 8 }}>
                    被击杀:
                  </Text>
                  <div style={{ 
                    background: 'rgba(255, 77, 79, 0.1)', 
                    padding: '8px 12px', 
                    borderRadius: 4
                  }}>
                    <PlayerNameWithJob name={life.killedBy.name} guild={life.killedBy.guild} />
                  </div>
                </div>
              ) : (
                <div>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontStyle: 'italic' }}>
                    战斗结束，未被击杀
                  </Text>
                </div>
              )}

              <div style={{ marginTop: 12, fontSize: 12, color: 'rgba(255, 255, 255, 0.5)' }}>
                <Text>{life.startTime} - {life.endTime}</Text>
              </div>
            </div>
          </List.Item>
        )}
      />
    </Drawer>
  );
};

const GuildLogo = ({ name, size = 'default' }: { name: string; size?: 'small' | 'default' | 'large' }) => {
  const colorHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c;
  };

  return (
    <span className="guild-logo">
      <Avatar 
        shape="square" 
        size={size} 
        style={{ backgroundColor: colorHash(name) }}
      >
        {name.substring(0, 2)}
      </Avatar>
    </span>
  );
};

export const SiegeDashboard: React.FC<Props> = ({ data }) => {
  const { guildStats, playerStats, entries, timeSeries } = data;
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const guildData = useMemo(() => {
    return Object.values(guildStats).sort((a, b) => b.score - a.score);
  }, [guildStats]);

  const playerData = useMemo(() => {
    return Object.values(playerStats).sort((a, b) => b.score - a.score);
  }, [playerStats]);

  // 计算选中玩家的生命详情
  const selectedPlayerLives = useMemo(() => {
    if (!selectedPlayer) return [];
    return calculatePlayerLives(selectedPlayer, entries);
  }, [selectedPlayer, entries]);

  const selectedPlayerStats = useMemo(() => {
    if (!selectedPlayer) return null;
    return playerStats[selectedPlayer] || null;
  }, [selectedPlayer, playerStats]);

  // 处理玩家名称点击
  const handlePlayerClick = (playerName: string) => {
    setSelectedPlayer(playerName);
    setDrawerVisible(true);
  };

  // Time Series Chart Option
  const timeSeriesOption = useMemo(() => {
    const series = guildData.map(guild => ({
      name: guild.name,
      type: 'line',
      showSymbol: false,
      smooth: true,
      data: timeSeries.map(point => point.scores[guild.name] || 0)
    }));

    return {
      title: { 
        text: '工会积分走势',
        left: 'center',
        textStyle: { color: 'rgba(255, 255, 255, 0.85)' }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(34, 38, 56, 0.95)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        textStyle: { color: 'rgba(255, 255, 255, 0.85)' }
      },
      legend: {
        data: guildData.map(g => g.name),
        bottom: 10,
        textStyle: { color: 'rgba(255, 255, 255, 0.85)' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: timeSeries.map(point => point.time),
        axisLabel: { color: 'rgba(255, 255, 255, 0.65)' },
        axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: 'rgba(255, 255, 255, 0.65)' },
        axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
        splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)' } }
      },
      series
    };
  }, [guildData, timeSeries]);

  const FocusPopoverContent = ({ 
    guild, 
    type 
  }: { 
    guild: GuildStats; 
    type: 'kills' | 'deaths' 
  }) => {
    const sortedInteractions = useMemo(() => {
      return Object.entries(guild.interactions)
        .map(([otherGuild, stats]) => ({
          guild: otherGuild,
          count: type === 'kills' ? stats.kills : stats.deaths
        }))
        .filter(item => item.count > 0)
        .sort((a, b) => b.count - a.count);
    }, [guild.interactions, type]);

    if (sortedInteractions.length === 0) {
      return <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }

    return (
      <div className="focus-popover">
        <div className="focus-list-header">
          {type === 'kills' ? '击杀' : '被击杀'} 列表（按数量排序）
        </div>
        <div className="focus-list">
          {sortedInteractions.map((item) => (
            <div key={item.guild} className="focus-list-item">
              <div className="focus-guild-name">
                <GuildLogo name={item.guild} size="small" />
                <span>{item.guild}</span>
              </div>
              <span className="focus-count">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const guildColumns: ColumnsType<GuildStats> = [
    { 
      title: '排名', 
      key: 'rank', 
      render: (_, __, index) => (
        <span style={{ fontWeight: 600, color: index < 3 ? 'rgba(255, 217, 77, 0.9)' : 'rgba(255, 255, 255, 0.85)' }}>
          #{index + 1}
        </span>
      ), 
      width: 70, 
      align: 'center',
      fixed: 'left' as const
    },
    { 
      title: '工会', 
      key: 'name', 
      width: 150,
      render: (_, record) => (
        <span style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
          <GuildLogo name={record.name} size="small" />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{record.name}</span>
        </span>
      )
    },
    { 
      title: '积分', 
      dataIndex: 'score', 
      key: 'score', 
      width: 100,
      sorter: (a, b) => a.score - b.score, 
      defaultSortOrder: 'descend', 
      align: 'center',
      render: (score) => <span style={{ fontWeight: 600 }}>{score}</span>
    },
    { 
      title: '击杀', 
      dataIndex: 'kills', 
      key: 'kills', 
      width: 80,
      sorter: (a, b) => a.kills - b.kills, 
      align: 'center' 
    },
    { 
      title: '死亡', 
      dataIndex: 'deaths', 
      key: 'deaths', 
      width: 80,
      sorter: (a, b) => a.deaths - b.deaths, 
      align: 'center' 
    },
    { 
      title: 'Focus', 
      key: 'focus',
      width: 220,
      render: (_, record) => {
        const killsList = Object.entries(record.interactions)
          .map(([guild, stats]) => ({ guild, count: stats.kills }))
          .filter(item => item.count > 0)
          .sort((a, b) => b.count - a.count);
        
        const deathsList = Object.entries(record.interactions)
          .map(([guild, stats]) => ({ guild, count: stats.deaths }))
          .filter(item => item.count > 0)
          .sort((a, b) => b.count - a.count);

        const maxKills = killsList[0]?.count || 0;
        const maxDeaths = deathsList[0]?.count || 0;

        return (
          <div className="focus-cell">
            <div className="focus-icons">
              {maxKills > 0 && (
                <Popover
                  title={`击杀统计 (共 ${killsList.length} 个工会)`}
                  content={<FocusPopoverContent guild={record} type="kills" />}
                  placement="left"
                  trigger="hover"
                >
                  <div className="focus-icon-item">
                    <AimOutlined className="icon-kill" />
                    <span className="icon-count">{maxKills}</span>
                  </div>
                </Popover>
              )}
              {maxDeaths > 0 && (
                <Popover
                  title={`被击杀统计 (共 ${deathsList.length} 个工会)`}
                  content={<FocusPopoverContent guild={record} type="deaths" />}
                  placement="left"
                  trigger="hover"
                >
                  <div className="focus-icon-item">
                    <StopOutlined className="icon-death" />
                    <span className="icon-count">{maxDeaths}</span>
                  </div>
                </Popover>
              )}
            </div>
          </div>
        );
      }
    },
    { 
      title: '玩家数', 
      key: 'members', 
      width: 90,
      render: (_, record) => record.members.size, 
      align: 'center' 
    }
  ];

  const playerColumns: ColumnsType<PlayerStats> = [
    { 
      title: '排名', 
      key: 'rank', 
      render: (_, __, index) => (
        <span style={{ fontWeight: 600, color: index < 3 ? 'rgba(255, 217, 77, 0.9)' : 'rgba(255, 255, 255, 0.85)' }}>
          #{index + 1}
        </span>
      ), 
      width: 70, 
      align: 'center',
      fixed: 'left' as const
    },
    { 
      title: '玩家', 
      dataIndex: 'name', 
      key: 'name', 
      width: 200,
      fixed: 'left' as const,
      render: (name) => {
        const jobInfo = getPlayerJob(name);
        const iconUrl = jobInfo ? jobInfo.icon : UNKNOWN_JOB_ICON;
        const jobName = jobInfo ? jobInfo.name : '未知';
        
        return (
          <span 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              color: 'rgba(255, 217, 77, 0.9)'
            }}
            onClick={() => handlePlayerClick(name)}
            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
            <Tooltip title={jobName}>
              <img 
                src={iconUrl} 
                alt={jobName}
                style={{ 
                  width: 24, 
                  height: 24, 
                  marginRight: 8, 
                  flexShrink: 0,
                  objectFit: 'contain',
                  imageRendering: 'crisp-edges'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== UNKNOWN_JOB_ICON) {
                    target.src = UNKNOWN_JOB_ICON;
                  }
                }}
              />
            </Tooltip>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
          </span>
        );
      }
    },
    { 
      title: '工会', 
      dataIndex: 'guild', 
      key: 'guild',
      width: 150,
      render: (guild) => (
        <span style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
          <GuildLogo name={guild} size="small" />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{guild}</span>
        </span>
      )
    },
    { 
      title: '积分', 
      dataIndex: 'score', 
      key: 'score', 
      width: 100,
      sorter: (a, b) => a.score - b.score, 
      defaultSortOrder: 'descend', 
      align: 'center',
      render: (score) => <span style={{ fontWeight: 600 }}>{score}</span>
    },
    { 
      title: '击杀', 
      dataIndex: 'kills', 
      key: 'kills', 
      width: 80,
      sorter: (a, b) => a.kills - b.kills, 
      align: 'center' 
    },
    { 
      title: '死亡', 
      dataIndex: 'deaths', 
      key: 'deaths', 
      width: 80,
      sorter: (a, b) => a.deaths - b.deaths, 
      align: 'center' 
    },
    { 
      title: 'K/D', 
      key: 'kd', 
      width: 80,
      render: (_, record) => {
        const kd = record.kills / (record.deaths || 1);
        return (
          <span style={{ 
            fontWeight: 600,
            color: kd >= 2 ? 'rgba(82, 196, 26, 0.9)' : kd >= 1 ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 77, 79, 0.9)'
          }}>
            {kd.toFixed(2)}
          </span>
        );
      }, 
      align: 'center' 
    },
    { 
      title: '等级', 
      dataIndex: 'grade', 
      key: 'grade', 
      width: 80,
      align: 'center' 
    },
  ];

  const logColumns: ColumnsType<SiegeLogEntry> = [
    { 
      title: '时间', 
      dataIndex: 'timestamp', 
      key: 'timestamp', 
      width: 90,
      fixed: 'left' as const
    },
    { 
      title: '攻击方', 
      key: 'attacker', 
      width: 320,
      render: (_, record) => {
        const attackerJob = getPlayerJob(record.attackerName);
        const attackerIconUrl = attackerJob ? attackerJob.icon : UNKNOWN_JOB_ICON;
        const attackerJobName = attackerJob ? attackerJob.name : '未知';
        
        return (
          <span style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
            <Tag color="red" style={{ marginRight: 6, flexShrink: 0 }}>{record.attackerGuild}</Tag>
            <Tooltip title={attackerJobName}>
              <img 
                src={attackerIconUrl} 
                alt={attackerJobName}
                style={{ 
                  width: 20, 
                  height: 20, 
                  marginRight: 4, 
                  flexShrink: 0,
                  objectFit: 'contain',
                  imageRendering: 'crisp-edges'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== UNKNOWN_JOB_ICON) {
                    target.src = UNKNOWN_JOB_ICON;
                  }
                }}
              />
            </Tooltip>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: 6 }}>{record.attackerName}</span>
            <Tag style={{ flexShrink: 0 }}>{record.attackerGrade}</Tag>
          </span>
        );
      }
    },
    { 
      title: '目标', 
      key: 'target', 
      width: 320,
      render: (_, record) => {
        const targetJob = getPlayerJob(record.targetName);
        const targetIconUrl = targetJob ? targetJob.icon : UNKNOWN_JOB_ICON;
        const targetJobName = targetJob ? targetJob.name : '未知';
        
        return (
          <span style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
            <Tag color="blue" style={{ marginRight: 6, flexShrink: 0 }}>{record.targetGuild}</Tag>
            <Tooltip title={targetJobName}>
              <img 
                src={targetIconUrl} 
                alt={targetJobName}
                style={{ 
                  width: 20, 
                  height: 20, 
                  marginRight: 4, 
                  flexShrink: 0,
                  objectFit: 'contain',
                  imageRendering: 'crisp-edges'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== UNKNOWN_JOB_ICON) {
                    target.src = UNKNOWN_JOB_ICON;
                  }
                }}
              />
            </Tooltip>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{record.targetName}</span>
          </span>
        );
      } 
    },
    { 
      title: '得分', 
      key: 'points', 
      width: 250,
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
          <Tag color="gold" style={{ flexShrink: 0 }}>+{record.points}</Tag>
          {record.bonuses.map((bonus, idx) => (
            <Tag key={idx} bordered={false} style={{ fontSize: '11px', flexShrink: 0 }}>
              {bonus}
            </Tag>
          ))}
        </div>
      )
    },
  ];

  return (
    <div className="siege-dashboard">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card 
            className="guild-stats-card"
            title="工会战况" 
            bordered={false}
          >
            {/* 上下结构：图表在上，表格在下 */}
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <div className="guild-chart-container">
                  <ReactECharts 
                    option={timeSeriesOption} 
                    style={{ height: 400, width: '100%' }}
                    opts={{ renderer: 'canvas' }}
                  />
                </div>
              </Col>
              <Col span={24}>
                <div className="guild-table-container">
                  <Table 
                    dataSource={guildData} 
                    columns={guildColumns} 
                    rowKey="name" 
                    pagination={false}
                    size="small"
                    scroll={{ x: 900 }}
                  />
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1" style={{ marginTop: 20 }} type="card">
        <Tabs.TabPane tab="玩家数据" key="1">
          <Card>
            <Table 
              dataSource={playerData} 
              columns={playerColumns} 
              rowKey="name" 
              scroll={{ x: 1000, y: 600 }}
              pagination={{ pageSize: 50, showSizeChanger: true }}
              size="middle"
            />
          </Card>
        </Tabs.TabPane>
        <Tabs.TabPane tab="详细日志" key="2">
          <Card>
            <Table 
              dataSource={entries} 
              columns={logColumns} 
              rowKey="id" 
              pagination={{ pageSize: 50, showSizeChanger: true }}
              size="small"
              scroll={{ x: 1000, y: 600 }}
            />
          </Card>
        </Tabs.TabPane>
      </Tabs>

      {/* 玩家生命详情抽屉 */}
      <PlayerLifeDrawer
        playerName={selectedPlayer || ''}
        playerStats={selectedPlayerStats}
        lives={selectedPlayerLives}
        visible={drawerVisible}
        onClose={() => {
          setDrawerVisible(false);
          setSelectedPlayer(null);
        }}
      />
    </div>
  );
};
