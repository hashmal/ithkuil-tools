import biConsonantalConjuncts from 'phonotactics/biConsonantalConjuncts.json'
import triConsonantalConjuncts from 'phonotactics/triConsonantalConjuncts.json'
import tetraConsonantalConjuncts from 'phonotactics/tetraConsonantalConjuncts.json'
import pentaConsonantalConjuncts from 'phonotactics/pentaConsonantalConjuncts.json'

import { match } from 'ts-pattern'

export function validateConjunct(consonants: string): boolean {
  return match(consonants.length)
    .with(2, () => validateBiConsonantalConjunct(consonants))
    .with(3, () => validateTriConsonantalConjunct(consonants))
    .with(4, () => validateTetraConsonantalConjunct(consonants))
    .with(5, () => validatePentaConsonantalConjunct(consonants))
    .otherwise(() => {
      throw new Error('Only 2 to 5 consonants are permissible')
    })
}

function validateBiConsonantalConjunct(consonants: string): boolean {
  const conjuncts = biConsonantalConjuncts.biConsonantalConjuncts

  for (const row of conjuncts) {
    if (consonants[0] === row[0]) {

      if (row[1].includes(consonants[1]))
        return true
    }
  }

  return false
}

function validateTriConsonantalConjunct(consonants: string): boolean {
  const conjuncts = triConsonantalConjuncts.triConsonantalConjuncts

  for (const row of conjuncts) {
    if (consonants[1] === row[1]) {

      if (row[0].includes(consonants[0])
          && row[2].includes(consonants[2]))
        return true
    }
  }

  return false
}

function validateTetraConsonantalConjunct(consonants: string): boolean {
  const conjuncts = tetraConsonantalConjuncts.tetraConsonantalConjuncts

  for (const row of conjuncts) {
    if (consonants[2] === row[2]) {

      if (row[0].includes(consonants[0])
          && row[1].includes(consonants[1])
          && row[3].includes(consonants[3]))
        return true
    }
  }

  return false
}

function validatePentaConsonantalConjunct(consonants: string): boolean {
  const conjuncts = pentaConsonantalConjuncts.pentaConsonantalConjuncts

  for (const row of conjuncts) {
    const regExp = new RegExp(`[${row[0]}][${row[1]}][${row[2]}][${row[3]}][${row[4]}]`)

    if (consonants.match(regExp))
      return true
  }

  return false
}
