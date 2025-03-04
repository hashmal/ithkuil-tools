import { romanizedIthkuilToSyllables } from '../../src/syllables/romanizedIthkuilToSyllables'
import { split } from '../helpers'

describe.skip.each([
  ['uẓfäl', 'u-ẓfäl'], // [u.dzfæl̪] instead of [udz.fæl̪]
  ['wezvwauš', 'we-zvwauš'], // [wɛ.zvwauʃ] instead of [wɛz.vwauʃ]
])('%s', (word: string, syllables: string) => {
  it(`resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(split(syllables))
  })
})
