import { CONVERTION_RULES } from './ipa-conversion-rules'
import { STRESSED_VOWELS_STRING, VOWELS_STRING } from '../phonology'
import { IpaConversionError } from './IpaConversionError'

const STRESS_MARK_ACCENT = '\u0301'

export type IpaConverterOptions = {
  stressMark?: 'accent' | 'none'
  brackets?: boolean
}

function unstressCharacter(character: string): { character: string, stressed: boolean } {
  const index = STRESSED_VOWELS_STRING.indexOf(character)
  if (index < 0) return { character, stressed: false }
  return { character: VOWELS_STRING[index], stressed: true }
}

function preprocessText(text: string): string {
  return text
    .toLowerCase() // Make everything lowercase
    .replace(/\.|,/g, ' ') // Remove punctuation
    .replace(/\s+/g, ' ') // Remove extra spaces
    .replace(/^\s+/, '') // Remove leading spaces
    .replace(/\s+$/, '') // Remove trailing spaces
    .replace(/'/, 'ʼ') // Replace apostrophes with glottal stops
}

// TODO: stress marks.
export class IpaConverter {
  private text!: string
  private options!: IpaConverterOptions
  private index = 0

  private DEFAULT_OPTIONS: IpaConverterOptions = {
    stressMark: 'accent',
    brackets: true,
  }

  constructor(romanizedIthkuilText: string, options?: IpaConverterOptions) {
    this.text = preprocessText(romanizedIthkuilText)
    this.options = { ...this.DEFAULT_OPTIONS, ...(options ?? {}) }
  }

  public textToIpa(): string | Error {
    let ipaAccumulator: string = ''

    for (this.index = 0; this.index < this.text.length; this.index++) {
      const currentCharacter = this.text[this.index]
      const { character, stressed } = unstressCharacter(currentCharacter)
      const matcher = CONVERTION_RULES[character]
      if (typeof matcher !== 'function') {
        try {
          throw new IpaConversionError(this.prettyFailMessage(), { cause: 'no matcher found' })
        } catch (error) {
          if (error instanceof Error) return error
        }
      }

      const ipaCharacter: string | undefined = matcher(this.lookBehind(), this.lookAhead())
      if (ipaCharacter) {
        ipaAccumulator += ipaCharacter
        if (stressed && this.options?.stressMark === 'accent') ipaAccumulator += STRESS_MARK_ACCENT
      } else {
        try {
          throw new IpaConversionError(this.prettyFailMessage(), { cause: 'incomplete rules' })
        } catch (error) {
          if (error instanceof Error) return error
        }
      }
    }

    const geminatedIpaAccumulator = this.geminate(ipaAccumulator)
    const normalizedAccumulator = geminatedIpaAccumulator.normalize()

    if (this.options.brackets) {
      return `[${normalizedAccumulator}]`
    } else {
      return normalizedAccumulator
    }
  }

  private geminate(text: string): string {
    const geminated = text
      .replace(/(.)(?<!\1.)\1(?!\1)/g, '$1ː') // Geminate consonants
      .replace(/ɹɾ/g, 'r') // [ɹ] / [ɾ] becomes a trill [r] when geminated, as in Spanish or Italian caro and carro;
      .replace(/ʁʁ/g, 'ʁː') // [ʁ] When geminated it is either [ʁː] or can be strengthened to a uvular trill [ʀ]

    return geminated
  }

  private lookAhead(): (length: number) => string {
    return (length) => (this.text.slice(this.index + 1, this.index + 1 + length))
  }

  private lookBehind(): (length: number) => string {
    return (length) => (this.text.slice(this.index - length, this.index))
  }

  private prettyFailMessage(): string {
    return `failed at index ${this.index}:\n` +
      `${this.text}\n` +
      '-'.repeat(this.index) + '^'
  }
}
