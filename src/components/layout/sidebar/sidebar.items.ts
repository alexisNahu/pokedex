import type { SidebarItemsType } from "@models/sidebar.model";
import { PUBLIC, PRIVATE } from "@models/routes/routes";

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
      { text: 'Teams' },
    ],
    type: 'accordeon'
  },
  {
    text: 'Minijuegos',
    icon: 'gengar',
    bootstrapIcon: 'bi bi-controller',
    items: [
      { text: 'Adivina el Pokémon' },
      { text: 'Batalla rápida' },
      { text: 'Trivia Pokémon' },
    ],
    type: 'accordeon'
  },
  {
    text: 'Exploración',
    icon: 'venusaur',
    bootstrapIcon: 'bi bi-compass',
    items: [
      { text: 'Regiones' },
      { text: 'Pokémon por región' },
      { text: 'Avistamientos' },
    ],
    type: 'accordeon'

  },
  {
    text: 'Configuración',
    type: 'single'
  }
]
