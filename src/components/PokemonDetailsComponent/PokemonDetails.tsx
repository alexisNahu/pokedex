import { useModalContext } from '@components/Modal/context/UseModalContext'
import { useDescriptionContext } from '../../contexts/description.context'
import { Modal } from '@components/Modal/CustomModal'
import { useState } from 'react'

function PokemonDetails() {
    const { poke } = useDescriptionContext()
    const { setState } = useModalContext()

    const [showingAbility, setShowingAbility] = useState<{
            name: string,
            pokedex_description: string,
            in_game_effect: string,
        }>()

    const handleClick = (entry: {
            name: string,
            pokedex_description: string,
            in_game_effect: string,
        }) => {
        setState(true)
        setShowingAbility(entry)
    }

    return (
        <div className='details container bg-poke-red rounded text-white bold' style={{width: 500}}>
            <div className="row p-3">
                <div className="col">
                    <span className='d-flex flex-column mb-3'>
                        <p className='mb-0'>Height:</p> <p className='mb-0'>{poke?.height}</p>
                    </span>
                    <span className='d-flex flex-column'>
                        <p className='mb-0'>Weight:</p> <p className='mb-0'>{poke?.weight}</p>
                    </span>
                </div>
                <div className="col">
                    <span className='d-flex flex-column mb-3'>
                        <p className='mb-0'>Abilities:</p> <p className='mb-0'>
                            {poke?.abilities?.map(((ability, i) => (
                                <span key={i}>
                                   {ability.en?.map((entry, a) => (
                                      <button
                                         key={a}
                                         className='btn btn-outline-light m-1'
                                         onClick={() => handleClick(entry)}
                                      >
                                         {entry.name}
                                      </button>
                                   ))}
                                </span>
                            )))}
                        </p></span>
                </div>
            </div>

            {/* Aquí hardcodeamos el modal para que aparezca algo cuando esté abierto */}
            <Modal>
                <div>
                    {showingAbility?.name.toUpperCase()}
                    <p>{showingAbility?.in_game_effect}</p>
                    <p>{showingAbility?.pokedex_description}</p>
                </div>
            </Modal>
        </div>
    )
}

export default PokemonDetails;
