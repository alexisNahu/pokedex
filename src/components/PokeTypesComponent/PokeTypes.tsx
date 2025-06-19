import { POKEMON_TYPES, POKEMON_TYPE_COLORS } from '@models/pokemonTypes.model'
import './PokeTypes.css'

interface Props {
    pokemonTypes: POKEMON_TYPES[]
}

function PokeTypes({pokemonTypes}: Props) {
    console.log(pokemonTypes)
    return (
        <div className='pokemon-types d-flex flex-wrap'>
            {
                pokemonTypes.map((type, i) => {
                    return (
                        <div className='pokemon-type justify-content-center align-items-center d-flex' key={i} style={{width: '100px', height: '50px', backgroundColor: POKEMON_TYPE_COLORS[type]}}>
                            {type.toUpperCase()}
                        </div>
                    )
                })
            }
        </ div>
    )
}

export default PokeTypes