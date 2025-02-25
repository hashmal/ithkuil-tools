# ithkuil-tools

 A set of Ithkuil tools, starting with IPA generation.

 It is not ready for prime-time so it's not on NPM yet, but you can still play with it locally.

## Usage

```
import { romanizedIthkuilToIpa } from './lib/index'

const text = 'Wezvwaušburdóu yaizxra sai.' // "Be careful, your fork is actually a fennec."

const ipa = romanizedIthkuilToIpa(text)
console.log(ipa) // [wɛzvwauʃbuɹd̪óu ːjaɪzxɾa ːsai]
```
