
import React from 'react';
import { Difficulty, Mode } from '../types';
import { DIFFICULTY_SETTINGS } from '../constants';

interface StartScreenProps {
  onStart: (difficulty: Difficulty, mode: Mode) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center bg-gray-800 p-8 rounded-2xl shadow-2xl animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
        色彩感覚チャレンジ
      </h1>
      <p className="text-gray-400 mb-8">記憶を頼りに色を再現しよう！</p>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-200">難易度選択</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(Object.keys(DIFFICULTY_SETTINGS) as Difficulty[]).map((diff) => (
              <button
                key={diff}
                onClick={() => onStart(diff, Mode.Picker)}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-6 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300 shadow-lg"
              >
                {DIFFICULTY_SETTINGS[diff].name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-200">その他のモード</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => onStart(Difficulty.Normal, Mode.Extra)}
              className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-4 px-6 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300 shadow-lg"
            >
              RGB / HEX入力
            </button>
            <button
              onClick={() => onStart(Difficulty.Normal, Mode.ColorNameToColor)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-6 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300 shadow-lg"
            >
              色名→色を選択
            </button>
            <button
              onClick={() => onStart(Difficulty.Normal, Mode.ColorToColorName)}
              className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 px-6 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300 shadow-lg md:col-span-2"
            >
              色→色名を選択
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
