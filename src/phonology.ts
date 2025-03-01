// VOWELS

import { match, P } from 'ts-pattern'

export const VOWELS = ['i', 'ü', 'u', 'e', 'ö', 'ë', 'o', 'ä', 'a'] as const
export type Vowel = typeof VOWELS[number]

export const STRESSED_VOWELS = ['í', 'û', 'ú', 'é', 'ô', 'ê', 'ó', 'â', 'á'] as const
export type StressedVowel = typeof STRESSED_VOWELS[number]

export const VOWELS_STRING = VOWELS.join('')
export const STRESSED_VOWELS_STRING = STRESSED_VOWELS.join('')

export const DIPHTHONGS = ['ai', 'ei', 'ëi', 'oi', 'ui', 'au', 'eu', 'ëu', 'ou', 'iu'] as const
export type Diphthong = typeof DIPHTHONGS[number]


// CONSONANTS

export const CONSONANTS = [
  'p', 'b', 'm', 't', 'd', 'n', 'k', 'g', 'ň', 'ʼ',
  'f', 'v', 'ţ', 'ḑ', 's', 'z', 'c', 'ẓ', 'š', 'ž', 'č', 'j', 'ç', 'x', 'h', 'ļ',
  'w', 'r', 'y', 'ř', 'l',
] as const
export type Consonant = typeof CONSONANTS[number]

export const STOPS = ['p', 'b', 't', 'd', 'k', 'g', 'ʼ'] as const
export type Stop = typeof STOPS[number]

export const FRICATIVES = ['f', 'v', 'ţ', 'ḑ', 's', 'z', 'š', 'ž', 'ç', 'x', 'h', 'ļ'] as const
export type Fricative = typeof FRICATIVES[number]

export const AFFRICATES = ['c', 'ẓ', 'č', 'j'] as const
export type Affricate = typeof AFFRICATES[number]

export const NASALS = ['m', 'n', 'ň'] as const
export type Nsaal = typeof NASALS[number]

export const FLAP_TRILL = ['r'] as const
export type FlapTrill = typeof FLAP_TRILL[number]

export const APPROXIMANTS = ['w', 'y', 'ř', 'l'] as const
export type Approximant = typeof APPROXIMANTS[number]

export enum ConsonantCategory {
  Stop = 6,
  Fricative = 5,
  Affricate = 4,
  Nsaal = 3,
  FlapTrill = 2,
  Approximant = 1
}

export function getConsonantCategory(letter: string): ConsonantCategory | 0 {
  return match(letter)
    .with(P.string.regex(new RegExp(`[${STOPS.join()}]`)), () => ConsonantCategory.Stop)
    .with(P.string.regex(new RegExp(`[${FRICATIVES.join()}]`)), () => ConsonantCategory.Fricative)
    .with(P.string.regex(new RegExp(`[${AFFRICATES.join()}]`)), () => ConsonantCategory.Affricate)
    .with(P.string.regex(new RegExp(`[${NASALS.join()}]`)), () => ConsonantCategory.Nsaal)
    .with(P.string.regex(new RegExp(`[${FLAP_TRILL.join()}]`)), () => ConsonantCategory.FlapTrill)
    .with(P.string.regex(new RegExp(`[${APPROXIMANTS.join()}]`)), () => ConsonantCategory.Approximant)
    .otherwise(() => 0)
}

// GEMINATION

export const BETWEEN_VOWELS_GEMINABLES = [
  'p' , 'b' , 'm' , 't' , 'd' , 'n' , 'k' , 'g' , 'ň' ,
  'f' , 'v' , 'ţ' , 'ḑ' , 's' , 'z' , 'c' , 'ẓ' , 'š' , 'ž' , 'č' , 'j' , 'ç' , 'x' , 'h' , 'ļ',
  'r' , 'ř' , 'l', // all but 'w', 'y' and 'ʼ'
] as const
export type BetweenVowelsGeminable = typeof BETWEEN_VOWELS_GEMINABLES[number]

export const CONTINUANT_GEMINABLES = ['ç', 'ḑ', 'f', 'h', 'l', 'ļ', 'm', 'n', 'ň', 'ř', 's', 'š', 'ţ', 'v', 'x', 'z', 'ž'] as const // add 'r'?
export type ContinuantGeminable = typeof CONTINUANT_GEMINABLES[number]

export const STOPS_GEMINABLES = ['b', 'd', 'g', 'k', 'p', 't'] as const
export type StopGeminable = typeof STOPS_GEMINABLES[number]


/* STRESS NOTATION

Though not part of normal orthography, a number of devices exist that are used by linguists and others to indicate the position of stress (and syllabification in some cases) when it is desirable to do so. Some of these are listed here.

- Most commonly, the stress mark is placed before the beginning of the stressed syllable, where a syllable is definable. However, it is occasionally placed immediately before the vowel.[20] In the International Phonetic Alphabet (IPA), primary stress is indicated by a high vertical line (primary stress mark: ˈ) before the stressed element, secondary stress by a low vertical line (secondary stress mark: ˌ). For example, [sɪˌlæbəfɪˈkeɪʃən] or /sɪˌlæbəfɪˈkeɪʃən/. Extra stress can be indicated by doubling the symbol: ˈˈ◌.

- Linguists frequently mark primary stress with an acute accent over the vowel, and secondary stress by a grave accent. Example: [sɪlæ̀bəfɪkéɪʃən] or /sɪlæ̀bəfɪkéɪʃən/. That has the advantage of not requiring a decision about syllable boundaries.

(Source: Wikipedia)
 */
