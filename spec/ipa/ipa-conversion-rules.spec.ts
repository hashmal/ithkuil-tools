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

// h is never silent and is pronounced [h] in all positions where it appears, even in word-final position. Syllable-initial or word-final -ph-, -th-, -kh-, -ch-, -čh- are pronounced as aspirated stops/affricates [pʰ, tʰ, kʰ, tsʰ, tʃʰ]but when between two vowels, they are disyllabic and pronounced as in English haphazard, at-hand, backhanded, it’s here and church hall; the combinations -hl-, -hr-, -hm- and -hn- may be pronounced as separate consonants or as the following single voiceless consonants: hl = [ɬ], hr = [ɾ̥], hm = [m̥], hn = [n̥]. Combinations of a voiced consonant plus following h are always dissyllabic, e.g., -bh-, -dh-, -gh-, -rh-, -mh-, -nh-, etc.

// ʼ is the voiceless glottal stop [Ɂ] as heard between the two vowels of English oh-oh!, or between the first two e-sounds of German beendete, or the one possible realization of the zero phoneme in Mandarin 親愛 (qīnʼài [t͡ɕʰji̞n̚˥.ʔa̠ɪ̯˥˩], different from qīnài [t͡ɕʰi˥.na̠ɪ̯˥˩] or qīnnài [t͡ɕʰji̞n̚˥.na̠ɪ̯˥˩]); For the voiceless glottal stop in the syllable initial, cf. the distinctions in Hawaiian or some Ryukyuan languages; For the voiceless glottal stop in the syllable coda, cf. the distinctions in Wu or Min Chinese languages, as well as Japanese あっ (aQ, [äʔ]).

// n is dental, not alveolar; n assimilates to velar [ŋ] before k, g, and x (but not before ř); therefore, phonemic ň is not permitted before k, g, or x in New Ithkuil native words.

// r is a single tap/flap [ɾ], which becomes a trill [r] when geminated, as in Spanish or Italian caro and carro; when followed by a consonant in the same word, it may be pronounced as an apico-alveolar approximant [ɹ], similar to (but further forward in the mouth than) the postalveolar [ɹ̱] of standard English. An example of an apico-alveolar approximant is the non-retroflex r sound in Mandarin.

// ř is the voiced dorso-uvular approximant [ʁ] as in French rire or German Ruhr; when geminated it is either [ʁː] or can be strengthened to a uvular trill [ʀ]; care should be taken to ensure the pronunciations of -př- and -tř- are differentiated from -px- and -tx-.

describe.each([
  ['p', 'p', 'as in French, Spanish, or Italian'],
  ['k', 'k', 'as in French, Spanish, or Italian'],
  ['t', 't̪', 'as in French, Spanish, or Italian'],
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
