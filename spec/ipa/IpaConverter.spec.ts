import { IpaConverter } from '../../lib/ipa/IpaConverter'

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
})

describe('IpaConverter', () => {})
