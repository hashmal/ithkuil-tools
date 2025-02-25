# ithkuil-tools

 A set of Ithkuil tools, starting with IPA generation.

 It is not ready for prime-time so it's not on NPM yet, but you can still play with it locally.

## Usage

Import the provided helper function:

```
import { romanizedIthkuilToIpa } from './lib/index'
```

Then pass some romanized Ithkuil text to it to convert it to an IPA string representation:

```
const text = 'Wezvwaušburdóu yaizxra sai.' // "Be careful, your fork is actually a fennec."
const ipa: string | Error = romanizedIthkuilToIpa(text)
```

Note the return type of `romanizedIthkuilToIpa()`: ` string | Error`. This is because the conversion isn't guaranteed, either because of bad input or an internal bug. Just Add a check to be able to access the actual result:

```
if (typeof ipa === 'string') console.log(ipa) // [wɛzvwauʃbuɹd̪óu ːjaɪzxɾa ːsai]
```

Conversely, you can inspect the returned error if that happens. It'll contain the error cause, what character index caused the failure, and the usual stack trace.

The full signature of the helper function is `romanizedIthkuilToIpa(romanizedIthkuilText: string, options?: IpaConverterOptions): string | IpaConversionError`. A few options can be provided, check the code for more details about those.
