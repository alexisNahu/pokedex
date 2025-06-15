import {AbilityDAO, PokemonDAO} from "@models/dao";
import {  PossibleVariants, VariantPokemonDTO } from "@models/pokemon.model";
import { POKEMON_TYPES } from "@models/pokemonTypes.model";
import * as spritesService from '@services/index'
import * as pokeApiService from '@services/index'
import { mapToAbilityDTO } from "./mapToAbilityDTO";

export async function mapToVariantPokemonDTO(variant: PokemonDAO, type: PossibleVariants): Promise<VariantPokemonDTO> {

  async function getAbilities () {
    const abilitiesPromises: Promise<AbilityDAO>[] = variant.abilities.map(async (ability) => {
      try {
        return await pokeApiService.getPokemonAbility(ability.ability.url);
      } catch (e) {
        throw new Error('error fetching ability');
      }
    });

    return await Promise.all(abilitiesPromises);
  }  

  const abilities = await getAbilities();

  return {
    id: variant.id,
    name: variant.name,
    types: variant.types.map(t => t.type.name as POKEMON_TYPES),
    abilities: abilities.map((ability: AbilityDAO) => mapToAbilityDTO(ability)),
    stats: variant.stats.map((stat) => ({ stat: stat.stat.name.trim(), value: stat.base_stat})),
    sprites: spritesService.getAllSprites(variant.name),
    height: `${variant.height/10}m`,
    weight: `${variant.weight/10}kg`,
    variant_type: type
  };
}
