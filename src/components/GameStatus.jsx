import PropTypes from 'prop-types';

const GameStatus = ({ result, status, onNewGame, isDarkMode }) => {
  const resultLines = result.split("\n");

  return (
    <div className={`text-center p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      /* Display the result message */
        {resultLines.map((line, index) => (
          <p
            className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}
            key={index}
          >
            {line}
          </p>
        ))}

        {/* Button styling */}
        <button
          className={`mt-4 px-4 py-2 rounded ${
            status === 'win' ? 'bg-blue-500' : 'bg-red-500'
          } ${isDarkMode ? 'text-white' : 'text-black'} hover:opacity-90`}
          onClick={onNewGame}
        >
          <span className= "text-black">
          {status === 'win' ? (
          "You Won! Start New Game"
          ) : (
            "You Lost! Try Again"
          )}
          </span>
        </button>
          </div>
        );
      };

GameStatus.propTypes = {
  result: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['win', 'lose']).isRequired,
  onNewGame: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default GameStatus;
