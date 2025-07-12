import { User } from "@models/user.model";
import { AppDispatch } from "../redux/store";
import { loginUser, registerUser } from "../redux/slices/user/User";
import { UsersState } from "../redux/slices/user/reducers/user.reducer"


export const login = (user: {username: string, password: string}, dispatch: AppDispatch, usersState: UsersState) => {
    const foundUser = findUser(user, [...usersState.users])

    if (!foundUser) return false
    dispatch(loginUser(foundUser))
    return true
}

export const register = (user: User, dispatch: AppDispatch, usersState: UsersState) => {
    if (usernameExists(user, [...usersState.users])) return false
    
    dispatch(registerUser(user))
    return true
}


function usernameExists (user: User, registeredUsers: User[]) {
    return registeredUsers.some(u => u.username === user.username) 
}

function findUser (user: {username: string, password: string}, registeredUsers: User[]): User | false { 
    const foundUser = registeredUsers.find((u) => u.username === user.username && u.password === user.password) 
    if (!foundUser) return false
    return foundUser
}

