import PropType from 'prop-types';
import React from 'react';
import { createGrid, getColorClass } from '../utils/Color';

const LetterGrid = ({ guesses, currentGuess }) => {
  const grid = createGrid(guesses, currentGuess);


  return (
    <div className="grid space-y-2">
      {grid.map((row, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="row flex justify-center space-x-1"
        >
          {row.map(({ letter, color }, colIndex) => {
            const cellKey = `cell-${rowIndex}-${colIndex}`;
            const cellClass = `cell w-12 h-12 sm:w-14 sm:h-14 border-2 dark:border-gray-600 border-gray-300 mx-1 flex justify-center items-center uppercase font-bold text-xl ${getColorClass(
              color
            )}`;
            return (
              <div key={cellKey} className={cellClass}>
                {letter}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default LetterGrid;
