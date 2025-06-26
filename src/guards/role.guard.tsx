import { Rol, User } from '@models/user.model'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { RootState } from 'src/redux/store'

function RoleGuard({mustHave}: {mustHave: Rol}) {
    const loggedUser: User = useSelector((state: RootState) => state.user)

    if (loggedUser.rol !== mustHave) return <div>Doesnt have required role</div> 

    return <Outlet />
    
}

export default RoleGuard