import { SyllableSplitter } from './SyllableSplitter'

/** Convert a Romanized Ithkuil word to an array of syllables
 *
 * @param {string} romanizedIthkuilWord - Romanized Ithkuil word
 * @returns {string[]} Array of syllables
 */
export function romanizedIthkuilToSyllables(romanizedIthkuilText: string): string[][] {
  const boundaries = []
  for (const word of romanizedIthkuilText.split(/\s+/)) {
    const syllableSplitter = new SyllableSplitter(word)
    boundaries.push(syllableSplitter.splitSyllables())
  }
  return boundaries
}
