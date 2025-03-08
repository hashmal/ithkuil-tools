// VOWELS

import { match, P } from 'ts-pattern'

export const VOWELS = ['i', 'ü', 'u', 'e', 'ö', 'ë', 'o', 'ä', 'a'] as const
export type Vowel = typeof VOWELS[number]

export const STRESSED_VOWELS = ['í', 'û', 'ú', 'é', 'ô', 'ê', 'ó', 'â', 'á'] as const
export type StressedVowel = typeof STRESSED_VOWELS[number]

export const DIPHTHONGS = ['ai', 'ei', 'ëi', 'oi', 'ui', 'au', 'eu', 'ëu', 'ou', 'iu'] as const
export type Diphthong = typeof DIPHTHONGS[number]


// CONSONANTS

export const CONSONANTS = [
  'p', 'b', 'm', 't', 'd', 'n', 'k', 'g', 'ň', 'ʼ',
  'f', 'v', 'ţ', 'ḑ', 's', 'z', 'c', 'ẓ', 'š', 'ž', 'č', 'j', 'ç', 'x', 'h', 'ļ',
  'w', 'r', 'y', 'ř', 'l',
] as const
export type Consonant = typeof CONSONANTS[number]


// GEMINABLES

export const BETWEEN_VOWELS_GEMINABLES = [
  'p' , 'b' , 'm' , 't' , 'd' , 'n' , 'k' , 'g' , 'ň' ,
  'f' , 'v' , 'ţ' , 'ḑ' , 's' , 'z' , 'c' , 'ẓ' , 'š' , 'ž' , 'č' , 'j' , 'ç' , 'x' , 'h' , 'ļ',
  'r' , 'ř' , 'l', // all but 'w', 'y' and 'ʼ'
] as const
export type BetweenVowelsGeminable = typeof BETWEEN_VOWELS_GEMINABLES[number]

export const CONTINUANT_GEMINABLES = ['ç', 'ḑ', 'f', 'h', 'l', 'ļ', 'm', 'n', 'ň', 'r', 'ř', 's', 'š', 'ţ', 'v', 'x', 'z', 'ž'] as const // add 'r'?
export type ContinuantGeminable = typeof CONTINUANT_GEMINABLES[number]

export const STOPS_GEMINABLES = ['b', 'd', 'g', 'k', 'p', 't'] as const
export type StopGeminable = typeof STOPS_GEMINABLES[number]


// CONSONANT CATEGORIES

// Stops

export const STOPS = ['p', 'b', 't', 'd', 'k', 'g', 'ʼ'] as const
export type Stop = typeof STOPS[number]

const GLOTTAL_STOPS = ['ʼ'] as const
// type GlottalStop = typeof GLOTTAL_STOPS[number]

// Fricatives

export const FRICATIVES = ['f', 'v', 'ţ', 'ḑ', 's', 'z', 'š', 'ž', 'ç', 'x', 'h', 'ļ'] as const
export type Fricative = typeof FRICATIVES[number]

const LABIODENTAL_FRICATIVES = ['f', 'v'] as const
// type LabiodentalFricative = typeof LABIODENTAL_FRICATIVES[number]

const INTERDENTAL_FRICATIVES = ['ţ', 'ḑ'] as const
// type InterdentalFricative = typeof INTERDENTAL_FRICATIVES[number]

const APICOALVEOLAR_FRICATIVES = ['s', 'z'] as const
// type ApicoalveolarFricative = typeof APICOALVEOLAR_FRICATIVES[number]

const ALVEOLOPALATAL_FRICATIVES = ['š', 'ž'] as const
// type AlveolopalatalFricative = typeof ALVEOLOPALATAL_FRICATIVES[number]

const PALATAL_FRICATIVES = ['ç'] as const
// type PalatalFricative = typeof PALATAL_FRICATIVES[number]

const VELAR_FRICATIVES = ['x'] as const
// type VelarFricative = typeof VELAR_FRICATIVES[number]

const GLOTTAL_FRICATIVES = ['h'] as const
// type GlottalFricative = typeof GLOTTAL_FRICATIVES[number]

const LATERAL_FRICATIVES = ['ļ'] as const
// type LateralFricative = typeof LATERAL_FRICATIVES[number]

// Affricates

export const AFFRICATES = ['c', 'ẓ', 'č', 'j'] as const
export type Affricate = typeof AFFRICATES[number]

// Nasals

export const NASALS = ['m', 'n', 'ň'] as const
export type Nsaal = typeof NASALS[number]

// Flap-Trills

export const FLAP_TRILL = ['r'] as const
export type FlapTrill = typeof FLAP_TRILL[number]

// Approximants

export const APPROXIMANTS = ['w', 'y', 'ř', 'l'] as const
export type Approximant = typeof APPROXIMANTS[number]

export enum ConsonantCategory {
  GlottalStop = 6.6,
  Stop = 6,
  Affricate = 5,
  LabiodentalFricative = 4.8,
  InterdentalFricative = 4.7,
  ApicoalveolarFricative = 4.6,
  AlveolopalatalFricative = 4.5,
  PalatalFricative = 4.4,
  VelarFricative = 4.3,
  GlottalFricative = 4.2,
  LateralFricative = 4.1,
  Fricative = 4,
  Nsaal = 3,
  FlapTrill = 2,
  Approximant = 1
}

function regExp(consonants: unknown): RegExp {
  const cs = consonants as string[]
  return new RegExp(`[${cs.join('')}]`)
}

/** Establish a hierarchy between consonant categories to help with syllable splitting.
 *
 * The hierarchy is as follows:
 *
 * - Stops
 * - Fricatives
 * - Affricates
 * - Nasals
 * - Flap/Trill
 * - Approximants
 *
 * @param letter a single consonant letter
 * @returns the consonant category of the letter
 */
export function getConsonantCategory(letter: string): ConsonantCategory | 0 {
  return match(letter)
    .with(P.string.regex(regExp(GLOTTAL_STOPS)),
      () => ConsonantCategory.GlottalStop)
    .with(P.string.regex(regExp(STOPS)),
      () => ConsonantCategory.Stop)

    .with(P.string.regex(regExp(AFFRICATES)),
      () => ConsonantCategory.Affricate)

    .with(P.string.regex(regExp(LABIODENTAL_FRICATIVES)),
      () => ConsonantCategory.LabiodentalFricative)
    .with(P.string.regex(regExp(INTERDENTAL_FRICATIVES)),
      () => ConsonantCategory.InterdentalFricative)
    .with(P.string.regex(regExp(APICOALVEOLAR_FRICATIVES)),
      () => ConsonantCategory.ApicoalveolarFricative)
    .with(P.string.regex(regExp(ALVEOLOPALATAL_FRICATIVES)),
      () => ConsonantCategory.AlveolopalatalFricative)
    .with(P.string.regex(regExp(PALATAL_FRICATIVES)),
      () => ConsonantCategory.PalatalFricative)
    .with(P.string.regex(regExp(VELAR_FRICATIVES)),
      () => ConsonantCategory.VelarFricative)
    .with(P.string.regex(regExp(GLOTTAL_FRICATIVES)),
      () => ConsonantCategory.GlottalFricative)
    .with(P.string.regex(regExp(LATERAL_FRICATIVES)),
      () => ConsonantCategory.LateralFricative)
    .with(P.string.regex(regExp(FRICATIVES)),
      () => ConsonantCategory.Fricative)

    .with(P.string.regex(regExp(NASALS)),
      () => ConsonantCategory.Nsaal)
    .with(P.string.regex(regExp(FLAP_TRILL)),
      () => ConsonantCategory.FlapTrill)
    .with(P.string.regex(regExp(APPROXIMANTS)),
      () => ConsonantCategory.Approximant)
    .otherwise(() => 0)
}
