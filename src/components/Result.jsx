import PropTypes from 'prop-types';

function Result(props) {
  const { result, status, onNewGame, isDarkMode } = props;

  return (
    <div className="text-center p-4">
      {/* Display the result message in white text if dark mode is enabled */}
      {result.split("\n").map((line, index) => (
        <p 
          className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`} 
          key={index}
        >
          {line}
          {index < result.split("\n").length - 1 && <br />}
        </p>
      ))}

      {/* Button styling */}
      <button
        className={`mt-4 px-4 py-2 rounded ${
          status === 'win' ? 'bg-blue-500' : 'bg-red-500'
        } ${isDarkMode ? 'text-white' : 'text-black'}`}
        onClick={onNewGame}
      >
        {status === 'win' ? 'You Won! Start New Game ' : 'You Lost! Try Again'}
      </button>
    </div>
  );
}

Result.propTypes = {
  result: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['win', 'lose']).isRequired,
  onNewGame: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired, // Add this prop
};

export default Result;
