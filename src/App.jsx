import "./App.css";
import { useState, useEffect, useCallback } from "react";
import LetterGrid from "./components/LetterGrid.jsx";
import KeyPad from "./components/KeyPad.jsx";
import GameStatus from "./components/GameStatus.jsx";
import fiveLetterWords from "./utils/fiveLetterWords.js";
import { Wordle, GREEN, YELLOW, BLACK } from "./utils/index.js";

const App = () => {
  const [targetWord, setTargetWord] = useState(() =>
    fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)]
  );
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [result, setResult] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(200);
  const [difficulty, setDifficulty] = useState("medium");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hintUsed, setHintUsed] = useState(0);
  const [streak, setStreak] = useState(0);
  const [hintLetters, setHintLetters] = useState([]);

  const wordle = new Wordle(targetWord);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("wordleState"));
    if (savedState) {
      setTargetWord(savedState.targetWord);
      setGuesses(savedState.guesses);
      setCurrentGuess(savedState.currentGuess);
      setIsGameOver(savedState.isGameOver);
      setResult(savedState.result);
      setTimeRemaining(savedState.timeRemaining);
      setStreak(savedState.streak);
      setDifficulty(savedState.difficulty);
      setIsDarkMode(savedState.isDarkMode || false); // Default to false if no value is found
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wordleState", JSON.stringify({
      targetWord, guesses, currentGuess, isGameOver, result, timeRemaining, streak, difficulty, isDarkMode
    }));
  }, [targetWord, guesses, currentGuess, isGameOver, result, timeRemaining, streak, difficulty, isDarkMode]);

  useEffect(() => {
    const difficultySettings = {
      hard: { time: 100, hints: 2 },
      medium: { time: 200, hints: 4 },
      easy: { time: 300, hints: 6 },
    };
    const settings = difficultySettings[difficulty] || difficultySettings.medium;
    setTimeRemaining(settings.time);
    setHintUsed(settings.hints);
    setHintLetters([]);
  }, [difficulty]);

  useEffect(() => {
    if (timeRemaining > 0 && !isGameOver) {
      const timer = setInterval(() => setTimeRemaining((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeRemaining === 0 || isGameOver) {
      setIsGameOver(true);
      if (timeRemaining === 0) {
        setResult("Time's up! You lost.");
      }
    }
  }, [timeRemaining, isGameOver]);

  const handleKeyPress = useCallback((key) => {
    if (key === "ENTER") {
      handleGuessSubmit(currentGuess);
    } else if (key === "⌫") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key);
    }
  }, [currentGuess]);

  const handleGuessSubmit = useCallback((guess) => {
    if (guess.length !== 5) {
      alert("Your guess must be 5 letters long!");
      return;
    }

    if (!fiveLetterWords.includes(guess.toLowerCase())) {
      alert("The guessed word is not a valid word!");
      return;
    }

    if (guesses.some((g) => g.map((letterObj) => letterObj.letter).join("") === guess)) {
      alert("You've already guessed that word!");
      return;
    }

    const checkResult = wordle.checkWord(guess);
    const formattedGuess = guess.split("").map((letter, index) => ({
      letter,
      color: checkResult[index],
    }));

    setGuesses((prev) => [...prev, formattedGuess]);
    setCurrentGuess("");

    if (checkResult.every((res) => res === GREEN)) {
      setStreak((prev) => prev + 1);
      setIsGameOver(true);
      setResult("You Win!");
    }

    if (guesses.length >= 5) {
      setIsGameOver(true);
      setResult(`Game Over! The word was ${targetWord}`);
    }
  }, [guesses, wordle, targetWord]);

  const getHint = useCallback(() => {
    const maxHints = difficulty === "easy" ? 6 : difficulty === "medium" ? 4 : 2;
    if (hintUsed >= maxHints) {
      alert("You've already used all your hints!");
      return;
    }

      const remainingLetters = targetWord.split("").filter((letter, index) => !hintLetters.includes(index));
      if (remainingLetters.length > 0) {
        const randomIndex = targetWord.indexOf(remainingLetters[0]);
        setHintLetters((prev) => [...prev, randomIndex]);
        alert(`Hint: The letter at position ${randomIndex + 1} is ${targetWord[randomIndex]}`);
        setHintUsed((prev) => prev + 1);
      } else {
        alert("No more hints available!");
      }
  }, [hintUsed, difficulty, targetWord, hintLetters]);

  const resetGame = useCallback(() => {
    setTargetWord(fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)]);
    setGuesses([]);
    setCurrentGuess("");
    setIsGameOver(false);
    setResult("");
    setTimeRemaining(difficulty === "hard" ? 100 : difficulty === "medium" ? 200 : 300);
    setHintUsed(0);
    setHintLetters([]);
  }, [difficulty]);

  return (
    <div className={`app min-h-screen flex flex-col items-center justify-start ${isDarkMode ? "dark" : ""} bg-gray-100 p-4 pt-8 dark:bg-black`}>
      <h1 className="text-3xl font-bold text-green-500 mb-4">WORDLE</h1>

      <div className={`timer text-lg mb-4 ${isDarkMode ? "text-white" : "text-black"}`}>
        {`Time remaining: ${timeRemaining}s`}
      </div>

      <div className="mb-4">
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className= "bg-gray-200 p-2 rounded text-black dark:text-white dark:bg-gray-700"
        >
          {["easy", "medium", "hard"].map((level) => (
            <option key={level} value={level}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-12">
        <LetterGrid guesses={guesses} currentGuess={currentGuess} isDarkMode={isDarkMode} />
      </div>

      <button
        onClick={() => setIsDarkMode((prev) => !prev)}
        className={`mb-4 p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
      >
        {isDarkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
      </button>

      <button
        onClick={getHint}
        className={`mb-4 p-2 rounded ${isDarkMode ? 'bg-blue-500' : 'bg-blue-200'}`}
      >
        Get Hint
      </button>

      <button
        onClick={resetGame}
        className={`mb-4 p-2 rounded ${isDarkMode ? 'bg-red-500' : 'bg-red-200'}`}
      >
        Reset Game
      </button>

      {isGameOver ? (
        <GameStatus result={result} isDarkMode={isDarkMode} />
      ) : (
        <KeyPad
          guesses={guesses}
          currentGuess={currentGuess}
          handleKeyPress={handleKeyPress}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

export default App;
