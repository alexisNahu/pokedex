import { PRIVATE } from '@models/routes/routes'
import { UsersState } from '@redux/slices/user/reducers/user.reducer'
import { RootState } from '@redux/store'
import { getActiveUser } from '@services/user.service'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function PokemonTeams() {
  const usersState: UsersState = useSelector((store: RootState) => store.user)
  const activeUserTeams = getActiveUser(usersState)?.teams
  const navigator = useNavigate()

  return (
    <div className='pokedex-container col-md-11 p-3' style={{height: '90%', overflowY: 'auto'}}>
      <h1 className='mx-auto text-white'>Teams</h1>

      {
        activeUserTeams ? <div>
          {activeUserTeams.map(team => {
            return <div>
              {team.pokemons.map(pokemon => {
                return <p>{pokemon}</p>
              })}
              <button onClick={() => navigator(`/private/${PRIVATE.COMPARE}/?team=${team.id}`)}> saeloo </button>
            </div>
          })}
        </div> 
        
        
        : <div>Nothing yet</div>
      }
    </div>
  )
}

export default PokemonTeams