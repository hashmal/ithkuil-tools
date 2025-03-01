import { CONTINUANT_GEMINABLES, getConsonantCategory, STOPS_GEMINABLES } from '../phonology'

export function biConsonantalConjunctSplit(consonants: string): number {
  // `h` splitting syllables
  if (consonants.match(/^[ptkcč]h$/)) return 1

  // Geminable Stops
  const stopsGeminables = new RegExp(`^([${STOPS_GEMINABLES.join('')}])\\1$`)
  const stopGeminableMatch = consonants.match(stopsGeminables)
  if (stopGeminableMatch) return stopGeminableMatch.index! + 1

  // Geminable Continuants
  const continuantsGeminables = new RegExp(`([${CONTINUANT_GEMINABLES.join('')}])\\1`)
  const continuantGeminableMatch = consonants.match(continuantsGeminables)
  if (continuantGeminableMatch) return continuantGeminableMatch.index! + 2

  // General rules
  return checkBiConsonantStrength(consonants)
}

export function triConsonantalConjunctSplit(consonants: string): number {
  // Ad-hoc rules
  if (consonants === 'zvw') return 1
  if (consonants === 'zxr') return 1

  return 0
}

export function tetraConsonantalConjunctSplit(consonants: string): number {
  // Ad-hoc rules
  if (consonants === 'pssp') return 3
  return 0
}

export function pentaConsonantalConjunctSplit(_consonants: string): number {
  return 0
}

function checkBiConsonantStrength(biConsonant: string): number {
  if (getConsonantCategory(biConsonant[0]) > getConsonantCategory(biConsonant[1])) {
    return 0
  } else if (getConsonantCategory(biConsonant[0]) < getConsonantCategory(biConsonant[1])) {
    return 1
  } else {
    return 0
  }
}
