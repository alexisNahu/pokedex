import { RegionalVersionsRecord } from "@models/pokemon.model"
import { POKEMON_SPRITES_URL, SPRITE_STYLE, POKEMON_3D_SPRITES_URL } from "../config/sprites.endpoints"


const knownForms = ['mega', 'gmax', 'alola', 'galar', 'hisui', 'paldea', 'unova'];

function transformName(pokemonName: string) {
  if (!pokemonName.includes('-')) return pokemonName 

  const parts = pokemonName.split("-");

  if (parts.length < 2) return pokemonName;

  const form_name = parts[1];

  if (!knownForms.includes(form_name)) return pokemonName;

  if (form_name === 'mega') return pokemonName;
  if (form_name === 'gmax') return pokemonName.replace('gmax', 'gigantamax');

  const form_name_transformed = RegionalVersionsRecord[form_name];
  return form_name_transformed
    ? pokemonName.replace(form_name, form_name_transformed)
    : pokemonName;
}


export function getStaticSprite(pokemonName: string, isShiny: boolean, isBack: boolean): string {
  let style: SPRITE_STYLE
  if (isBack && isShiny) style = SPRITE_STYLE.BACK_SHINY_STATIC
  else if (isBack && !isShiny) style = SPRITE_STYLE.BACK_NORMAL_STATIC
  else if (!isBack && isShiny) style = SPRITE_STYLE.FRONT_SHINY_STATIC
  else style = SPRITE_STYLE.FRONT_NORMAL_STATIC

  return `${POKEMON_SPRITES_URL}/${style}/${pokemonName}.png`
}

export function getAnimatedSprite(pokemonName: string, isShiny: boolean, isBack: boolean): string {
  let style: SPRITE_STYLE

  if (isBack && isShiny) style = SPRITE_STYLE.BACK_SHINY_ANIMATED
  else if (isBack && !isShiny) style = SPRITE_STYLE.BACK_NORMAL_ANIMATED
  else if (!isBack && isShiny) style = SPRITE_STYLE.FRONT_SHINY_ANIMATED
  else style = SPRITE_STYLE.FRONT_NORMAL_ANIMATED

  return `${POKEMON_SPRITES_URL}/${style}/${pokemonName}.gif`
}

export function get3dSprite(pokemonName: string, isShiny: boolean) {
  return `${POKEMON_3D_SPRITES_URL}/${isShiny ? SPRITE_STYLE.SHINY_3D : SPRITE_STYLE.NORMAL_3D}/${transformName(pokemonName)}.png`
}

