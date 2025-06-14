import { Variety } from "@models/dao";
import { RegionalVariants } from "@models/pokemon.model";

export function filterRegionalPokemon(variances: Variety[]): Variety[] {
  return variances.filter(variety =>
    Object.values(RegionalVariants).some(region =>
      variety.pokemon.name.toLowerCase().includes(region)
    )
  )
}

export const filterMegaPokemon = (varieties: Variety[], includes: boolean): Variety[] => {
    if (includes) return varieties.filter((variety) => variety.pokemon.name.includes('mega') || variety.pokemon.name.includes('primal')) 
    return varieties.filter((variety) => !variety.pokemon.name.includes('mega') || !variety.pokemon.name.includes('primal'))
}

export function filterGigamaxPokemon(variances: Variety[]): Variety[] {
  return variances.filter(variety => variety.pokemon.name.includes('gmax'))
}