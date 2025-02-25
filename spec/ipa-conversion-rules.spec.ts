import { romanizedIthkuilToIpa } from '../lib/index'

// Helper function to reduce verbosity.
function ipa(text:string): string | undefined {
  return romanizedIthkuilToIpa(text, { brackets: false })
}

describe('a', () => {
  test('pronounced [a] as in Spanish "alta"', () => {
    expect(ipa('a')).toEqual('a')
  })

  test.todo('pronounced [ɑ] as in English "father"')
})

describe('ä', () => {
  test('pronounced [æ] as in American English "cat"', () => {
    expect(ipa('ä')).toEqual('æ')
  })
})

describe('e', () => {
  test('pronounced [ɛ] as in English "let"', () => {
    expect(ipa('e')).toEqual('ɛ')
  })

  test('pronounced [e] at the beginning of a bivocalic conjunct such as -ea-, -eo-, -eö-, etc.', () => {
    expect(ipa('ea')).toEqual('ea')
    expect(ipa('ek')).toEqual('ɛk')
  })
})

describe('ë', () => {
  test('pronounced [ʌ] like the u in English "cut"', () => {
    expect(ipa('ë')).toEqual('ʌ')
  })

  test.todo('pronounced [ə] like the a in English "sofa"')
  test.todo('pronounced [ɤ] as in "Mandarin"')
})

describe('i', () => {
  test('pronounced [i] at the beginning of a bivocalic conjunct (e.g., -ia-, -iö-, etc.)', () => {
    expect(ipa('ia')).toEqual('ia')
  })

  test('pronounced [ɪ] when preceded or followed by y.', () => {
    expect(ipa('iy')).toEqual('ɪj')
    expect(ipa('yi')).toEqual('jɪ')
  })

  test.todo('missing documentation for other cases')
})

describe('o', () => {
  test('pronounced [ɔ] like the first o in Italian "otto"', () => {
    expect(ipa('o')).toEqual('ɔ')
  })

  test('pronounced [o] at the beginning of a bivocalic conjunct such as -oa-, -oe-, etc.', () => {
    expect(ipa('oa')).toEqual('oa')
  })
})

describe('ö', () => {
  test('pronounced [œ] as in French "neuf"', () => {
    expect(ipa('ö')).toEqual('œ')
  })

  test.todo('pronounced [ø] as in French "feu"')

  test('pronounced [ø] at the beginning of a bivocalic conjunct such as -öa-, -öe-, etc.', () => {
    expect(ipa('öa')).toEqual('øa')
  })
})

describe('u', () => {
  test('pronounced [u] at the beginning of a bivocalic conjunct', () => {
    expect(ipa('ua')).toEqual('ua')
  })

  test('pronounced [ʊ] when preceded or followed by w.', () => {
    expect(ipa('uw')).toEqual('ʊw')
    expect(ipa('wu')).toEqual('wʊ')
  })

  test.todo('missing documentation for other cases')
})

describe('ü', () => {
  test('pronounced [ʉ] as in Swedish "hus" when preceded by y or w', () => {
    expect(ipa('yü')).toEqual('jʉ')
    expect(ipa('wü')).toEqual('wʉ')
  })

  test('pronounced [y] as in French lune', () => {
    expect(ipa('ü')).toEqual('y')
  })
})
