const {Wordle, GREEN, YELLOW, BLACK} = require("../classes/Wordle")

describe("Wordle", () => {
    it('if guess has different number of letters than wordle, return empty array', () => {
        const wordle = new Wordle("alert")
        const result = wordle.checkWord("boom")
        expect(result).toEqual([])
    })
    it('if guess matches wordle, return array of all green', () => {
        const wordle = new Wordle("alert")
        const result = wordle.checkWord("alert")
        expect(result).toEqual([GREEN,GREEN,GREEN,GREEN,GREEN])
    })
    it('if first letter is in correct position, return green for that position', () => {
        const wordle = new Wordle("alert")
        const result = wordle.checkWord("abbbb")
        expect(result).toEqual([GREEN,BLACK,BLACK,BLACK,BLACK])
    })
    it('if last letter is in correct position, return green for that position', () => {
        const wordle = new Wordle("alerts")
        const result = wordle.checkWord("bbbbbs")
        expect(result).toEqual([BLACK,BLACK,BLACK,BLACK,BLACK,GREEN])
    })
    it('if letter exists but in the wrong position', () => {
        const wordle = new Wordle("alert")
        const result = wordle.checkWord("bbabb")
        expect(result).toEqual([BLACK,BLACK,YELLOW,BLACK,BLACK])
    })
    it('if letter exists multiple times in a guess but only one letter is in correct position in wordle', () => {
        const wordle = new Wordle("alert")
        const result = wordle.checkWord("abbab")
        expect(result).toEqual([GREEN,BLACK,BLACK,BLACK,BLACK])
    })
    it('if no letters are part of wordle', () => {
        const wordle = new Wordle("alert")
        const result = wordle.checkWord("bbbbb")
        expect(result).toEqual([BLACK,BLACK,BLACK,BLACK,BLACK])
    })
})
