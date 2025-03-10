import { romanizedIthkuilToSyllables } from '../../src/syllables/romanizedIthkuilToSyllables'
import { split } from '../helpers'

/** The following specs pass when they should fail.
 * Expected behavior is explained in the comments.
 * Fully commented specs are considered solved.
 */
describe.skip.each([
  // ['wezvwauš', 'wez-vwauš'], // [wɛ.zvwauʃ] instead of [wɛz.vwauʃ]
  // ['wezçauš', 'wez-çauš'], // [wɛ.zçauʃ] instead of [wɛz.çauʃ]
  // ['epssaloʼë', 'e-pssa-lo-ʼë'], // [epss-a-lo-ʼë] instead of [e-pssa-lo-ʼë]
  // ['opsspa', 'opss-pa'], // [o-psspa] instead of [opss-pa]
  ['amfspa', 'am-fspa'], // [amfs-pa] instead of [amf-spa]
  // ['alpšška', 'alpšš-ka'], // [alpšš-ka] instead of [alp-šška]
  // ['epssaloʼë', 'epssa-lo-ʼë'], // [epss-a-lo-ʼë] instead of [e-pssa-lo-ʼë]
  // ['wellyawá urwaleʼö', 'we-llya-wá u-rwa-le-ʼö'],
])('%s', (word: string, syllables: string) => {
  it(`resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(split(syllables))
  })
})
