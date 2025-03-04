import { romanizedIthkuilToSyllables } from '../../src/syllables/romanizedIthkuilToSyllables'
import { split } from '../helpers'

describe.each([
  ['čväţa', 'čvä-ţa'],
  ['čvälţa', 'čväl-ţa'],
  ['čvärţa', 'čvär-ţa'],
  ['čväřţa', 'čväř-ţa'],
  ['arsweţ', 'ar-sweţ'],
  ['arswelţ', 'ar-swelţ'],
  ['arswerţ', 'ar-swerţ'],
  ['arsweřţ', 'ar-sweřţ'],
  ['zvata', 'zva-ta'],
  ['zvalta', 'zval-ta'],
  ['zvarta', 'zvar-ta'],
  ['zvařta', 'zvař-ta'],
  ['sřala', 'sřa-la'],
  ['sřanļa', 'sřan-ļa'],
  ['sřarļa', 'sřar-ļa'],
  ['sřaňa', 'sřa-ňa'],
])('%s', (word: string, syllables: string) => {
  it(`resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(split(syllables))
  })
})
