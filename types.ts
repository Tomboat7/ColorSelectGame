
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
  ColorNameToColor = 'COLOR_NAME_TO_COLOR',
  ColorToColorName = 'COLOR_TO_COLOR_NAME',
}

export type RGBColor = {
  r: number;
  g: number;
  b: number;
};
