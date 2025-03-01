import { romanizedIthkuilToSyllables } from '../../src/syllables/romanizedIthkuilToSyllables'

describe.each([
  ['oa', 'o-a'],
  ['odda', 'od-da'],
  ['koa', 'ko-a'],
  ['ai', 'ai'],
  ['koala', 'ko-a-la'],
  ['opsspa', 'o-psspa'],
  ['lopsspa', 'lo-psspa'],
  ['aluipsspa', 'a-lui-psspa'],
  ['yaizxra', 'yai-zxra'],
  ['sai', 'sai'],
  ['wezvwaušburdóu', 'we-zvwauš-bur-dóu'],
  ['ira', 'i-ra'],
  ['sarļeʼi', 'sar-ļe-ʼi'],
  ['sakawi', 'sa-ka-wi'],
])('%s', (word: string, syllables: string) => {
  it(`${word} resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(syllables)
  })
})
