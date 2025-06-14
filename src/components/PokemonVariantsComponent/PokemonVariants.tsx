import { PokemonDTO, VariantPokemonDTO } from '@models/pokemon.model'
import { useDescriptionContext } from '../../contexts/description.context';
import { useState } from 'react';

interface Props {
    megas: VariantPokemonDTO[];
    regional_versions: VariantPokemonDTO[];
    basePokemon: PokemonDTO;
    gmaxs: VariantPokemonDTO[];
}

function PokemonVariants({megas, regional_versions, basePokemon, gmaxs}: Props) {
    const {setPokemon} = useDescriptionContext()
    const [open, setOpen] = useState<boolean>(false)

    return (
        <div
            className='text-white accordion'
            style={{width:'300px', height: 'auto'}}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >

            {/* Botón o encabezado que se muestra siempre */}
            <div
                className='accordion-button bg-poke-blue text-white'
            >
                See variants
            </div>

            {/* Aquí controlamos manualmente el despliegue con el estado `open` */}
            {open && (
                <div className='collapse show'>
                    <div className='accordion-body bg-poke-blue'>
                        <button className='btn btn-outline-light m-1' onClick={() => setPokemon(basePokemon)}>{basePokemon.name}</button>

                        {megas.length > 0 && <h5>Mega Evolutions</h5>}
                        {megas.map((mega, i) => (
                            <button key={i} className='btn btn-outline-light m-1' onClick={() => setPokemon(mega)}>{mega.name}</button>
                        ))}

                        {regional_versions.length > 0 && <h5>Regional Variants</h5>}
                        {regional_versions.map((reg, i) => (
                            <button key={i} className='btn btn-outline-light m-1' onClick={() => setPokemon(reg)}>{reg.name}</button>
                        ))}

                        {gmaxs.length > 0 && <h5>Gigantamax Variants</h5>}
                        {gmaxs.map((reg, i) => (
                            <button key={i} className='btn btn-outline-light m-1' onClick={() => setPokemon(reg)}>{reg.name}</button>
                        ))}
                    </div>
                </div>
            )}

        </div>
    )
}

export default PokemonVariants;
