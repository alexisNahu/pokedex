import { Variety } from "@models/dao";
import { RegionalVariants } from "@models/pokemon.model";

export function filterVariantPokemon(variances: Variety[]): Variety[] {
  return variances.filter(variety =>
    Object.values(RegionalVariants).some(region =>
      variety.pokemon.name.toLowerCase().includes(region)
    )
  )
}
