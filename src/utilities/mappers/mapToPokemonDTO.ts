import { Ability, AbilityDAO, AllSpritesDAO, BasicChain, DescriptionDAO, EffectEntries, PokemonChainEvolutionDAO, PokemonDAO, PokemonSpeciesDAO } from "@models/dao";
import { DescriptionLanguages, PokemonDTO, PossibleVariants } from "@models/pokemon.model";
import { mapToVariantPokemonDTO } from "./mapToVariantPokemon";
import { mapToAbilityDTO } from "./mapToAbilityDTO";
import { getPokemonWeaknesses } from "@utilities/getPokemonWeaknesses";


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



export async function mapToPokemonDTO (
    species: PokemonSpeciesDAO,
    chain: PokemonChainEvolutionDAO,
    pokemon: PokemonDAO,
    sprites: AllSpritesDAO,
    megas: PokemonDAO[],
    variants: PokemonDAO[],
    gmax: PokemonDAO[],
    abilities: AbilityDAO[],
    getSprite: (name: string, isShiny: boolean) => AllSpritesDAO // Función síncrona
): Promise<PokemonDTO> {
    const weaknessesResolved = await getPokemonWeaknesses(pokemon.types);
    const megasResolved = await Promise.all(megas.map(mega => mapToVariantPokemonDTO(mega, PossibleVariants.MEGA)));
    const variantsResolved = await Promise.all(variants.map(variant => mapToVariantPokemonDTO(variant, PossibleVariants.REGIONAL_VARIANT)));
    const gigamaxResolved = await Promise.all(gmax.map(gmax => mapToVariantPokemonDTO(gmax, PossibleVariants.GIGAMAX)));


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
        height: `${pokemon.height/10}m`,
        weight: `${pokemon.weight/10}kg`,
        megas: megasResolved,
        variants: variantsResolved,
        gigamax: gigamaxResolved,
        weaknesses: weaknessesResolved,
        abilities: abilities.map(ability => mapToAbilityDTO(ability)),
        isLegendary: species.is_legendary,
        isMythical: species.is_mythical,
        stats: pokemon.stats.map((stat) => ({stat: stat.stat.name.trim(), value: stat.base_stat})),
        generation: species.generation.name,
        sprites: sprites,
        variant_type: PossibleVariants.BASE_POKEMON,
        isMega: false
    }
}