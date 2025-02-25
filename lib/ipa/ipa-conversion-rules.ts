import { CONSONANTS, Consonant, VOWELS, Vowel } from '../phonology'

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
 * @internal */
export const CONVERTION_RULES: {
  [key: string]: IpaConverterMatcher
} = {

  // SPECIAL CHARACTERS

  ' ': (_lb, _la) => (' '), // Space character
  '-': (_lb, _la) => ('-'), // Silent, concatenation character

  // VOWELS

  'a': (_lb, _la) => ('a'), // [a] as in "alta" (or [ɑ] as in "father")

  'ä': (_lb, _la) => ('æ'), // [æ] as in American English "cat"

  'e': (_lb, la) => {
    if (beginingOfBivocalicConjunct(la)) return ('e') // [e] at the beginning of a bivocalic conjunct
    return 'ɛ' // [ɛ] as in English let
  },

  'ë': (_lb, _la) => ('ʌ'), // [ʌ] like the u in English "cut", or the “schwa” sound [ə] like the a in English sofa, (or as [ɤ] in Mandarin)

  'i': (lb, la) => {
    if (beginingOfBivocalicConjunct(la)) return 'i' // [i] at the beginning of a bivocalic conjunct
    if (lb(1) === 'y' || la(1) === 'y') return 'ɪ' // [ɪ] when preceded or followed by y
    return 'i' // default value to fill a void in the documentation
  },

  'o': (_lb, la) => {
    if (beginingOfBivocalicConjunct(la)) return ('o') // [o] at the beginning of a bivocalic conjunct
    return 'ɔ' // [ɔ] like the first o in Italian "otto"
  },

  'ö': (_lb, la) => {
    if (beginingOfBivocalicConjunct(la)) return ('ø') // [ø] at the beginning of a bivocalic conjunct
    return 'œ' // [œ] as in French "neuf"
    // return 'ø' // [ø] as in French "feu"
  },

  'u': (lb, la) => {
    if (beginingOfBivocalicConjunct(la)) return 'u' // [u] at the beginning of a bivocalic conjunct
    if (lb(1) === 'w' || la(1) === 'w') return 'ʊ' // [ʊ] when preceded or followed by w
    return 'u' // default value to fill a void in the documentation
  },

  'ü': (lb, _la) => {
    if ('yw'.indexOf(lb(1)) >= 0 && lb(1).length > 0) return 'ʉ' // [ʉ] when preceded by y or w
    return 'y' // [y] as in French lune
  },

  // CONSONANTS

  'p': (_lb, _la) => ('p'),
  'k': (_lb, _la) => ('k'),
  't': (_lb, _la) => ('t̪'),
  'd': (_lb, _la) => ('d̪'),
  'g': (_lb, _la) => ('g'),

  'h': (lb, la) => {
    if (la(1) === '' && 'ptkcč'.split('').includes(lb(1))) return 'ʰ' // [ʰ] in word-final position after p, t, k, c, and č
    return 'h' // [h] in all positions where it appears, even in word-final position
  },
  // TODO: handle syllable-initial -ph-, -th-, -kh-, -ch-, -čh-. to be pronounced as aspirated stops/affricates [pʰ, tʰ, kʰ, tsʰ, tʃʰ]. unless between two vowels.
  // Syllable-initial or word-final -ph-, -th-, -kh-, -ch-, -čh- are pronounced as aspirated stops/affricates [pʰ, tʰ, kʰ, tsʰ, tʃʰ] but when between two vowels, they are disyllabic and pronounced as in English "haphazard", "at-hand", "backhanded", "it’s here" and "church hall";
  // TODO: handle the possibility of single voiceless consonants: hl = [ɬ], hr = [ɾ̥], hm = [m̥], hn = [n̥].
  // the combinations -hl-, -hr-, -hm- and -hn- may be pronounced as separate consonants or as the following single voiceless consonants: hl = [ɬ], hr = [ɾ̥], hm = [m̥], hn = [n̥].

  'ʼ': (_lb, _la) => ('Ɂ'), // [ʔ] as in English uh-oh

  'ţ': (_lb, _la) => ('θ'), // [θ] as in English thin
  'ḑ': (_lb, _la) => ('ð'), // [ð] as in English this

  'š': (_lb, _la) => ('ʃ'), // [ʃ] unrounded, as in English mesh
  'ž': (_lb, _la) => ('ʒ'), // [ʒ] unrounded, As in English measure

  'ç': (_lb, _la) => ('ç'), // [ç] as heard in the initial sound of English human or hue, or in the German word richtig, or in Japanese ひ (hi) and the palatalization hy-.

  'x': (_lb, _la) => ('x'), // [x~χ] as in either Latin American or Castilian Spanish "jota", Russian "хорошо", German "bach", or Mandarin "h-".

  'l': (_lb, _la) => ('l̪'), // [l̪] as in French, Spanish, or Italian

  'ļ': (_lb, _la) => ('ɬ'), // [ɬ] as found in Welsh llan

  'c': (_lb, _la) => ('ts'), // [ts] as in English bits or Italian pizza
  'ẓ': (_lb, _la) => ('dz'), // [dz] as in English bids or Italian azzurro

  'č': (_lb, _la) => ('tʃ'), // [tʃ] as in English butch
  'j': (_lb, _la) => ('dʒ'), // [dʒ] as in English budge

  'n': (_lb, la) => {
    const la1 = la(1)
    if (la1 === 'ř') return 'n'
    if ('kgx'.split('').includes(la1)) return 'ŋ' // [ŋ] before k, g, and x
    return 'n' // [n] is dental, not alveolar
  },

  'ň': (_lb, _la) => ('ŋ'), // [ŋ] as in English bring

  'r': (_lb, la) => {
    if (followedByAConsonant(la)) return 'ɹ' // [ɹ] as in English red
    return 'ɾ' // single tap / flap [ɾ]
  },

  'ř': (_lb, _la) => ('ʁ'), // [ʁ] as in French rire or German Ruhr
  // When geminated it is either [ʁː] or can be strengthened to a uvular trill [ʀ]

  'y': (_lb, _la) => ('j'), // [j] as in English yes or German ja

  'b': (_lb, _la) => ('b'),
  'f': (_lb, _la) => ('f'),
  'm': (_lb, _la) => ('m'),
  's': (_lb, _la) => ('s'),
  'v': (_lb, _la) => ('v'),
  'w': (_lb, _la) => ('w'),
  'z': (_lb, _la) => ('z'),
}
