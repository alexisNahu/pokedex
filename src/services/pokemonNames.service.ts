import { mapToPokemonNamesDAO } from "@utilities/mappers/mapToPokemonNames"
import { getPokemonNamesList } from "./pokeapi.service"

export const getPokemonNames = async () => {
    console.log('fetching names')
    try {
        const names = await getPokemonNamesList()
        console.log(names)
        if (names) return mapToPokemonNamesDAO(names.results)
    } catch (e) {
        throw Error (`Error while fetching ${e}`)
    }
}