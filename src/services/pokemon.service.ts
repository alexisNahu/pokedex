import { AbilityDAO, AllSpritesDAO, PokemonChainEvolutionDAO, PokemonDAO, PokemonSpeciesDAO, TypeDAO } from '@models/dao';
import { PokedexFilters, PokemonDTO } from '@models/pokemon.model';
import * as pokeApiService from '@services/index'
import * as spritesService from '@services/index' 
import { mapToPokemonDTO } from '../utilities/mappers/mapToPokemonDTO';
import { filterRegionalPokemon, filterGigamaxPokemon, filterMegaPokemon } from '@utilities/filters';
import { mapToPokemonNamesDAO } from '@utilities/mappers/mapToPokemonNames';

export async function getPokemonDTOByNameOrId(name: string): Promise<PokemonDTO | null> {
    const pokemon: PokemonDAO = await pokeApiService.getPokemonByNameOrId(name)
    const species: PokemonSpeciesDAO = await pokeApiService.getPokemonSpecies(name)
    const chainEvolution: PokemonChainEvolutionDAO = await pokeApiService.getPokemonChainEvolution(species.evolution_chain.url)
    const allSprites: AllSpritesDAO = spritesService.getAllSprites(pokemon.name)
    const megaPromises: Promise<PokemonDAO>[] = filterMegaPokemon(species.varieties, true).map(async (mega) => {
    try {
        return await pokeApiService.getPokemonByNameOrId(mega.pokemon.name);
    } catch (e) {
        throw new Error('error fetching mega pokemon');
    }
    });
    const variantPromises: Promise<PokemonDAO>[] = filterRegionalPokemon(species.varieties).map(async (variant) => {
    try {
        return await pokeApiService.getPokemonByNameOrId(variant.pokemon.name);
    } catch (e) {
        throw new Error('error fetching regional pokemon');
    }
    });
    const gigamaxesPromises: Promise<PokemonDAO>[] = filterGigamaxPokemon(species.varieties).map(async (gmax) => {
        try {
            return await pokeApiService.getPokemonByNameOrId(gmax.pokemon.name)
        } catch(e) {
            throw new Error ('error fetching gigamax pokemon')
        }
    })
    const abilitiesPromises: Promise<AbilityDAO>[] = pokemon.abilities.map(async (ability) => {
        try {
            return await pokeApiService.getPokemonAbility(ability.ability.name)
        } catch(e) {
            throw new Error ('error fetching ability')
        }
    })


    const megas: PokemonDAO[] = await Promise.all(megaPromises);
    const variants: PokemonDAO[] = await Promise.all(variantPromises);
    const gmaxs: PokemonDAO[] = await Promise.all(gigamaxesPromises);
    const abilities: AbilityDAO[] = await Promise.all(abilitiesPromises);

    return mapToPokemonDTO(species, chainEvolution, pokemon, allSprites, megas, variants, gmaxs, abilities, spritesService.getAllSprites)
}

export async function filterPokemonList(
    request: PokedexFilters,
    pokemonList: Set<string>
): Promise<Set<string> | null> {
    const results: Set<string>[] = []
    console.log(request)
    // 1. Generación
    if (request.generationFilter) {
        const generationPokes = await Promise.all(request.generationFilter.map(gen => pokeApiService.getPokemonGeneration(gen)))

        const generationPokesNames = generationPokes.flatMap((poke) => mapToPokemonNamesDAO(poke.pokemon_species))

        const filteredGen = generationPokesNames.filter(name => pokemonList.has(name))
        results.push(new Set(filteredGen))
    }

    // 2. Tipos
    if (request.typesFilter) {
        const [firstTypeName, secondTypeName] = request.typesFilter
        const firstType = firstTypeName ? await pokeApiService.getPokemonType(firstTypeName) : null
        const secondType = secondTypeName ? await pokeApiService.getPokemonType(secondTypeName) : null

        if (firstType && secondType) {
            const secondSet = new Set((secondType.pokemon.map(p => p.pokemon.name)))
            const shared = firstType.pokemon
                .filter(p => secondSet.has(p.pokemon.name))
                .map(p => p.pokemon.name)
            const filteredTypes = shared.filter(name => pokemonList.has(name))
            results.push(new Set(filteredTypes))
        } else if (firstType || secondType) {
            const typeData = firstType || secondType
            const typeNames = typeData?.pokemon.map(p => p.pokemon.name)
            const filteredTypes = typeNames?.filter(name => pokemonList.has(name))
            results.push(new Set(filteredTypes))        }
    }

    // 3. Abilidades

    if (request.abilitiesFilter) {
        const abilitiesData = await Promise.all(request.abilitiesFilter.map(ability => pokeApiService.getPokemonAbility(ability)))
        const abilitiesPokemons = abilitiesData.map((data) => data.pokemon)
        const names = abilitiesPokemons.map((data) => 
            data.map((poke) => poke.pokemon.name
        )).flat()

        const filteredAbilities = names.filter(name => pokemonList.has(name))
        results.push(new Set(filteredAbilities))
    }

    // 3. Si hay varios filtros aplicados, hacemos la intersección
    let finalResult: Set<string> | null
    console.log(results)

    if (results.length === 0) {
        finalResult = null // si no hay filtros, usar todo
        return finalResult
    } else {
        // empezamos desde el primer conjunto y vamos intersectando
        console.log('aaaa')
        finalResult = new Set(results[0])
        for (let i = 1; i < results.length; i++) {
            finalResult = new Set([...finalResult].filter(poke => results[i].has(poke)))
        }
    }

    // 4. Finalmente, filtrar con los Pokémon existentes
    const filteredFinal = new Set([...finalResult].filter(name => pokemonList.has(name)))
    console.log(finalResult)
    return filteredFinal
}
