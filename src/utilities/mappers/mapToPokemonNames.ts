import { PokemonNamesDAO } from "@models/dao"

export const mapToPokemonNamesDAO = (results: PokemonNamesDAO): string[] => {
    return results.results.map(result => result.name)
}