import { useModalContext } from '@components/Modal/context/UseModalContext'
import { useDescriptionContext } from '../../contexts/description.context'
import { Modal } from '@components/Modal/CustomModal'
import { useState } from 'react'
import PokeTypes from '@components/PokeTypesComponent/PokeTypes'
import PokemonAbilities from '@components/PokemonAbilities/PokemonAbilities'

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
        <div className='details py-1 container bg-poke-red rounded text-white bold' style={{width: 500}}>
            <div className="row p-3">
                <div className="col">
                    <span className='d-flex flex-column mb-3'>
                        <h5 className='mb-0'>Height:</h5> <p className='mb-0'>{poke?.height}</p>
                    </span>
                    <span className='d-flex flex-column'>
                        <h5 className='mb-0'>Weight:</h5> <p className='mb-0'>{poke?.weight}</p>
                    </span>
                </div>
                <div className="col">
                    { poke && <PokemonAbilities poke={poke} handleClick={handleClick} />}
                </div>
            </div>
            <div className='row'>
                <div className="col">
                    {poke?.weaknesses.x0?.length ? <div><h5>No damage from {`(x0)`}: </h5><PokeTypes pokemonTypes={poke?.weaknesses.x0 ?? []}/></div> : ''}
                    {poke?.weaknesses.x025?.length  ? <div><h5>Almost no damage from {`(x0.25)`}: </h5><PokeTypes pokemonTypes={poke?.weaknesses.x025 ?? []}/></div> : ''}
                    {poke?.weaknesses.x05?.length  ? <div><h5>Little damage from {`(x0.5)`}: </h5><PokeTypes pokemonTypes={poke?.weaknesses.x05 ?? []}/></div> : ''}
                    {poke?.weaknesses.x1?.length  ? <div><h5>Normal damage from {`(x1)`}: </h5><PokeTypes pokemonTypes={poke?.weaknesses.x1 ?? []}/></div> : ''}
                    {poke?.weaknesses.x2?.length  ? <div><h5>Weak to {`(x2)`}: </h5><PokeTypes pokemonTypes={poke?.weaknesses.x2 ?? []}/></div> : ''}
                    {poke?.weaknesses.x4?.length  ? <div><h5>Too weak to {`(x4)`}: </h5><PokeTypes pokemonTypes={poke?.weaknesses.x4 ?? []}/></div> : ''}
                </div>
            </div>

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
