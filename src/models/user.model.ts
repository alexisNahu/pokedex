export interface User {
    id: number
    username: string
    password: string
    email: string
    rol: Rol,
    favorites: string[]
}

export enum Rol {
    USER = "user"
}