export const getColorClass = (color) => {
  switch (color) {
    case "g":  // Green (Correct letter and position)
      return "bg-green-500";
    case "y":  // Yellow (Correct letter but wrong position)
      return "bg-yellow-500";
    case "b":  // black (Incorrect letter)
      return "bg-blue-100";
    default:  
      return "bg-gray-400";
  }
};

// The function to create the grid based on guesses and current guess
export const createGrid = (guesses, currentGuess) => {
  const rows = 6;
  const cols = 5;

  return [...Array(rows)].map((_, rowIndex) => {
    const guess =
      guesses[rowIndex] ||
      (rowIndex === guesses.length ? [...currentGuess] : []);
      
    return [...Array(cols)].map((_, colIndex) => {
      const letter = guess[colIndex]?.letter || guess[colIndex] || "";
      const color = guess[colIndex]?.color || ""; // Default to 'b' for black
      return { letter, color };
    });
  });
};

