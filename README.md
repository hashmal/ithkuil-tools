# ithkuil-tools

A set of Ithkuil tools, with more to come soon:

* IPA Translation
* Syllable Splitting (Beta)

## Installation

`npm install ithkuil-tools` or `yarn add ithkuil-tools`.

## Usage

### IPA Translation

Import the provided helper function:

```typescript
import { romanizedIthkuilToIpa } from './lib/index'
```

Then pass some romanized Ithkuil text to it to convert it to an IPA string representation:

```typescript
const text = 'Wezvwaušburdóu yaizxra sai.' // "Be careful, your fork is actually a fennec."
const ipa: string | Error = romanizedIthkuilToIpa(text)
```

Note the return type of `romanizedIthkuilToIpa()`: ` string | Error`. This is because the conversion isn't guaranteed, either because of bad input or an internal bug. Just Add a check to be able to access the actual result:

```typescript
if (typeof ipa === 'string') console.log(ipa) // [wɛzvwauʃbuɹd̪óu jaɪzxɾa sai]
```

Conversely, you can inspect the returned error if that happens. It'll contain the error cause, what character index caused the failure, and the usual stack trace.

The full signature of the helper function is `romanizedIthkuilToIpa(romanizedIthkuilText: string, options?: IpaConverterOptions): string | IpaConversionError`. A few options can be provided, check the code for more details about those.

### Syllable Splitting (Beta)

```typescript
import {
    romanizedIthkuilToSyllables,
    romanizedIthkuilToSyllableBoundaries
} from "ithkuil-tools";

console.log(romanizedIthkuilToSyllables("Wezvwaušburdóu yaizxra sai")); // [ [ 'we', 'zvwauš', 'bur', 'dóu' ], [ 'yai', 'zxra' ], [ 'sai' ] ]
console.log(romanizedIthkuilToSyllableBoundaries("Wezvwaušburdóu yaizxra sai")) // [ [ 0, 2, 8, 11, 14 ], [ 0, 3, 7 ], [ 0, 3 ] ]
```
