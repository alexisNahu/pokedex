
export const POKEMON_SPRITES_URL = 'https://img.pokemondb.net/sprites/black-white'

export const POKEMON_3D_SPRITES_URL = 'https://img.pokemondb.net/sprites/home/'


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
  FRONT_NORMAL_3D = 'front',   
  FRONT_SHINY_3D = 'front-shiny' 
}
