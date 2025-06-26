import { PRIVATE,PUBLIC } from '@models/routes/routes'
import React, { useRef } from 'react'

function ProfileIcon() {
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
                <li><a className="dropdown-item" href={`/${PUBLIC.LOGIN}`}>Logout</a></li>
            </ul>
        </>
    )
}

export default ProfileIcon