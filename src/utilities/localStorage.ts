import { User } from "@models/user.model"

export function getLocalStorageUser() {
    console.log(JSON.parse(localStorage.getItem('user') as string))
    return localStorage.getItem('user')
}

export function setLocalStorageUser(value: User) {
    console.log(JSON.parse(localStorage.getItem('user') as string))

    localStorage.setItem('user', JSON.stringify(value))
}

export function clearLocalStorage() {
    console.log(JSON.parse(localStorage.getItem('user') as string))
    localStorage.clear()
}