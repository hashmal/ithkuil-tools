import { romanizedIthkuilToSyllables } from '../../src/syllables/romanizedIthkuilToSyllables'
import { split } from '../helpers'

describe.each([
  ['arţtulawá ulhiliolu wiosaḑca iţkuil', 'arţ-tu-la-wá ul-hi-li-o-lu wi-o-saḑ-ca iţ-kuil'],
  ['ärţtulawá ulhiliolu wiosaḑca iţkuil', 'ärţ-tu-la-wá ul-hi-li-o-lu wi-o-saḑ-ca iţ-kuil'],
])('%s', (word: string, syllables: string) => {
  it(`resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(split(syllables))
  })
})
