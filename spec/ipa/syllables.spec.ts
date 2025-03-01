import { SyllableSplitter } from '../../src/syllables/SyllableSplitter'

function splitSyllables(word: string) {
  const syllableSplitter = new SyllableSplitter(word)
  const conflicts = syllableSplitter.splitSyllables()
  // console.log(word, conflicts, conflicts.join('-'))
  return conflicts.join('-')
}

describe.each([
  ['oa', 'o-a'],
  ['koa', 'ko-a'],
  ['ai', 'ai'],
  ['koala', 'ko-a-la'],
  ['opsspa', 'opss-pa'],
  ['lopsspa', 'lopss-pa'],
  ['aluipsspa', 'a-luipss-pa'],
  ['yaizxra', 'yaiz-xra'],
  ['sai', 'sai'],
  ['wezvwaušburdóu', 'wez-vwauš-bur-dóu'],
  ['ira', 'i-ra'],
  ['sarļeʼi', 'sar-ļe-ʼi'],
  ['sakawi', 'sa-ka-wi'],
])('%s', (word: string, syllables: string) => {
  it(`${word} resolves to ${syllables}`, () => {
    expect(splitSyllables(word)).toEqual(syllables)
  })
})
