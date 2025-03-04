import { romanizedIthkuilToSyllables } from '../../src/syllables/romanizedIthkuilToSyllables'
import { split } from '../helpers'

describe.each([
  ['frulawá warru přeluʼa', 'fru-la-wá wa-rru pře-lu-ʼa'],
  ['fruilawá rrailu přeʼilua', 'frui-la-wá rrai-lu pře-ʼi-lu-a'],
  ['frualawá rrialu přiʼolua', 'fru-a-la-wá rri-a-lu při-ʼo-lu-a'],
  ['froalawá rraolu přaʼölua', 'fro-a-la-wá rra-o-lu přa-ʼö-lu-a'],
])('%s', (word: string, syllables: string) => {
  it(`resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(split(syllables))
  })
})
