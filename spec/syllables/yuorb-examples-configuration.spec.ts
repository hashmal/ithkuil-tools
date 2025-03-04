import { romanizedIthkuilToSyllables } from '../../src/syllables/romanizedIthkuilToSyllables'
import { split } from '../helpers'

describe.each([
  ['rrala', 'rra-la'],
  ['rrasa', 'rra-sa'],
  ['rraca', 'rra-ca'],
  ['rraţsa', 'rra-ţsa'],
  ['rrata', 'rra-ta'],
  ['rraţa', 'rra-ţa'],
  ['rraza', 'rra-za'],
  ['anzwil', 'an-zwil'],
  ['anzwit', 'an-zwit'],
  ['anzwik', 'an-zwik'],
  ['anzwip', 'an-zwip'],
  ['anzwif', 'an-zwif'],
  ['anzwiç', 'an-zwiç'],
  ['anzwiž', 'an-zwiž'],
  ['blöfêi onţlilu', 'blö-fêi on-ţli-lu'],
])('%s', (word: string, syllables: string) => {
  it(`resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(split(syllables))
  })
})
