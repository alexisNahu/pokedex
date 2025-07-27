import { Rol, User } from '@models'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { RootState } from '@redux'

function RoleGuard({mustHave}: {mustHave: Rol}) {
    const loggedUser: User = useSelector((state: RootState) => state.user)

    if (loggedUser.rol !== mustHave) return <div>Doesnt have required role</div> 

    return <Outlet />
    
}

export default RoleGuard