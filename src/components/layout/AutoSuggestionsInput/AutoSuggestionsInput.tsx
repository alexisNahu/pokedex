import React, { FormEvent, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useSidebarContext } from '../sidebar/sidebar.context'
import { useNavigate } from 'react-router-dom'
import * as spritesService from '@services/pokemonSprites.service'
import { PUBLIC } from '@models/routes/routes'
import { getHidingTransition } from '../sidebar/Sidebar'
import { usePokemonNamesContext } from '@contexts/pokemonNames.context'

function AutoSuggestionsInput() {
    const {activo} = useSidebarContext()

    const navigator = useNavigate()

    const {pokemonList} = usePokemonNamesContext()

    const [suggestionsList, setSuggestionsList] = useState<string[] | []>([])

    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {        
        if (!activo && inputRef.current) {
            inputRef.current.value = "";
            setSuggestionsList([]);
        }
    }, [activo])

    const handleChange = () => {
        
        if (inputRef.current) {
            const value = inputRef.current.value.trim().toLowerCase().replace('-','')
            const suggestions = [...pokemonList].filter(name => name.includes(value)).slice(0,7)
            setSuggestionsList(suggestions)            
        }
    }

    const handleSuggestionClick = (name: string) => {
        navigator(`${PUBLIC.DESCRIPTION}/${name.toLowerCase()}`)
        setSuggestionsList([])
    }

    const handleKeyDowns = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Escape' && inputRef.current) {
            setSuggestionsList([])
            inputRef.current.value = ''
        }
    }

    const handleSubmitEvent = (e: FormEvent) => {
        e.preventDefault()
        console.log('hola como vas')
        if (inputRef.current) navigator(`/${PUBLIC.DESCRIPTION}/${inputRef.current.value.toLowerCase()}`)
    }

    return (
        <form onSubmit={handleSubmitEvent} style={getHidingTransition(activo)} className='d-flex justify-content-center'>
            <input type="text" onChange={handleChange} ref={inputRef} onKeyDown={handleKeyDowns} autoComplete="off" className='form-control' placeholder='Search for a pokemon here..'/>
            {suggestionsList.length > 0 && (
            <ul className="list-group position-absolute w-50 mt-5 shadow z-3" style={{ maxHeight: 200, overflowY: 'auto' }}>
                {suggestionsList.map(name => (
                <li
                    key={name}
                    className="list-group-item list-group-item-action d-flex justify-content-between"
                    onClick={() => handleSuggestionClick(name)}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="pokemon-sprite-container d-flex flex-column align-items-center">
                        <img src={`${spritesService.getStatic3dSprite(name, false)}`}  className='img-fluid' alt="mini-icon" />
                    </div>
                    <span className='d-flex align-items-center'>
                        {name}
                    </span>
                </li>
                ))}
            </ul>
            )}
        </form>
    )
}

export default AutoSuggestionsInput