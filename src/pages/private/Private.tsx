import { PRIVATE }  from '@models/routes/routes'
import { RoutesWithNotFound } from '@utilities/RoutesWIthNotFound'
import { Navigate, Route } from 'react-router-dom'
import PokedexPage from './PokedexPage/PokedexPage'
import ComparingPage from '../../components/ComparePokemons/ComparePokemons'

function Private() {
  return (
    <RoutesWithNotFound> 
        <Route path='/' element={<Navigate to={PRIVATE.POKEDEX}/>} />
        <Route path={PRIVATE.POKEDEX} element={<PokedexPage />} />
        <Route path={PRIVATE.COMPARE} element={<ComparingPage />} />
    </RoutesWithNotFound>
  )
}

export default Private