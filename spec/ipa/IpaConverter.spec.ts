import { IpaConverter } from '../../lib/ipa/IpaConverter'

describe('IpaConverter', () => {
  describe('IpaConverterOptions', () => {
    describe('brackets', () => {
      it('returns the IPA string with brackets', () => {
        const text = 'a'
        const converter = new IpaConverter(text, { brackets: true })
        expect(converter.romanizationToIpa()).toBe('[a]')
      })

      it('returns the IPA string without brackets', () => {
        const text = 'a'
        const converter = new IpaConverter(text, { brackets: false })
        expect(converter.romanizationToIpa()).toBe('a')
      })
    })
  })
})
