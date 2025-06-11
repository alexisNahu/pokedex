import { AllSpritesDAO, BasicChain, PokemonChainEvolutionDAO, PokemonDAO, PokemonSpeciesDAO } from "@models/dao";
import { PokemonDTO } from "@models/pokemon.model";
import { filterMegaPokemon } from "../filterMegaPokemon";
import { mapToMegaPokemonDTO } from "./mapToMegaPokemon";


function getEvolutionChainWithSprites(
  chain: PokemonChainEvolutionDAO,
  getSprite: (pokemonName: string, isShiny: false) => AllSpritesDAO // Ahora es síncrono
): {name: string, sprite: AllSpritesDAO}[] {
  const result: {name: string, sprite: AllSpritesDAO}[] = [];
  
  function traverse(node: BasicChain) {
    result.push({
      name: node.species.name,
      sprite: getSprite(node.species.name, false) // Llamada síncrona
    });
    
    node.evolves_to.forEach(traverse);
  }

  traverse(chain.chain);
  return result;
}


export function mapToPokemonDTO (
    species: PokemonSpeciesDAO,
    chain: PokemonChainEvolutionDAO,
    pokemon: PokemonDAO,
    sprites: AllSpritesDAO,
    megas: PokemonDAO[],
    getSprite: (name: string, isShiny: boolean) => AllSpritesDAO // Función síncrona
): PokemonDTO {
    console.log('sprite: ',sprites)

    return {
        id: pokemon.id,
        name: pokemon.name,
        evolutionChain: getEvolutionChainWithSprites(chain, getSprite),
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
        sprites: sprites,
        isMega: false
    }
}