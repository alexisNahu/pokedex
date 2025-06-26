export interface User {
    name: string
    password: string
    email: string
    rol: Rol
}

export enum Rol {
    USER = "user"
}