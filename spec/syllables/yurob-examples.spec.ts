import { romanizedIthkuilToSyllables } from '../../src/syllables/romanizedIthkuilToSyllables'

function split(word: string): string[][] {
  return word.split(' ').map(s => s.split('-'))
}

describe.each([
  // cat
  ['rrala', 'rra-la'],
  ['rrasa', 'rra-sa'],
  ['rraca', 'rra-ca'],
  ['rraţsa', 'rra-ţsa'],
  ['rrata', 'rra-ta'],
  ['rraţa', 'rra-ţa'],
  ['rraza', 'rra-za'],
  // sphere
  ['anzwil', 'an-zwil'],
  ['anzwit', 'an-zwit'],
  ['anzwik', 'an-zwik'],
  ['anzwip', 'an-zwip'],
  ['anzwif', 'an-zwif'],
  ['anzwiç', 'an-zwiç'],
  ['anzwiž', 'an-zwiž'],
  // motion
  ['blöfêi', 'blö-fêi'],
  ['onţlilu', 'on-ţli-lu'],
  ['blöfêi onţlilu', 'blö-fêi on-ţli-lu'],
])('%s', (word: string, syllables: string) => {
  it(`resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(split(syllables))
  })
})
