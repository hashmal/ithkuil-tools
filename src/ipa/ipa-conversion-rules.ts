import { CONSONANTS, Consonant, VOWELS, Vowel } from '../phonology'


/** Context for a matcher function
 * @internal */
export type MatcherContext = {
  lb: (length: number) => string,
  la: (length: number) => string,
  syllablesBoundaries: number[],
  currentIndex: number,
}

/** Matcher signature
 * @internal */
export type IpaConverterMatcher = (ctx: MatcherContext) => string | undefined

/** Utility function to check if a character is followed by a vowel.
 *
 * @param la Lookahead function.
 * @returns `true` if the character is followed by a vowel, `false` otherwise.
 */
function beginingOfBivocalicConjunct(la: (n: number) => string): boolean {
  return VOWELS.indexOf(la(1) as Vowel) >= 0
}

function followingAVowel(lb: (n: number) => string): boolean {
  return VOWELS.indexOf(lb(1) as Vowel) >= 0
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

  ' ': (_ctx) => (' '),
  '-': (_ctx) => ('-'),

  // VOWELS

  'a': (_ctx) => ('a'),

  'ä': (_ctx) => ('æ'),

  'e': (ctx) => {
    if (beginingOfBivocalicConjunct(ctx.la)) return 'e'
    return 'ɛ'
  },

  'ë': (_ctx) => ('ʌ'),

  'i': (ctx) => {
    if (beginingOfBivocalicConjunct(ctx.la)) return 'i'
    if (ctx.lb(1) === 'y' || ctx.la(1) === 'y') return 'ɪ'
    return 'i'
  },

  'o': (ctx) => {
    if (beginingOfBivocalicConjunct(ctx.la)) return 'o'
    return 'ɔ'
  },

  'ö': (ctx) => {
    if (beginingOfBivocalicConjunct(ctx.la)) return 'ø'
    return 'œ'
  },

  'u': (ctx) => {
    if (beginingOfBivocalicConjunct(ctx.la)) return 'u'
    if (ctx.lb(1) === 'w' || ctx.la(1) === 'w') return 'ʊ'
    return 'u'
  },

  'ü': (ctx) => {
    if ('yw'.indexOf(ctx.lb(1)) >= 0 && ctx.lb(1).length > 0) return 'ʉ'
    return 'y'
  },

  // CONSONANTS

  'p': (_ctx) => ('p'),
  'k': (_ctx) => ('k'),
  't': (_ctx) => ('t̪'),
  'd': (_ctx) => ('d̪'),
  'g': (_ctx) => ('g'),

  'h': (ctx) => {
    if (ctx.la(1) === '' && 'ptkcč'.split('').includes(ctx.lb(1))) return 'ʰ'
    if (beginingOfBivocalicConjunct(ctx.la) && ctx.lb(2).match(/[ptkcč]/)) return 'h'
    if (ctx.syllablesBoundaries.includes(ctx.currentIndex-2) && 'ptkcč'.split('').includes(ctx.lb(1))) return 'ʰ'
    return 'h'
  },

  'ʼ': (_ctx) => ('Ɂ'),

  'ţ': (_ctx) => ('θ'),
  'ḑ': (_ctx) => ('ð'),

  'š': (_ctx) => ('ʃ'),
  'ž': (_ctx) => ('ʒ'),

  'ç': (_ctx) => ('ç'),

  'x': (_ctx) => ('x'),

  'l': (_ctx) => ('l̪'),

  'ļ': (_ctx) => ('ɬ'),

  'c': (_ctx) => ('ts'),
  'ẓ': (_ctx) => ('dz'),

  'č': (_ctx) => ('tʃ'),
  'j': (_ctx) => ('dʒ'),

  'n': (ctx) => {
    const la1 = ctx.la(1)
    if (la1 === 'ř') return 'n'
    if ('kgx'.split('').includes(la1)) return 'ŋ'
    return 'n'
  },

  'ň': (_ctx) => ('ŋ'),

  'r': (ctx) => {
    if (followedByAConsonant(ctx.la)) return 'ɹ'
    return 'ɾ'
  },

  'ř': (_ctx) => ('ʁ'),

  'y': (_ctx) => ('j'),

  'b': (_ctx) => ('b'),
  'f': (_ctx) => ('f'),
  'm': (_ctx) => ('m'),
  's': (_ctx) => ('s'),
  'v': (_ctx) => ('v'),
  'w': (_ctx) => ('w'),
  'z': (_ctx) => ('z'),
}
