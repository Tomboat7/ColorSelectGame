
import { Difficulty } from './types';

export const DIFFICULTY_SETTINGS: { [key in Difficulty]: { duration: number; name: string } } = {
  [Difficulty.Easy]: { duration: 5000, name: 'イージー' },
  [Difficulty.Normal]: { duration: 3000, name: 'ノーマル' },
  [Difficulty.Hard]: { duration: 1500, name: 'ハード' },
};
