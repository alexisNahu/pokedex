import { AllSpritesDAO } from '@models/dao'
import {getStaticSprite, getAnimatedSprite, get3dSprite} from '../api/sprites.api'

export function getStaticFrontwardsSprite(pokemonName: string, isShiny: boolean) {
    return getStaticSprite(pokemonName, isShiny, false)
}

export function getStaticBackwardsSprite(pokemonName: string, isShiny: boolean) {
    return getStaticSprite(pokemonName, isShiny, true)
}

export function getAnimatedFrontwardsSprite(pokemonName: string, isShiny: boolean) {
    return getAnimatedSprite(pokemonName, isShiny, false)
}

export function getAnimatedBackwardsSprite(pokemonName: string, isShiny: boolean) {
    return getAnimatedSprite(pokemonName,isShiny, true)
}

export function getStatic3dSprite(pokemonName: string, isShiny: boolean) {
    return get3dSprite(pokemonName, isShiny)
}

export function getAllSprites(pokemonName: string): AllSpritesDAO {

    return {
        static: {
            shiny: {
                d2: {
                    front: getStaticSprite(pokemonName, true, false),
                    back: getStaticSprite(pokemonName, true, true)
                },
                d3: get3dSprite(pokemonName, true)
            },
            normal: {
                d2: {
                    front: getStaticSprite(pokemonName, false, false),
                    back: getStaticSprite(pokemonName, false, true)
                },
                d3: get3dSprite(pokemonName, false)
            }
        },
        animated: {
            shiny: {
                d2: {
                    front: getAnimatedSprite(pokemonName, true, false),
                    back: getAnimatedSprite(pokemonName, true, true)
                },
                d3: get3dSprite(pokemonName, true)
            },
            normal: {
                d2: {
                    front: getAnimatedSprite(pokemonName, false, false),
                    back: getAnimatedSprite(pokemonName, false, true)
                },
                d3: get3dSprite(pokemonName, false)
            }
    }
    }
}

export function getAll3dSprites(pokemonName: string, isShiny: boolean) {
    return get3dSprite(pokemonName, isShiny)
}
