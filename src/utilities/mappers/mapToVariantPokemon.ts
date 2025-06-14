import {PokemonDAO} from "@models/dao";
import {  PossibleVariants, RegionalVariants, VariantPokemonDTO } from "@models/pokemon.model";
import { POKEMON_TYPES } from "@models/pokemonTypes.model";
import * as spritesService from '@services/index'


export function mapToVariantPokemonDTO(variant: PokemonDAO, type: PossibleVariants): VariantPokemonDTO {
  return {
    id: variant.id,
    name: variant.name,
    types: variant.types.map(t => t.type.name as POKEMON_TYPES),
    abilities: variant.abilities.map(a => a.ability.name),
    stats: variant.stats.map((stat) => ({stat: stat.stat.name.trim(), value: stat.base_stat})),
    sprites: spritesService.getAllSprites(variant.name),
    variant_type: type
  }
}


