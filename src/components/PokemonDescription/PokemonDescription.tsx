import PokedexEntrySlider from '@components/card/PokedexEntrySlider/PokedexEntrySlider';
import { PokeTypes } from '@components/index';
import useFetch from '@hooks/useFetch';
import { useParams } from 'react-router-dom';
import * as spriteService from '@services/pokemonSprites.service'
import { useEffect, useRef, useState } from 'react';
import PokemonStatsComponent from '@components/PokemonStatsComponent/PokemonStatsComponent';
import PokemonMegas from '@components/PokemonMegasComponent/PokemonMegas';
import { useDescriptionContext } from '../../contexts/description.context';

function PokemonDescription() {
    const { pokemonName } = useParams<{ pokemonName: string }>();
    
    if (!pokemonName) return <div>no params sent</div>
    
    const {poke, setPokemon} = useDescriptionContext()

    const {loading, pokemon, errors} = useFetch({nameOrId: pokemonName})

    const [isShiny, setIsShiny] = useState<boolean>(false)

    const starRef = useRef<HTMLIFrameElement | null>(null)

    useEffect(() => {
        if (pokemon) setPokemon(pokemon)
        
        const starIcon = starRef.current

    
        starIcon?.classList.toggle('bi-star',!isShiny)
        starIcon?.classList.toggle('bi-star-fill',isShiny)
    }, [pokemon])
    
    if (loading || !pokemon) {
        return <div>
            {errors ? errors.message : "Cargando..."}
        </div>
    }

    if (poke) {
        return  <div className="card d-flex bg-white bg-opacity-50 border-0 shadow-sm z-index-0" style={{width: '90%', height: '100%'}}>
        <div className="card-body d-flex flex-column align-items-center p-3 bg-transparent g-3 w-100 h-auto">
            <div className="card-header bg-primary bg-opacity-75 text-center py-2 border-0">
              <h5 className="card-title text-white text-uppercase mb-0 fw-bold">
                {poke.name}
              </h5>
            </div>
            <div className="pokemon-sprite-container d-flex flex-row flex-wrap" style={{ gap: '1rem' }}>
              <i className={`bi position-absolute fs-2 text-poke-yellow ${isShiny ? 'bi-star-fill' : 'bi-star'}`}  ref={starRef} onClick={() => setIsShiny(prevState => !prevState)}></i>
              <span className='text-center'>
                <img
                src={
                  poke.isMega
                    ? spriteService.getAll3dSprites(poke.name, isShiny)
                    : spriteService.getAnimatedFrontwardsSprite(poke.name, isShiny)
                }
                alt="pokemon_3d_animation_gif"
                style={{ imageRendering: 'pixelated' }}
                className="img align-self-center"
                width={200}
                />
                <PokeTypes pokemonTypes={poke.types}/>
              </span>
              <PokemonStatsComponent stats={poke.stats} maxStat={255}/>

              <PokemonMegas megas={pokemon.megas} basePokemon={pokemon} />

            </div>

          <PokedexEntrySlider pokemon={pokemon} />
        </div>
      </div>
    }
  
  
}
export default PokemonDescription