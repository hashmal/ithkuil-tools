import { SyllableSplitter } from './SyllableSplitter'

export function romanizedIthkuilToSyllables(romanizedIthkuilWord: string): string {
  const syllableSplitter = new SyllableSplitter(romanizedIthkuilWord)
  const syllables = syllableSplitter.splitSyllables()
  return syllables.join('-')
}
