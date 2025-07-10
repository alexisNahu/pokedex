import { Stat } from "@models/dao";

export function mapToStatsDTO(stats: Stat[]) {
  return {
    hp: stats.find(s => s.stat.name === 'hp')?.base_stat ?? 0,
    attack: stats.find(s => s.stat.name === 'attack')?.base_stat ?? 0,
    defense: stats.find(s => s.stat.name === 'defense')?.base_stat ?? 0,
    sp_attack: stats.find(s => s.stat.name === 'special-attack')?.base_stat ?? 0,
    sp_defense: stats.find(s => s.stat.name === 'special-defense')?.base_stat ?? 0,
    speed: stats.find(s => s.stat.name === 'speed')?.base_stat ?? 0
  }
}