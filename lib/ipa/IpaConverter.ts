import { CONVERTION_RULES } from './ipa-conversion-rules'
import { STRESSED_VOWELS_STRING, VOWELS_STRING } from '../phonology'

export type IpaConverterOptions = {
  stressMark?: 'accent' | 'none'
}

function unstressCharacter(character: string): { character: string, stressed: boolean } {
  const index = STRESSED_VOWELS_STRING.indexOf(character)
  if (index < 0) return { character, stressed: false }
  return { character: VOWELS_STRING[index], stressed: true }
}

function preprocessText(text: string): string {
  return text.toLowerCase().replace(/\s+/, ' ')
}

// TODO: stress marks.
export class IpaConverter {
  private text!: string
  private options!: IpaConverterOptions
  private index = 0

  private DEFAULT_OPTIONS: IpaConverterOptions = { stressMark: 'accent' }

  constructor(text: string, options?: IpaConverterOptions) {
    this.text = preprocessText(text)
    this.options = { ...this.DEFAULT_OPTIONS, ...(options ?? {}) }
  }

  public romanizationToIpa(): string | undefined {
    let ipaAccumulator: string = ''

    for (this.index = 0; this.index < this.text.length; this.index++) {
      const currentCharacter = this.text[this.index]
      const { character, stressed } = unstressCharacter(currentCharacter)
      const matcher = CONVERTION_RULES[character]
      if (typeof matcher !== 'function') {
        console.error(this.prettyFailMessage('no matcher found'))
        return
      }

      const ipaCharacter: string | undefined = matcher(this.lookBehind(), this.lookAhead())
      if (ipaCharacter) {
        ipaAccumulator += ipaCharacter
        if (stressed && this.options?.stressMark === 'accent') ipaAccumulator += '\u0301' // Add stress mark
      } else {
        console.error(this.prettyFailMessage('incomplete rules'))
        return
      }
    }

    const geminatedIpaAccumulator = this.geminate(ipaAccumulator)

    return `[${geminatedIpaAccumulator}]`
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

  private prettyFailMessage(reason: string): string {
    return `IPA convertion failed at index ${this.index} (${reason}):\n` +
      `  ${this.text}\n` +
      '--' + '-'.repeat(this.index) + '^'
  }
}
