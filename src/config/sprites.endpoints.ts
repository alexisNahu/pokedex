
export const POKEMON_SPRITES_URL = 'https://img.pokemondb.net/sprites/legend-arceus'

export const POKEMON_3D_SPRITES_URL = 'https://img.pokemondb.net/sprites/home'


export enum SPRITE_STYLE {
  // 2D Black-White and earlier generations
  FRONT_NORMAL_STATIC = 'normal',
  FRONT_SHINY_STATIC = 'shiny',
  BACK_NORMAL_STATIC = 'back-normal',
  BACK_SHINY_STATIC = 'back-shiny',
  FRONT_NORMAL_ANIMATED = 'anim/normal',
  FRONT_SHINY_ANIMATED = 'anim/shiny',
  BACK_NORMAL_ANIMATED = 'anim/back-normal',
  BACK_SHINY_ANIMATED = 'anim/back-shiny',

  // 3D sprites (Pokémon Home)
  NORMAL_3D = 'normal',   
  SHINY_3D = 'shiny' 
}
