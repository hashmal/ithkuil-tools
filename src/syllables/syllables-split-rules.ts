import {
  AFFRICATES,
  Approximant, APPROXIMANTS, Diphthong, DIPHTHONGS, FLAP_TRILL, FlapTrill, Fricative, FRICATIVES, NASALS, Stop, STOPS, STRESSED_VOWELS, Vowel, VOWELS,
} from 'ipa/phonology'

/** Matcher signature
 * @internal */
export type SyllableSplitterMatcher = (character: string, lb: (length: number) => string, la: (length: number) => string) => boolean

export const SYLLABLE_SPLIT_RULES: { [key: string]: SyllableSplitterMatcher } = {

  [`[${VOWELS.join('')}${STRESSED_VOWELS.join('')}]`]: (character, lb, la) => {
    if (STOPS.includes(lb(1) as Stop)) return false
    if (STOPS.includes(la(1) as Stop)) return true
    if (FLAP_TRILL.includes(lb(1) as FlapTrill)) return false
    if (APPROXIMANTS.includes(lb(1) as Approximant)) return false
    if (DIPHTHONGS.includes(character + la(1) as Diphthong)) return false
    if (DIPHTHONGS.includes(lb(1) + character as Diphthong)) return false
    if (FRICATIVES.includes(la(1) as Fricative)) return false
    if (FRICATIVES.includes(lb(1) as Fricative)) return false
    return true
  },

  [`[${STOPS.join('')}]`]: (_character, lb, _la) => {
    if (VOWELS.includes(lb(1) as Vowel)) return false
    return true
  },

  [`[${NASALS.join('')}]`]: (_character, _lb, _la) => {
    return true
  },

  [`[${FRICATIVES.join('')}]`]: (_character, lb, la) => {
    if (VOWELS.includes(lb(1) as Vowel)) return false
    if (VOWELS.includes(la(1) as Vowel)) return false
    if (STOPS.includes(lb(1) as Stop)) return false
    if (FRICATIVES.includes(lb(1) as Fricative)) return false
    if (FRICATIVES.includes(la(1) as Fricative)) return false
    return true
  },

  [`[${AFFRICATES.join('')}]`]: (_character, _lb, _la) => {
    return true
  },

  [`[${FLAP_TRILL.join('')}]`]: (_character, lb, _la) => {
    if (VOWELS.includes(lb(1) as Vowel)) return true
    if (FRICATIVES.includes(lb(1) as Fricative)) return true
    return true
  },

  [`[${APPROXIMANTS.join('')}]`]: (_character, _lb, _la) => {
    return true
  },
}
