import { SyllableSplitter } from './SyllableSplitter'

/** Convert a Romanized Ithkuil word to an array of syllables
 *
 * @param {string} romanizedIthkuilWord - Romanized Ithkuil word
 * @returns {string[]} Array of syllables
 */
export function romanizedIthkuilToSyllables(romanizedIthkuilWord: string): string {
  const syllableSplitter = new SyllableSplitter(romanizedIthkuilWord)
  const syllables = syllableSplitter.splitSyllables()
  return syllables.join('-')
}
