import { romanizedIthkuilToSyllables } from '../../src/syllables/romanizedIthkuilToSyllables'
import { split } from '../helpers'

describe.each([
  // Configuration
  ['rrala', 'rra-la'],
  ['rrasa', 'rra-sa'],
  ['rraca', 'rra-ca'],
  ['rraţsa', 'rra-ţsa'],
  ['rrata', 'rra-ta'],
  ['rraţa', 'rra-ţa'],
  ['rraza', 'rra-za'],
  ['anzwil', 'an-zwil'],
  ['anzwit', 'an-zwit'],
  ['anzwik', 'an-zwik'],
  ['anzwip', 'an-zwip'],
  ['anzwif', 'an-zwif'],
  ['anzwiç', 'an-zwiç'],
  ['anzwiž', 'an-zwiž'],
  ['blöfêi onţlilu', 'blö-fêi on-ţli-lu'],

  // Affiliation
  ['čväţa', 'čvä-ţa'],
  ['čvälţa', 'čväl-ţa'],
  ['čvärţa', 'čvär-ţa'],
  ['čväřţa', 'čväř-ţa'],
  ['arsweţ', 'ar-sweţ'],
  ['arswelţ', 'ar-swelţ'],
  ['arswerţ', 'ar-swerţ'],
  ['arsweřţ', 'ar-sweřţ'],
  ['zvata', 'zva-ta'],
  ['zvalta', 'zval-ta'],
  ['zvarta', 'zvar-ta'],
  ['zvařta', 'zvař-ta'],
  ['sřala', 'sřa-la'],
  ['sřanļa', 'sřan-ļa'],
  ['sřarļa', 'sřar-ļa'],
  ['sřaňa', 'sřa-ňa'],

  // Perspective
  ['avsal', 'a-vsal'],
  ['avsar', 'a-vsar'],
  ['avsav', 'a-vsav'],
  ['avsaj', 'a-vsaj'],
  ['ţrala', 'ţra-la'],
  ['ţrara', 'ţra-ra'],
  ['ţrava', 'ţra-va'],
  ['ţraja', 'ţra-ja'],
  ['elzaţ', 'el-zaţ'],
  ['elzaţra', 'el-za-ţra'],
  ['elzaţwa', 'el-za-ţwa'],
  ['elzaţya', 'el-za-ţya'],

  // Extension
  ['elzal', 'el-zal'],
  ['psulça', 'psul-ça'],
  ['uẓfäl', 'uẓ-fäl'],
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

  // Essence
  ['zalá kšili ežḑatļëi', 'za-lá kši-li e-žḑa-tļëi'],
  ['zatļá kšili wežḑëi', 'za-tļá kši-li we-žḑëi'],

  // Version
  ['arţtulawá ulhiliolu wiosaḑca iţkuil', 'arţ-tu-la-wá ul-hi-li-o-lu wi-o-sa-ḑca iţ-kuil'],
  ['ärţtulawá ulhiliolu wiosaḑca iţkuil', 'ärţ-tu-la-wá ul-hi-li-o-lu wi-o-sa-ḑca iţ-kuil'],

  // Function
  ['byalá pa', 'bya-lá pa'],
  ['vvralá mi wurçpi', 'vvra-lá mi wurç-pi'],
  ['tlasatřá çkava', 'tla-sa-třá çka-va'],
  ['txasá ku', 'txa-sá ku'],
  ['waltlá wele lo', 'wal-tlá we-le lo'],
  ['malá welu wiosaḑcä espanya', 'ma-lá we-lu wi-o-sa-ḑcä es-pa-nya'],
  ['yeg arrlalu', 'yeg a-rrla-lu'],
  ['byulá pa', 'byu-lá pa'],
  ['vvralá mi urçpuli', 'vvra-lá mi urç-pu-li'],
  ['tlusatřá çkava', 'tlu-sa-třá çka-va'],
  ['txusá ku', 'txu-sá ku'],
  ['altlulá wele lo', 'al-tlu-lá we-le lo'],
  ['mulá welu wiosaḑcä espanya', 'mu-lá we-lu wi-o-sa-ḑcä es-pa-nya'],
  ['egúd arrlalu', 'e-gúd a-rrla-lu'],

  // Context
  ['frulawá warru přeluʼa', 'fru-la-wá wa-rru pře-lu-ʼa'],
  ['fruilawá rrailu přeʼilua', 'frui-la-wá rrai-lu pře-ʼi-lu-a'],
  ['frualawá rrialu přiʼolua', 'fru-a-la-wá rri-a-lu při-ʼo-lu-a'],
  ['froalawá rraolu přaʼölua', 'fro-a-la-wá rra-o-lu přa-ʼö-lu-a'],

  // Restructuring of slots I and II
  ['yedpéi mmoi', 'ye-dpéi mmoi'],
  ['edpadéi mmoi', 'e-dpa-déi mmoi'],
  ['weinţdâ', 'weinţ-dâ'],
  ['enţdarâ', 'enţ-da-râ'],
])('%s', (word: string, syllables: string) => {
  it(`resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(split(syllables))
  })
})
