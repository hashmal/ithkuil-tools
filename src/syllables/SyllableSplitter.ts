import { Diphthong, DIPHTHONGS, Vowel, VOWELS } from '../phonology'
import { biConsonantalConjunctSplit, pentaConsonantalConjunctSplit, tetraConsonantalConjunctSplit, triConsonantalConjunctSplit } from './onsonantalConjunctSplits'

export class SyllableSplitter {
  word!: string
  unstressedWord!: string
  index: number = 0

  constructor(word: string) {
    this.word = word
    this.unstressedWord = unstress(word)
  }

  public splitSyllables(): string[] {
    const vowelRanges = this.vowelRanges()
    const output: [string, string[], string][] = []

    if (vowelRanges.length === 2) return [this.word]

    for (let index = 0; index < vowelRanges.length-2; index+=2) {
      const consonant = this.word.slice(vowelRanges[index + 1], vowelRanges[index + 2])
      const consonantLength = consonant.length
      const split = this.consonantSplit(consonant) // consonant resolution here
      const consonantSplit = [
        consonant.slice(0, split),
        consonant.slice(split, consonantLength),
      ]
      const vowelBefore = this.word.slice(vowelRanges[index], vowelRanges[index + 1])
      const vowelAfter = this.word.slice(vowelRanges[index + 2], vowelRanges[index + 3])

      // console.log({ vowelBefore, consonantSplit, vowelAfter })
      output.push([vowelBefore, consonantSplit, vowelAfter])
    }

    const joined = this.joiner(output)
    if (joined[0] === '') {
      return joined.slice(1, joined.length)
    } else {
      return joined
    }
  }

  private vowelRanges(): number[] {
    const ranges: number[] = []
    for (let index = 0; index < this.unstressedWord.length; index++) {
      const character = this.unstressedWord[index]

      if (index === 0 && !(VOWELS).includes(character as Vowel)) {
        ranges.push(0)
        ranges.push(0)
      }

      if ((VOWELS).includes(character as Vowel)) {
        if (DIPHTHONGS.includes(this.unstressedWord.slice(index, index + 2) as Diphthong)) {
          ranges.push(index)
          ranges.push(index + 2)
          index++
        } else {
          ranges.push(index)
          ranges.push(index + 1)
        }
      }
    }
    return ranges
  }

  private consonantSplit(consonants: string): number {
    switch (consonants.length) {
      case 0:
      case 1:
        return 0
      case 2:
        return biConsonantalConjunctSplit(consonants)
      case 3:
        return triConsonantalConjunctSplit(consonants)
      case 4:
        return tetraConsonantalConjunctSplit(consonants)
      case 5:
        return pentaConsonantalConjunctSplit(consonants)
      default:
        throw new Error("Consonant conjuncts can't be longer than 5")
    }
  }

  private joiner(output: [string, string[], string][]): string[] {
    const accum = []
    let prev = output[0][0]
    for (let index = 0; index < output.length; index++) {
      const trio = output[index]
      accum.push(prev + trio[1][0])
      prev = trio[1][1] + trio[2]
    }
    accum.push(prev)

    return accum
  }
}

function unstress(word: string) {
  return word
    .replace(/í/g, 'i')
    .replace(/û/g, 'ü')
    .replace(/ú/g, 'u')
    .replace(/é/g, 'e')
    .replace(/ô/g, 'ö')
    .replace(/ê/g, 'ë')
    .replace(/ó/g, 'o')
    .replace(/â/g, 'ä')
    .replace(/á/g, 'a')
}
