import { AllSpritesDAO } from '@models/dao'
import { getStaticSprite, getAnimatedSprite, get3dSprite } from '../api/sprites.api'

export const getStaticFrontwardsSprite = (pokemonName: string, isShiny: boolean) =>
  getStaticSprite(pokemonName, isShiny, false)

export const getStaticBackwardsSprite = (pokemonName: string, isShiny: boolean) =>
  getStaticSprite(pokemonName, isShiny, true)

export const getAnimatedFrontwardsSprite = (pokemonName: string, isShiny: boolean) =>
  getAnimatedSprite(pokemonName, isShiny, false)

export const getAnimatedBackwardsSprite = (pokemonName: string, isShiny: boolean) =>
  getAnimatedSprite(pokemonName, isShiny, true)

export const getStatic3dSprite = (pokemonName: string, isShiny: boolean) =>
  get3dSprite(pokemonName, isShiny)

export const getAllSprites = (pokemonName: string): AllSpritesDAO => ({
  static: {
    shiny: {
      d2: {
        front: getStaticSprite(pokemonName, true, false),
        back: getStaticSprite(pokemonName, true, true),
      },
      d3: get3dSprite(pokemonName, true),
    },
    normal: {
      d2: {
        front: getStaticSprite(pokemonName, false, false),
        back: getStaticSprite(pokemonName, false, true),
      },
      d3: get3dSprite(pokemonName, false),
    },
  },
  animated: {
    shiny: {
      d2: {
        front: getAnimatedSprite(pokemonName, true, false),
        back: getAnimatedSprite(pokemonName, true, true),
      },
      d3: get3dSprite(pokemonName, true),
    },
    normal: {
      d2: {
        front: getAnimatedSprite(pokemonName, false, false),
        back: getAnimatedSprite(pokemonName, false, true),
      },
      d3: get3dSprite(pokemonName, false),
    },
  },
})

export const getAll3dSprites = (pokemonName: string, isShiny: boolean) =>
  get3dSprite(pokemonName, isShiny)
