import { PUBLIC } from '@models/routes/routes'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../redux/slices/User';
import { AppDispatch } from '../../../redux/store';

function ProfileIcon() {
    const dispatch = useDispatch<AppDispatch>();
    const navigator = useNavigate()

    const logoutUserAndRedirect = () => {
        dispatch(logoutUser())
        navigator(`/${PUBLIC.LANDING_PAGE}`)
    }

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
                <li><a className="dropdown-item" href={`/${PUBLIC.LOGIN}`}>Login</a></li>
                <li><a className="dropdown-item" href={`/${PUBLIC.REGISTER}`}>Register</a></li>
                <li onClick={() => logoutUserAndRedirect()}><a className="dropdown-item">Logout</a></li>
            </ul>
        </>
    )
}

export default ProfileIcon