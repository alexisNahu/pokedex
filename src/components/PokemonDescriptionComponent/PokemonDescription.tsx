import { PokedexEntrySlider, 
        PokemonStatsComponent, 
        EvolutionChain, 
        PokemonVariants, 
        PokeTypes, 
        PokemonDetails, 
        PokemonImage,
        SavePokemons } from '@components';
import {useFetch} from '@hooks';
import { useDescriptionContext } from '@contexts';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

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
            <div className="card-header bg-primary bg-opacity-75 text-center border-0 w-100">
                <h5 className="card-title text-white text-uppercase mb-0 fw-bold">
                    {poke.name}
                </h5>
            </div>
            
            <div className='d-flex flex-row' style={{gap: '2rem'}}>
                <div>
                    <SavePokemons pokemonName={pokemon.name} />
                </div>
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

                    <PokemonImage isShiny={isShiny} poke={poke} imgWidth={200}/>

                    <PokeTypes pokemonTypes={poke.types} />
                </div>
                <PokemonStatsComponent stats={poke.stats} maxStat={255}/>
            </div>
            <PokedexEntrySlider pokemon={pokemon} />
            <div className='d-flex flex-row mb-3 mt-3' style={{gap: '1rem'}}>
                <div>
                    <PokemonVariants
                        megas={pokemon.megas}
                        regional_versions={pokemon.variants}
                        basePokemon={pokemon}
                        gmaxs={pokemon.gigamax}
                        handleClick={(poke) => setPokemon(poke)}
                    />
                </div>
                <PokemonDetails />
            </div>
            <EvolutionChain evolutionChain={pokemon.evolutionChain} />
        </div>
    </div>
);

    }
}

export default PokemonDescription;
