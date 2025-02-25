import { CONSONANTS, Consonant, VOWELS, Vowel } from './phonology'

/** Matcher signature
 * @internal */
export type IpaConverterMatcher = (lb: (length: number) => string, la: (length: number) => string) => string | undefined

/** Utility function to check if a character is followed by a vowel.
 *
 * @param la Lookahead function.
 * @returns `true` if the character is followed by a vowel, `false` otherwise.
 */
function beginingOfBivocalicConjunct(la: (n: number) => string): boolean {
  return VOWELS.indexOf(la(1) as Vowel) >= 0
}

/** Utility function to check if a character is followed by a consonant.
 *
 * @param la Lookahead function.
 * @returns `true` if the character is followed by a consonant, `false` otherwise.
 */
function followedByAConsonant(la: (n: number) => string): boolean {
  return CONSONANTS.indexOf(la(1) as Consonant) >= 0
}

/** Matchers to be used by `IpaConverter`
 *
 * @remarks Check the associated spec file for more information about the conversion rules.
 * @internal */
export const CONVERTION_RULES: { [key: string]: IpaConverterMatcher } = {

  // SPECIAL CHARACTERS

  ' ': (_lb, _la) => (' '),
  '-': (_lb, _la) => ('-'),

  // VOWELS

  'a': (_lb, _la) => ('a'),

  'ä': (_lb, _la) => ('æ'),

  'e': (_lb, la) => {
    if (beginingOfBivocalicConjunct(la)) return 'e'
    return 'ɛ'
  },

  'ë': (_lb, _la) => ('ʌ'),

  'i': (lb, la) => {
    if (beginingOfBivocalicConjunct(la)) return 'i'
    if (lb(1) === 'y' || la(1) === 'y') return 'ɪ'
    return 'i'
  },

  'o': (_lb, la) => {
    if (beginingOfBivocalicConjunct(la)) return 'o'
    return 'ɔ'
  },

  'ö': (_lb, la) => {
    if (beginingOfBivocalicConjunct(la)) return 'ø'
    return 'œ'
  },

  'u': (lb, la) => {
    if (beginingOfBivocalicConjunct(la)) return 'u'
    if (lb(1) === 'w' || la(1) === 'w') return 'ʊ'
    return 'u'
  },

  'ü': (lb, _la) => {
    if ('yw'.indexOf(lb(1)) >= 0 && lb(1).length > 0) return 'ʉ'
    return 'y'
  },

  // CONSONANTS

  'p': (_lb, _la) => ('p'),
  'k': (_lb, _la) => ('k'),
  't': (_lb, _la) => ('t̪'),
  'd': (_lb, _la) => ('d̪'),
  'g': (_lb, _la) => ('g'),

  'h': (lb, la) => {
    if (la(1) === '' && 'ptkcč'.split('').includes(lb(1))) return 'ʰ'
    return 'h'
  },

  'ʼ': (_lb, _la) => ('Ɂ'),

  'ţ': (_lb, _la) => ('θ'),
  'ḑ': (_lb, _la) => ('ð'),

  'š': (_lb, _la) => ('ʃ'),
  'ž': (_lb, _la) => ('ʒ'),

  'ç': (_lb, _la) => ('ç'),

  'x': (_lb, _la) => ('x'),

  'l': (_lb, _la) => ('l̪'),

  'ļ': (_lb, _la) => ('ɬ'),

  'c': (_lb, _la) => ('ts'),
  'ẓ': (_lb, _la) => ('dz'),

  'č': (_lb, _la) => ('tʃ'),
  'j': (_lb, _la) => ('dʒ'),

  'n': (_lb, la) => {
    const la1 = la(1)
    if (la1 === 'ř') return 'n'
    if ('kgx'.split('').includes(la1)) return 'ŋ'
    return 'n'
  },

  'ň': (_lb, _la) => ('ŋ'),

  'r': (_lb, la) => {
    if (followedByAConsonant(la)) return 'ɹ'
    return 'ɾ'
  },

  'ř': (_lb, _la) => ('ʁ'),

  'y': (_lb, _la) => ('j'),

  'b': (_lb, _la) => ('b'),
  'f': (_lb, _la) => ('f'),
  'm': (_lb, _la) => ('m'),
  's': (_lb, _la) => ('s'),
  'v': (_lb, _la) => ('v'),
  'w': (_lb, _la) => ('w'),
  'z': (_lb, _la) => ('z'),
}
