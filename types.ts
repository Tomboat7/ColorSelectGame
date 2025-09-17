
export enum GameState {
  Start = 'START',
  Playing = 'PLAYING',
  Result = 'RESULT',
}

export enum Difficulty {
  Easy = 'EASY',
  Normal = 'NORMAL',
  Hard = 'HARD',
}

export enum Mode {
  Picker = 'PICKER',
  Extra = 'EXTRA',
}

export type RGBColor = {
  r: number;
  g: number;
  b: number;
};
