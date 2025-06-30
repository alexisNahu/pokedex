import { Rol, User } from "@models/user.model"
import { emptyUserState } from "../redux/slices/User"

export function initializeLocalStorageUser(initialState: User[]) {
    localStorage.setItem('user', JSON.stringify(initialState))
    return emptyUserState
}

export function persistLocalStorageUser(value: {users: User[], activeUser: User | null}) {
   localStorage.setItem('user', JSON.stringify(value))
}

export function clearLocalStorage() {
    localStorage.clear()
}


