import { SyllableSplitter } from './SyllableSplitter'

/** Convert a Romanized Ithkuil word to an array of syllables
 *
 * @param {string} romanizedIthkuilWord - Romanized Ithkuil word
 * @returns {string[]} Array of syllables
 */
export function romanizedIthkuilToSyllableBoundaries(romanizedIthkuilWord: string): number[] {
  const syllableSplitter = new SyllableSplitter(romanizedIthkuilWord)
  return syllableSplitter.syllableBoundaries()
}
