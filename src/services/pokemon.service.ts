import { AbilityDAO, AllSpritesDAO, PokemonChainEvolutionDAO, PokemonDAO, PokemonSpeciesDAO } from '@models/dao';
import { PokemonDTO } from '@models/pokemon.model';
import * as pokeApiService from '@services/index'
import * as spritesService from '@services/index' 
import { mapToPokemonDTO } from '../utilities/mappers/mapToPokemonDTO';
import { filterRegionalPokemon, filterGigamaxPokemon, filterMegaPokemon } from '@utilities/filters';
import { mapToPokemonNamesDAO } from '@utilities/mappers/mapToPokemonNames';

interface FilterProps {
    generationFilter: string | null
}

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

export async function filterPokemonList(request: FilterProps) {
    const response = []
 
    let generation = request.generationFilter ? await pokeApiService.getPokemonGeneration(request.generationFilter as string) : null
 
    if (generation) {
        generation = mapToPokemonNamesDAO(generation.pokemon_species)
        response.push(...generation)
    }

    return response
}