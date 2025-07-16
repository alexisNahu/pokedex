import { useDebounce } from '@hooks/useDebounce'
import { Team } from '@models/pokemon.model'
import { UsersState } from '@redux/slices/user/reducers/user.reducer'
import { RootState, AppDispatch } from '@redux/store'
import { getStatic3dSprite } from '@services/pokemonSprites.service'
import { changeTeamName } from '@services/user.service'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

interface Props {
    team: Team
    handleClick: () => void
}

function Card({ team, handleClick }: Props) {
    const usersState: UsersState = useSelector((store: RootState) => store.user)
    const dispatch = useDispatch<AppDispatch>();
    const [inputValue, setInputValue] = useState<string>(team.name)
    const [selectedTeam, setSelectedTeam] = useState<string>()
    const debouncedValue = useDebounce(inputValue, 1000)

    const handleChange = (e: ChangeEvent<HTMLInputElement>, teamId: string) => {
        const value = e.target.value
        setInputValue(value)
        setSelectedTeam(teamId)
    }

    useEffect(() => {
        if (debouncedValue && selectedTeam) changeTeamName(usersState, selectedTeam, debouncedValue , dispatch)
    }, [debouncedValue])

    return (<>
        <div className='rounded-pill bg-poke-blue col-5 d-flex flex-column my-2'>
            <div className='d-flex justify-content-center'>
                <input type="text" maxLength={20} className='bg-transparent fs-4 text-center border-0 shadow-none' value={inputValue} onChange={(e) => handleChange(e, `${team.id}`)}/>
            </div>
            <div className='d-flex justify-content-center w-100'  onClick={handleClick} >
            {team.pokemons.map((pokemon, idx) => (
                <div 
                key={idx}
                className='d-inline-flex align-items-center justify-content-center m-3'
                style={{ width: '60px', height: '100px' }}
                >
                {pokemon 
                    ? <img src={getStatic3dSprite(pokemon, false)} width={90} /> 
                    : <i className='bi bi-plus-circle fs-1 text-white'></i>}
                </div>
            ))}
            </div>
        </div>
        
    </>)
}

export default Card