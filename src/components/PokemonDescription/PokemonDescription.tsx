import PokedexEntrySlider from '@components/card/PokedexEntrySlider/PokedexEntrySlider';
import { PokeTypes } from '@components/index';
import useFetch from '@hooks/useFetch';
import { useParams } from 'react-router-dom';
import * as spriteService from '@services/pokemonSprites.service'
import { useEffect, useRef, useState } from 'react';
import PokemonStatsComponent from '@components/PokemonStatsComponent/PokemonStatsComponent';
import PokemonMegas from '@components/PokemonMegasComponent/PokemonMegas';

function PokemonDescription() {
    const { pokemonName } = useParams<{ pokemonName: string }>();
    
    if (!pokemonName) return <div>no params sent</div>

    const {loading, pokemon, errors} = useFetch({nameOrId: pokemonName})

    const [isShiny, setIsShiny] = useState<boolean>(false)

    const starRef = useRef<HTMLIFrameElement | null>(null)

    useEffect(() => {
        const starIcon = starRef.current
    
        starIcon?.classList.toggle('bi-star',!isShiny)
        starIcon?.classList.toggle('bi-star-fill',isShiny)
    }, [isShiny])
    
    if (loading || !pokemon) {
        return <div>
            {errors ? errors.message : "Cargando..."}
        </div>
    }

    if (pokemon) {
        return  <div className="card d-flex bg-white bg-opacity-50 border-0 shadow-sm z-index-0" style={{width: '90%', height: '100%'}}>
        <div className="card-body d-flex flex-column align-items-center p-3 bg-transparent g-3 w-100 h-auto">
            <div className="card-header bg-primary bg-opacity-75 text-center py-2 border-0">
              <h5 className="card-title text-white text-uppercase mb-0 fw-bold">
                {pokemon.name}
              </h5>
            </div>
            <div className="pokemon-sprite-container d-flex flex-row flex-wrap" style={{ gap: '1rem' }}>
              <i className={`bi bi-star position-absolute fs-2 text-poke-yellow`}  ref={starRef} onClick={() => setIsShiny(prevState => !prevState)}></i>
              <span className='text-center'>
                <img
                src={`${spriteService.getAnimatedFrontwardsSprite(pokemon.name, isShiny ? true : false)}`}
                alt="pokemon_3d_animation_gif"
                style={{ imageRendering: 'pixelated' }}
                className="img align-self-center"
                width={200}
                />
                <PokeTypes pokemonTypes={pokemon.types}/>
              </span>
              <PokemonStatsComponent stats={pokemon.stats} maxStat={255}/>
              <PokemonMegas megas={pokemon.megas} />            
            </div>

          <PokedexEntrySlider pokemon={pokemon} />
        </div>
      </div>
    }
  
  
}
export default PokemonDescription