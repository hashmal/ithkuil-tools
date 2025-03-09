import { CONVERTION_RULES, IpaConverterMatcher, MatcherContext } from './ipa-conversion-rules'
import { STRESSED_VOWELS, StressedVowel, Vowel, VOWELS } from '../phonology'
import { IpaConversionError } from './IpaConversionError'
import { romanizedIthkuilToSyllableBoundaries } from 'syllables/romanizedIthkuilToSyllableBoundaries'

/** Options for the IpaConverter class. */
export type IpaConverterOptions = {
  /** The type of stress marks to use.
   * @default 'accent' */
  stressMarks?: 'accent' | 'line' | 'none',

  /** Surround the IPA output with brackets when set to true.
   * @default true */
  brackets?: boolean,

  /** Insert full stops between vowels when set to true.
   * @default false */
  fullStopsBetweenVowels?: boolean,

  /** Explicitly mark the penultimate syllable for stress when set to true.
   * @default false */
  explicitPenultimateStress?: boolean,

  /** If set to true, insert a glottal stop at the beginning of a word starting with a vowel.
   * @default false */
  wordInitialGlottalStop?: boolean,
}

const STRESS_MARK_ACCENT = '\u0301'
const STRESS_MARK_VERTICAL_LINE = 'ˈ'
const FULLSTOP = '.'

/** Class to convert romanized Ithkuil text to IPA. Using the utility function `romanizedIthkuilToIpa` should be preferred, as it covers the same functionality with less verbosity,
 *
 * @remarks The conversion is based on a set of rules defined in `ipa-conversion-rules.ts`. These rules are called "matchers" throughout this documentation.
 */
export class IpaConverter {
  // TODO: Implement stress marks as vertical lines.

  /** Options for the conversion. */
  public readonly options: IpaConverterOptions = {
    stressMarks: 'accent',
    brackets: true,
    fullStopsBetweenVowels: false,
    explicitPenultimateStress: false,
    wordInitialGlottalStop: false,
  }

  /** Romanized Ithkuil text to be converted to IPA */
  public readonly text!: string
  private words!: string[]
  private syllablesBoundaries!: number[][]

  /** Index used to traverse the romanized Ithkuil text.
   * @internal */
  private index = 0
  private currentWordIndex = 0
  private totalIndex = 0

  /** Constructor
   *
   * @param romanizedIthkuilText The romanized Ithkuil text to convert to IPA.
   * @param options Options for the conversion.
   */
  constructor(romanizedIthkuilText: string, options?: IpaConverterOptions) {
    this.text = this.preprocessText(romanizedIthkuilText)
    this.words = this.text.split(' ')
    this.syllablesBoundaries = romanizedIthkuilToSyllableBoundaries(this.text)
    this.options = { ...this.options, ...(options ?? {}) }
  }

  /** Get an IPA representation of the provided romanized Ithtkuil text (or an error, when appropriate).
   *
   * @returns The IPA representation of the provided romanized Ithkuil text, or an error if the conversion fails.
  */
  public textToIpa(): string | Error {
    let ipaAccumulator: string = ''

    for (this.currentWordIndex = 0; this.currentWordIndex < this.words.length; this.currentWordIndex++) {

      // Current word information
      const currentSyllableWord = this.syllablesBoundaries[this.currentWordIndex]
      const word = this.words[this.currentWordIndex]

      // Stress position
      const penultimateStress = !this.wordIsStressed(word)
      const stressOffset = penultimateStress ? 3 : 2
      const stressLineIndex = currentSyllableWord[currentSyllableWord.length - stressOffset]

      if (this.currentWordIndex > 0) ipaAccumulator += ' '

      // Glottal stop insertion
      if (this.options.wordInitialGlottalStop) {
        const { character } = this.unstressCharacter(word[0])
        if (VOWELS.includes(character as Vowel))
          ipaAccumulator += 'ʔ'
      }

      for (this.index = 0; this.index < word.length; this.index++) {

        // Insert full stops between vowels
        if (this.options?.fullStopsBetweenVowels === true) {
          if (this.index > 0 && currentSyllableWord.includes(this.index)) {
            ipaAccumulator += FULLSTOP
          }
        }

        // Insert 'line' stress marks
        if (this.options?.explicitPenultimateStress
            && this.options?.stressMarks === 'line'
            && penultimateStress
            && this.index === stressLineIndex) {
          ipaAccumulator += STRESS_MARK_VERTICAL_LINE
        }
        if (this.options?.stressMarks === 'line' && !penultimateStress && this.index === stressLineIndex) {
          ipaAccumulator += STRESS_MARK_VERTICAL_LINE
        }

        // Current character information
        const currentCharacter = word[this.index]
        const { character, stressed } = this.unstressCharacter(currentCharacter)

        // Lookup IPA transformation matcher
        let matcher
        try { matcher = this.lookupCharacterMatcher(character) }
        catch (error) {
          if (error instanceof IpaConversionError) return error
          else throw error
        }

        // Apply transformation matcher
        try {
          ipaAccumulator += this.matchCharacter(matcher!)
        } catch (error) {
          if (error instanceof IpaConversionError) return error
          else throw error
        }

        // Insert 'accent' stress marks
        if (this.options?.stressMarks === 'accent' && stressed)
          ipaAccumulator += STRESS_MARK_ACCENT

        this.totalIndex++
      }

      this.totalIndex++ // Accounts for the space between words
    }

    const ipa = this.geminate(ipaAccumulator).normalize()

    return this.optionalBrackets(ipa)
  }

  /** Lookup for a matcher suitable for a given character.
   *
   * @param character The character to lookup a matcher for.
   * @returns The matcher suitable for the given character.
   *
   * @throws IpaConversionError if no matcher is found for the given character.
   */
  private lookupCharacterMatcher(character: string): IpaConverterMatcher {
    const matcher = CONVERTION_RULES[character]
    if (typeof matcher !== 'function') {
      throw new IpaConversionError(this.failureMessage, { cause: 'no matcher found' })
    }
    return matcher
  }

  /** Apply the provided matcher logic according with the surrounding characters.
   *
   * @param matcher The matcher containing the logic to apply.
   * @returns The IPA character resulting from the matcher logic.
   *
   * @throws IpaConversionError if the matcher logic fails to produce an IPA character.
   */
  private matchCharacter(matcher: IpaConverterMatcher): string {
    const ipaCharacter: string | undefined = matcher!(this.context())
    if (ipaCharacter) return ipaCharacter
    throw new IpaConversionError(this.failureMessage, { cause: 'incomplete rules' })
  }

  /** Surround provided IPA string with brackets accordingly to the given options.
   *
   * @param ipa The IPA string to surround with brackets.
   * @returns The IPA string surrounded with brackets, or the IPA string itself if brackets are not required.
   */
  private optionalBrackets(ipa: string): string {
    return this.options.brackets ? `[${ipa}]` : ipa
  }

  /** Build a context object to pass to a transformation matched
   * @internal */
  private context(): MatcherContext {
    return {
      lb: this.lookBehind(),
      la: this.lookAhead(),
      syllablesBoundaries: this.syllablesBoundaries[this.currentWordIndex],
      currentIndex: this.totalIndex,
    }
  }

  /** Build a lookahead closure for a matcher.
   * @internal */
  private lookAhead(): (length: number) => string {
    return (length) => (this.text.slice(this.totalIndex + 1, this.totalIndex + 1 + length))
  }

  /** Build a lookbehind closure for a matcher.
   * @internal */
  private lookBehind(): (length: number) => string {
    return (length) => (this.text.slice(this.totalIndex - length, this.totalIndex))
  }

  /** Format a human-readable view of where the conversion has failed.
   * @internal */
  private get failureMessage(): string {
    return `failed at index ${this.index}:\n` +
      `${this.text}\n` +
      '-'.repeat(this.index) + '^'
  }

  /** Geminate consonants in a given IPA string.
  *
  * @param ipa The IPA string to geminate consonants in.
  * @returns The IPA string with geminated consonants.
  */
  private geminate(ipa: string): string {
    const geminated = ipa
      .replace(/(.)(?<!\1.)\1(?!\1)/g, '$1ː') // Geminate consonants
      .replace(/ɹɾ/g, 'ʀ') // [ɹ] / [ɾ] becomes a trill [r] when geminated, as in Spanish or Italian caro and carro;
      .replace(/ʁʁ/g, 'ʁː') // [ʁ] When geminated it is either [ʁː] or can be strengthened to a uvular trill [ʀ]

    return geminated
  }

  /** Get a vowel without a stress mark along the information if it was originally stressed.
  *
  * @param character The character to get the unstressed vowel from.
  * @returns An object containing the characater and a boolean indicating if it was originally a stressed vowel.
  */
  private unstressCharacter(character: string): { character: string, stressed: boolean } {
    const index = STRESSED_VOWELS.indexOf(character as StressedVowel)
    if (index < 0) return { character, stressed: false }
    return { character: VOWELS[index], stressed: true }
  }

  /** Check if a word is explicitly marked for stress.
   *
   * @param word The word to check for stress.
   * @returns A boolean indicating if the word is explicitly marked for stress.
   *
   * @internal
   */
  private wordIsStressed(word: string): boolean {
    for (this.index = 0; this.index < word.length; this.index++) {
      const currentCharacter = word[this.index]
      const { stressed } = this.unstressCharacter(currentCharacter)
      if (stressed) return true
    }
    return false
  }

  /** Preprocess a given text for IPA conversion.
  *
  * @param text The text to preprocess.
  * @returns The preprocessed text.
  */
  private preprocessText(text: string): string {
    return text
      .toLowerCase() // Make everything lowercase
      .replace(/\.|,/g, ' ') // Remove punctuation
      .replace(/\s+/g, ' ') // Remove extra spaces
      .replace(/^\s+/, '') // Remove leading spaces
      .replace(/\s+$/, '') // Remove trailing spaces
      .replace(/'/, 'ʼ') // Replace apostrophes with glottal stops
  }
}
