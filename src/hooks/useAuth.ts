import { getLocalStorageUser } from '@utilities/localStorage';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from 'src/redux/store';

function useAuth(password: string): boolean {
    const userState = useSelector((store: RootState) => store.user)
    const dispatch = useDispatch<AppDispatch>();
    const registeredUsers = getLocalStorageUser()
    console.log(registeredUsers)
    return false
}

export default useAuth