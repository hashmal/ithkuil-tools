import { romanizedIthkuilToSyllables } from '../../src/syllables/romanizedIthkuilToSyllables'
import { split } from '../helpers'

describe.each([
  ['zalá kšili ežḑatļëi', 'za-lá kši-li e-žḑa-tļëi'],
  ['zatļá kšili wežḑëi', 'za-tļá kši-li we-žḑëi'],
])('%s', (word: string, syllables: string) => {
  it(`resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(split(syllables))
  })
})
