import { Diphthong, DIPHTHONGS, Vowel, VOWELS } from 'ipa/phonology'

function unstress(word: string) {
  return word
    .replace(/í/g, 'i')
    .replace(/û/g, 'ü')
    .replace(/ú/g, 'u')
    .replace(/é/g, 'e')
    .replace(/ô/g, 'ö')
    .replace(/ê/g, 'ë')
    .replace(/ó/g, 'o')
    .replace(/â/g, 'ä')
    .replace(/á/g, 'a')
}

export class SyllableSplitter3 {
  word!: string
  unstressedWord!: string
  index: number = 0

  constructor(word: string) {
    this.word = word
    this.unstressedWord = unstress(word)
  }

  vowelRanges(): number[] {
    const ranges: number[] = []
    for (let index = 0; index < this.unstressedWord.length; index++) {
      const character = this.unstressedWord[index]

      if (index === 0 && !(VOWELS).includes(character as Vowel)) {
        ranges.push(0)
        ranges.push(0)
      }

      if ((VOWELS).includes(character as Vowel)) {
        if (DIPHTHONGS.includes(this.unstressedWord.slice(index, index + 2) as Diphthong)) {
          ranges.push(index)
          ranges.push(index + 2)
          index++
        } else {
          ranges.push(index)
          ranges.push(index + 1)
        }
      }
    }
    return ranges
  }

  conflicts(): number[][] {
    const vowelRanges = this.vowelRanges()

    for (let index = 0; index < vowelRanges.length-2; index+=2) {
      const vowelBefore = this.word.slice(vowelRanges[index], vowelRanges[index + 1])
      const consonant = this.word.slice(vowelRanges[index + 1], vowelRanges[index + 2])
      const vowelAfter = this.word.slice(vowelRanges[index + 2], vowelRanges[index + 3])
      console.log({ vowelBefore, consonant, vowelAfter })

      // output.push(syllable)
    }

    // return output
  }
}
