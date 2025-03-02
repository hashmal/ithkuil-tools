import { romanizedIthkuilToSyllables } from '../../src/syllables/romanizedIthkuilToSyllables'

function split(word: string): string[][] {
  return [word.split('-')]
}

describe.each([
  ['koa', 'ko-a'],
  ['koala', 'ko-a-la'],
  ['lo', 'lo'],
  ['alui', 'a-lui'],
  ['yai', 'yai'],
  ['sai', 'sai'],
  ['sarļeʼi', 'sar-ļe-ʼi'],
  ['ira', 'i-ra'],
  ['sakawi', 'sa-ka-wi'],
])('%s', (word: string, syllables: string) => {
  it(`${word} resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(split(syllables))
  })
})

describe.each([
  ['a', 'a'],
  ['ao', 'a-o'],
  ['oa', 'o-a'],
])('[VOWEL] %s', (vowels: string, syllables: string) => {
  it(`is a single vowel conjunct`, () => {
    expect(romanizedIthkuilToSyllables(vowels)).toEqual(split(syllables))
  })
})

describe.each([
  ['ai'], ['ei'], ['ëi'], ['oi'], ['ui'], ['au'], ['eu'], ['ëu'], ['ou'], ['iu'],
  ['ái'], ['éi'], ['êi'], ['ói'], ['úi'], ['áu'], ['éu'], ['êu'], ['óu'], ['íu'],
])('[DIPHTHONG] %s', (diphthong: string) => {
  it(`is a single vowel conjunct`, () => {
    expect(romanizedIthkuilToSyllables(diphthong)).toEqual(split(diphthong))
  })
})

describe.each([
  ['sarļe', 'sar-ļe'],
  ['aušbu', 'auš-bu'],
  ['urdóu', 'ur-dóu'],
])('[BI] %s', (word: string, syllables: string) => {
  it(`${word} resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(split(syllables))
  })
})

describe.each([
  ['odda', 'od-da'],
  ['arppa', 'arp-pa'],
  ['ampda', 'am-pda'],
  ['aizxra', 'ai-zxra'],
  ['ezvwau', 'e-zvwau'],
])('[TRI] %s', (word: string, syllables: string) => {
  it(`${word} resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(split(syllables))
  })
})

describe.each([
  ['armpla', 'arm-pla'],
  ['opsspa', 'opss-pa'],
])('[TETRA] %s', (word: string, syllables: string) => {
  it(`${word} resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(split(syllables))
  })
})

describe.each([
  ['alpsbwa', 'al-psbwa'],
  ['ařvzkfa', 'ař-vzkfa'],
  ['ařnsţla', 'ařn-sţla'],
])('[PENTA] %s', (word: string, syllables: string) => {
  it(`${word} resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(split(syllables))
  })
})
