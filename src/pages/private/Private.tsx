import { PRIVATE, PUBLIC }  from '@models/routes/routes'
import { RoutesWithNotFound } from '@utilities/index'
import { Navigate, Route } from 'react-router-dom'
import {ComparingPage, TeamsPage, PokedexPage} from './index'

function Private() {
  return (
    <RoutesWithNotFound> 
        <Route path='/' element={<Navigate to={PRIVATE.COMPARE} replace />} />
        <Route path={PRIVATE.COMPARE} element={<ComparingPage />} />
        <Route path={PRIVATE.POKEDEX_FAVORITES} element={<PokedexPage list='favorites'/>} />
        <Route path={PRIVATE.TEAMS} element={<TeamsPage />} />
    </RoutesWithNotFound>
  )
}

export default Private