import { SyllableSplitter } from './SyllableSplitter'

/** Convert a Romanized Ithkuil word to an array of syllables
 *
 * @param {string} romanizedIthkuilText - Romanized Ithkuil text
 * @returns {string[][]} Array of array of syllable boundary indexes
 */
export function romanizedIthkuilToSyllableBoundaries(romanizedIthkuilText: string): number[][] {
  const boundaries = []
  for (const word of romanizedIthkuilText.split(/\s+|-/)) {
    const syllableSplitter = new SyllableSplitter(word)
    boundaries.push(syllableSplitter.syllableBoundaries())
  }
  return boundaries
}
