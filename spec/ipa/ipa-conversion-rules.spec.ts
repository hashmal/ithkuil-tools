import { romanizedIthkuilToIpa } from '../../src/ipa/romanizedIthkuilToIpa'
import { IpaConversionError } from '../../src/ipa/IpaConversionError'

// Helper function to reduce verbosity.
function ipa(text:string): string | IpaConversionError {
  return romanizedIthkuilToIpa(text, { brackets: false })
}

// SPECIAL CHARACTERS

describe('" "', () => {
  it('is is a space', () => {
    expect(ipa('a a')).toEqual('a a')
  })
})

describe('-', () => {
  it('is is a hyphen: silent concatenation character', () => {
    expect(ipa('-')).toEqual('-')
  })
})

// VOWELS

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

// CONSONANTS

describe('h', () => {
  it('is pronounced [h] as in English "hand"', () => {
    expect(ipa('h')).toEqual('h')
  })

  it('is pronounced [ʰ] in word-final position after p, t, k, c, and č', () => {
    expect(ipa('ph')).toEqual('pʰ')
    expect(ipa('th')).toEqual('t̪ʰ')
    expect(ipa('kh')).toEqual('kʰ')
    expect(ipa('ch')).toEqual('tsʰ')
    expect(ipa('čh')).toEqual('tʃʰ')
  })

  it.todo('handle syllable-initial -ph-, -th-, -kh-, -ch-, -čh- to be pronounced as aspirated stops/affricates [pʰ, t̪ʰ, kʰ, tsʰ, tʃʰ], unless between two vowels')
  it.todo('handle the possibility of single voiceless consonants: hl = [ɬ], hr = [ɾ̥], hm = [m̥], hn = [n̥]')
})

describe('ʼ', () => {
  it('is pronounced [Ɂ] as in English "uh-oh"', () => {
    expect(ipa('ʼ')).toEqual('Ɂ')
  })
})

describe('n', () => {
  it('is pronounced [n] as in French, Spanish, or Italian', () => {
    expect(ipa('n')).toEqual('n')
  })

  it('assimilates to velar [ŋ] before k, g, and x', () => {
    expect(ipa('nk')).toEqual('ŋk')
    expect(ipa('ng')).toEqual('ŋg')
    expect(ipa('nx')).toEqual('ŋx')
  })
})

describe('r', () => {
  it('is a single tap/flap [ɾ], which becomes a trill [r] when geminated', () => {
    expect(ipa('r')).toEqual('ɾ')
    expect(ipa('rr')).toEqual('ʀ')
  })
  it('is an apico-alveolar approximant [ɹ] when followed by a consonant in the same word', () => {
    expect(ipa('rk')).toEqual('ɹk')
  })
})

describe('ř', () => {
  it('is the voiced dorso-uvular approximant [ʁ] as in French rire or German Ruhr', () => {
    expect(ipa('ř')).toEqual('ʁ')
  })
  it('when geminated it is either [ʁː] or can be strengthened to a uvular trill [ʀ]', () => {
    expect(ipa('řř')).toEqual('ʁː')
  })
})

describe.each([
  ['p', 'p', 'as in French, Spanish, or Italian'],
  ['k', 'k', 'as in French, Spanish, or Italian'],
  ['t', 't̪', 'as in French, Spanish, or Italian'], // t
  ['d', 'd̪', 'as in French or Italian'],
  ['g', 'g', 'as in English "go"'],
  ['ţ', 'θ', 'as in English "this" or Castilian Spanish "caza"'],
  ['ḑ', 'ð', 'as in English "thin" or Castilian Spanish "cada"'],
  ['š', 'ʃ', 'as in English "mesh"'],
  ['ž', 'ʒ', 'as in English "mesure"'],
  ['ç', 'ç', 'as in the initial sound of English "human" or "hue"'],
  ['x', 'x', 'as in either Latin American or Castilian Spanish "jota", Russian "хорошо", German "bach", or Mandarin "h-"'],
  ['l', 'l̪', 'as in French, Spanish, or Italian'],
  ['ļ', 'ɬ', 'as found in Welsh "llan"'],
  ['c', 'ts', 'as in English "bits" or Italian "pizza"'],
  ['ẓ', 'dz', 'as in English "bids" or Italian "azzurro"'],
  ['č', 'tʃ', 'as in English "butch"'],
  ['j', 'dʒ', 'as in English "budge"'],
  ['ň', 'ŋ', 'as in English "bring"'],
  ['y', 'j', 'as in English "yes"'],
])('%s', (ithkuilCharacter: string, ipaCharacter: string, description?: string) => {
  const title = description ? `is pronounced [${ipaCharacter}] ${description}` : `is pronounced [${ipaCharacter}]`
  it(title, () => {
    expect(ipa(ithkuilCharacter)).toEqual(ipaCharacter)
  })
})

describe.each(['b', 'f', 'm', 's', 'v', 'w', 'z'])('%s', (letter) => {
  it(`is pronounced [${letter}] as in English`, () => {
    expect(ipa(letter)).toEqual(letter)
  })
})
