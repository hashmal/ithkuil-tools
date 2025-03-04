import { romanizedIthkuilToSyllables } from '../../src/syllables/romanizedIthkuilToSyllables'
import { split } from '../helpers'

describe.each([
  ['elzal', 'el-zal'],
  ['psulça', 'psul-ça'],
  ['uẓfäl', 'u-ẓfäl'],
  ['erbräl', 'er-bräl'],
  ['elzad', 'el-zad'],
  ['psulçta', 'psulç-ta'],
  ['ujrarft', 'u-jrarft'],
  ['erbräd', 'er-bräd'],
  ['elzag', 'el-zag'],
  ['psulçka', 'psulç-ka'],
  ['ujrarfk', 'u-jrarfk'],
  ['erbräg', 'er-bräg'],
  ['elzab', 'el-zab'],
  ['psulçpa', 'psulç-pa'],
  ['ujrarfpa', 'u-jrarf-pa'],
  ['erbräb', 'er-bräb'],
  ['elzagz', 'el-zagz'],
  ['psulçga', 'psulç-ga'],
  ['ujrarfga', 'u-jrarf-ga'],
  ['erbrägz', 'er-brägz'],
  ['elzabz', 'el-zabz'],
  ['psulçba', 'psulç-ba'],
  ['ujrarfba', 'u-jrarf-ba'],
  ['erbräbz', 'er-bräbz'],
])('%s', (word: string, syllables: string) => {
  it(`resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(split(syllables))
  })
})
