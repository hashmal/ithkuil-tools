export function split(word: string): string[][] {
  return word.split(' ').map(s => s.split('-'))
}
