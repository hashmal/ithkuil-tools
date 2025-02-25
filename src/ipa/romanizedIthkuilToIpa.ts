import { IpaConversionError } from './IpaConversionError'
import { IpaConverter, IpaConverterOptions } from './IpaConverter'

/** Returns an IPA representation of a given romanized Ithkuil text.
 *
 * @param romanizedIthkuilText The romanized Ithkuil text to convert to IPA.
 * @param options Options for the conversion.
 * @returns The IPA representation of the given romanized Ithkuil text, or an error if the conversion fails.
 */
export function romanizedIthkuilToIpa(romanizedIthkuilText: string, options?: IpaConverterOptions): string | IpaConversionError {
  const ipaConverter = new IpaConverter(romanizedIthkuilText, options)
  return ipaConverter.textToIpa()
}
