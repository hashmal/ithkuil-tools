import { CONVERTION_RULES, IpaConverterMatcher } from './ipa-conversion-rules'
import { STRESSED_VOWELS_STRING, VOWELS_STRING } from '../phonology'
import { IpaConversionError } from './IpaConversionError'

export type IpaConverterOptions = {
  stressMarks?: 'accent' | 'none'
  brackets?: boolean
}

/** Accent to mark stress on an IPA character
 *
 * @remarks The representation of the stress mark is a combining acute accent, which means normalizing the string will be necessary to obtain in a single character.
 */
const STRESS_MARK_ACCENT = '\u0301'

/** Class to convert romanized Ithkuil text to IPA. Using the utility function `romanizedIthkuilToIpa` should be preferred, as it covers the same functionality with less verbosity,
 *
 * @remarks The conversion is based on a set of rules defined in `ipa-conversion-rules.ts`. These rules are called "matchers" throughout this documentation.
 */
export class IpaConverter {
  // TODO: Implement stress marks as vertical lines.

  /** Default options for the converter, to be overwwritten with explicitly given options. */
  private DEFAULT_OPTIONS: IpaConverterOptions = {
    stressMarks: 'accent',
    brackets: true,
  }

  /** Current options for the converter, based on `DEFAULT_OPTIONS` merged with passed options */
  private options!: IpaConverterOptions

  /** Romanized Ithkuil text to be converted to IPA */
  private text!: string

  /** Index used to traverse the romanized Ithkuil text.
   * @internal */
  private index = 0

  /** Constructor
   *
   * @param romanizedIthkuilText The romanized Ithkuil text to convert to IPA.
   * @param options Options for the conversion.
   */
  constructor(romanizedIthkuilText: string, options?: IpaConverterOptions) {
    this.text = preprocessText(romanizedIthkuilText)
    this.options = { ...this.DEFAULT_OPTIONS, ...(options ?? {}) }
  }

  /** Get an IPA representation of the provided romanized Ithtkuil text (or an error, when appropriate).
   *
   * @returns The IPA representation of the provided romanized Ithkuil text, or an error if the conversion fails.
  */
  public textToIpa(): string | Error {
    let ipaAccumulator: string = ''

    for (this.index = 0; this.index < this.text.length; this.index++) {
      const currentCharacter = this.text[this.index]
      const { character, stressed } = unstressCharacter(currentCharacter)
      let matcher
      try { matcher = this.lookupCharacterMatcher(character) }
      catch (error) { if (error instanceof Error) return error }

      try {
        ipaAccumulator += this.matchCharacter(matcher!)
        if (this.options?.stressMarks === 'accent' && stressed) ipaAccumulator += STRESS_MARK_ACCENT
      } catch (error) { if (error instanceof Error) return error }
    }

    const ipa = geminate(ipaAccumulator).normalize()

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
    const ipaCharacter: string | undefined = matcher!(this.lookBehind(), this.lookAhead())
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

  /** Build a lookahead closure for a matcher.
   * @internal */
  private lookAhead(): (length: number) => string {
    return (length) => (this.text.slice(this.index + 1, this.index + 1 + length))
  }

  /** Build a lookbehind closure for a matcher.
   * @internal */
  private lookBehind(): (length: number) => string {
    return (length) => (this.text.slice(this.index - length, this.index))
  }

  /** Format a human-readable view of where the conversion has failed.
   * @internal */
  private get failureMessage(): string {
    return `failed at index ${this.index}:\n` +
      `${this.text}\n` +
      '-'.repeat(this.index) + '^'
  }
}

/** Get a vowel without a stress mark along the information if it was originally stressed.
 *
 * @param character The character to get the unstressed vowel from.
 * @returns An object containing the characater and a boolean indicating if it was originally a stressed vowel.
*/
function unstressCharacter(character: string): { character: string, stressed: boolean } {
  const index = STRESSED_VOWELS_STRING.indexOf(character)
  if (index < 0) return { character, stressed: false }
  return { character: VOWELS_STRING[index], stressed: true }
}

/** Preprocess a given text for IPA conversion.
 *
 * @param text The text to preprocess.
 * @returns The preprocessed text.
 */
function preprocessText(text: string): string {
  return text
    .toLowerCase() // Make everything lowercase
    .replace(/\.|,/g, ' ') // Remove punctuation
    .replace(/\s+/g, ' ') // Remove extra spaces
    .replace(/^\s+/, '') // Remove leading spaces
    .replace(/\s+$/, '') // Remove trailing spaces
    .replace(/'/, 'ʼ') // Replace apostrophes with glottal stops
}

/** Geminate consonants in a given IPA string.
 *
 * @param ipa The IPA string to geminate consonants in.
 * @returns The IPA string with geminated consonants.
 */
function geminate(ipa: string): string {
  const geminated = ipa
    .replace(/(.)(?<!\1.)\1(?!\1)/g, '$1ː') // Geminate consonants
    .replace(/ɹɾ/g, 'ʀ') // [ɹ] / [ɾ] becomes a trill [r] when geminated, as in Spanish or Italian caro and carro;
    .replace(/ʁʁ/g, 'ʁː') // [ʁ] When geminated it is either [ʁː] or can be strengthened to a uvular trill [ʀ]

  return geminated
}
