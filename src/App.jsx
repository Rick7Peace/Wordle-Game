import "./App.css";
import { useState, useEffect } from "react";
import WordGrid from "./components/WordGrid.jsx";
import Keyboard from "./components/Keyboard.jsx";
import Result from "./components/Result.jsx";
import fiveLetterWords from "./utils/fiveLetterWords.js";
import { Wordle, GREEN, YELLOW, BLACK } from "./utils/wordle.js";

// Sound effects
// const correctSound = new Audio('path-to-correct-sound.mp3');
// const incorrectSound = new Audio('path-to-incorrect-sound.mp3');

const App = () => {
  const [targetWord, setTargetWord] = useState(
    fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)]
  );
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [result, setResult] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes timer
  const [difficulty, setDifficulty] = useState("medium");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [streak, setStreak] = useState(0); // Track streak

  const wordle = new Wordle(targetWord);

  // Handle Timer
  useEffect(() => {
    if (timeRemaining > 0 && !isGameOver) {
      const timer = setInterval(
        () => setTimeRemaining((prev) => prev - 1),
        1000
      );
      return () => clearInterval(timer);
    } else if (timeRemaining === 0) {
      setIsGameOver(true);
      setResult("Time's up! You lost.");
    }
  }, [timeRemaining, isGameOver]);

  // Handle Local Storage
  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("wordleState"));
    if (savedState) {
      setTargetWord(savedState.targetWord);
      setGuesses(savedState.guesses);
      setCurrentGuess(savedState.currentGuess);
      setIsGameOver(savedState.isGameOver);
      setResult(savedState.result);
      setTimeRemaining(savedState.timeRemaining);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "wordleState",
      JSON.stringify({
        targetWord,
        guesses,
        currentGuess,
        isGameOver,
        result,
        timeRemaining,
      })
    );
  }, [targetWord, guesses, currentGuess, isGameOver, result, timeRemaining]);

  const handleKeyPress = (key) => {
    if (key === "ENTER") {
      handleGuessSubmit(currentGuess);
    } else if (key === "⌫") {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess(currentGuess + key);
    }
  };

  const handleGuessSubmit = (guess) => {
    if (guess.length !== 5) {
      alert("Your guess must be 5 letters long!");
      return;
    }

    if (!fiveLetterWords.includes(guess.toLowerCase())) {
      alert("The guessed word is not a valid word!");
      return;
    }

    if (
      guesses.some(
        (g) => g.map((letterObj) => letterObj.letter).join("") === guess
      )
    ) {
      alert("You've already guessed that word!");
      return;
    }

    const checkResult = wordle.checkWord(guess);
    const formattedGuess = guess.split("").map((letter, index) => ({
      letter,
      color: checkResult[index],
    }));

    setGuesses([...guesses, formattedGuess]);
    setCurrentGuess("");

    if (checkResult.every((res) => res === GREEN)) {
      correctSound.play();
      setStreak(streak + 1);
      setIsGameOver(true);
      setResult("You Win!");
    } else {
      incorrectSound.play();
    }

    if (guesses.length >= 5) {
      setIsGameOver(true);
      setResult(`Game Over! The word was ${targetWord}`);
    }
  };

  const getHint = () => {
    if (!hintUsed) {
      alert(`Hint: The first letter is ${targetWord[0]}`);
      setHintUsed(true);
    } else {
      alert("You've already used your hint!");
    }
  };

  const resetGame = () => {
    setTargetWord(
      fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)]
    );
    setGuesses([]);
    setCurrentGuess("");
    setIsGameOver(false);
    setResult("");
    setTimeRemaining(300);
    setHintUsed(false);
  };

  return (
    <div
      className={`app min-h-screen flex flex-col items-center justify-start ${
        isDarkMode ? "dark" : ""
      } bg-gray-100 p-4 pt-8 dark:bg-black`}
    >
      <h1 className="text-3xl font-bold text-green-500 mb-4">WORDLE</h1>

      {/* Timer Display */}
      <div className="timer text-lg mb-4">Time remaining: {timeRemaining}s</div>

      {/* Difficulty Selector */}
      <div className="mb-4">
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="bg-gray-200 p-2 rounded"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="mb-12">
        <WordGrid guesses={guesses} currentGuess={currentGuess} />
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="mb-4 bg-gray-200 p-2 rounded"
      >
        Toggle Dark Mode
      </button>

      {/* Hint Button */}
      <button onClick={getHint} className="mb-4 bg-blue-200 p-2 rounded">
        Get Hint
      </button>

      {/* Reset Button */}
      <button onClick={resetGame} className="mb-4 bg-red-200 p-2 rounded">
        Reset Game
      </button>

      {isGameOver ? (
        <Result result={result} />
      ) : (
        <Keyboard
          guesses={guesses}
          currentGuess={currentGuess}
          setCurrentGuess={setCurrentGuess}
          handleKeyPress={handleKeyPress}
        />
      )}
    </div>
  );
};

export default App;
