import { SyllableSplitter } from './SyllableSplitter'

/** Convert a romanized Ithkuil text to an array of syllables
 *
 * @param {string} romanizedIthkuilText - Romanized Ithkuil text
 * @returns {string[][]} Array of array of syllables
 */
export function romanizedIthkuilToSyllables(romanizedIthkuilText: string): string[][] {
  const boundaries = []
  for (const word of romanizedIthkuilText.split(/\s+|-/)) {
    const syllableSplitter = new SyllableSplitter(word)
    boundaries.push(syllableSplitter.splitSyllables())
  }
  return boundaries
}
