
import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty, Mode } from '../types';
import { DIFFICULTY_SETTINGS } from '../constants';
import ColorInput from './ColorInput';
import { ColorName } from '../data/colorNames';

interface GameScreenProps {
  difficulty: Difficulty;
  mode: Mode;
  targetColor: string;
  targetColorName: ColorName | null;
  colorChoices: ColorName[];
  onGuess: (guess: string) => void;
  onColorNameGuess: (guessedName: string) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({
  difficulty,
  mode,
  targetColor,
  targetColorName,
  colorChoices,
  onGuess,
  onColorNameGuess
}) => {
  const [showTarget, setShowTarget] = useState(true);
  const [guess, setGuess] = useState('#808080');
  const [selectedColorName, setSelectedColorName] = useState<string>('');
  const { duration } = DIFFICULTY_SETTINGS[difficulty];

  useEffect(() => {
    // For ColorNameToColor mode, we don't show/hide the target
    if (mode === Mode.ColorNameToColor) {
      setShowTarget(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowTarget(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, mode]);

  const handleGuessSubmit = useCallback(() => {
    onGuess(guess);
  }, [guess, onGuess]);

  const handleColorNameSelect = useCallback((colorName: string) => {
    setSelectedColorName(colorName);
    onColorNameGuess(colorName);
  }, [onColorNameGuess]);


  if (showTarget) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 animate-fade-in">
        <h2 className="text-2xl text-gray-300">この色を覚えてください...</h2>
        <div
          className="w-64 h-64 md:w-80 md:h-80 rounded-2xl shadow-2xl border-4 border-gray-700"
          style={{ backgroundColor: targetColor }}
        ></div>
         <div className="w-64 md:w-80 h-4 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-progress" style={{animationDuration: `${duration}ms`}}></div>
        </div>
        <style>{`
            @keyframes progress {
                from { width: 100%; }
                to { width: 0%; }
            }
            .animate-progress {
                animation: progress linear forwards;
            }
        `}</style>
      </div>
    );
  }

  // ColorNameToColor mode: Show color name, user picks color
  if (mode === Mode.ColorNameToColor) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-200">この色名の色を選んでください</h2>
        <div className="bg-gray-800 px-8 py-6 rounded-2xl border-2 border-purple-500">
          <p className="text-4xl font-bold text-purple-400">{targetColorName?.name}</p>
        </div>
        <div className="flex flex-col items-center gap-8">
          <div className="relative">
            <div className="w-48 h-48 rounded-full shadow-lg" style={{backgroundColor: guess}}></div>
            <input
              type="color"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
        <button
          onClick={handleGuessSubmit}
          className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-12 rounded-lg text-xl transition-transform transform hover:scale-105 duration-300 shadow-lg"
        >
          決定
        </button>
      </div>
    );
  }

  // ColorToColorName mode: Show color, user picks name
  if (mode === Mode.ColorToColorName && !showTarget) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-200">この色の名前を選んでください</h2>
        <div
          className="w-64 h-64 md:w-80 md:h-80 rounded-2xl shadow-2xl border-4 border-gray-700"
          style={{ backgroundColor: targetColor }}
        ></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
          {colorChoices.map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorNameSelect(color.name)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-6 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300 shadow-lg"
            >
              {color.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6 animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-200">色を選んでください！</h2>
      <div className="flex flex-col md:flex-row items-center gap-8">
        {mode === Mode.Picker ? (
          <div className="relative">
            <div className="w-48 h-48 rounded-full shadow-lg" style={{backgroundColor: guess}}></div>
            <input
              type="color"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        ) : (
          <ColorInput value={guess} onChange={setGuess} />
        )}
      </div>
      <button
        onClick={handleGuessSubmit}
        className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-12 rounded-lg text-xl transition-transform transform hover:scale-105 duration-300 shadow-lg"
      >
        決定
      </button>
    </div>
  );
};

export default GameScreen;
