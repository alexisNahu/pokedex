import { PokemonDTO, VariantPokemonDTO } from '@models/pokemon.model'
import { useDescriptionContext } from '../../contexts/description.context';

interface Props {
    megas: VariantPokemonDTO[];
    regional_versions: VariantPokemonDTO[];
    basePokemon: PokemonDTO
}

function PokemonVariants({megas, regional_versions, basePokemon}: Props) {
    const {setPokemon} = useDescriptionContext()  

    return (
        <div className='text-white accordion' style={{width: '300px'}}>
        {/* Botón que controla el collapse */}
        <button
            className='accordion-button bg-poke-blue text-white'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#variants'
            aria-expanded='false'
            aria-controls='variants'
        >
            See variants
        </button>

        {/* Contenido colapsible */}
        <div className='accordion-collapse collapse' id='variants'>

            <div className='accordion-body bg-poke-blue'>
            <button className='btn btn-outline-light m-1' onClick={() => setPokemon(basePokemon)}>Normal</button>

            {megas.length > 0 && <h5>Mega Evolutions</h5>}
            {megas.map((mega, i) => (
                <button key={i} className='btn btn-outline-light m-1' onClick={() => setPokemon(mega)}>{mega.name}</button>
            ))}

            {regional_versions.length > 0 && <h5>Regional Variants</h5>}
            {regional_versions.map((reg, i) => (
                <button key={i} className='btn btn-outline-light m-1' onClick={() => setPokemon(reg)}>{reg.name}</button>
            ))}
            </div>
        </div>
        </div>
    )
}

export default PokemonVariants
