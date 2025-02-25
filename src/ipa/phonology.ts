// CONSONANTS

export const CONSONANTS = [
  'p' , 'b' , 'm' , 't' , 'd' , 'n' , 'k' , 'g' , 'ň' , 'ʼ',
  'f' , 'v' , 'ţ' , 'ḑ' , 's' , 'z' , 'c' , 'ẓ' , 'š' , 'ž' , 'č' , 'j' , 'ç' , 'x' , 'h' , 'ļ',
  'w' , 'r' , 'y' , 'ř' , 'l',
] as const
export type Consonant = typeof CONSONANTS[number]

// VOWELS

export const VOWELS = ['i', 'ü', 'u', 'e', 'ö', 'ë', 'o', 'ä', 'a'] as const
export type Vowel = typeof VOWELS[number]

export const STRESSED_VOWELS = ['í', 'û', 'ú', 'é', 'ô', 'ê', 'ó', 'â', 'á'] as const
export type StressedVowel = typeof STRESSED_VOWELS[number]

export const VOWELS_STRING = VOWELS.join('')
export const STRESSED_VOWELS_STRING = STRESSED_VOWELS.join('')

export const DIPHTHONGS = ['ai', 'ei', 'ëi', 'oi', 'ui', 'au', 'eu', 'ëu', 'ou', 'iu'] as const
export type Diphthong = typeof DIPHTHONGS[number]

/* STRESS NOTATION

Though not part of normal orthography, a number of devices exist that are used by linguists and others to indicate the position of stress (and syllabification in some cases) when it is desirable to do so. Some of these are listed here.

- Most commonly, the stress mark is placed before the beginning of the stressed syllable, where a syllable is definable. However, it is occasionally placed immediately before the vowel.[20] In the International Phonetic Alphabet (IPA), primary stress is indicated by a high vertical line (primary stress mark: ˈ) before the stressed element, secondary stress by a low vertical line (secondary stress mark: ˌ). For example, [sɪˌlæbəfɪˈkeɪʃən] or /sɪˌlæbəfɪˈkeɪʃən/. Extra stress can be indicated by doubling the symbol: ˈˈ◌.

- Linguists frequently mark primary stress with an acute accent over the vowel, and secondary stress by a grave accent. Example: [sɪlæ̀bəfɪkéɪʃən] or /sɪlæ̀bəfɪkéɪʃən/. That has the advantage of not requiring a decision about syllable boundaries.

(Source: Wikipedia)
 */
