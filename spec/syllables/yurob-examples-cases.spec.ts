import { romanizedIthkuilToSyllables } from '../../src/syllables/romanizedIthkuilToSyllables'
import { split } from '../helpers'

describe.each([
  ['yantxečmehá aţpwato', 'yan-txe-čme-há aţ-pwa-to'],
  ['yantxečmehá aţpwate', 'yan-txe-čme-há aţ-pwa-te'],
  ['kštala wampeicai', 'kšta-la wam-pei-cai'],
  ['onţläla wampeicau', 'on-ţlä-la wam-pei-cau'],
  ['walţa enžtalekcei', 'wal-ţa enž-ta-le-kcei'],
  ['walža kšilei', 'wal-ža kši-lei'],
  ['mřřala weleu', 'mřřa-la we-leu'],
  ['yuäčla kšileu', 'yu-ä-čla kši-leu'],
  ['eňalţra wampacëu', 'e-ňal-ţra wam-pa-cëu'],
  ['yerla kšilou', 'ye-rla kši-lou'],
  ['ekcatra walḑoi', 'e-kca-tra wal-ḑoi'],
  ['wailpla endyaftioriu', 'wail-pla en-dyaf-ti-o-riu'],
  ['unţwäla kšiţui', 'un-ţwä-la kši-ţui'],
  ['rrala udklälia', 'rra-la ud-klä-li-a'],
  ['skela agçiţrie', 'ske-la a-gçi-ţri-e'],
  ['utxala welio', 'u-txa-la we-li-o'],
  ['ujtajiö', 'uj-ta-ji-ö'],
  ['wat alcmar afdareë', 'wat al-cmar af-da-re-ë'],
  ['spulá kšilo waigvbre waiňnuö', 'spu-lá kši-lo wai-gvbre waiň-nu-ö'],
  ['weščayá ampasu hakšilaölwie-addyabzëuttuo welio', 'weš-ča-yá am-pa-su ha-kši-la-öl-wi-e ad-dya-bzëut-tu-o we-li-o'],
  ['amsävá wialcma afdavue', 'am-sä-vá wi-al-cma af-da-vu-e'],
  ['eddyilua', 'ed-dyi-lu-a'],
  ['wamá kšilu wiamfmavügao', 'wa-má kši-lu wi-am-fma-vü-ga-o'],
  ['weščayá ampasu hakšilaölwie-addyëubzattuo welio', 'weš-ča-yá am-pa-su ha-kši-la-öl-wi-e ad-dyëu-bzat-tu-o we-li-o'],
  ['wajneo Erčuläyá kšivo weleo', 'wa-jne-o er-ču-lä-yá kši-vo we-le-o'],
  ['wadpweö', 'wad-pwe-ö'],
  ['elkswuvá wampacu aţmwaroë', 'el-kswu-vá wam-pa-cu a-ţmwa-ro-ë'],
  ['wardplitöe', 'ward-pli-tö-e'],
  ['wiamftrá ru avtyävairxoe', 'wi-amf-trá ru av-tyä-vair-xo-e'],
  ['wašḑayá cwe warrahňöa', 'waš-ḑa-yá cwe wa-rra-hňö-a'],
  ['wekská weli kšiloa', 'we-kská we-li kši-lo-a'],
  ['ellyila englaʼra', 'ell-yi-la en-gla-ʼra'],
  ['malihái alxlaʼva', 'ma-li-hái al-xla-ʼva'],
  ['wala yačpäʼä', 'wa-la yač-pä-ʼä'],
  ['aţkläl uçfaʼdä', 'aţ-kläl uç-fa-ʼdä'],
  ['eţir iolcaʼle', 'e-ţir i-ol-ca-ʼle'],
  ['emževa lyaʼje', 'em-že-va lya-ʼje'],
  ['aňļir atļmäʼvi', 'aň-ļir a-tļmä-ʼvi'],
  ['waleca amtriʼlëi', 'wa-le-ca am-tri-ʼlëi'],
  ['waleca amtriʼlö', 'wa-le-ca am-tri-ʼlö'],
  ['aẓtaţra uslaʼvo', 'aẓ-ta-ţra u-sla-ʼvo'],
  ['kšila erḑmezwoʼovvu', 'kši-la er-ḑme-zwo-ʼo-vvu'],
  ['amskadwû kšivölaʼi wiorkwa', 'ams-ka-dwû kši-vö-la-ʼi wi-or-kwa'],
  ['malá su welaʼu', 'ma-lá su we-la-ʼu'],
  ['malá su weleʼi', 'ma-lá su we-le-ʼi'],
  ['pţradá kro wailveʼu', 'pţra-dá kro wail-ve-ʼu'],
  ['walazëʼu', 'wa-la-zë-ʼu'],
  ['uẓtavoʼu arzälalžóu saʼi', 'uẓ-ta-vo-ʼu ar-zä-lal-žóu sa-ʼi'],
  ['watkwäyû welu weppļiʼa kšilütřackoʼi', 'wat-kwä-yû we-lu wep-pļi-ʼa kši-lü-třac-ko-ʼi'],
  ['kšiʼlui', 'kši-ʼlui'],
  ['weiluʼi gulái onţläliʼö kšiʼve', 'wei-lu-ʼi gu-lái on-ţlä-li-ʼö kši-ʼve'],
  ['epřeliʼa', 'e-pře-li-ʼa'],
  ['muliuţmá mu hlü Jon hma ažxíp', 'mu-liu-ţmá mu hlü jon hma až-xíp'],
  ['muliuţmá mu hliʼe Jon hma ažxíp', 'mu-liu-ţmá mu hli-ʼe jon hma až-xíp'],
  ['wanzvihá mu welëʼi', 'wanz-vi-há mu we-lë-ʼi'],
  ['wanzvihá mu weliʼe', 'wanz-vi-há mu we-li-ʼe'],
  ['ẓalá li welenëi máliʼhu kširu', 'ẓa-lá li we-le-nëi má-li-ʼhu kši-ru'],
  ['ẓalá li welenëi máliʼhu thiʼe kširu', 'ẓa-lá li we-le-nëi má-li-ʼhu thi-ʼe kši-ru'],
  ['wajliʼo', 'wa-jli-ʼo'],
  ['weiluʼi, gulái onţläliʼö kšiʼve', 'wei-lu-ʼi, gu-lái on-ţlä-li-ʼö kši-ʼve'],
  ['gavó wioḑpu ustyaleʼë', 'ga-vó wi-oḑ-pu us-tya-le-ʼë'],
  ['arveléi iträluʼö kšiʼţe', 'ar-ve-léi i-trä-lu-ʼö kši-ʼţe'],
  ['arveléi iträluʼo kšiʼţe', 'ar-ve-léi i-trä-lu-ʼo kši-ʼţe'],
  ['tralá elařţru hakšiţé-alcialuʼa', 'tra-lá e-lař-ţru ha-kši-ţé al-ci-a-lu-ʼa'],
  ['ujthädaʼo', 'uj-thä-da-ʼo'],
  ['wucpirwaʼo', 'wuc-pi-rwa-ʼo'],
  ['elesa kšilaʼö', 'e-le-sa kši-la-ʼö'],
  ['řeseʼo yeirčá kšivo wiole', 'ře-se-ʼo yeir-čá kši-vo wi-o-le'],
  ['wellyawá urwaleʼö', 'we-llya-wá u-rwa-le-ʼö'],
  ['epssaloʼë', 'e-pssa-lo-ʼë'],
  ['wucpirwoʼë', 'wuc-pi-rwo-ʼë'],
  ['ujthädöʼe', 'uj-thä-dö-ʼe'],
  ['welkošmoʼe', 'wel-ko-šmo-ʼe'],
  ['wapšorcoʼe', 'wa-pšor-co-ʼe'],
  ['iträlawó', 'i-trä-la-wó'],
  ['wapšorcoʼa', 'wa-pšor-co-ʼa'],
  ['iträloʼa kšiʼţe', 'i-trä-lo-ʼa kši-ʼţe'],
])('%s', (word: string, syllables: string) => {
  it(`resolves to ${syllables}`, () => {
    expect(romanizedIthkuilToSyllables(word)).toEqual(split(syllables))
  })
})
