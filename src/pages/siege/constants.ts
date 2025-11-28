import jobData from './job.json';

// 扁平化 job.json 数据
const flattenJobData = (data: Array<Array<{ name: string; job: string }>>): Record<string, string> => {
  const map: Record<string, string> = {};
  data.forEach(guild => {
    guild.forEach(player => {
      map[player.name] = player.job;
    });
  });
  return map;
};

// 玩家名称到职业的映射
export const PLAYER_JOB_MAP: Record<string, string> = flattenJobData(jobData as Array<Array<{ name: string; job: string }>>);

// 职业图标基础路径
const JOB_ICON_BASE = 'https://flyforfun.oss-cn-beijing.aliyuncs.com/static_img/job/';

// 职业信息映射（职业名称到显示名称和图标）
export const JOB_INFO: Record<string, { name: string; icon: string }> = {};

// 从 job.json 中提取所有唯一的职业名称，并动态生成图标路径
const uniqueJobs = new Set<string>();
Object.values(PLAYER_JOB_MAP).forEach(job => {
  if (job) {
    uniqueJobs.add(job);
  }
});

uniqueJobs.forEach(job => {
  JOB_INFO[job] = {
    name: job,
    icon: `${JOB_ICON_BASE}${job}.png`
  };
});

// 未知职业图标
export const UNKNOWN_JOB_ICON = `${JOB_ICON_BASE}Unknown.png`;

// 获取职业信息（如果不存在则返回未知）
export const getJobInfo = (jobName: string): { name: string; icon: string } => {
  if (jobName && JOB_INFO[jobName]) {
    return JOB_INFO[jobName];
  }
  return { name: jobName || '未知', icon: UNKNOWN_JOB_ICON };
};

// 根据玩家名称获取职业信息
export const getPlayerJob = (playerName: string): { name: string; icon: string } | null => {
  const jobName = PLAYER_JOB_MAP[playerName];
  if (!jobName) {
    return null;
  }
  return getJobInfo(jobName);
};

// 兼容旧的常量名称
export const PLAYER_CLASS_MAP = PLAYER_JOB_MAP;
export const CLASS_INFO = JOB_INFO;
