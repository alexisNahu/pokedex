import {getStaticSprite, getAnimatedSprite} from '../api/sprites.api'

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
