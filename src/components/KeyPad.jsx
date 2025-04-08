import PropTypes from "prop-types";
import { getColorClass } from "../utils/Color";

const Keypad = ({ handleKeyPress, guesses }) => {
  const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["ENTER", "z", "x", "c", "v", "b", "n", "m", "⌫"],
  ];

  const keyColor = (letter) => {
    for (const guess of guesses) {
      const letterObj = guess.find((obj) => obj.letter === letter);
      if (letterObj) {
        return getColorClass(letterObj.color);
      }
    }
    return "";
  };

  return (
    <div className="keypad flex flex-col items-center space-y-3">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keypad-row flex space-x-1">
          {row.map((key) => {
            const colorClass = keyColor(key);
            return (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className={`bg-gray-400 hover:bg-gray-300 dark:bg-gray-500 text-black font-bold py-4 px-3 sm:py-2 sm:px-4 rounded-md transition-colors duration-200 ease-in-out text-xs sm:text-base uppercase ${colorClass}`}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

Keypad.propTypes = {
  handleKeyPress: 
  PropTypes.func.isRequired,
  guesses: 
  PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        letter: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      })
    )
  ).isRequired,
};

export default Keypad;
