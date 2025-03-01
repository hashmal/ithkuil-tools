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

export class SyllableSplitter {
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

  consonantSplit(consonant: string): number {
    if (consonant === 'zvw') return 1
    if (consonant === 'rd') return 1
    if (consonant === 'šb') return 1
    return 0
  }

  // lookBehind(length: number): string {
  //   return this.word.slice(this.index - length, this.index)
  // }

  // lookahead(length: number): string {
  //   return this.word.slice(this.index + 1, this.index + 1 + length)
  // }

  conflicts(): string[] {
    const vowelRanges = this.vowelRanges()
    const output: string[][] = []

    for (let index = 0; index < vowelRanges.length-2; index+=2) {
      const consonant = this.word.slice(vowelRanges[index + 1], vowelRanges[index + 2])
      // place consonant resolution here
      const consonantLength = consonant.length
      const split = this.consonantSplit(consonant)
      const consonantSplit = [
        consonant.slice(0, split),
        consonant.slice(split, consonantLength),
      ]
      // consonantSplit[0].length
      // consonantSplit[1].length
      const vowelBefore = this.word.slice(vowelRanges[index], vowelRanges[index + 1 + consonantSplit[0].length])
      const vowelAfter = this.word.slice(vowelRanges[index + 2], vowelRanges[index + 3])
      // console.log({ vowelBefore, consonantSplit, vowelAfter })

      output.push([vowelBefore, consonantSplit, vowelAfter])
    }

    const joined = this.joiner(output)
    if (joined[0] === '') {
      return joined.slice(1, joined.length)
    } else {
      return joined
    }
  }

  // joiner(output: string[][]) {
  //   const joined = output.map((trio) => {
  //     console.log({ trio })
  //     return [trio[0] + trio[1][0], trio[1][1] + trio[2]]
  //   })
  //   console.log(joined)
  // }

  joiner(output: string[][]): string[] {
    const accum = []
    let prev = ''
    for (let index = 0; index < output.length; index++) {
      const trio = output[index]
      // console.log({ trio })
      // return [trio[0] + trio[1][0], trio[1][1] + trio[2]]
      accum.push(prev + trio[1][0])
      prev = trio[1][1] + trio[2]
    }
    accum.push(prev)

    // console.log({ accum })
    return accum
  }
}
