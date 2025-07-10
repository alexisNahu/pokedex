import { PokemonDTO, PossibleVariants, VariantPokemonDTO } from '@models/pokemon.model';
import React from 'react'

interface Props {
    isShiny: boolean
    poke: PokemonDTO | VariantPokemonDTO,
    imgWidth: number
}

function PokemonImage({isShiny, poke, imgWidth }: Props) {
  return (
    <img
        src={isShiny
        ? (poke.variant_type === PossibleVariants.MEGA
            ? poke.sprites?.static?.shiny?.d3
            : poke.sprites.animated.shiny.d2.front)
        : (poke.variant_type === PossibleVariants.MEGA
            ? poke.sprites.static.normal.d3
            : poke.sprites.animated.normal.d2.front)}
        onError={(e) => {
        const img = e.currentTarget;
        img.src = isShiny
            ? (poke.variant_type === PossibleVariants.MEGA
                ? poke.sprites?.static?.shiny?.d3
                : poke.sprites.static.shiny.d3)
            : (poke.variant_type === PossibleVariants.MEGA
                ? poke.sprites.static.normal.d3
                : poke.sprites.static.normal.d3);
        }}
        alt={`${poke.name} ${isShiny ? 'shiny' : 'normal'} sprite`}
        style={{ 
        imageRendering:'pixelated',
        width: `${imgWidth}px`,
        height:'auto'
        }}
        className="img align-self-center"
    />
  )
}

export default PokemonImage