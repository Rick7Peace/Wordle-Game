import PropTypes from 'prop-types';

const GameStatus = ({ result, status, onNewGame, isDarkMode }) => {
  const resultLines = result.split('\n');

  return (
    <div className={`text-center p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      {resultLines.map((line, index) => (
        <p
          key={index}
          className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}
        >
          {line}
        </p>
      ))}

      {status === 'win' && (
        <p
          className={`mt-4 text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}
        >
          You Won!
        </p>
      )}

      {status === 'lose' && (
        <p
          className={`mt-4 text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}
        >
          You Lost!
        </p>
      )}
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
