import { romanizedIthkuilToSyllables } from '../../src/syllables/romanizedIthkuilToSyllables'
import { split } from '../helpers'

describe.each([
  ['byalá pa', 'bya-lá pa'],
  ['vvralá mi wurçpi', 'vvra-lá mi wurç-pi'],
  ['tlasatřá çkava', 'tla-sa-třá çka-va'],
  ['txasá ku', 'txa-sá ku'],
  ['waltlá wele lo', 'wal-tlá we-le lo'],
  ['malá welu wiosaḑcä espanya', 'ma-lá we-lu wi-o-saḑ-cä es-pa-nya'],
  ['yeg arrlalu', 'yeg arr-la-lu'],
  ['byulá pa', 'byu-lá pa'],
  ['vvralá mi urçpuli', 'vvra-lá mi urç-pu-li'],
  ['tlusatřá çkava', 'tlu-sa-třá çka-va'],
  ['txusá ku', 'txu-sá ku'],
  ['altlulá wele lo', 'al-tlu-lá we-le lo'],
  ['mulá welu wiosaḑcä espanya', 'mu-lá we-lu wi-o-saḑ-cä es-pa-nya'],
  ['egúd arrlalu', 'e-gúd arr-la-lu'],
])('%s', (word: string, syllables: string) => {
  it(`resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(split(syllables))
  })
})
