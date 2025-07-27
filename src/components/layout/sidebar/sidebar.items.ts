import type { SidebarItemsType } from "@models/sidebar.model";
import { PUBLIC, PRIVATE, PROTECTED } from "@models/routes/routes";

export const sidebarItems: SidebarItemsType = [
  {
    text: 'Inicio',
    url: `/${PUBLIC.LANDING_PAGE}`,
    type: 'single'
  },
  {
    text: 'Search pokemon',
    type: 'input',
    bootstrapIcon: 'bi bi-search'
  },
  {
    text: 'Pokédex',
    icon: 'charizard',
    bootstrapIcon: 'bi-journal-bookmark',
    items: [
      { text: 'Complete Pokedex', url: `${PUBLIC.POKEDEX_ALL}` },
      { text: 'Compare Pokemons', url: `/private/${PRIVATE.COMPARE}` },
      { text: 'Favorites', url: `/private/${PRIVATE.POKEDEX_FAVORITES}` },
    ],
    type: 'accordeon'
  },
  {
    text: 'Combat',
    icon: 'tyranitar',
    bootstrapIcon: 'bi-person-lines-fill',
    items: [
      { text: 'Teams', url: `/private/${PRIVATE.TEAMS}` },
    ],
    type: 'accordeon'
  },
  {
    text: 'Account',
    icon: 'pikachu',
    bootstrapIcon: 'bi-person',
    items: [
      { text: 'Login', url: `/${PUBLIC.LOGIN}` },
      { text: 'Register', url: `/${PUBLIC.REGISTER}` },
      { text: 'Logout', url: `/${PROTECTED.LOGOUT}` }
    ],
    type: 'accordeon'
  }

]
