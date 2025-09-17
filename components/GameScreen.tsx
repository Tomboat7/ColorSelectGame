
import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty, Mode } from '../types';
import { DIFFICULTY_SETTINGS } from '../constants';
import ColorInput from './ColorInput';

interface GameScreenProps {
  difficulty: Difficulty;
  mode: Mode;
  targetColor: string;
  onGuess: (guess: string) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ difficulty, mode, targetColor, onGuess }) => {
  const [showTarget, setShowTarget] = useState(true);
  const [guess, setGuess] = useState('#808080'); // Start with grey
  const { duration } = DIFFICULTY_SETTINGS[difficulty];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTarget(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);
  
  const handleGuessSubmit = useCallback(() => {
    onGuess(guess);
  }, [guess, onGuess]);


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
