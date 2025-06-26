import { User } from '@models/user.model'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '../redux/store'
import { PUBLIC } from '@models/routes/routes'

function AuthGuard(isPrivate: {isPrivate: boolean}) { 
  const loggedUser: User = useSelector((state: RootState) => state.user)
  const isLogged = loggedUser.name

  if (!isLogged) return <Navigate to={PUBLIC.LOGIN}/>

  if (!isPrivate) return <Navigate to={PUBLIC.LANDING_PAGE} />

  return <Outlet />

}

export default AuthGuard