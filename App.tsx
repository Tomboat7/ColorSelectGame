
import React, { useState, useCallback } from 'react';
import { GameState, Difficulty, Mode } from './types';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import { generateRandomColor, calculateScoreFromHex } from './utils/colorUtils';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [gameSettings, setGameSettings] = useState<{ difficulty: Difficulty; mode: Mode } | null>(null);
  const [targetColor, setTargetColor] = useState<string>('');
  const [guessedColor, setGuessedColor] = useState<string>('');
  const [score, setScore] = useState<number>(0);

  const handleStartGame = useCallback((difficulty: Difficulty, mode: Mode) => {
    setGameSettings({ difficulty, mode });
    setTargetColor(generateRandomColor());
    setGameState(GameState.Playing);
  }, []);

  const handleGuess = useCallback((guess: string) => {
    setGuessedColor(guess);
    const calculatedScore = calculateScoreFromHex(targetColor, guess);
    setScore(calculatedScore);
    setGameState(GameState.Result);
  }, [targetColor]);

  const handlePlayAgain = useCallback(() => {
    setGameState(GameState.Start);
    setGameSettings(null);
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case GameState.Playing:
        if (gameSettings) {
          return (
            <GameScreen
              difficulty={gameSettings.difficulty}
              mode={gameSettings.mode}
              targetColor={targetColor}
              onGuess={handleGuess}
            />
          );
        }
        return null;
      case GameState.Result:
        return (
          <ResultScreen
            targetColor={targetColor}
            guessedColor={guessedColor}
            score={score}
            onPlayAgain={handlePlayAgain}
          />
        );
      case GameState.Start:
      default:
        return <StartScreen onStart={handleStartGame} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <main className="w-full max-w-2xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
