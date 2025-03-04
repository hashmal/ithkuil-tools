import { romanizedIthkuilToSyllables } from '../../src/syllables/romanizedIthkuilToSyllables'
import { split } from '../helpers'

describe.each([
  ['avsal', 'a-vsal'],
  ['avsar', 'a-vsar'],
  ['avsav', 'a-vsav'],
  ['avsaj', 'a-vsaj'],
  ['ţrala', 'ţra-la'],
  ['ţrara', 'ţra-ra'],
  ['ţrava', 'ţra-va'],
  ['ţraja', 'ţra-ja'],
  ['elzaţ', 'el-zaţ'],
  ['elzaţra', 'el-za-ţra'],
  ['elzaţwa', 'el-za-ţwa'],
  ['elzaţya', 'el-za-ţya'],
])('%s', (word: string, syllables: string) => {
  it(`resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(split(syllables))
  })
})
