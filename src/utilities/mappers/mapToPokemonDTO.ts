import { AllSpritesDAO, PokemonChainEvolutionDAO, PokemonDAO, PokemonSpeciesDAO } from "@models/dao";
import { MegaPokemonDTO, PokemonDTO } from "@models/pokemon.model";
import { filterMegaPokemon } from "../filterMegaPokemon";
import { mapToMegaPokemonDTO } from "./mapToMegaPokemon";

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
    pokemon: PokemonDAO,
    sprites: AllSpritesDAO,
    megas: PokemonDAO[]
): PokemonDTO {
    return {
        id: pokemon.id,
        name: pokemon.name,
        evolutionChain: flattenEvolutionChain(chain.chain),
        types: pokemon.types.map(type => type.type.name),
        descriptions: species.flavor_text_entries
          .map(entry => ({
            lang: entry.language.name,
            game: entry.version.name,
            description: entry.flavor_text.replace(/\n|\f/g, ' ')
          })),
        megas: megas.map(mega => mapToMegaPokemonDTO(mega)),
        abilities: pokemon.abilities.map((ability) => ability.ability.name),
        isLegendary: species.is_legendary,
        isMythical: species.is_mythical,
        stats: pokemon.stats.map((stat) => ({stat: stat.stat.name.trim(), value: stat.base_stat})),
        forms: filterMegaPokemon(species.varieties, false).map(variety => variety.pokemon.name),
        generation: species.generation.name,
        sprites: {
          static_normal_front_2d: sprites.static.normal.front,
          static_shiny_front_2d: sprites.static.shiny.front,
          static_normal_back_2d: sprites.static.normal.back,
          static_shiny_back_2d: sprites.static.shiny.back,

          animated_normal_front_2d: sprites.animated.normal.front,
          animated_shiny_front_2d: sprites.animated.shiny.front,
          animated_normal_back_2d: sprites.animated.normal.back,
          animated_shiny_back_2d: sprites.animated.shiny.back
        },
        isMega: false
    }
}