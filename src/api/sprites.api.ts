import { POKEMON_SPRITES_URL, SPRITE_STYLE } from "../config/fetchSpritesUrls"

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
