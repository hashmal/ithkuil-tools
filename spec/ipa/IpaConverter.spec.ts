import { IpaConversionError } from '../../src/ipa/IpaConversionError'
import { romanizedIthkuilToIpa } from '../../src/ipa/romanizedIthkuilToIpa'
import { IpaConverter } from '../../src/ipa/IpaConverter'

// Helper function to reduce verbosity.
function ipa(text:string): string | IpaConversionError {
  return romanizedIthkuilToIpa(text, { brackets: false })
}

describe('IpaConverterOptions', () => {
  describe('stressMark', () => {
    it('returns the IPA string with stress diactrics if omitted', () => {
      const converter = new IpaConverter('á')
      expect(converter.textToIpa()).toBe('[á]')
    })

    it('returns the IPA string with stress diactrics if set to "accent"', () => {
      const converter = new IpaConverter('á', { stressMark: 'accent' })
      expect(converter.textToIpa()).toBe('[á]')
    })

    it('returns the IPA string without stress diactrics if set to "none"', () => {
      const converter = new IpaConverter('á', { stressMark: 'none' })
      expect(converter.textToIpa()).toBe('[a]')
    })
  })

  describe('brackets', () => {
    it('returns the IPA string with brackets if omitted', () => {
      const converter = new IpaConverter('a', { brackets: true })
      expect(converter.textToIpa()).toBe('[a]')
    })

    it('returns the IPA string with brackets if set to "true"', () => {
      const converter = new IpaConverter('a', { brackets: true })
      expect(converter.textToIpa()).toBe('[a]')
    })

    it('returns the IPA string without brackets if set to "false"', () => {
      const converter = new IpaConverter('a', { brackets: false })
      expect(converter.textToIpa()).toBe('a')
    })
  })

  describe('preprocessing', () => {
    it('removes leading whitespace', () => {
      expect(ipa(' a')).toBe('a')
    })

    it('removes trailing whitespace', () => {
      expect(ipa('a ')).toBe('a')
    })

    it('removes multiple whitespace', () => {
      expect(ipa('a  a')).toBe('a a')
    })

    it('converts to lowercase', () => {
      expect(ipa('A')).toBe('a')
    })

    it('replaces apostrophes with glottal stops', () => {
      expect(ipa("'")).toBe('Ɂ')
    })

    it('removes basic punctuation', () => {
      expect(ipa(',')).toBe('')
      expect(ipa('.')).toBe('')
    })
  })

  describe('gemination', () => {
    it('geminates consonants', () => {
      expect(ipa('mm')).toBe('mː')
    })
  })
})

describe('IpaConverter', () => {})
