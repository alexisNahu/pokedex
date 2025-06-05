export function getLocalStorageUser() {
    return localStorage.getItem('user')
}

export function setLocalStorageUser(value: string) {
    localStorage.setItem('user', value)
}

export function clearLocalStorage() {
    localStorage.clear()
}