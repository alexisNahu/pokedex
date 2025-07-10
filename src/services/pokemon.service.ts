import { AbilityDAO, AllSpritesDAO, PokemonChainEvolutionDAO, PokemonDAO, PokemonSpeciesDAO, TypeDAO } from '@models/dao';
import { PokedexFilters, PokemonDTO } from '@models/pokemon.model';
import * as pokeApiService from '@services/index'
import * as spritesService from '@services/index' 
import { mapToPokemonDTO } from '../utilities/mappers/mapToPokemonDTO';
import { filterRegionalPokemon, filterGigamaxPokemon, filterMegaPokemon } from '@utilities/filters';
import { mapToPokemonNamesDAO } from '@utilities/mappers/mapToPokemonNames';

export async function getPokemonDTOByNameOrId(name: string, signal?: AbortSignal): Promise<PokemonDTO | null> {
    try {
        const pokemon = await pokeApiService.getPokemonByNameOrId(name, signal)
        const species = await pokeApiService.getPokemonSpecies(name, signal)
        const chainEvolution = await pokeApiService.getPokemonChainEvolution(species.evolution_chain.url, signal)
        const allSprites = spritesService.getAllSprites(pokemon.name)

        const megaPromises = filterMegaPokemon(species.varieties, true).map(async (mega) => {
            return await pokeApiService.getPokemonByNameOrId(mega.pokemon.name, signal)
        })

        const variantPromises = filterRegionalPokemon(species.varieties).map(async (variant) => {
            return await pokeApiService.getPokemonByNameOrId(variant.pokemon.name, signal)
        })

        const gigamaxesPromises = filterGigamaxPokemon(species.varieties).map(async (gmax) => {
            return await pokeApiService.getPokemonByNameOrId(gmax.pokemon.name, signal)
        })

        const abilitiesPromises = pokemon.abilities.map(async (ability) => {
            return await pokeApiService.getPokemonAbility(ability.ability.name, signal)
        })

        const [megas, variants, gmaxs, abilities] = await Promise.all([
            Promise.all(megaPromises),
            Promise.all(variantPromises),
            Promise.all(gigamaxesPromises),
            Promise.all(abilitiesPromises),
        ])

        return mapToPokemonDTO(species, chainEvolution, pokemon, allSprites, megas, variants, gmaxs, abilities, spritesService.getAllSprites)
    } catch (e) {
        if (e === 'Aborted') return null
        throw e
    }
}

export async function filterPokemonList(
    request: PokedexFilters,
    pokemonList: Set<string>,
    signal?: AbortSignal
): Promise<Set<string> | null> {
    const results: Set<string>[] = []

    try {
        // 1. Generación
        if (request.generationFilter) {
            const generationPokes = await Promise.all(
                request.generationFilter.map(gen => pokeApiService.getPokemonGeneration(gen, signal))
            )
            const generationPokesNames = generationPokes.flatMap((poke) => mapToPokemonNamesDAO(poke.pokemon_species))
            const filteredGen = generationPokesNames.filter(name => pokemonList.has(name))
            results.push(new Set(filteredGen))
        }

        // 2. Tipos
        if (request.typesFilter) {
            const [firstTypeName, secondTypeName] = request.typesFilter
            const firstType = firstTypeName ? await pokeApiService.getPokemonType(firstTypeName, signal) : null
            const secondType = secondTypeName ? await pokeApiService.getPokemonType(secondTypeName, signal) : null

            if (firstType && secondType) {
                const secondSet = new Set(secondType.pokemon.map(p => p.pokemon.name))
                const shared = firstType.pokemon
                    .filter(p => secondSet.has(p.pokemon.name))
                    .map(p => p.pokemon.name)
                const filteredTypes = shared.filter(name => pokemonList.has(name))
                results.push(new Set(filteredTypes))
            } else if (firstType || secondType) {
                const typeData = firstType || secondType
                const typeNames = typeData?.pokemon.map(p => p.pokemon.name)
                const filteredTypes = typeNames?.filter(name => pokemonList.has(name))
                results.push(new Set(filteredTypes))
            }
        }

        // 3. Habilidades
        if (request.abilitiesFilter) {
            const abilitiesData = await Promise.all(
                request.abilitiesFilter.map(ability => pokeApiService.getPokemonAbility(ability, signal))
            )
            const abilitiesPokemons = abilitiesData.map((data) => data.pokemon)
            const names = abilitiesPokemons.flatMap((data) => data.map((poke) => poke.pokemon.name))
            const filteredAbilities = names.filter(name => pokemonList.has(name))
            results.push(new Set(filteredAbilities))
        }

        const activeFilters = results.filter((filter) => filter.size > 0)
        if (activeFilters.length === 0) return null

        const finalResult = activeFilters.reduce((acc, curr) =>
            new Set([...acc].filter(poke => curr.has(poke)))
        )

        return new Set([...finalResult].filter(poke => pokemonList.has(poke)))
    } catch (e) {
        if (e === 'Aborted') return null
        throw e
    }
}
