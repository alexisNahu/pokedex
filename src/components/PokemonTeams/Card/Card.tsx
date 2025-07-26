import { useDebounce } from '@hooks'
import { Team } from '@models'
import { RootState, AppDispatch, UsersState } from '@redux'
import { getStatic3dSprite, changeTeamName } from '@services'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

interface Props {
    team: Team
    handleClick: (e: React.MouseEvent<HTMLDivElement>, teamId: string) => void
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
            <div className='rounded-pill bg-poke-blue d-flex flex-column p-3 my-2 w-75 mx-auto shadow'>
            <div className='d-flex justify-content-center'>
                <input type="text" maxLength={20} className='bg-transparent fs-4 text-center border-0 shadow-none' value={inputValue} onChange={(e) => handleChange(e, `${team.id}`)}/>
            </div>
            <div className='d-flex justify-content-center w-100 flex-wrap'  onClick={(e) => handleClick(e, `${team.id}`)} >
            {
                <>
                    {
                        team.pokemons.map((pokemon, idx) => (
                        <div 
                        key={idx}
                        className='d-inline-flex align-items-center justify-content-center'
                        style={{ width: '60px', height: '100px' }}
                        >
                        {pokemon 
                            ? <div style={{minWidth: '4vw', width: '100px'}}><img src={getStatic3dSprite(pokemon, false)} width={'100%'} /></div> 
                            : <i className='bi bi-plus-circle fs-1 text-white'></i>}
                        </div>
                    ))
                    }
                    <div className='d-inline-flex align-items-center justify-content-center m-3'>
                        <i className="bi bi-trash3 fs-1 text-white delete-team"></i>
                    </div>
                </>
            }
            </div>
        </div>
        
    </>)
}

export default Card