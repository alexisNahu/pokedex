import { mapToPokemonNamesDAO } from "@utilities/mappers/mapToPokemonNames"
import { getPokemonNamesList } from "./pokeapi.service"

export const getPokemonNames = async () => {
    console.log('fetching names')
    try {
        const names = await getPokemonNamesList()
        if (names) return mapToPokemonNamesDAO(names)
    } catch (e) {
        throw Error (`Error while fetching ${e}`)
    }
}