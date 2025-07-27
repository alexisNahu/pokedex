import { mapToPokemonNamesDAO } from "@utilities"
import { getPokemonNamesList } from "@services"

export const getPokemonNames = async () => {
    console.log('fetching names')
    try {
        const names = await getPokemonNamesList()
        console.log(names)
        if (names) return new Set<string>(mapToPokemonNamesDAO(names.results))
    } catch (e) {
        throw Error (`Error while fetching ${e}`)
    }
}