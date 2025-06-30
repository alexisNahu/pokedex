import { User } from "@models/user.model";
import { AppDispatch } from "../redux/store";
import { loginUser, registerUser, UsersState } from "../redux/slices/User"


export const login = (user: {username: string, password: string}, dispatch: AppDispatch, usersState: UsersState) => {
    const foundUser = findUser(user, [...usersState.users])

    if (!foundUser) return false
    dispatch(loginUser(foundUser))
    return true
}

export const register = (user: User, logUser: boolean, dispatch: AppDispatch, usersState: UsersState) => {
    if (usernameExists(user, [...usersState.users])) return false
    
    dispatch(registerUser({user, logUser}))
    return true
}


function usernameExists (user: User, registeredUsers: User[]) {
    return registeredUsers.some(u => u.name === user.name) 
}

function findUser (user: {username: string, password: string}, registeredUsers: User[]): User | false { 
    const foundUser = registeredUsers.find((u) => u.name === user.username && u.password === user.password) 
    if (!foundUser) return false
    return foundUser
}

