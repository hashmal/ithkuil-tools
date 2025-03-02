import { romanizedIthkuilToSyllables } from '../../src/syllables/romanizedIthkuilToSyllables'

function split(word: string): string[][] {
  return word.split(' ').map(s => s.split('-'))
}

describe.each([
  // Configuration
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
  // Affiliation
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
  // Perspective
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
