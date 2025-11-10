
import React, { useState, useCallback } from 'react';
import { GameState, Difficulty, Mode } from './types';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import { generateRandomColor, calculateScoreFromHex, getRandomColorName, getRandomColorChoices } from './utils/colorUtils';
import { ColorName } from './data/colorNames';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [gameSettings, setGameSettings] = useState<{ difficulty: Difficulty; mode: Mode } | null>(null);
  const [targetColor, setTargetColor] = useState<string>('');
  const [guessedColor, setGuessedColor] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [targetColorName, setTargetColorName] = useState<ColorName | null>(null);
  const [colorChoices, setColorChoices] = useState<ColorName[]>([]);
  const [guessedColorName, setGuessedColorName] = useState<string>('');

  const handleStartGame = useCallback((difficulty: Difficulty, mode: Mode) => {
    setGameSettings({ difficulty, mode });

    if (mode === Mode.ColorNameToColor) {
      const randomColorName = getRandomColorName();
      setTargetColorName(randomColorName);
      setTargetColor(randomColorName.hex);
    } else if (mode === Mode.ColorToColorName) {
      const randomColorName = getRandomColorName();
      setTargetColorName(randomColorName);
      setTargetColor(randomColorName.hex);
      setColorChoices(getRandomColorChoices(randomColorName, 4));
    } else {
      setTargetColor(generateRandomColor());
      setTargetColorName(null);
      setColorChoices([]);
    }

    setGameState(GameState.Playing);
  }, []);

  const handleGuess = useCallback((guess: string) => {
    setGuessedColor(guess);
    const calculatedScore = calculateScoreFromHex(targetColor, guess);
    setScore(calculatedScore);
    setGameState(GameState.Result);
  }, [targetColor]);

  const handleColorNameGuess = useCallback((guessedName: string) => {
    setGuessedColorName(guessedName);
    const isCorrect = guessedName === targetColorName?.name;
    setScore(isCorrect ? 100 : 0);
    setGameState(GameState.Result);
  }, [targetColorName]);

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
              targetColorName={targetColorName}
              colorChoices={colorChoices}
              onGuess={handleGuess}
              onColorNameGuess={handleColorNameGuess}
            />
          );
        }
        return null;
      case GameState.Result:
        return (
          <ResultScreen
            mode={gameSettings?.mode || Mode.Picker}
            targetColor={targetColor}
            guessedColor={guessedColor}
            targetColorName={targetColorName}
            guessedColorName={guessedColorName}
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
