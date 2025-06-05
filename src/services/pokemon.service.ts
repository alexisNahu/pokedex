import { PokemonChainEvolutionDAO, PokemonDAO, PokemonSpeciesDAO } from '@models/dao';
import { PokemonDTO } from '@models/pokemon.model';
import * as pokeApiService from '@services/pokeapi.service'
import { mapToPokemonDTO } from '../utilities/mapToPokemonDTO';

export async function getPokemonByNameOrId(name: string): Promise<PokemonDTO> {
    const pokemon: PokemonDAO = await pokeApiService.getPokemonByNameOrId(name)
    const species: PokemonSpeciesDAO = await pokeApiService.getPokemonSpecies(name)
    const chainEvolution: PokemonChainEvolutionDAO = await pokeApiService.getPokemonChainEvolution(species.evolution_chain.url)

    return mapToPokemonDTO(species, chainEvolution, pokemon)
}