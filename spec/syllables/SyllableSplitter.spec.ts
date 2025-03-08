import { romanizedIthkuilToSyllables } from '../../src/syllables/romanizedIthkuilToSyllables'
import { split } from '../helpers'

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
  it(`resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(split(syllables))
  })
})

describe.each([
  ['a', 'a'],
  ['ao', 'a-o'],
  ['oa', 'o-a'],
])('[VOWEL] %s', (vowels: string, syllables: string) => {
  it(`resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(vowels)).toEqual(split(syllables))
  })
})

describe.each([
  ['ai'], ['ei'], ['ëi'], ['oi'], ['ui'], ['au'], ['eu'], ['ëu'], ['ou'], ['iu'],
  ['ái'], ['éi'], ['êi'], ['ói'], ['úi'], ['áu'], ['éu'], ['êu'], ['óu'], ['íu'],
])('[DIPHTHONG] %s', (diphthong: string) => {
  it(`resolves to ${diphthong}`, () => {
    expect(romanizedIthkuilToSyllables(diphthong)).toEqual(split(diphthong))
  })
})

describe.each([
  ['sarļe', 'sar-ļe'],
  ['aušbu', 'auš-bu'],
  ['urdóu', 'ur-dóu'],
])('[BI] %s', (word: string, syllables: string) => {
  it(`resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(split(syllables))
  })
})

describe.each([
  ['odda', 'od-da'],
  ['arppa', 'arp-pa'],
  ['ampda', 'amp-da'],
  ['aizxra', 'aiz-xra'],
  ['ezvwau', 'ez-vwau'],
])('[TRI] %s', (word: string, syllables: string) => {
  it(`resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(split(syllables))
  })
})

describe.each([
  ['armpla', 'arm-pla'],
  ['opsspa', 'opss-pa'],
])('[TETRA] %s', (word: string, syllables: string) => {
  it(`resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(split(syllables))
  })
})

describe.each([
  ['alpsbwa', 'al-psbwa'],
  ['ařvzkfa', 'ař-vzkfa'],
  ['ařnsţla', 'ařns-ţla'],
])('[PENTA] %s', (word: string, syllables: string) => {
  it(`resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(split(syllables))
  })
})
