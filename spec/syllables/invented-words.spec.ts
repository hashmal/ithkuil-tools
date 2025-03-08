import { romanizedIthkuilToSyllables } from '../../src/syllables/romanizedIthkuilToSyllables'
import { split } from '../helpers'

/** The following "words" have been generated programmatically in order to provide some examples for the tests. They mean nothing, but should be phonotactically valid and thus suitable for the task. */
describe.each([
  ['olmkççirnkḍöë', 'olm-kççirn-kḍö-ë'],
  ['eällžňwoöřndwäu', 'e-äll-žňwo-öřn-dwä-u'],
  // ['eorrfpweöţsmřä', 'eorrfpweöţsmřä'],
  // ['uopţthwäonnklë', 'uopţthwäonnklë'],
  // ['ëüřmmpulššbü', 'ëüřmmpulššbü'],
  // ['öällhwalvzgyöo', 'öällhwalvzgyöo'],
  // ['ebḍgyöülfçkio', 'ebḍgyöülfçkio'],
  // ['alkššwiökfdřüö', 'alkššwiökfdřüö'],
  // ['ëňžpluařgžžpëu', 'ëňžpluařgžžpëu'],
  // ['ařbţruüssxnü', 'ařbţruüssxnü'],
])('%s', (word: string, syllables: string) => {
  it(`resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(split(syllables))
  })
})
