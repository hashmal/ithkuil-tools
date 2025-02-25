import { romanizedIthkuilToIpa } from '../../lib/index'
import { IpaConversionError } from '../../lib/ipa/IpaConversionError'

// Helper function to reduce verbosity.
function ipa(text:string): string | IpaConversionError {
  return romanizedIthkuilToIpa(text, { brackets: false })
}

describe('a', () => {
  it('is pronounced [a] as in Spanish "alta"', () => {
    expect(ipa('a')).toEqual('a')
  })

  it.todo('is pronounced [ɑ] as in English "father"')
})

describe('ä', () => {
  it('is pronounced [æ] as in American English "cat"', () => {
    expect(ipa('ä')).toEqual('æ')
  })
})

describe('e', () => {
  it('is pronounced [ɛ] as in English "let"', () => {
    expect(ipa('e')).toEqual('ɛ')
  })

  it('is pronounced [e] at the beginning of a bivocalic conjunct such as -ea-, -eo-, -eö-, etc.', () => {
    expect(ipa('ea')).toEqual('ea')
    expect(ipa('ek')).toEqual('ɛk')
  })
})

describe('ë', () => {
  it('is pronounced [ʌ] like the u in English "cut"', () => {
    expect(ipa('ë')).toEqual('ʌ')
  })

  it.todo('is pronounced [ə] like the a in English "sofa"')
  it.todo('is pronounced [ɤ] as in "Mandarin"')
})

describe('i', () => {
  it('is pronounced [i] at the beginning of a bivocalic conjunct (e.g., -ia-, -iö-, etc.)', () => {
    expect(ipa('ia')).toEqual('ia')
  })

  it('is pronounced [ɪ] when preceded or followed by y.', () => {
    expect(ipa('iy')).toEqual('ɪj')
    expect(ipa('yi')).toEqual('jɪ')
  })

  test.todo('missing documentation for other cases')
})

describe('o', () => {
  it('is pronounced [ɔ] like the first o in Italian "otto"', () => {
    expect(ipa('o')).toEqual('ɔ')
  })

  it('is pronounced [o] at the beginning of a bivocalic conjunct such as -oa-, -oe-, etc.', () => {
    expect(ipa('oa')).toEqual('oa')
  })
})

describe('ö', () => {
  it('is pronounced [œ] as in French "neuf"', () => {
    expect(ipa('ö')).toEqual('œ')
  })

  it.todo('is pronounced [ø] as in French "feu"')

  it('is pronounced [ø] at the beginning of a bivocalic conjunct such as -öa-, -öe-, etc.', () => {
    expect(ipa('öa')).toEqual('øa')
  })
})

describe('u', () => {
  it('is pronounced [u] at the beginning of a bivocalic conjunct', () => {
    expect(ipa('ua')).toEqual('ua')
  })

  it('is pronounced [ʊ] when preceded or followed by w.', () => {
    expect(ipa('uw')).toEqual('ʊw')
    expect(ipa('wu')).toEqual('wʊ')
  })

  test.todo('missing documentation for other cases')
})

describe('ü', () => {
  it('is pronounced [ʉ] as in Swedish "hus" when preceded by y or w', () => {
    expect(ipa('yü')).toEqual('jʉ')
    expect(ipa('wü')).toEqual('wʉ')
  })

  it('is pronounced [y] as in French lune', () => {
    expect(ipa('ü')).toEqual('y')
  })
})
