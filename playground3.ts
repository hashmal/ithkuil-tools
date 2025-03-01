import { SyllableSplitter } from './src/syllables/SyllableSplitter'

function hyphenize(word: string, splits: number[]) {
  let output = ''
  for (let index = 0; index < word.length; index++) {
    const element = word[index]
    if (index !== 0 && splits.includes(index)) output += '-'
    output += element
  }
  return output
}

function hyphenizeNested(word: string, splits: number[][]) {
  let output = ''
  for (const split of splits) {
    const element = hyphenize(word, split)
    output += element
    output += ' '
  }
  return output
}

function vowelRanges(word: string) {
  const syllableSplitter3 = new SyllableSplitter(word)
  const vowelRanges = syllableSplitter3.vowelRanges()
  console.log(word, vowelRanges, hyphenize(word, vowelRanges), vowelRanges.length)
}

// vowelRanges('oa')
// vowelRanges('koa')
// vowelRanges('ai')
// vowelRanges('koala')
// vowelRanges('opsspa')
// vowelRanges('lopsspa')
// vowelRanges('aluipsspa')
// vowelRanges('yaizxra')
// vowelRanges('sai')
// vowelRanges('wezvwaušburdóu')
// vowelRanges('ira')
// vowelRanges('sarļeʼi')
// vowelRanges('sakawi')

function conflicts(word: string) {
  const syllableSplitter3 = new SyllableSplitter(word)
  const conflicts = syllableSplitter3.conflicts()
  // console.log(word, conflicts, hyphenizeNested(word, conflicts))
  console.log(word, conflicts, conflicts.join('-'))
}

// conflicts('oa')
// conflicts('koa')
// conflicts('ai')
// conflicts('koala')
// conflicts('opsspa')
// conflicts('lopsspa')
// conflicts('aluipsspa') // a-luipss-pa // => a-luipss-pa
// conflicts('yaizxra')
// conflicts('sai')
conflicts('wezvwaušburdóu') // => wezv-wauš-bur-dou
// conflicts('ira')
// conflicts('sarļeʼi')
// conflicts('sakawi')
