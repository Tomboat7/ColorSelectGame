
import { RGBColor } from '../types';
import { HTML_COLORS, ColorName } from '../data/colorNames';

export const generateRandomColor = (): string => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

export const getRandomColorName = (): ColorName => {
  const randomIndex = Math.floor(Math.random() * HTML_COLORS.length);
  return HTML_COLORS[randomIndex];
};

export const getRandomColorChoices = (correctColor: ColorName, count: number = 4): ColorName[] => {
  const choices = [correctColor];
  const availableColors = HTML_COLORS.filter(c => c.name !== correctColor.name);

  while (choices.length < count && availableColors.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    choices.push(availableColors[randomIndex]);
    availableColors.splice(randomIndex, 1);
  }

  // Shuffle the choices
  return choices.sort(() => Math.random() - 0.5);
};

export const hexToRgb = (hex: string): RGBColor | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).padStart(6, '0');
};

const calculateColorDifference = (color1: RGBColor, color2: RGBColor): number => {
  const diff = Math.sqrt(
    Math.pow(color1.r - color2.r, 2) +
    Math.pow(color1.g - color2.g, 2) +
    Math.pow(color1.b - color2.b, 2)
  );
  return diff;
};

export const calculateScoreFromHex = (hex1: string, hex2: string): number => {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  if (!rgb1 || !rgb2) {
    return 0;
  }

  const difference = calculateColorDifference(rgb1, rgb2);
  const maxDifference = Math.sqrt(3 * Math.pow(255, 2)); // Approx 441.67
  const percentageOff = (difference / maxDifference) * 100;
  const score = 100 - percentageOff;

  return Math.max(0, Math.round(score));
};
