import { Diphthong, DIPHTHONGS, STRESSED_VOWELS, Vowel, VOWELS } from '../phonology'
import { biConsonantalConjunctSplit, pentaConsonantalConjunctSplit, tetraConsonantalConjunctSplit, triConsonantalConjunctSplit } from './onsonantalConjunctSplits'

/** Used to split single words into syllables. */
export class SyllableSplitter {
  /** Word to split into syllables */
  public readonly word!: string

  /** Word without stress marks */
  private unstressedWord!: string

  /** Current index
   * @internal */
  private index: number = 0

  /** Create a new SyllableSplitter instance
   *
   * @param {string} word - Word to split into syllables
   */
  constructor(word: string) {
    this.word = preprocess(word)
    this.unstressedWord = unstress(this.word)
  }

  /** Split given word into syllables
   *
   * @returns {string[]} Array of syllables
   */
  public splitSyllables(): string[] {
    const vowelRanges = this.vowelRanges()
    const output: [string, string[], string][] = []

    if (vowelRanges.length === 2) return [this.word]

    let index
    for (index = 0; index < vowelRanges.length-2; index+=2) {
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
    // trailing consonants
    if (this.word.length > vowelRanges.length-2) {
      const length = vowelRanges.length
      const vowelBefore = this.word.slice(vowelRanges[length-2], vowelRanges[length-1])
      // console.log('vowelBefore:', vowelBefore)
      const consonant = this.word.slice(vowelRanges[length-1], vowelRanges[length])
      // console.log('trailing consonant:', consonant)
      // console.log('diff:', this.word.slice(vowelRanges.length, this.word.length))

      // if (CONSONANTS.includes(this.word[this.word.length-1] as Consonant)) {
      //   const consonant = this.word.slice(vowelRanges.length+1, this.word.length)
      //   // console.log('trailing consonants:', consonant)
      //   output[output.length-1][2] += consonant
      // }

      output.push([vowelBefore, [consonant, ''], ''])
    }

    const joined = this.joiner(output)
    let adjustedJoined = joined[0] === '' ? joined.slice(1, joined.length) : joined
    if (adjustedJoined[adjustedJoined.length-1] === '') adjustedJoined = adjustedJoined = adjustedJoined.slice(0, adjustedJoined.length-1)
    if (adjustedJoined[adjustedJoined.length-1] === '1') return adjustedJoined
    return fixWordInitialConsonants(adjustedJoined)
  }

  /** Get syllable boundaries in form of an array of indices
   *
   * @returns {number[]} Array of indices
   */
  public syllableBoundaries(): number[] {
    const syllables = this.splitSyllables()
    const boundaries: number[] = [0]
    let index = 0
    for (const syllable of syllables) {
      index += syllable.length
      boundaries.push(index)
    }
    return boundaries
  }

  /** Compute vowel ranges
   *
   * @returns {number[]} Array of vowel ranges
   */
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

  /** Split consonant according to various rules.
   *
   * @param {string} consonants - Consonants to split
   * @returns {number} Index to split the consonants at
   */
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

  /** Join syllables into a single array
   *
   * @param {Array<[string, string[], string]>} output - Array of tuples
   * @returns {string[]} Array of syllables
   */
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

function fixWordInitialConsonants(syllables: string[]): string[] {
  if (syllables[0].match(`[${VOWELS.join('')}${STRESSED_VOWELS.join('')}]`)) {
    return syllables
  } else {
    return [syllables[0] + syllables[1], ...syllables.slice(2, syllables.length)]
  }
}

/** Remove stress marks on vowels
 *
 * @param {string} word - Word to remove stress marks from
 * @returns {string} Word without stress marks
 */
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

/** Preprocess text, i.e. make it lowercase.
 *
 * @param {string} romanizedIthkuilText - Romanized Ithkuil text
 * @returns {string} Preprocessed text
 */
function preprocess(romanizedIthkuilText:string): string {
  return romanizedIthkuilText.toLowerCase()
}
