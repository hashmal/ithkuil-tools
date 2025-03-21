import biConsonantalConjuncts from 'phonotactics/biConsonantalConjuncts.json'
import triConsonantalConjuncts from 'phonotactics/triConsonantalConjuncts.json'
import tetraConsonantalConjuncts from 'phonotactics/tetraConsonantalConjuncts.json'
import pentaConsonantalConjuncts from 'phonotactics/pentaConsonantalConjuncts.json'

import random from 'random'
import { match, P } from 'ts-pattern'
import { VOWELS } from 'src/phonology'

type RandomConjunctOptions = {
  characterCount?: number,
  characterCountRange?: [number, number],
}

const DEFAULT_CONSONANT_OPTIONS: RandomConjunctOptions = { characterCountRange: [2, 5] }

const DEFAULT_VOWEL_OPTIONS: RandomConjunctOptions = { characterCountRange: [1, 2] }

/** Generate a random phonotactically valid consonant conjunct.
 *
 * @param options An object specifying the number of consonants in the conjunct.
 * @returns A random phonotactically valid consonantal conjunct.
 */
export function randomConsonantConjunct(options?: RandomConjunctOptions): string {
  const localOptions = { ...DEFAULT_CONSONANT_OPTIONS, ...options }

  const characterCount = selectCharacterCount(localOptions)
  const conjuncts = selectConjuncts(characterCount)

  const row = pickRow(conjuncts)
  return row.map((column) => pickCharacter(column)).join('')
}

export function randomVowelConjunct(options?: RandomConjunctOptions): string {
  const localOptions = { ...DEFAULT_VOWEL_OPTIONS, ...options }

  const characterCount = selectCharacterCount(localOptions)

  return match(characterCount)
    .with(1, () => VOWELS[rand(VOWELS.length)])
    .with(2, () => {
      const rand0 = rand(VOWELS.length)
      let rand1 = rand0
      while (rand0 === rand1) rand1 = rand(VOWELS.length)
      return VOWELS[rand0] + VOWELS[rand1]
    })
    .otherwise(() => {
      throw new Error('Only 1 or 2 vowels are permissible')
    })
}

/** Select a random integer between 0 and `max` (exclusive).
 * @internal */
function rand(max: number): number {
  return random.int(0, max - 1)
}

/** Pick a random row from a table of conjuncts.
 * @internal */
function pickRow(conjuncts: string[][]): string[] {
  return conjuncts[rand(conjuncts.length)]
}

/** Pick a random character from a string.
 * @internal */
function pickCharacter(characters: string): string {
  return characters[rand(characters.length)]
}

/** Select the number of characters in the conjunct.
 * @internal */
function selectCharacterCount(options: RandomConjunctOptions): number {
  return match(options)
    .with({ characterCount: P.number }, ({ characterCount }) =>
      characterCount)
    .with({ characterCountRange: [P.number, P.number] }, ({ characterCountRange }) =>
      random.int(...characterCountRange))
    .otherwise(() => {
      throw new Error('Invalid options')
    })
}

/** Select the table of conjuncts based on the number of characters.
 * @internal */
function selectConjuncts(characterCount: number): string[][] {
  return match(characterCount)
    .with(2, () => biConsonantalConjuncts.biConsonantalConjuncts)
    .with(3, () => triConsonantalConjuncts.triConsonantalConjuncts)
    .with(4, () => tetraConsonantalConjuncts.tetraConsonantalConjuncts)
    .with(5, () => pentaConsonantalConjuncts.pentaConsonantalConjuncts)
    .otherwise(() => {
      throw new Error('Only 2 to 5 consonants are permissible')
    })
}
