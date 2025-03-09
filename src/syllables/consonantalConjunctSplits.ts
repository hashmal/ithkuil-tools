import { CONTINUANT_GEMINABLES, getConsonantCategory as getCsCategory, STOPS_GEMINABLES } from '../phonology'

export function biConsonantalConjunctSplit(consonants: string): number {
  // `h` splitting syllables
  if (consonants.match(/^[ptkcč]h$/)) return 1

  // Geminable Stops
  const stopGeminationsSplit = geminatedStop(consonants)
  if (stopGeminationsSplit) return stopGeminationsSplit

  // Geminable continuants
  const continuantGemiinationSplit = geminatedContinuant(consonants)
  if (continuantGemiinationSplit) return continuantGemiinationSplit - 2
  // NOTE: bi-consonantal conjuncts consisting of a gemination splits the syllable before the geminated consonant

  // General rules
  return checkConsonantStrengthRecursively(consonants)
}

export function triConsonantalConjunctSplit(consonants: string): number {
  // Geminable Stops
  const stopGeminationsSplit = geminatedStop(consonants)
  if (stopGeminationsSplit) return stopGeminationsSplit

  // Geminable continuants
  const continuantGemiinationIndex = geminatedContinuantIndex(consonants)
  if (continuantGemiinationIndex === 0) {
    const continuantGemiinationSplit = geminatedContinuant(consonants)
    if (continuantGemiinationSplit) return continuantGemiinationSplit
  }

  // General rules
  return checkConsonantStrengthRecursively(consonants)
}

export function tetraConsonantalConjunctSplit(consonants: string): number {
  // Geminable Stops
  const stopGeminationsSplit = geminatedStop(consonants)
  if (stopGeminationsSplit) return stopGeminationsSplit

  // Geminable continuants
  const continuantGemiinationSplit = geminatedContinuant(consonants)
  if (continuantGemiinationSplit) return continuantGemiinationSplit

  // General rules
  return checkConsonantStrengthRecursively(consonants)
}

export function pentaConsonantalConjunctSplit(consonants: string): number {
  // Geminable Stops
  const stopGeminationsSplit = geminatedStop(consonants)
  if (stopGeminationsSplit) return stopGeminationsSplit

  // // Geminable continuants
  // const continuantGemiinationSplit = geminatedContinuant(consonants)
  // if (continuantGemiinationSplit) return continuantGemiinationSplit

  // General rules
  return checkConsonantStrengthRecursively(consonants)
}

function checkConsonantStrengthRecursively(consonants: string, index=0): number {
  if (consonants.length === 1) return 0

  if (getCsCategory(consonants[index]) > getCsCategory(consonants[index + 1])) {
    return index
  } else if (getCsCategory(consonants[index]) <= getCsCategory(consonants[index + 1])) {
    if (index === consonants.length - 1) {
      return index - 1
    } else {
      return checkConsonantStrengthRecursively(consonants, index + 1)
    }
  } else {
    return index
  }
}

function geminatedStop(consonants: string): number | undefined {
  const geminatedStop = new RegExp(`([${STOPS_GEMINABLES.join('')}])\\1`)
  const geminatedStopMatch = consonants.match(geminatedStop)
  if (geminatedStopMatch) return geminatedStopMatch.index! + 1
}

function geminatedContinuant(consonants: string): number | undefined {
  const geminatedContinuant = new RegExp(`([${CONTINUANT_GEMINABLES.join('')}])\\1`)
  const geminatedContinuantMatch = consonants.match(geminatedContinuant)
  if (geminatedContinuantMatch) return geminatedContinuantMatch.index! + 2
}

function geminatedContinuantIndex(consonants: string): number | undefined {
  const geminatedContinuant = new RegExp(`([${CONTINUANT_GEMINABLES.join('')}])\\1`)
  const geminatedContinuantMatch = consonants.match(geminatedContinuant)
  if (geminatedContinuantMatch) return geminatedContinuantMatch.index!
}
