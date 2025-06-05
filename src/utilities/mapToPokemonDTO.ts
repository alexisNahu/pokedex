import { PokemonChainEvolutionDAO, PokemonDAO, PokemonSpeciesDAO } from "@models/dao";
import { PokemonDTO } from "@models/pokemon.model";

function flattenEvolutionChain(chain: any): string[] {
  const result: string[] = [];
  
  function traverse(node: any) {
    result.push(node.species.name);
    if (node.evolves_to?.length > 0) {
      node.evolves_to.forEach(traverse);
    }
  }

  traverse(chain);
  return result;
}


export function mapToPokemonDTO (
    species: PokemonSpeciesDAO,
    chain: PokemonChainEvolutionDAO,
    pokemon: PokemonDAO
): PokemonDTO {
    return {
        id: pokemon.id,
        name: pokemon.name,
        evolutionChain: flattenEvolutionChain(chain.chain),
        types: pokemon.types.map(type => type.type.name),
        descriptions: species.flavor_text_entries
          .filter(entry => entry.language.name === 'en')
          .map(entry => ({
            game: entry.version.name,
            description: entry.flavor_text.replace(/\n|\f/g, ' ')
          })),
        abilities: pokemon.abilities.map((ability) => ability.ability.name),
        isLegendary: species.is_legendary,
        isMythical: species.is_mythical,
        stats: pokemon.stats,
        megas: species.varieties.filter(variety => variety.pokemon.name.includes('mega')).map(variety => variety.pokemon.name),
        forms: species.varieties.filter(variety => !variety.pokemon.name.includes('mega')).map(variety => variety.pokemon.name),
        generation: species.generation.name
    }
}