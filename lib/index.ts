import { IpaConverter, IpaConverterOptions } from './ipa/IpaConverter'

export function romanizedIthkuilToIpa(text: string, options?: IpaConverterOptions): string | undefined {
  const ipaConverter = new IpaConverter(text, options)
  return ipaConverter.romanizationToIpa()
}
