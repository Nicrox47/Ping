export type Clue = {
  id: number;
  text: string;
  unlockCost: number;
};

export const CLUES: Clue[] = [
  { id: 0, text: 'La persona que buscas tiene un interés en común contigo.', unlockCost: 0 },
  { id: 1, text: 'Fíjate en las actividades que más disfruta.', unlockCost: 15 },
  { id: 2, text: 'Busca a alguien que encaje con la descripción de su perfil.', unlockCost: 25 },
  { id: 3, text: 'Pregunta con respeto si participa en la búsqueda de Ping.', unlockCost: 40 },
];

export const BASE_REWARD = 100;
export const MIN_REWARD = 25;
export const REWARD_PER_EXTRA_CLUE = 25;

export function getReward(unlockedExtraClues: number): number {
  return Math.max(MIN_REWARD, BASE_REWARD - unlockedExtraClues * REWARD_PER_EXTRA_CLUE);
}

export function formatPoints(points: number): string {
  return `${points} puntos`;
}
