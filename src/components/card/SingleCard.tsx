import { carouselSize } from "./CardCarousel"
import { useEffect, useRef, useState } from "react"
import useFetch from "@hooks/useFetch";
import PokeTypes from "@components/PokeTypes/PokeTypes";
import PokedexEntrySlider from "./PokedexEntrySlider/PokedexEntrySlider";
import { useNavigate } from "react-router-dom";
import * as Routes from '@models/routes/routes'

function SingleCard({ pokedexNumber }: { pokedexNumber: string }) {
  const { loading, pokemon, errors } = useFetch({ nameOrId: pokedexNumber })

  const [isShiny, setIsShiny] = useState<boolean>(false)

  const starRef = useRef<HTMLIFrameElement | null>(null)

  const navigator = useNavigate()
  useEffect(() => {
    const starIcon = starRef.current
  
    starIcon?.classList.toggle('bi-star',!isShiny)
    starIcon?.classList.toggle('bi-star-fill',isShiny)
  }, [isShiny])
  
  if (loading || !pokemon) {
    return (
      <div className="card d-flex bg-dark bg-opacity-10" style={carouselSize}>
        <div className="card-body d-flex justify-content-center align-items-center flex-column">
          <div className="spinner-border text-primary" role="status" />
          <h5 className="card-title mt-3 text-dark">
            {errors ? errors.message : "Cargando..."}
          </h5>
        </div>
      </div>
    )
  }

  if (pokemon) {
    return (
      <div className="card d-flex bg-white bg-opacity-50 border-0 shadow-sm z-index-0" style={{width: '800px'}}>
        <div className="card-header bg-primary bg-opacity-75 text-center py-2 border-0">
          <h5 className="card-title text-white text-uppercase mb-0 fw-bold">
            {pokemon.name}
          </h5>
        </div>
        
        <div className="card-body d-flex flex-column align-items-center p-3 bg-transparent g-3">
          <div className="pokemon-sprite-container mb-3">
            <i className={`bi bi-star position-absolute fs-2 text-poke-yellow`}  ref={starRef} onClick={() => setIsShiny(prevState => !prevState)}></i>
            <img
                  src={isShiny ? pokemon.sprites.animated.shiny.d2.front : pokemon.sprites.animated.normal.d2.front}
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.src = isShiny ? pokemon.sprites.static.shiny.d3 : pokemon.sprites.static.normal.d3;
                  }}
                  alt={`${pokemon.name} ${isShiny ? 'shiny' : 'normal'} sprite`}
                  style={{ 
                    imageRendering: 'pixelated',
                    width: '200px',
                    height: 'auto'
                  }}
                  className="img align-self-center"
                />
            <PokeTypes pokemonTypes={pokemon.types}/>
            
          </div>

          <PokedexEntrySlider pokemon={pokemon} />
          <button className='btn bg-poke-blue mt-4 mb-4 text-white h-75' onClick={() => navigator(`/${Routes.PUBLIC.DESCRIPTION}/${pokemon.name}`)}>See more about him</button>
        </div>
      </div>
    )
  }
}

export default SingleCard