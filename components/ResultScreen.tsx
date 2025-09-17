
import React from 'react';
import { hexToRgb } from '../utils/colorUtils';

interface ResultScreenProps {
  targetColor: string;
  guessedColor: string;
  score: number;
  onPlayAgain: () => void;
}

const getResultMessage = (score: number) => {
  if (score >= 98) return "パーフェクト！";
  if (score >= 90) return "素晴らしい！";
  if (score >= 75) return "良い感じです！";
  if (score >= 50) return "惜しい！";
  return "もう一度挑戦！";
};

const ColorDisplay: React.FC<{ title: string; color: string }> = ({ title, color }) => {
  const rgb = hexToRgb(color);
  return (
    <div className="text-center">
      <p className="text-lg font-semibold text-gray-300 mb-2">{title}</p>
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl shadow-lg border-2 border-gray-600" style={{ backgroundColor: color }}></div>
      <p className="mt-2 font-mono text-gray-400">{color.toUpperCase()}</p>
      {rgb && <p className="font-mono text-xs text-gray-500">{`R:${rgb.r} G:${rgb.g} B:${rgb.b}`}</p>}
    </div>
  );
};

const ResultScreen: React.FC<ResultScreenProps> = ({ targetColor, guessedColor, score, onPlayAgain }) => {
  const resultMessage = getResultMessage(score);
  const scoreColor = score >= 90 ? 'text-green-400' : score >= 75 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="text-center bg-gray-800 p-8 rounded-2xl shadow-2xl animate-fade-in w-full">
      <h2 className="text-4xl font-bold mb-2">{resultMessage}</h2>
      <p className="text-6xl font-bold my-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
        スコア: <span className={scoreColor}>{score}</span>
      </p>

      <div className="flex justify-center items-start gap-6 md:gap-12 my-8">
        <ColorDisplay title="正解の色" color={targetColor} />
        <ColorDisplay title="あなたの色" color={guessedColor} />
      </div>

      <button
        onClick={onPlayAgain}
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-12 rounded-lg text-xl transition-transform transform hover:scale-105 duration-300 shadow-lg"
      >
        もう一度プレイ
      </button>
    </div>
  );
};

export default ResultScreen;
