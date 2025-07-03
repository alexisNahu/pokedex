import { AbilityDAO, AllSpritesDAO, PokemonChainEvolutionDAO, PokemonDAO, PokemonSpeciesDAO, TypeDAO } from '@models/dao';
import { PokedexFilters, PokemonDTO } from '@models/pokemon.model';
import * as pokeApiService from '@services/index'
import * as spritesService from '@services/index' 
import { mapToPokemonDTO } from '../utilities/mappers/mapToPokemonDTO';
import { filterRegionalPokemon, filterGigamaxPokemon, filterMegaPokemon } from '@utilities/filters';
import { mapToPokemonNamesDAO } from '@utilities/mappers/mapToPokemonNames';
import { PokemonType } from '@models/pokemonTypes.model';
import { PassThrough } from 'stream';


export async function getPokemonDTOByNameOrId(name: string): Promise<PokemonDTO> {
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
            return await pokeApiService.getPokemonAbility(ability.ability.url)
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
): Promise<Set<string>> {
    const results: Set<string>[] = []
    console.log(request)

    // 1. Generación
    if (request.generationFilter) {
        const generationData = await Promise.all(
            request.generationFilter.map(gen => pokeApiService.getPokemonGeneration(gen))
        );

        // Unimos todos los nombres de especies de todas las generaciones
        const allGenNames = generationData.flatMap(gen =>
            gen.pokemon_species.map((species: { name: string }) => species.name)
        )

        results.push(new Set(allGenNames))
    }

    // 2. Tipos
    if (request.typesFilter) {
        const [firstTypeName, secondTypeName] = request.typesFilter
        const firstType = firstTypeName ? await pokeApiService.getPokemonType(firstTypeName) : null
        const secondType = secondTypeName ? await pokeApiService.getPokemonType(secondTypeName) : null

        if (firstType && secondType) {
        const secondSet = new Set(secondType.pokemon.map(p => p.pokemon.name))
        const shared = firstType.pokemon
            .filter(p => secondSet.has(p.pokemon.name))
            .map(p => p.pokemon.name)

        results.push(new Set(shared))
        } else if (firstType || secondType) {
        const typeData = firstType || secondType
            const typeNames = typeData?.pokemon.map(p => p.pokemon.name)
            results.push(new Set(typeNames))
        }
    }

    // 3. Si hay varios filtros aplicados, hacemos la intersección
    let finalResult: Set<string>

    if (results.length === 0) {
        finalResult = new Set(pokemonList) // si no hay filtros, usar todo
    } else {
        // empezamos desde el primer conjunto y vamos intersectando
        finalResult = new Set(results[0])
        for (let i = 1; i < results.length; i++) {
        finalResult = new Set([...finalResult].filter(poke => results[i].has(poke)))
        }
    }

    // 4. Finalmente, filtrar con los Pokémon existentes
    const filteredFinal = new Set([...finalResult].filter(name => pokemonList.has(name)))
    return filteredFinal
}
