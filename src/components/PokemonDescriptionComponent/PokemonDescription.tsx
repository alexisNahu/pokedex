import PokedexEntrySlider from '@components/CardComponent/PokedexEntrySlider/PokedexEntrySlider';
import { EvolutionChain, PokemonVariants, PokeTypes } from '@components/index';
import useFetch from '@hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import PokemonStatsComponent from '@components/PokemonStatsComponent/PokemonStatsComponent';
import { useDescriptionContext } from '../../contexts/description.context';
import { PossibleVariants } from '@models/pokemon.model';
import PokemonDetails from '@components/PokemonDetailsComponent/PokemonDetails';

function PokemonDescription() {
    const { pokemonName } = useParams<{ pokemonName: string }>();

    if (!pokemonName) return <div>no params sent</div>;
    
    const { poke, setPokemon } = useDescriptionContext();

    const { loading, pokemon, errors } = useFetch({ nameOrId: pokemonName });

    const [isShiny, setIsShiny] = useState<boolean>(false);
    const starRef = useRef<HTMLIFrameElement | null>(null);

    useEffect(() => {
        if (pokemon) setPokemon(pokemon);
        
        const starIcon = starRef.current;
        starIcon?.classList.toggle('bi-star', !isShiny);
        starIcon?.classList.toggle('bi-star-fill', isShiny);
    }, [pokemon]);

    if (loading || !pokemon) {
        return <div>{errors ? errors.message : "Cargando…"}</div>;
    }
  
    if (poke) {
        return (
    <div
        className="card d-flex bg-white bg-opacity-50 border-0 shadow-sm z-index-0"
        style={{ width: '90%', height: 'auto' }}
    >

        {/* Header first */}
        <div className="card-body d-flex flex-column align-items-center p-3 bg-transparent g-3 w-100 h-auto">
            <div className="card-header bg-primary bg-opacity-75 text-center py-2 border-0 w-100">
                <h5 className="card-title text-white text-uppercase mb-0 fw-bold">
                    {poke.name}
                </h5>
            </div>
            <div className='d-flex flex-row'>
                <div
                    className="pokemon-sprite-container d-flex flex-column align-items-center"
                    style={{ gap:'1rem' }}
                >

                    <i
                        ref={starRef}
                        onClick={() => setIsShiny((prevState) => !prevState)}
                        className={`bi fs-2 text-poke-yellow ${
                            isShiny ? 'bi-star-fill' : 'bi-star'
                        }`}
                        style={{ cursor:'pointer' }}
                    ></i>

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
                        width:'200px',
                        height:'auto'
                        }}
                        className="img align-self-center"
                    />

                    {/* Shiny button & Sprite */}

                    {/* Types */}
                    <PokeTypes pokemonTypes={poke.types} />
                </div>
                <PokemonStatsComponent stats={poke.stats} maxStat={255}/>
            </div>
            <div className='d-flex flex-row mb-3 mt-3'>
                <PokemonVariants
                    megas={pokemon.megas}
                    regional_versions={pokemon.variants}
                    basePokemon={pokemon}
                    gmaxs={pokemon.gigamax}
                />
                <PokemonDetails />
            </div>

            {/* Stats immediately after the image */}
                

                {/* Variants afterwards */}



            {/* Pokedex Slider, Evolution, and Details at the bottom */}
            <PokedexEntrySlider pokemon={pokemon} />
            <EvolutionChain evolutionChain={pokemon.evolutionChain} />
        </div>
    </div>
);

    }
}

export default PokemonDescription;
