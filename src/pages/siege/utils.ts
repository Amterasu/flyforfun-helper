import { SiegeLogEntry, SiegeAnalysis, PlayerStats, GuildStats, TimeSeriesPoint } from './types';

export const parseSiegeLog = (text: string): SiegeAnalysis => {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const entries: SiegeLogEntry[] = [];
  
  // Regex for the attack line
  // Example: [21:20:13] [Kung Fu Panda] 无影(2 grade) → Attack [Horizon] 幸运带学学
  const attackRegex = /^\[(\d{2}:\d{2}:\d{2})\] \[([^\]]+)\] (.+)\((\d+) grade\) → Attack \[([^\]]+)\] (.+)$/;
  
  // Regex for the points line
  // Example: < Basic Point +2, Defender Bonus +1 >
  const pointsRegex = /^< (.+) >$/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const attackMatch = line.match(attackRegex);
    
    if (attackMatch) {
      const timestamp = attackMatch[1];
      const attackerGuild = attackMatch[2];
      const attackerName = attackMatch[3];
      const attackerGrade = parseInt(attackMatch[4], 10);
      const targetGuild = attackMatch[5];
      const targetName = attackMatch[6];
      
      let points = 0;
      let bonuses: string[] = [];
      const rawLines = [line];

      // Look ahead for points line
      if (i + 1 < lines.length) {
        const nextLine = lines[i+1];
        const pointsMatch = nextLine.match(pointsRegex);
        if (pointsMatch) {
          rawLines.push(nextLine);
          const pointsContent = pointsMatch[1];
          // Split by comma
          const parts = pointsContent.split(',').map(s => s.trim());
          
          parts.forEach(part => {
             // Extract number from "Basic Point +2" or "Defender Bonus +1"
             const scoreMatch = part.match(/([+-]?\d+)$/);
             if (scoreMatch) {
               points += parseInt(scoreMatch[1], 10);
             }
             bonuses.push(part);
          });
          
          // Skip next line in loop
          i++; 
        }
      }

      entries.push({
        id: entries.length,
        timestamp,
        attackerGuild,
        attackerName,
        attackerGrade,
        targetGuild,
        targetName,
        points,
        bonuses,
        raw: rawLines
      });
    }
  }

  return analyzeSiege(entries);
};

const analyzeSiege = (entries: SiegeLogEntry[]): SiegeAnalysis => {
  const guildStats: Record<string, GuildStats> = {};
  const playerStats: Record<string, PlayerStats> = {};
  const timeSeries: TimeSeriesPoint[] = [];
  let totalScore = 0;
  const accumulatedScores: Record<string, number> = {};

  if (entries.length === 0) {
      return {
          entries: [],
          guildStats: {},
          playerStats: {},
          timeSeries: [],
          totalScore: 0,
          startTime: '',
          endTime: ''
      };
  }

  entries.forEach(entry => {
    totalScore += entry.points;

    // --- Guild Stats ---
    
    // Attacker
    if (!guildStats[entry.attackerGuild]) {
      guildStats[entry.attackerGuild] = {
        name: entry.attackerGuild,
        score: 0,
        kills: 0,
        deaths: 0,
        members: new Set(),
        interactions: {}
      };
      accumulatedScores[entry.attackerGuild] = 0;
    }
    guildStats[entry.attackerGuild].score += entry.points;
    guildStats[entry.attackerGuild].kills += 1;
    guildStats[entry.attackerGuild].members.add(entry.attackerName);
    
    // Interaction: Attacker killed Target
    if (!guildStats[entry.attackerGuild].interactions[entry.targetGuild]) {
        guildStats[entry.attackerGuild].interactions[entry.targetGuild] = { kills: 0, deaths: 0 };
    }
    guildStats[entry.attackerGuild].interactions[entry.targetGuild].kills += 1;


    // Target
    if (!guildStats[entry.targetGuild]) {
      guildStats[entry.targetGuild] = {
        name: entry.targetGuild,
        score: 0,
        kills: 0,
        deaths: 0,
        members: new Set(),
        interactions: {}
      };
      accumulatedScores[entry.targetGuild] = 0;
    }
    guildStats[entry.targetGuild].deaths += 1;
    guildStats[entry.targetGuild].members.add(entry.targetName);

    // Interaction: Target was killed by Attacker
    if (!guildStats[entry.targetGuild].interactions[entry.attackerGuild]) {
        guildStats[entry.targetGuild].interactions[entry.attackerGuild] = { kills: 0, deaths: 0 };
    }
    guildStats[entry.targetGuild].interactions[entry.attackerGuild].deaths += 1;


    // --- Player Stats ---
    
    // Attacker
    if (!playerStats[entry.attackerName]) {
      playerStats[entry.attackerName] = {
        name: entry.attackerName,
        guild: entry.attackerGuild,
        kills: 0,
        deaths: 0,
        score: 0,
        grade: entry.attackerGrade
      };
    } else {
        playerStats[entry.attackerName].grade = entry.attackerGrade;
    }
    playerStats[entry.attackerName].kills += 1;
    playerStats[entry.attackerName].score += entry.points;

    // Target
    if (!playerStats[entry.targetName]) {
      playerStats[entry.targetName] = {
        name: entry.targetName,
        guild: entry.targetGuild,
        kills: 0,
        deaths: 0,
        score: 0,
        grade: 0 
      };
    }
    playerStats[entry.targetName].deaths += 1;

    // --- Time Series ---
    accumulatedScores[entry.attackerGuild] = guildStats[entry.attackerGuild].score;
    
    // Add point every entry? Or throttle? 
    // Given ~2600 entries, plotting every single one is fine for ECharts.
    // But for cleaner X-axis, maybe just push.
    
    timeSeries.push({
        time: entry.timestamp,
        timestamp: parseTime(entry.timestamp),
        scores: { ...accumulatedScores } 
    });

  });

  return {
    entries,
    guildStats,
    playerStats,
    timeSeries,
    totalScore,
    startTime: entries[0]?.timestamp || '',
    endTime: entries[entries.length - 1]?.timestamp || ''
  };
};

function parseTime(timeStr: string): number {
    const [h, m, s] = timeStr.split(':').map(Number);
    return h * 3600 + m * 60 + s;
}
