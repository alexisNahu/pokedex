import { Team } from "./pokemon.model"

export interface User {
    id: number
    username: string
    password: string
    email: string
    rol: Rol,
    favorites: string[]
    teams: Team[]
}

export enum Rol {
    USER = "user"
}