import { PRIVATE, PUBLIC } from '@models/routes/routes'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../redux/slices/User';
import { AppDispatch, RootState } from '../../../redux/store';

function ProfileIcon() {
    const userState = useSelector((store: RootState) => store.user)
    
    return (
        <>
            <button className='rounded bg-poke-blue d-flex justify-content-center position-absolute end-0 me-4 dropdown cursor-pointer btn' 
                style={{height: '60px', width: '60px'}}
                data-bs-toggle="dropdown"
                >
                <i className='bi bi-person fs-1'>
                </i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
                
                {!userState.activeUser ? <li><a className="dropdown-item" href={`/${PUBLIC.LOGIN}`}>Login</a></li>:'' }
                {!userState.activeUser ? <li><a className="dropdown-item" href={`/${PUBLIC.REGISTER}`}>Register</a></li>:'' }
                {userState.activeUser ? <li><a className="dropdown-item" href={`/${PRIVATE.LOGOUT}`}>Logout</a></li>:'' }
            </ul>
        </>
    )
}

export default ProfileIcon