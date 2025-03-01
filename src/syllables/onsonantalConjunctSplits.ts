import { CONTINUANT_GEMINABLES, getConsonantCategory, STOPS_GEMINABLES } from '../phonology'

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
  return checkBiConsonantStrength(consonants)
}

export function triConsonantalConjunctSplit(consonants: string): number {
  // Geminable Stops
  const stopsGeminables = new RegExp(`([${STOPS_GEMINABLES.join('')}])\\1`)
  const stopGeminableMatch = consonants.match(stopsGeminables)
  if (stopGeminableMatch) return stopGeminableMatch.index! + 1

  return checkTriConsonantStrength(consonants)
}

export function tetraConsonantalConjunctSplit(consonants: string): number {
  // Ad-hoc rules
  // if (consonants === 'pssp') return 3

  return checkTetraConsonantStrength(consonants)
}

export function pentaConsonantalConjunctSplit(consonants: string): number {
  return checkPentaConsonantStrength(consonants)
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

function checkTriConsonantStrength(triConsonant: string): number {
  if (getConsonantCategory(triConsonant[0]) > getConsonantCategory(triConsonant[1])) {
    return 0
  } else if (getConsonantCategory(triConsonant[0]) < getConsonantCategory(triConsonant[1])) {
    if (getConsonantCategory(triConsonant[1]) > getConsonantCategory(triConsonant[2])) {
      return 1
    } else if (getConsonantCategory(triConsonant[1]) < getConsonantCategory(triConsonant[2])) {
      return 2
    } else {
      return 1
    }
  } else {
    return 0
  }
}

function checkTetraConsonantStrength(tetraConsonant: string): number {
  if (getConsonantCategory(tetraConsonant[0]) > getConsonantCategory(tetraConsonant[1])) {
    return 0
  } else if (getConsonantCategory(tetraConsonant[0]) < getConsonantCategory(tetraConsonant[1])) {
    if (getConsonantCategory(tetraConsonant[1]) > getConsonantCategory(tetraConsonant[2])) {
      return 1
    } else if (getConsonantCategory(tetraConsonant[1]) < getConsonantCategory(tetraConsonant[2])) {
      if (getConsonantCategory(tetraConsonant[2]) > getConsonantCategory(tetraConsonant[3])) {
        return 2
      } else if (getConsonantCategory(tetraConsonant[2]) < getConsonantCategory(tetraConsonant[3])) {
        return 3
      } else {
        return 2
      }
    } else {
      return 1
    }
  } else {
    return 0
  }
}

function checkPentaConsonantStrength(pentaConsonant: string): number {
  if (getConsonantCategory(pentaConsonant[0]) > getConsonantCategory(pentaConsonant[1])) {
    return 0
  } else if (getConsonantCategory(pentaConsonant[0]) < getConsonantCategory(pentaConsonant[1])) {
    if (getConsonantCategory(pentaConsonant[1]) > getConsonantCategory(pentaConsonant[2])) {
      return 1
    } else if (getConsonantCategory(pentaConsonant[1]) < getConsonantCategory(pentaConsonant[2])) {
      if (getConsonantCategory(pentaConsonant[2]) > getConsonantCategory(pentaConsonant[3])) {
        return 2
      } else if (getConsonantCategory(pentaConsonant[2]) < getConsonantCategory(pentaConsonant[3])) {
        // return 3
        if (getConsonantCategory(pentaConsonant[3]) > getConsonantCategory(pentaConsonant[4])) {
          return 3
        } else if (getConsonantCategory(pentaConsonant[3]) < getConsonantCategory(pentaConsonant[4])) {
          return 4
        } else {
          return 3
        }
      } else {
        return 2
      }
    } else {
      return 1
    }
  } else {
    return 0
  }
}
