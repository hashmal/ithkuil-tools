import { romanizedIthkuilToSyllables } from '../../src/syllables/romanizedIthkuilToSyllables'

describe.each([
  ['oa', 'o-a'],
  ['odda', 'od-da'],
  ['koa', 'ko-a'],
  ['ai', 'ai'],
  ['koala', 'ko-a-la'],
  ['lo', 'lo'],
  ['alui', 'a-lui'],
  ['yai', 'yai'],
  ['sai', 'sai'],
  ['sarļeʼi', 'sar-ļe-ʼi'],
  // ['wezvwaušburdóu', 'we-zvwauš-bur-dóu'],
  ['ira', 'i-ra'],
  ['sakawi', 'sa-ka-wi'],
])('%s', (word: string, syllables: string) => {
  it(`${word} resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(syllables)
  })
})

describe.each([
  ['sarļe', 'sar-ļe'],
  ['aušbu', 'auš-bu'],
  ['urdóu', 'ur-dóu'],
])('[BI] %s', (word: string, syllables: string) => {
  it(`${word} resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(syllables)
  })
})

describe.each([
  ['arppa', 'arp-pa'],
  ['ampda', 'am-pda'],
  ['aizxra', 'ai-zxra'],
  ['ezvwau', 'e-zvwau'],
])('[TRI] %s', (word: string, syllables: string) => {
  it(`${word} resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(syllables)
  })
})

describe.each([
  ['armpla', 'arm-pla'],
  ['opsspa', 'opss-pa'],
])('[TETRA] %s', (word: string, syllables: string) => {
  it(`${word} resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(syllables)
  })
})

describe.each([
  ['alpsbwa', 'al-psbwa'],
  ['ařvzkfa', 'ař-vzkfa'],
  ['ařnsţla', 'ařn-sţla'],
])('[PENTA] %s', (word: string, syllables: string) => {
  it(`${word} resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(syllables)
  })
})
