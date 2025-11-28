export interface SiegeLogEntry {
  id: number;
  timestamp: string;
  attackerGuild: string;
  attackerName: string;
  attackerGrade: number;
  targetGuild: string;
  targetName: string;
  points: number;
  bonuses: string[];
  raw: string[];
}

export interface PlayerStats {
  name: string;
  guild: string;
  kills: number;
  deaths: number;
  score: number;
  grade: number; // Last seen grade
}

export interface GuildInteraction {
    kills: number;
    deaths: number;
}

export interface GuildStats {
  name: string;
  score: number;
  kills: number;
  deaths: number;
  members: Set<string>;
  // Interactions with other guilds: Key = Guild Name
  interactions: Record<string, GuildInteraction>;
}

export interface TimeSeriesPoint {
    time: string; // HH:mm or HH:mm:ss
    timestamp: number; // relative seconds or absolute
    scores: Record<string, number>; // Guild -> Cumulative Score
}

export interface SiegeAnalysis {
  entries: SiegeLogEntry[];
  guildStats: Record<string, GuildStats>;
  playerStats: Record<string, PlayerStats>;
  timeSeries: TimeSeriesPoint[];
  totalScore: number;
  startTime: string;
  endTime: string;
}
