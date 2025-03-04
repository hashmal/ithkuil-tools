import { match, P } from 'ts-pattern'
import { IpaConverter } from '../src/ipa/IpaConverter'

/** Translate some Ithkuil text to IPA via the command line.
 *
 * @usage
 * ```sh
 * yarn run script/ipa "wezvwaušburdóu yaizxra sai"
 * ```
 */
function scriptIpa() {
  const text = process.argv[2]
  console.log('Text input:', text)

  const ipaConverter = new IpaConverter(text, {
    fullStopsBetweenVowels: true,
    stressMarks: 'line',
  })

  const ipa: string | Error = ipaConverter.textToIpa()
  match(ipa)
    .with(P.string, (ipa) => console.log('IPA output:', ipa))
    .with(P.instanceOf(Error), (error) => console.error('Error:', error.message))
    .exhaustive()
}

scriptIpa()
