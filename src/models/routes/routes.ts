export enum PUBLIC {
  LANDING_PAGE = 'landingPage',
  DESCRIPTION = 'description',
  LOGIN = 'auth/login',
  REGISTER = 'auth/register',
  POKEDEX_ALL = 'pokedex/all',
}

const PRIVATE_BASE = 'private'

export enum PRIVATE {
  PRIVATE = `${PRIVATE_BASE}`,
  COMPARE = `compare`,
  POKEDEX_FAVORITES = 'pokedex/favorites',
  TEAMS = 'teams'
}

export enum PROTECTED {
  LOGOUT = 'auth/logout' 
}

