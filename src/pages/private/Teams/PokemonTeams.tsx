import PokemonImage from '@components/PokemonImage/PokemonImage'
import { useDebounce } from '@hooks/useDebounce'
import { Team } from '@models/pokemon.model'
import { PRIVATE } from '@models/routes/routes'
import { UsersState } from '@redux/slices/user/reducers/user.reducer'
import { AppDispatch, RootState } from '@redux/store'
import { getStatic3dSprite } from '@services/pokemonSprites.service'
import { getActiveUser, changeTeamName, getActiveUserTeam } from '@services/user.service'
import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Card from './Card/Card'

function PokemonTeams() {
  const usersState: UsersState = useSelector((store: RootState) => store.user)
  const activeUserTeams = getActiveUser(usersState)?.teams
  const navigator = useNavigate()

  return (
    <div className='pokedex-container col-md-11 p-3' style={{height: '90%', overflowY: 'auto'}}>
      <h1 className='mx-auto text-white'>Teams</h1>
      {
        activeUserTeams ? <div className='d-flex flex-row flex-wrap justify-content-around'>
          {activeUserTeams.map(team => {
              return <Card team={team} handleClick={ () => navigator(`/private/${PRIVATE.COMPARE}/?team=${team.id}`)}/>
          })}
        <div className='rounded-pill bg-poke-blue col-5 d-flex flex-column justify-content-center align-items-center'>
            <i className='bi bi-plus-circle fs-1 text-white'></i>
        </div>
        </div> 
        : <div>Nothing yet</div>
      }
     
    </div>
  )
}

export default PokemonTeams