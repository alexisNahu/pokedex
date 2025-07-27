import { getActiveUser, createUserTeam, removeUserTeam } from '@services'
import { AppDispatch, RootState, UsersState } from '@redux'
import { useDispatch, useSelector } from 'react-redux'
import { PRIVATE } from '@models/routes/routes'
import { useNavigate } from 'react-router-dom'
import Card from './Card/Card'
import React from 'react'

function PokemonTeams() {
  const usersState: UsersState = useSelector((store: RootState) => store.user)
  const dispatch = useDispatch<AppDispatch>();
  const activeUserTeams = getActiveUser(usersState)?.teams
  const navigator = useNavigate()

  const onTeamClick = (e: React.MouseEvent<HTMLDivElement>, teamId: string) => {
      console.log(e.target)
      console.log(e.currentTarget)
      const target = e.target as HTMLElement
      if (target.classList.contains('delete-team')) {
        removeUserTeam(usersState, dispatch, teamId)
        return
      }
      
      navigator(`/private/${PRIVATE.COMPARE}/?team=${teamId}`)   
    }

   return (<>
      <h1 className='mx-auto text-white'>Teams</h1>
     <div className='pokedex-container col-md-11 p-3' style={{height: '800px', overflowY: 'auto'}}>
      {
        activeUserTeams && <div className='d-flex flex-row flex-wrap justify-content-around'>
          {activeUserTeams.map(team => <Card team={team} handleClick={(e) => onTeamClick(e,`${team.id}`)}/> )}
        </div> 
      }
      <div className='rounded-pill bg-poke-blue d-flex flex-column justify-content-center align-items-center' style={{ minWidth: '200px' }} onClick={() => createUserTeam(usersState, dispatch)}>
          <i className='bi bi-plus-circle fs-1 text-white'></i>
      </div>
    </div>
  </>)
}

export default PokemonTeams