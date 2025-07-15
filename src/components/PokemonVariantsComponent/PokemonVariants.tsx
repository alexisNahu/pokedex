import { PokemonDTO, VariantPokemonDTO } from '@models/pokemon.model'
import { useDescriptionContext } from '../../contexts/description.context';

interface Props {
    megas?: VariantPokemonDTO[];
    regional_versions?: VariantPokemonDTO[];
    basePokemon: PokemonDTO;
    gmaxs?: VariantPokemonDTO[];
    handleClick?: (poke: PokemonDTO | VariantPokemonDTO) => void;
    minimizedVersion?: boolean

}

function PokemonVariants({megas, regional_versions, basePokemon, gmaxs, handleClick, minimizedVersion}: Props) {

    return (
            <div
                className='text-white p-3 rounded ' 
                style={{ minWidth: '100px', backgroundColor: `${ minimizedVersion ? 'transparent' : 'rgba(25, 25, 112, 0.5)'}` }}
            >

                {/* Base first */}
                {minimizedVersion ?? <h5>Base</h5>}
                <button className='btn btn-outline-dark m-1 text-white' onClick={() => handleClick ? handleClick(basePokemon) : null} >{basePokemon.name}</button>

                {/* Mega variants if present */}
                {megas && megas.length > 0 && (
                    <div className={minimizedVersion ? 'd-flex flex-column' : ''}>
                        {minimizedVersion ?? <h5>Mega Evolutions</h5>}
                        {megas.map((mega, i) => (
                            <button key={i} className='btn btn-outline-dark m-1 text-white' onClick={() => handleClick ? handleClick(mega) : null}>{mega.name}</button>
                        ))}
                    </div>
                )}

                {/* Regional variants if present */}
                {regional_versions && regional_versions.length > 0 && (
                    <div className={minimizedVersion ? 'd-flex flex-column' : ''}>
                        {minimizedVersion ?? <h5>Regional Variants</h5>}
                        {regional_versions.map((reg, i) => (
                            <button key={i} className='btn btn-outline-dark m-1 text-white' onClick={() => handleClick ? handleClick(reg) : null}>{reg.name}</button>
                        ))}
                    </div>
                )}

                {/* Gigantamax variants if present */}
                {gmaxs && gmaxs.length > 0 && (
                    <div className={minimizedVersion ? 'd-flex flex-column' : ''}>
                        {minimizedVersion ?? <h5>Gigantamax Variants</h5>}
                        {gmaxs.map((reg, i) => (
                            <button key={i} className='btn btn-outline-dark m-1 text-white' onClick={() => handleClick ? handleClick(reg) : null}>{reg.name}</button>
                        ))}
                    </div>
                )}

            </div>

    )
}

export default PokemonVariants;
