import { PRIVATE, PROTECTED, PUBLIC } from '@models/routes/routes'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useMobileContext } from '@contexts/isMobile.context';

function ProfileIcon() {
    const userState = useSelector((store: RootState) => store.user)
    const {isMobile} = useMobileContext()


    return (
        <>
            <button className={`rounded bg-poke-blue d-flex justify-content-center position-absolute z-1 ${isMobile ? 'start-0' : 'end-0' } me-4 dropdown cursor-pointer btn`} 
                style={{height: '60px', width: '60px'}}
                data-bs-toggle="dropdown"
                >
                <i className='bi bi-person fs-1'>
                </i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
                
                {!userState.activeUser ? <li><a className="dropdown-item" href={`/${PUBLIC.LOGIN}`}>Login</a></li>:'' }
                {!userState.activeUser ? <li><a className="dropdown-item" href={`/${PUBLIC.REGISTER}`}>Register</a></li>:'' }
                {userState.activeUser ? <li><a className="dropdown-item" href={`/${PROTECTED.LOGOUT}`}>Logout</a></li>:'' }
            </ul>
        </>
    )
}

export default ProfileIcon