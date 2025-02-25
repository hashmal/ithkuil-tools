import { IpaConversionError } from 'ipa/IpaConversionError'
import { IpaConverter, IpaConverterOptions } from './ipa/IpaConverter'

export { IpaConverter } from './ipa/IpaConverter'
export { IpaConversionError } from './ipa/IpaConversionError'


export function romanizedIthkuilToIpa(romanizedIthkuilText: string, options?: IpaConverterOptions): string | IpaConversionError {
  const ipaConverter = new IpaConverter(romanizedIthkuilText, options)
  return ipaConverter.textToIpa()
}

