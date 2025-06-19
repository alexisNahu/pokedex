import { PokemonDTO, VariantPokemonDTO } from '@models/pokemon.model'
import { useDescriptionContext } from '../../contexts/description.context';

interface Props {
    megas: VariantPokemonDTO[];
    regional_versions: VariantPokemonDTO[];
    basePokemon: PokemonDTO;
    gmaxs: VariantPokemonDTO[];
}

function PokemonVariants({megas, regional_versions, basePokemon, gmaxs}: Props) {
    const {setPokemon} = useDescriptionContext()

    return (
        <div
            className='text-white p-3 rounded ' 
            style={{ width: '300px', backgroundColor: 'rgba(25, 25, 112, 0.5)' }}
        >

            {/* Base first */}
            <h5>Base</h5>
            <button className='btn btn-outline-dark m-1 text-white' onClick={() => setPokemon(basePokemon)}>{basePokemon.name}</button>

            {/* Mega variants if present */}
            {megas.length > 0 && (
                <>
                    <h5>Mega Evolutions</h5>
                    {megas.map((mega, i) => (
                        <button key={i} className='btn btn-outline-dark m-1 text-white' onClick={() => setPokemon(mega)}>{mega.name}</button>
                    ))}
                </>
            )}

            {/* Regional variants if present */}
            {regional_versions.length > 0 && (
                <>
                    <h5>Regional Variants</h5>
                    {regional_versions.map((reg, i) => (
                        <button key={i} className='btn btn-outline-dark m-1 text-white' onClick={() => setPokemon(reg)}>{reg.name}</button>
                    ))}
                </>
            )}

            {/* Gigantamax variants if present */}
            {gmaxs.length > 0 && (
                <>
                    <h5>Gigantamax Variants</h5>
                    {gmaxs.map((reg, i) => (
                        <button key={i} className='btn btn-outline-dark m-1 text-white' onClick={() => setPokemon(reg)}>{reg.name}</button>
                    ))}
                </>
            )}

        </div>
    )
}

export default PokemonVariants;
