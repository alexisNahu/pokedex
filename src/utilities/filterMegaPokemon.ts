import { Variety } from "@models/dao"

export const filterMegaPokemon = (varieties: Variety[], includes: boolean): Variety[] => {
    if (includes) return varieties.filter((variety) => variety.pokemon.name.includes('mega'))
    return varieties.filter((variety) => !variety.pokemon.name.includes('mega'))
}