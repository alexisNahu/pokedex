import { PRIVATE, PUBLIC }  from '@models/routes/routes'
import { RoutesWithNotFound } from '@utilities/RoutesWIthNotFound'
import { Navigate, Route } from 'react-router-dom'
import PokedexPage from './PokedexPage/PokedexPage'
import ComparingPage from '../../components/ComparePokemons/ComparePokemons'

function Private() {
  return (
    <RoutesWithNotFound> 
        <Route path='/' element={<Navigate to={PRIVATE.COMPARE} replace />} />
        <Route path={PRIVATE.COMPARE} element={<ComparingPage />} />
        <Route path={PRIVATE.POKEDEX_FAVORITES} element={<PokedexPage list='favorites'/>} />
    </RoutesWithNotFound>
  )
}

export default Private