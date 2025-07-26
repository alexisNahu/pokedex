import { PokedexEntrySlider, 
        PokemonStatsComponent, 
        EvolutionChain, 
        PokemonVariants, 
        PokeTypes, 
        PokemonDetails, 
        PokemonImage,
        SavePokemons } from '@components';
import {useFetch, useGetPokemon} from '@hooks';
import { useDescriptionContext } from '@contexts';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useMobileContext } from '@contexts/isMobile.context';

import './PokemonDescription.css'

function PokemonDescription() {
  const { pokemonName } = useParams<{ pokemonName: string }>();

  if (!pokemonName) return <div>no params sent</div>;

  const { poke, setPokemon } = useDescriptionContext();

  const { isLoading, data: pokemon, error } = useGetPokemon(pokemonName);

  const [isShiny, setIsShiny] = useState<boolean>(false);

  const starRef = useRef<HTMLIFrameElement | null>(null);

  const {isMobile} = useMobileContext()

  useEffect(() => {
    if (pokemon) setPokemon(pokemon);

    const starIcon = starRef.current;
    starIcon?.classList.toggle('bi-star', !isShiny);
    starIcon?.classList.toggle('bi-star-fill', isShiny);
  }, [pokemon, isShiny]);

  if (isLoading || !pokemon) {
    return <div>{error ? error.message : "Cargando…"}</div>;
  }

  if (poke) {
    return (
      <div
        className="card d-flex bg-white bg-opacity-50 border-0 shadow-sm z-index-0 mx-auto"
        style={{ 
          width: isMobile ? '100%': '90%', 
          height: 'auto',
          padding: isMobile ? 0: '1rem'
        }}
      >
        {/* Header */}
        <div className="card-body d-flex flex-column align-items-center p-3 bg-transparent g-3 w-100 h-auto">

          <div className="card-header bg-primary bg-opacity-75 text-center border-0 w-100">
            <h5 className="card-title text-white text-uppercase mb-0 fw-bold">
              {poke.name}
            </h5>
          </div>

          {/* Contenedor que cambia flex-direction en mobile */}
          <div 
            className='d-flex flex-row flex-wrap justify-content-center'
            style={{ gap: '2rem' }}
          >
            <div>
              <SavePokemons pokemonName={pokemon.name} />
            </div>
            <div
              className="pokemon-sprite-container d-flex flex-column align-items-center"
              style={{ gap:'1rem' }}
            >
              <i
                ref={starRef}
                onClick={() => setIsShiny(prev => !prev)}
                className={`bi fs-2 text-poke-yellow ${
                  isShiny ? 'bi-star-fill' : 'bi-star'
                }`}
                style={{ cursor:'pointer' }}
              ></i>

              <PokemonImage isShiny={isShiny} poke={poke} imgWidth={200} />

              <PokeTypes pokemonTypes={poke.types} />
            </div>
            <div className="pokemon-stats-container w-100" style={{height: '300px'}} >
              <PokemonStatsComponent stats={poke.stats} maxStat={255} />
            </div>
          </div>
          
          <PokedexEntrySlider pokemon={pokemon} />

          {/* Otro contenedor flexible responsivo */}
          <div
            className='d-flex flex-row flex-wrap justify-content-center mb-3 mt-3'
            style={{ gap: '1rem' }}
          >
            <div>
              <PokemonVariants
                megas={pokemon.megas}
                regional_versions={pokemon.variants}
                basePokemon={pokemon}
                gmaxs={pokemon.gigamax}
                handleClick={(poke) => setPokemon(poke)}
              />
            </div>
            <div>
              <PokemonDetails />
            </div>
          </div>
          <div style={{maxWidth: '70%'}}>
            <EvolutionChain evolutionChain={pokemon.evolutionChain} />
          </div>
        </div>
      </div>
    );
  }
}

export default PokemonDescription;