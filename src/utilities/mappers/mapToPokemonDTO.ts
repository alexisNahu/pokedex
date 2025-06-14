import { AllSpritesDAO, BasicChain, DescriptionDAO, PokemonChainEvolutionDAO, PokemonDAO, PokemonSpeciesDAO } from "@models/dao";
import { DescriptionLanguages, Descriptions, PokemonDTO, PossibleVariants, RegionalVersionsRecord } from "@models/pokemon.model";
import { mapToVariantPokemonDTO } from "./mapToVariantPokemon";
import { type } from "os";


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

function filterDescriptionsByLanguage(lang: DescriptionLanguages, descriptions: DescriptionDAO[]) {
  return descriptions.filter((entry) => entry.language.name === lang)
}



export function mapToPokemonDTO (
    species: PokemonSpeciesDAO,
    chain: PokemonChainEvolutionDAO,
    pokemon: PokemonDAO,
    sprites: AllSpritesDAO,
    megas: PokemonDAO[],
    variants: PokemonDAO[],
    getSprite: (name: string, isShiny: boolean) => AllSpritesDAO // Función síncrona
): PokemonDTO {
    console.log('sprite: ',sprites)

    return {
        id: pokemon.id,
        name: pokemon.name,
        evolutionChain: getEvolutionChainWithSprites(chain, getSprite),
        types: pokemon.types.map(type => type.type.name),
        descriptions: {
          en: filterDescriptionsByLanguage('en', species.flavor_text_entries).map(description => ({
            game: description.version.name,
            description: description.flavor_text
          })),
          es: filterDescriptionsByLanguage('es', species.flavor_text_entries).map(description => ({
            game: description.version.name,
            description: description.flavor_text
          })),
          jp: filterDescriptionsByLanguage('jp', species.flavor_text_entries).map(description => ({
            game: description.version.name,
            description: description.flavor_text
          }))
        },
        megas: megas.map(mega => mapToVariantPokemonDTO(mega, PossibleVariants.MEGA)),
        variants: variants.map(variant => mapToVariantPokemonDTO(variant, PossibleVariants.REGIONAL_VARIANT)),
        abilities: pokemon.abilities.map((ability) => ability.ability.name),
        isLegendary: species.is_legendary,
        isMythical: species.is_mythical,
        stats: pokemon.stats.map((stat) => ({stat: stat.stat.name.trim(), value: stat.base_stat})),
        generation: species.generation.name,
        sprites: sprites,
        isMega: false
    }
}