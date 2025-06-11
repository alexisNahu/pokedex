import {PokemonDAO} from "@models/dao";
import { MegaPokemonDTO } from "@models/pokemon.model";
import { POKEMON_TYPES } from "@models/pokemonTypes.model";
import * as spritesService from '@services/index'


export function mapToMegaPokemonDTO(mega: PokemonDAO): MegaPokemonDTO {
  return {
    id: mega.id,
    name: mega.name,
    types: mega.types.map(t => t.type.name as POKEMON_TYPES),
    abilities: mega.abilities.map(a => a.ability.name),
    stats: mega.stats.map((stat) => ({stat: stat.stat.name.trim(), value: stat.base_stat})),
    sprites: spritesService.getAllSprites(mega.name),
    isMega: true
  }
}
