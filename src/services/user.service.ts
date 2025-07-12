import { UsersState } from "@redux/slices/user/reducers/user.reducer"

export const getActiveUser = (usersState: UsersState) => {
    return usersState.users.find(user => user.id === usersState.activeUser)
} 