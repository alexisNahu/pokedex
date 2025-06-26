import Pokedex from '@components/PokedexComponent/Pokedex'
import { PRIVATE }  from '@models/routes/routes'
import { RoutesWithNotFound } from '@utilities/RoutesWIthNotFound'
import { Navigate, Route } from 'react-router-dom'

function Private() {
  return (
    <RoutesWithNotFound> 
        <Route path='/' element={<Navigate to={PRIVATE.POKEDEX}/>} />
        <Route path='/pokedex' element={<Pokedex />} />
    </RoutesWithNotFound>
  )
}

export default Private