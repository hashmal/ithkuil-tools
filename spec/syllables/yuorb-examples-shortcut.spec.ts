import { romanizedIthkuilToSyllables } from '../../src/syllables/romanizedIthkuilToSyllables'
import { split } from '../helpers'

describe.each([
  ['yedpéi mmoi', 'ye-dpéi mmoi'],
  ['edpadéi mmoi', 'e-dpa-déi mmoi'],
  ['weinţdâ', 'weinţ-dâ'],
  ['enţdarâ', 'enţ-da-râ'],
])('%s', (word: string, syllables: string) => {
  it(`resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(split(syllables))
  })
})
