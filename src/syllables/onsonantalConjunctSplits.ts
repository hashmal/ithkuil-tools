import { CONTINUANT_GEMINABLES, getConsonantCategory as getCsCategory, STOPS_GEMINABLES } from '../phonology'

export function biConsonantalConjunctSplit(consonants: string): number {
  // `h` splitting syllables
  if (consonants.match(/^[ptkcč]h$/)) return 1

  // Geminable Stops
  const stopsGeminables = new RegExp(`([${STOPS_GEMINABLES.join('')}])\\1`)
  const stopGeminableMatch = consonants.match(stopsGeminables)
  if (stopGeminableMatch) return stopGeminableMatch.index! + 1

  // Geminable Continuants
  const continuantsGeminables = new RegExp(`([${CONTINUANT_GEMINABLES.join('')}])\\1`)
  const continuantGeminableMatch = consonants.match(continuantsGeminables)
  if (continuantGeminableMatch) return continuantGeminableMatch.index! + 2

  // General rules
  return checkConsonantStrengthRecursively(consonants)
}

export function triConsonantalConjunctSplit(consonants: string): number {
  // Geminable Stops
  const stopsGeminables = new RegExp(`([${STOPS_GEMINABLES.join('')}])\\1`)
  const stopGeminableMatch = consonants.match(stopsGeminables)
  if (stopGeminableMatch) return stopGeminableMatch.index! + 1

  return checkConsonantStrengthRecursively(consonants)
}

export function tetraConsonantalConjunctSplit(consonants: string): number {
  // Geminable Continuants
  const continuantsGeminables = new RegExp(`([${CONTINUANT_GEMINABLES.join('')}])\\1`)
  const continuantGeminableMatch = consonants.match(continuantsGeminables)
  if (continuantGeminableMatch) return continuantGeminableMatch.index! + 2

  return checkConsonantStrengthRecursively(consonants)
}

export function pentaConsonantalConjunctSplit(consonants: string): number {
  return checkConsonantStrengthRecursively(consonants)
}

function checkConsonantStrengthRecursively(consonants: string, index=0): number {
  if (consonants.length === 1) return 0

  if (getCsCategory(consonants[index]) > getCsCategory(consonants[index + 1])) {
    return index
  } else if (getCsCategory(consonants[index]) < getCsCategory(consonants[index + 1])) {
    if (index === consonants.length - 1) {
      return index - 1
    } else {
      return checkConsonantStrengthRecursively(consonants, index + 1)
    }
  } else {
    return index
  }
}
