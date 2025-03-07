import biConsonantalConjuncts from 'phonotactics/biConsonantalConjuncts.json'
import triConsonantalConjuncts from 'phonotactics/triConsonantalConjuncts.json'
import tetraConsonantalConjuncts from 'phonotactics/tetraConsonantalConjuncts.json'
import pentaConsonantalConjuncts from 'phonotactics/pentaConsonantalConjuncts.json'

import random from 'random'
import { match, P } from 'ts-pattern'

type RandomConjunctOptions = {
  characterCount?: number,
  characterCountRange?: [number, number],
}

const DEFAULT_OPTIONS: RandomConjunctOptions = { characterCountRange: [2, 5] }

export function randomConjunct(options?: RandomConjunctOptions): string {
  const localOptions = { ...DEFAULT_OPTIONS, ...options }

  const characterCount = selectCharacterCount(localOptions)
  const conjuncts = selectConjuncts(characterCount)

  const row = pickRow(conjuncts)
  return row.map((column) => pickCharacter(column)).join('')
}

function rand(max: number): number {
  return random.int(0, max - 1)
}

function pickRow(conjuncts: string[][]): string[] {
  return conjuncts[rand(conjuncts.length)]
}

function pickCharacter(characters: string): string {
  return characters[rand(characters.length)]
}

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
