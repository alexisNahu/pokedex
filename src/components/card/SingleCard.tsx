import { carouselSize } from "./CardCarousel"
import { useEffect, useRef, useState } from "react"
import * as spriteService from "@services/pokemonSprites.service"
import useFetch from "../../hooks/useFetch";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PokeTypes from "@components/PokeTypes/PokeTypes";
import PokemonSlide from "./PokemonSlide/PokemonSlide";

function SingleCard({ pokemon_name }: { pokemon_name: string }) {
  const { loading, pokemon, errors } = useFetch({ nameOrId: pokemon_name })

  const [isShiny, setIsShiny] = useState<boolean>(false)

  const starRef = useRef<HTMLIFrameElement | null>(null)
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
        
        <div className="card-body d-flex flex-column align-items-center p-3 bg-transparent">
          <div className="pokemon-sprite-container mb-3">
            <i className={`bi bi-star position-absolute fs-2 text-poke-yellow`}  ref={starRef} onClick={() => setIsShiny(prevState => !prevState)}></i>
            <img
              src={`${spriteService.getAnimatedFrontwardsSprite(pokemon_name, isShiny ? true : false)}`}
              alt="pokemon_3d_animation_gif"
              style={{ imageRendering: 'pixelated' }}
              className="img-fluid"
              width={200}
            />
            
            <PokeTypes pokemonTypes={pokemon.types}/>
            
          </div>

          <PokemonSlide pokemon={pokemon} />
        </div>
      </div>
    )
  }
}

export default SingleCard