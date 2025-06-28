import { RoutesWithNotFound } from '@utilities/RoutesWIthNotFound'
import { PUBLIC } from '@models/routes/routes'
import { Navigate, Route } from 'react-router-dom'
import DescriptionPage from './DescriptionPage/DescriptionPage'
import LandingPage from './LandingPage/LandingPage'

function Public() {
  return (
    <RoutesWithNotFound>
        <Route path='/' element={<Navigate to={`${PUBLIC.LANDING_PAGE}`} />} />
        <Route path={`${PUBLIC.LANDING_PAGE}`} element={ <LandingPage />}/>
        <Route
          path={`${PUBLIC.DESCRIPTION}/:pokemonName`}
          element={<DescriptionPage />}
        />    
    </RoutesWithNotFound>
  )
}

export default Public