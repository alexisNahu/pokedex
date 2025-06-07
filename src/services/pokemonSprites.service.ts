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

export function getAllSprites(pokemonName: string) {
    return {
        static: {
            shiny: {
                front: getStaticSprite(pokemonName, true, false),
                back: getStaticSprite(pokemonName, true, true)
            },
            normal: {
                front: getStaticSprite(pokemonName, false, false),
                back: getStaticSprite(pokemonName, false, true)
            }
        },
        animated: {
            shiny: {
                front: getAnimatedSprite(pokemonName, true, false),
                back: getAnimatedSprite(pokemonName, true, true)
            },
            normal: {
                front: getAnimatedSprite(pokemonName, false, false),
                back: getAnimatedSprite(pokemonName, false, true)
            }
        }
    }
}

export function getAll3dSprites(pokemonName: string, isShiny: boolean) {
    return get3dSprite(pokemonName, isShiny)
}
