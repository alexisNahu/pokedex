import { AllSpritesDAO, PokemonChainEvolutionDAO, PokemonDAO, PokemonSpeciesDAO } from '@models/dao';
import { PokemonDTO } from '@models/pokemon.model';
import * as pokeApiService from '@services/index'
import * as spritesService from '@services/index' 
import { mapToPokemonDTO } from '../utilities/mappers/mapToPokemonDTO';
import { filterMegaPokemon } from '@utilities/filterMegaPokemon';

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

    console.log('pre',species)

    const megas: PokemonDAO[] = await Promise.all(megaPromises);

    return mapToPokemonDTO(species, chainEvolution, pokemon, allSprites, megas)
}