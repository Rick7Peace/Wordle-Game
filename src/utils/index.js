const GREEN = "g";
const YELLOW = "y";
const BLACK = "b";

class Wordle {
  word;
  constructor(word) {
    this.word = word;
  }

  checkWord(guess) {
    if (guess.length !== this.word.length) {
      return [];
    }
    if (guess === this.word) {
      return Array(this.word.length).fill(GREEN);
    }
    let result = [];

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === "") {
        result.push("");
        continue;
      }
      if (!this.word.includes(guess[i])) {
        result.push(BLACK);
        continue;
      }
      if (guess[i] === this.word[i]) {
        result.push(GREEN);
      }
      
        if (this.letterRepeatedInGuess(guess, i)) {
          result.push(BLACK);
        } else {
          result.push(YELLOW);
        }
    }
    return result;
  }
  
  letterRepeatedInGuess(guess, index) {
    let charCountInGuess = [];
    let charCountInWordle = [];

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === guess[index]) {
        charCountInGuess.push(i);
      }
      if (this.word[i] === guess[index]) {
        charCountInWordle.push(i);
      }
    }
 
    if (charCountInGuess.length === 1) {
      return false;
    }
    if (charCountInGuess.length === charCountInWordle.length) {
      return false;
    }
    if (index === charCountInGuess[0]) {
      return false;
    }
    return true;
  }
}

export { Wordle, GREEN, YELLOW, BLACK };